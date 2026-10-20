const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 4000;
const JWT_SECRET = 'nursing_secret_key_2026_jwt_auth';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 1. ตั้งค่าโฟลเดอร์สำหรับอัปโหลดไฟล์
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
app.use('/uploads', express.static(uploadDir));

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });
const cpUpload = upload.fields([
  { name: 'image', maxCount: 20 },
  { name: 'images', maxCount: 20 },
  { name: 'document', maxCount: 1 }
]);

// 2. เชื่อมต่อฐานข้อมูล SQLite
const db = new sqlite3.Database(path.resolve(__dirname, 'nursing.db'), (err) => {
  if (err) console.error('เชื่อมต่อ SQLite ล้มเหลว:', err.message);
  else console.log('เชื่อมต่อฐานข้อมูล SQLite (nursing.db) สำเร็จ');
});

// ฟังก์ชันบันทึก Audit Log ลงฐานข้อมูล
function logActivity(username, fullname, action, details) {
  const timestamp = new Date().toLocaleString('th-TH', { timeZone: 'Asia/Bangkok' });
  const uname = username || 'ระบบ';
  const fname = fullname || 'ผู้ใช้งาน';
  db.run(
    'INSERT INTO audit_logs (username, fullname, action, details, created_at) VALUES (?, ?, ?, ?, ?)',
    [uname, fname, action, details, timestamp],
    (err) => {
      if (err) console.error('บันทึก Log ผิดพลาด:', err.message);
    }
  );
}

