# ระบบสารสนเทศกลุ่มภารกิจด้านการพยาบาล โรงพยาบาลแม่สอด
(Hospital Nursing Division Information Portal)

ระบบสารสนเทศและประชาสัมพันธ์ข้อมูลข่าวสาร กิจกรรม วิสัยทัศน์ พันธกิจ โครงสร้างองค์กร และตัวชี้วัด ของกลุ่มภารกิจด้านการพยาบาล โรงพยาบาลแม่สอด จังหวัดตาก

---

## 🌟 คุณสมบัติเด่นของระบบ (Features)

1. **การแสดงผลทันสมัย รองรับทุกอุปกรณ์ (Full Responsive & Widescreen Display):**
   - รองรับหน้าจอคอมพิวเตอร์ระดับ Widescreen (สูงสุด 1600px) สวยงาม โอ่อ่า ไม่คับแคบ
   - รองรับหน้าจอแท็บเล็ต / iPad ด้วยระบบ Touch Drawer Menu ที่เปิด-ปิดลื่นไหล
   - รองรับสมาร์ตโฟนทุกรุ่นด้วยเลย์เอาต์ Fluid Responsive (Single-column layout)

2. **ระบบจัดการข่าวสารและกิจกรรมประชาสัมพันธ์ (News & Announcements Management):**
   - แสดงผลข่าวสารและกิจกรรมในรูปแบบการ์ดที่สวยงาม พร้อมระบบปักหมุดข่าวสำคัญ (Pin to top)
   - แถบไฮไลท์ Hero Banner ด้านบนสุด สามารถปรับแต่งภาพ ข้อความ และลิงก์ได้จากฝั่งผู้ดูแลระบบ
   - ระบบค้นหาข่าวสารแบบ Real-time ค้นหาได้ทั้งหัวข้อและเนื้อหาข่าว
   - รองรับการอัปโหลดรูปภาพหลายรูป (Multi-image Gallery) พร้อม Modal พรีวิวภาพขนาดใหญ่และคลิกดูรูปทั้งหมดได้เต็มตา
   - รองรับการแนบไฟล์เอกสารราชการ (PDF, Word) และนับจำนวนผู้เข้าชม (View Count) แบบอัตโนมัติ

3. **หน้าข้อมูลองค์กรระดับผู้บริหาร (Executive Subpages):**
   - **วิสัยทัศน์และพันธกิจ (Vision & Mission):** เลย์เอาต์ 2 คอลัมน์ ไฮไลท์วิสัยทัศน์ + พันธกิจ 4 ด้าน พร้อมค่านิยม N-K-N-U-R-S-E (7 ตัวอักษร)
   - **โครงสร้างองค์กร (Structure):** แสดงสายการบังคับบัญชาและหน่วยงานในสังกัด
   - **ยุทธศาสตร์ (Strategy):** แผนยุทธศาสตร์และทิศทางการพัฒนา
   - **ตัวชี้วัดผลการดำเนินงาน (KPIs):** แสดงเป้าหมายและผลสัมฤทธิ์ทางการพยาบาล
   - แถบแท็บสลับหน้าด่วน (Subpage Tabs) อำนวยความสะดวกให้ผู้ใช้งาน

4. **ระบบรักษาความปลอดภัยและการบริหารจัดการ (Security & Admin Control):**
   - ระบบยืนยันตัวตนด้วย JSON Web Token (JWT) และการเข้ารหัสรหัสผ่านด้วย Bcrypt
   - การแบ่งสิทธิ์การใช้งาน (Role-based Access Control): Developer, Admin, User
   - บันทึกประวัติการกระทำในระบบอย่างละเอียด (Audit Logs) ตรวจสอบย้อนหลังได้

---

## 🛠 เทคโนโลยีที่ใช้ (Tech Stack)

* **Frontend:** HTML5, Modern Vanilla CSS (Glassmorphism, CSS Grid, Flexbox, Fluid Clamping), Vanilla JavaScript (ES6+), FontAwesome Icons
* **Backend:** Node.js, Express.js
* **Database:** SQLite3 (`nursing.db`)
* **Authentication & Upload:** JWT, Bcryptjs, Multer, CORS

---

## 🚀 วิธีการติดตั้งและรันระบบ (Getting Started)

### 1. โคลนโปรเจกต์ (Clone Repository)
```bash
git clone https://github.com/Khthawuth/Test_Nursing.git
cd Test_Nursing
```

### 2. ติดตั้ง Dependencies ฝั่ง Backend
```bash
cd backend
npm install
```

### 3. เริ่มต้นรันเซิร์ฟเวอร์ (Start Server)
```bash
npm start
# หรือ node server.js
```
เซิร์ฟเวอร์จะเริ่มทำงานที่ `http://localhost:4000`

### 4. เปิดใช้งานเว็บไซต์ (Frontend)
เปิดไฟล์ผ่าน Apache Web Server (XAMPP):
```
http://localhost/Test_Nursing/frontend/index.html
```
หรือเปิดไฟล์ `frontend/index.html` ผ่านเบราว์เซอร์ได้ทันที

---

## 🔐 บัญชีเข้าใช้งานระบบเริ่มต้น (Default Accounts)

* **Developer Account (ผู้พัฒนาระบบ):**
  * Username: `dev`
  * Password: `dev1234`