// สร้างตารางทั้งหมดทันที
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      fullname TEXT NOT NULL,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT NOT NULL,
      status TEXT NOT NULL,
      created_at TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      category TEXT NOT NULL,
      image_url TEXT,
      file_url TEXT,
      is_pinned INTEGER DEFAULT 0,
      views INTEGER DEFAULT 0,
      created_at TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS audit_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      fullname TEXT NOT NULL,
      action TEXT NOT NULL,
      details TEXT,
      created_at TEXT NOT NULL
    )
  `, () => {
    // ใส่ Log ตรวจสอบระบบเริ่มต้น
    db.get('SELECT COUNT(*) as count FROM audit_logs', [], (err, row) => {
      if (row && row.count === 0) {
        logActivity('dev', 'ผู้พัฒนาระบบหลัก', 'เริ่มต้นระบบ', 'เปิดใช้งานระบบ Audit Logs สำเร็จ');
      }
    });
  });

  db.run(`ALTER TABLE posts ADD COLUMN file_url TEXT`, () => {});
  db.run(`ALTER TABLE posts ADD COLUMN is_pinned INTEGER DEFAULT 0`, () => {});
  db.run(`ALTER TABLE posts ADD COLUMN views INTEGER DEFAULT 0`, () => {});
  db.run(`ALTER TABLE posts ADD COLUMN gallery_urls TEXT`, () => {});

  // ตารางจัดเก็บภาพและข้อความไฮไลท์ด้านบนสุด (Hero Banner)
  db.run(`
    CREATE TABLE IF NOT EXISTS hero_banner (
      id INTEGER PRIMARY KEY,
      tag TEXT,
      title TEXT,
      subtitle TEXT,
      image_url TEXT,
      link_url TEXT,
      updated_at TEXT
    )
  `, () => {
    db.get('SELECT * FROM hero_banner WHERE id = 1', [], (err, row) => {
      if (!row) {
        db.run(`
          INSERT INTO hero_banner (id, tag, title, subtitle, image_url, link_url, updated_at)
          VALUES (1, 'Nursing Leadership', 'คณะผู้บริหารและทีมงานบุคลากรทางการพยาบาล', 'กลุ่มภารกิจด้านการพยาบาล โรงพยาบาลแม่สอด จังหวัดตาก', 'images/welcome-hero.jpg', '', datetime('now'))
        `);
      }
    });
  });

  // บัญชี Developer เริ่มต้น
  db.get('SELECT * FROM users WHERE username = ?', ['dev'], (err, row) => {
    if (!row) {
      const hash = bcrypt.hashSync('dev1234', 10);
      db.run(
        'INSERT INTO users (fullname, username, password, role, status, created_at) VALUES (?, ?, ?, ?, ?, ?)',
        ['ผู้พัฒนาระบบหลัก', 'dev', hash, 'developer', 'approved', new Date().toISOString().split('T')[0]]
      );
      console.log('สร้างบัญชี Developer เริ่มต้น: dev / dev1234');
    }
  });
});

// Middleware ตรวจสอบ Token
function verifyAuth(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'กรุณาเข้าสู่ระบบ' });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Session หมดอายุหรือ Token ไม่ถูกต้อง' });
    req.user = decoded;
    next();
  });
}

// --- APIs การยืนยันตัวตน ---
app.post('/api/register', async (req, res) => {
  const { fullname, username, password } = req.body;
  if (!fullname || !username || !password) return res.status(400).json({ error: 'กรุณากรอกข้อมูลให้ครบ' });

  try {
    const hash = await bcrypt.hash(password, 10);
    const date = new Date().toISOString().split('T')[0];
    db.run(
      'INSERT INTO users (fullname, username, password, role, status, created_at) VALUES (?, ?, ?, ?, ?, ?)',
      [fullname, username, hash, 'editor', 'pending', date],
      function (err) {
        if (err) return res.status(400).json({ error: 'Username นี้ถูกใช้งานแล้ว' });
        logActivity(username, fullname, 'ลงทะเบียนสมาชิกใหม่', 'ส่งคำขอเข้าใช้งานระบบ รอการอนุมัติ');
        res.status(201).json({ message: 'ลงทะเบียนสำเร็จ! กรุณารอผู้พัฒนาอนุมัติสิทธิ์' });
      }
    );
  } catch (err) {
    res.status(500).json({ error: 'ระบบขัดข้อง' });
  }
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  db.get('SELECT * FROM users WHERE username = ?', [username], async (err, user) => {
    if (err || !user) return res.status(401).json({ error: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
    if (user.status !== 'approved') return res.status(403).json({ error: 'บัญชีของคุณอยู่ระหว่างรออนุมัติสิทธิ์' });

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role, fullname: user.fullname },
      JWT_SECRET,
      { expiresIn: '8h' }
    );

    logActivity(user.username, user.fullname, 'เข้าสู่ระบบ', 'เข้าสู่ระบบสำเร็จ');
    res.json({ message: 'เข้าสู่ระบบสำเร็จ', token, user });
  });
});

// --- APIs ผู้พัฒนา (Developer) ---
app.get('/api/developer/users', verifyAuth, (req, res) => {
  if (req.user.role !== 'developer') return res.status(403).json({ error: 'ไม่มีสิทธิ์' });
  db.all('SELECT id, fullname, username, role, status, created_at FROM users ORDER BY id DESC', [], (err, rows) => {
    res.json(rows || []);
  });
});

app.put('/api/developer/users/:id/status', verifyAuth, (req, res) => {
  if (req.user.role !== 'developer') return res.status(403).json({ error: 'ไม่มีสิทธิ์' });
  const newStatus = req.body.status;
  db.run('UPDATE users SET status = ? WHERE id = ?', [newStatus, req.params.id], () => {
    logActivity(req.user.username, req.user.fullname, 'ปรับปรุงสถานะผู้ใช้', `เปลี่ยนสถานะ User ID: ${req.params.id} เป็น ${newStatus}`);
    res.json({ message: 'ปรับปรุงสถานะสำเร็จ' });
  });
});

app.put('/api/developer/users/:id/reset-password', verifyAuth, async (req, res) => {
  if (req.user.role !== 'developer') return res.status(403).json({ error: 'ไม่มีสิทธิ์' });
  const { newPassword } = req.body;
  if (!newPassword || newPassword.length < 4) {
    return res.status(400).json({ error: 'รหัสผ่านใหม่ต้องมีความยาวอย่างน้อย 4 ตัวอักษร' });
  }

  try {
    const hash = await bcrypt.hash(newPassword, 10);
    db.run('UPDATE users SET password = ? WHERE id = ?', [hash, req.params.id], function(err) {
      if (err) return res.status(500).json({ error: 'ไม่สามารถเปลี่ยนรหัสผ่านได้' });
      logActivity(req.user.username, req.user.fullname, 'รีเซ็ตรหัสผ่าน', `รีเซ็ตรหัสผ่านให้ User ID: ${req.params.id}`);
      res.json({ message: 'รีเซ็ตรหัสผ่านใหม่เรียบร้อยแล้ว' });
    });
  } catch (err) {
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการประมวลผล' });
  }
});

app.delete('/api/developer/users/:id', verifyAuth, (req, res) => {
  if (req.user.role !== 'developer') return res.status(403).json({ error: 'ไม่มีสิทธิ์' });
  db.run('DELETE FROM users WHERE id = ?', [req.params.id], () => {
    logActivity(req.user.username, req.user.fullname, 'ลบบัญชีผู้ใช้', `ลบ User ID: ${req.params.id}`);
    res.json({ message: 'ลบเรียบร้อย' });
  });
});

// API ดึง Audit Logs (ปรับให้สร้างตารางสำรองอัตโนมัติหากยังไม่มี)
app.get('/api/developer/logs', verifyAuth, (req, res) => {
  if (req.user.role !== 'developer') {
    return res.status(403).json({ error: 'คุณไม่มีสิทธิ์ระดับ Developer ในการเข้าถึงส่วนนี้' });
  }
  db.all('SELECT * FROM audit_logs ORDER BY id DESC LIMIT 50', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows || []);
  });
});

// --- APIs ภาพไฮไลท์ด้านบนสุด (Hero Banner) ---
app.get('/api/hero-banner', (req, res) => {
  db.get('SELECT * FROM hero_banner WHERE id = 1', [], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) {
      return res.json({
        id: 1,
        tag: 'Nursing Leadership',
        title: 'คณะผู้บริหารและทีมงานบุคลากรทางการพยาบาล',
        subtitle: 'กลุ่มภารกิจด้านการพยาบาล โรงพยาบาลแม่สอด จังหวัดตาก',
        image_url: 'images/welcome-hero.jpg',
        link_url: ''
      });
    }
    res.json(row);
  });
});

app.post('/api/hero-banner', verifyAuth, cpUpload, (req, res) => {
  const { tag, title, subtitle, link_url, current_image_url } = req.body;

  let image_url = current_image_url || 'images/welcome-hero.jpg';
  if (req.files && req.files['image'] && req.files['image'].length > 0) {
    const f = req.files['image'][0];
    image_url = `http://localhost:4000/uploads/${f.filename}`;
  }

  const date = new Date().toISOString();
  db.get('SELECT id FROM hero_banner WHERE id = 1', [], (err, row) => {
    if (row) {
      db.run(
        'UPDATE hero_banner SET tag = ?, title = ?, subtitle = ?, image_url = ?, link_url = ?, updated_at = ? WHERE id = 1',
        [tag || '', title || '', subtitle || '', image_url, link_url || '', date],
        function(err) {
          if (err) return res.status(500).json({ error: err.message });
          logActivity(req.user.username, req.user.fullname, 'อัปเดตภาพไฮไลท์บนสุด', `เปลี่ยนภาพหรือข้อความส่วนหัวเว็บ: "${title}"`);
          res.json({ message: 'อัปเดตภาพไฮไลท์ด้านบนเรียบร้อยแล้ว', hero: { tag, title, subtitle, image_url, link_url } });
        }
      );
    } else {
      db.run(
        'INSERT INTO hero_banner (id, tag, title, subtitle, image_url, link_url, updated_at) VALUES (1, ?, ?, ?, ?, ?, ?)',
        [tag || '', title || '', subtitle || '', image_url, link_url || '', date],
        function(err) {
          if (err) return res.status(500).json({ error: err.message });
          logActivity(req.user.username, req.user.fullname, 'อัปเดตภาพไฮไลท์บนสุด', `เปลี่ยนภาพหรือข้อความส่วนหัวเว็บ: "${title}"`);
          res.json({ message: 'อัปเดตภาพไฮไลท์ด้านบนเรียบร้อยแล้ว', hero: { tag, title, subtitle, image_url, link_url } });
        }
      );
    }
  });
});

app.post('/api/hero-banner/reset', verifyAuth, (req, res) => {
  const date = new Date().toISOString();
  db.run(`
    UPDATE hero_banner 
    SET tag = 'Nursing Leadership',
        title = 'คณะผู้บริหารและทีมงานบุคลากรทางการพยาบาล',
        subtitle = 'กลุ่มภารกิจด้านการพยาบาล โรงพยาบาลแม่สอด จังหวัดตาก',
        image_url = 'images/welcome-hero.jpg',
        link_url = '',
        updated_at = ?
    WHERE id = 1
  `, [date], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    logActivity(req.user.username, req.user.fullname, 'รีเซ็ตภาพไฮไลท์บนสุด', 'คืนค่าภาพเริ่มต้น (คณะผู้บริหาร)');
    res.json({ message: 'คืนค่ารูปภาพและข้อความเริ่มต้นสำเร็จ' });
  });
});

// --- APIs ข่าวสารและกิจกรรม ---
app.get('/api/posts', (req, res) => {
  db.all('SELECT * FROM posts ORDER BY is_pinned DESC, id DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows || []);
  });
});

app.get('/api/posts/:id', (req, res) => {
  const id = req.params.id;
  db.get('SELECT * FROM posts WHERE id = ?', [id], (err, row) => {
    if (err || !row) return res.status(404).json({ error: 'ไม่พบข้อมูล' });
    res.json(row);
  });
});

app.post('/api/posts', verifyAuth, cpUpload, (req, res) => {
  const { title, description, category, is_pinned } = req.body;
  
  const uploadedImages = [];
  if (req.files) {
    if (req.files['image']) req.files['image'].forEach(f => uploadedImages.push(`http://localhost:4000/uploads/${f.filename}`));
    if (req.files['images']) req.files['images'].forEach(f => uploadedImages.push(`http://localhost:4000/uploads/${f.filename}`));
  }

  const image_url = uploadedImages.length > 0 ? uploadedImages[0] : '';
  const gallery_urls = uploadedImages.length > 0 ? JSON.stringify(uploadedImages) : '';
  const file_url = req.files && req.files['document'] ? `http://localhost:4000/uploads/${req.files['document'][0].filename}` : '';
  const pinned = is_pinned === '1' || is_pinned === 'true' ? 1 : 0;
  const date = new Date().toISOString().split('T')[0];

  const sql = `INSERT INTO posts (title, description, category, image_url, gallery_urls, file_url, is_pinned, views, created_at) 
               VALUES (?, ?, ?, ?, ?, ?, ?, 0, ?)`;
  db.run(sql, [title, description, category, image_url, gallery_urls, file_url, pinned, date], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    logActivity(req.user.username, req.user.fullname, 'เพิ่มเนื้อหาใหม่', `เพิ่มข่าวเรื่อง: "${title}" (หมวด: ${category}) มีรูป ${uploadedImages.length} รูป`);
    res.status(201).json({ message: 'บันทึกข้อมูลเรียบร้อย', id: this.lastID });
  });
});

app.put('/api/posts/:id', verifyAuth, cpUpload, (req, res) => {
  const { title, description, category, is_pinned } = req.body;
  const id = req.params.id;
  const pinned = is_pinned === '1' || is_pinned === 'true' ? 1 : 0;

  db.get('SELECT * FROM posts WHERE id = ?', [id], (err, current) => {
    if (!current) return res.status(404).json({ error: 'ไม่พบข้อมูลเดิม' });

    const uploadedImages = [];
    if (req.files) {
      if (req.files['image']) req.files['image'].forEach(f => uploadedImages.push(`http://localhost:4000/uploads/${f.filename}`));
      if (req.files['images']) req.files['images'].forEach(f => uploadedImages.push(`http://localhost:4000/uploads/${f.filename}`));
    }

    const image_url = uploadedImages.length > 0 ? uploadedImages[0] : current.image_url;
    const gallery_urls = uploadedImages.length > 0 ? JSON.stringify(uploadedImages) : current.gallery_urls;

    const file_url = req.files && req.files['document'] 
      ? `http://localhost:4000/uploads/${req.files['document'][0].filename}` 
      : current.file_url;

    const sql = `UPDATE posts SET title = ?, description = ?, category = ?, is_pinned = ?, image_url = ?, gallery_urls = ?, file_url = ? WHERE id = ?`;
    db.run(sql, [title, description, category, pinned, image_url, gallery_urls, file_url, id], function (err) {
      if (err) return res.status(500).json({ error: err.message });
      logActivity(req.user.username, req.user.fullname, 'แก้ไขเนื้อหา', `แก้ไขข้อมูลข่าว ID: ${id} ("${title}")`);
      res.json({ message: 'อัปเดตข้อมูลสำเร็จ' });
    });
  });
});

app.delete('/api/posts/:id', verifyAuth, (req, res) => {
  const id = req.params.id;
  db.get('SELECT title FROM posts WHERE id = ?', [id], (err, post) => {
    const postTitle = post ? post.title : `ID: ${id}`;
    db.run('DELETE FROM posts WHERE id = ?', [id], function (err) {
      if (err) return res.status(500).json({ error: err.message });
      logActivity(req.user.username, req.user.fullname, 'ลบเนื้อหา', `ลบข่าว: "${postTitle}"`);
      res.json({ message: 'ลบเรียบร้อย' });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Nursing Backend API พร้อมทำงานแล้วที่ http://localhost:${PORT}`);
});