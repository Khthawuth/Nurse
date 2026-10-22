/**
 * ข้อมูลและช่องทางติดต่อของทั้ง 17 กลุ่มงานการพยาบาล โรงพยาบาลแม่สอด
 * Nursing Division, Mae Sot Hospital
 * 
 * วิธีการปรับแต่ง:
 * 1. websiteUrl: ใส่ URL เว็บไซต์ภายนอก เช่น "https://er.maesothospital.go.th" เมื่อคลิกจะเด้งไปแท็บใหม่
 * 2. detailUrl: ใส่ URL สำหรับโหลดอีกหน้านึง เช่น "unit-detail.html?id=1"
 * 3. iconSvg: ไอคอนเวกเตอร์ SVG สีสันสดใสสไตล์ภาพที่สอง (หรือจะใช้ iconImage: "images/units/..." แทนก็ได้)
 */

const unitsData = [
  {
    id: 1,
    name: "กลุ่มงานการพยาบาลผู้ป่วยอุบัติเหตุและฉุกเฉิน",
    cluster: "critical",
    clusterLabel: "งานวิกฤต ฉุกเฉิน & ผู้ป่วยนอก",
    // ลิงก์สำหรับเมื่อคลิกแล้วจะเด้งไปหน้าเว็บต่างๆ (เปิดในแท็บใหม่)
    websiteUrl: "https://www.maesothospital.go.th/er",
    // ลิงก์สำหรับเมื่อคลิกแล้วจะโหลดอีกหน้านึงเพื่อดูข้อมูล
    detailUrl: "unit-detail.html?id=1",
    leader: "พว. วันเพ็ญ สุริยะ",
    leaderPos: "หัวหน้ากลุ่มงานการพยาบาลอุบัติเหตุและฉุกเฉิน",
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80",
    phone: "1387, 1166 (ฉุกเฉิน)",
    location: "อาคารอุบัติเหตุและฉุกเฉิน ชั้น 1",
    hours: "เปิดบริการตลอด 24 ชั่วโมง",
    rnCount: 32,
    tnCount: 6,
    pnCount: 14,
    desc: "ให้บริการบริบาลผู้ป่วยภาวะวิกฤต ฉุกเฉิน และอุบัติเหตุตลอด 24 ชั่วโมง ด้วยระบบคัดแยกผู้ป่วยตามมาตรฐานสากล (Emergency Severity Index - ESI)",
    duties: [
      "คัดแยกและประเมินความรุนแรงของผู้ป่วยฉุกเฉิน (Triage System) ตลอด 24 ชม.",
      "ช่วยฟื้นคืนชีพขั้นสูง (Advanced CPR) และดูแลผู้ป่วยวิกฤตในห้อง Resuscitation",
      "ระบบส่งต่อผู้ป่วยฉุกเฉิน (EMS & Refer) และประสานงานทีมแพทย์กู้ชีพ",
      "การดูแลผู้ป่วยอุบัติเหตุหมู่และภัยพิบัติ (Mass Casualty Incident)"
    ],
    // SVG Illustration: รถพยาบาล + เจ้าหน้าที่กู้ชีพฉุกเฉิน (สไตล์รูปที่สอง)
    iconSvg: `
      <svg width="130" height="110" viewBox="0 0 160 140" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-width: 130px; max-height: 110px; width: 100%; height: auto; display: block; margin: 0 auto;">
        <!-- รถพยาบาล -->
        <rect x="22" y="38" width="94" height="48" rx="8" fill="#F8FAFC" stroke="#84339c" stroke-width="2.5"/>
        <rect x="30" y="44" width="22" height="18" rx="4" fill="#E0F2FE" stroke="#0284C7" stroke-width="1.5"/>
        <rect x="60" y="44" width="22" height="18" rx="4" fill="#E0F2FE" stroke="#0284C7" stroke-width="1.5"/>
        <path d="M22 66H116" stroke="#EF4444" stroke-width="4"/>
        <circle cx="42" cy="86" r="11" fill="#334155"/>
        <circle cx="42" cy="86" r="5" fill="#E2E8F0"/>
        <circle cx="98" cy="86" r="11" fill="#334155"/>
        <circle cx="98" cy="86" r="5" fill="#E2E8F0"/>
        <!-- ไฟฉุกเฉินบนรถ -->
        <rect x="52" y="30" width="24" height="8" rx="3" fill="#EF4444"/>
        <circle cx="64" cy="27" r="4" fill="#F59E0B" opacity="0.8"/>
        <!-- กากบาทพยาบาลสีแดง -->
        <path d="M41 53H47M44 50V56" stroke="#EF4444" stroke-width="3" stroke-linecap="round"/>
        <!-- บุคลากรพยาบาล/กู้ชีพ -->
        <circle cx="124" cy="50" r="11" fill="#FDBA74"/>
        <path d="M115 48C115 41 120 37 127 37C133 37 135 41 135 48" fill="#1E293B"/>
        <rect x="114" y="61" width="20" height="34" rx="6" fill="#84339c"/>
        <rect x="118" y="72" width="12" height="4" fill="#F59E0B"/>
        <rect x="127" y="76" width="14" height="10" rx="3" fill="#EA580C"/>
        <path d="M134 81H134.01" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
      </svg>
    `
  },
  {
    id: 2,
    name: "กลุ่มงานการพยาบาลงานวิสัญญี",
    cluster: "critical",
    clusterLabel: "งานวิกฤต ฉุกเฉิน & ผู้ป่วยนอก",
    websiteUrl: "https://www.maesothospital.go.th/anesthesia",
    detailUrl: "unit-detail.html?id=2",
    leader: "พว. จุฬารัตน์ บรรณสาร",
    leaderPos: "หัวหน้ากลุ่มงานการพยาบาลวิสัญญี",
    avatar: "https://images.unsplash.com/photo-1594824813633-5c7423010b99?w=150&auto=format&fit=crop&q=80",
    phone: "1387, 1202",
    location: "อาคารผ่าตัด ชั้น 3",
    hours: "เปิดบริการตลอด 24 ชั่วโมง",
    rnCount: 22,
    tnCount: 2,
    pnCount: 6,
    desc: "ให้บริการระงับความรู้สึกทั้งแบบทั่วไปและเฉพาะส่วน พร้อมการดูแลติดตามสัญญาณชีพระหว่างและหลังผ่าตัดอย่างใกล้ชิด",
    duties: [
      "ประเมินสภาพผู้ป่วยก่อนให้ยาระงับความรู้สึก (Pre-anesthetic evaluation)",
      "ให้การดูแลและช่วยระงับความรู้สึกในห้องผ่าตัด (General & Regional Anesthesia)",
      "ดูแลฟื้นฟูหลังระงับความรู้สึกในห้องพักฟื้น (PACU - Post-Anesthesia Care)",
      "ควบคุมดูแลความปลอดภัยของทางเดินหายใจและสัญญาณชีพตลอดการผ่าตัด"
    ],
    // SVG Illustration: ผู้ป่วยสวมหน้ากากออกซิเจน/ดมยา และหมวกผ่าตัด (สไตล์รูปที่สอง)
    iconSvg: `
      <svg width="130" height="110" viewBox="0 0 160 140" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-width: 130px; max-height: 110px; width: 100%; height: auto; display: block; margin: 0 auto;">
        <circle cx="80" cy="70" r="54" fill="#E0F2FE" opacity="0.6"/>
        <circle cx="80" cy="70" r="44" fill="#38BDF8" opacity="0.3"/>
        <!-- ใบหน้าผู้ป่วย -->
        <circle cx="82" cy="68" r="32" fill="#FED7AA"/>
        <!-- หมวกผ่าตัดสีเขียวมิ้นต์ -->
        <path d="M54 62C54 44 67 36 84 36C100 36 112 44 112 62C112 65 108 67 84 67C60 67 54 65 54 62Z" fill="#84339c"/>
        <!-- รอยย่นหมวก -->
        <path d="M62 48Q82 42 104 48" stroke="#ff51a3" stroke-width="2" stroke-linecap="round"/>
        <path d="M66 56Q84 52 100 56" stroke="#ff51a3" stroke-width="2" stroke-linecap="round"/>
        <!-- หน้ากากดมยาสลบ/ออกซิเจน -->
        <path d="M96 68C108 73 108 84 94 92C84 97 76 96 74 90C72 84 82 72 96 68Z" fill="#E2E8F0" stroke="#0284C7" stroke-width="2" opacity="0.9"/>
        <!-- ท่อต่อสายก๊าซดมยา -->
        <path d="M98 80C115 82 130 92 138 106" stroke="#0284C7" stroke-width="4" stroke-linecap="round"/>
        <path d="M98 80C115 82 130 92 138 106" stroke="#BAE6FD" stroke-width="2" stroke-linecap="round"/>
        <!-- ดวงตาหลับพริ้มปลอดภัย -->
        <path d="M72 68Q76 72 80 68" stroke="#78350F" stroke-width="2.5" stroke-linecap="round"/>
      </svg>
    `
  },
  {
    id: 3,
    name: "กลุ่มงานการพยาบาลการตรวจรักษาพิเศษ",
    cluster: "specialty",
    clusterLabel: "บริการและตรวจรักษาพิเศษ",
    websiteUrl: "https://www.maesothospital.go.th/special-treatment",
    detailUrl: "unit-detail.html?id=3",
    leader: "พว. ทิพวรรณ สว่างเนตร",
    leaderPos: "หัวหน้ากลุ่มงานตรวจรักษาพิเศษ (ไตเทียม/เคมีบำบัด)",
    avatar: "https://images.unsplash.com/photo-1594824813633-5c7423010b99?w=150&auto=format&fit=crop&q=80",
    phone: "1387, 1450",
    location: "อาคารอำนวยการ ชั้น 2",
    hours: "08:00 - 16:30 น.",
    rnCount: 19,
    tnCount: 3,
    pnCount: 7,
    desc: "ให้บริการหัตถการและตรวจรักษาขั้นสูง เช่น ศูนย์ฟอกเลือดด้วยเครื่องไตเทียม การให้เคมีบำบัด และการตรวจหัวใจด้วยคลื่นเสียงสะท้อน",
    duties: [
      "บริการฟอกเลือดด้วยเครื่องไตเทียม (Hemodialysis Unit) ตามมาตรฐาน HA",
      "การบริหารยาเคมีบำบัดและการดูแลผู้ป่วยโรคมะเร็ง (Chemotherapy Care)",
      "การตรวจสวนหัวใจและหลอดเลือด (Cath Lab Support)",
      "บริการตรวจรักษาและหัตถการเฉพาะทางอื่นๆ"
    ],
    // SVG Illustration: หัวใจมีพลาสเตอร์ยา แคปซูล ยาเม็ด สื่อถึงการรักษาฟื้นฟู (สไตล์รูปที่สอง)
    iconSvg: `
      <svg width="130" height="110" viewBox="0 0 160 140" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-width: 130px; max-height: 110px; width: 100%; height: auto; display: block; margin: 0 auto;">
        <circle cx="80" cy="70" r="50" fill="#FFF1F2" opacity="0.7"/>
        <!-- หัวใจสีแดงสดใส -->
        <path d="M80 44C70 28 46 32 44 54C42 74 72 96 80 102C88 96 118 74 116 54C114 32 90 28 80 44Z" fill="#F43F5E"/>
        <!-- พลาสเตอร์ยาคาดบนหัวใจ -->
        <g transform="rotate(25 80 65)">
          <rect x="62" y="58" width="36" height="14" rx="4" fill="#FDE68A" stroke="#F59E0B" stroke-width="1.5"/>
          <circle cx="74" cy="65" r="1.5" fill="#D97706"/>
          <circle cx="80" cy="65" r="1.5" fill="#D97706"/>
          <circle cx="86" cy="65" r="1.5" fill="#D97706"/>
        </g>
        <!-- หลอดยา/เข็มฉีดยา -->
        <g transform="rotate(-30 45 60)">
          <rect x="36" y="50" width="16" height="28" rx="3" fill="#E0F2FE" stroke="#0284C7" stroke-width="1.5"/>
          <line x1="44" y1="40" x2="44" y2="50" stroke="#64748B" stroke-width="2"/>
          <line x1="44" y1="78" x2="44" y2="88" stroke="#0284C7" stroke-width="3"/>
        </g>
        <!-- แคปซูลและเม็ดยาด้านล่าง -->
        <g transform="rotate(40 115 85)">
          <rect x="106" y="78" width="10" height="22" rx="5" fill="#84339c"/>
          <rect x="106" y="78" width="10" height="11" rx="5" fill="#F97316"/>
        </g>
        <circle cx="60" cy="104" r="5" fill="#F59E0B"/>
        <circle cx="102" cy="106" r="6" fill="#ff51a3"/>
      </svg>
    `
  },
  {
    id: 4,
    name: "กลุ่มงานวิจัยและพัฒนา",
    cluster: "quality",
    clusterLabel: "พัฒนาคุณภาพ วิชาการ & IC",
    websiteUrl: "https://www.maesothospital.go.th/research",
    detailUrl: "unit-detail.html?id=4",
    leader: "ดร.พว. ชนิกา วัฒนกุล",
    leaderPos: "หัวหน้ากลุ่มงานวิจัยและนวัตกรรม (R2R)",
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80",
    phone: "1387, 1512",
    location: "อาคารเฉลิมพระเกียรติ ชั้น 4",
    hours: "08:30 - 16:30 น.",
    rnCount: 12,
    tnCount: 1,
    pnCount: 3,
    desc: "ขับเคลื่อนงานวิจัยจากงานประจำสู่งานวิจัย (R2R) การสร้างสรรค์นวัตกรรมการพยาบาล และการจัดการความรู้ (KM) เพื่อความเป็นเลิศทางวิชาการ",
    duties: [
      "ส่งเสริมและให้คำปรึกษาการทำวิจัยทางการพยาบาล และ Routine to Research (R2R)",
      "พัฒนาและจดสิทธิบัตรนวัตกรรมอุปกรณ์และแนวปฏิบัติการพยาบาล",
      "การจัดเวทีประชุมวิชาการและการเผยแพร่ผลงานวิจัยในวารสารระดับชาติ/นานาชาติ",
      "การจัดการองค์ความรู้ทางการพยาบาล (Knowledge Management)"
    ],
    // SVG Illustration: วงกลมสีชมพู พร้อมกระดาษ แว่นขยาย หลอดไฟไอเดีย สกรีน RESEARCH (สไตล์รูปที่สอง)
    iconSvg: `
      <svg width="130" height="110" viewBox="0 0 160 140" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-width: 130px; max-height: 110px; width: 100%; height: auto; display: block; margin: 0 auto;">
        <!-- วงกลมพื้นหลังสีชมพูพาสเทล -->
        <circle cx="80" cy="70" r="50" fill="#FCE7F3"/>
        <path d="M42 45C52 35 65 30 80 30C95 30 108 35 118 45" stroke="#EC4899" stroke-width="6" stroke-linecap="round"/>
        <!-- แผ่นเอกสารรายงานวิจัย -->
        <rect x="52" y="44" width="46" height="58" rx="6" fill="#FFFFFF" stroke="#F43F5E" stroke-width="2"/>
        <line x1="60" y1="56" x2="88" y2="56" stroke="#94A3B8" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="60" y1="65" x2="84" y2="65" stroke="#94A3B8" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="60" y1="74" x2="78" y2="74" stroke="#94A3B8" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="60" y1="83" x2="72" y2="83" stroke="#94A3B8" stroke-width="2.5" stroke-linecap="round"/>
        <!-- หลอดไฟไอเดียสีส้ม -->
        <circle cx="50" cy="42" r="11" fill="#FDE047" stroke="#EAB308" stroke-width="1.5"/>
        <path d="M47 53H53" stroke="#CA8A04" stroke-width="2"/>
        <!-- แว่นขยายขยายผลงานวิจัย -->
        <circle cx="95" cy="78" r="18" fill="#F8FAFC" fill-opacity="0.7" stroke="#1E293B" stroke-width="3"/>
        <line x1="108" y1="91" x2="124" y2="107" stroke="#1E293B" stroke-width="4.5" stroke-linecap="round"/>
        <text x="80" y="32" font-family="'Prompt', sans-serif" font-size="8" font-weight="bold" fill="#BE185D" text-anchor="middle">RESEARCH</text>
      </svg>
    `
  },
  {
    id: 5,
    name: "กลุ่มงานการพยาบาลผู้ป่วยห้องผ่าตัด",
    cluster: "critical",
    clusterLabel: "งานวิกฤต ฉุกเฉิน & ผู้ป่วยนอก",
    websiteUrl: "https://www.maesothospital.go.th/or",
    detailUrl: "unit-detail.html?id=5",
    leader: "พว. ธนภรณ์ รักษ์สกุล",
    leaderPos: "หัวหน้ากลุ่มงานการพยาบาลห้องผ่าตัด (OR)",
    avatar: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&auto=format&fit=crop&q=80",
    phone: "1387, 1205",
    location: "อาคารผ่าตัด ชั้น 2",
    hours: "เปิดบริการตลอด 24 ชั่วโมง",
    rnCount: 38,
    tnCount: 4,
    pnCount: 16,
    desc: "ให้บริการผ่าตัดศัลยกรรมทุกสาขา ด้วยมาตรฐานความปลอดภัยห้องผ่าตัดระดับสากล ปราศจากเชื้อ และเครื่องมือแพทย์ที่ทันสมัย",
    duties: [
      "การเตรียมและช่วยแพทย์ผ่าตัดทุกสาขาความเชี่ยวชาญ",
      "ระบบความปลอดภัยในห้องผ่าตัดตามเกณฑ์ WHO Surgical Safety Checklist",
      "การดูแลความปลอดเชื้อและอุปกรณ์เครื่องมือผ่าตัดขั้นสูง",
      "การผ่าตัดฉุกเฉินตลอด 24 ชั่วโมง"
    ],
    // SVG Illustration: ทีมแพทย์และพยาบาลในชุดเขียวผ่าตัดรอบโคมไฟ (สไตล์รูปที่สอง)
    iconSvg: `
      <svg width="130" height="110" viewBox="0 0 160 140" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-width: 130px; max-height: 110px; width: 100%; height: auto; display: block; margin: 0 auto;">
        <ellipse cx="80" cy="108" rx="56" ry="16" fill="#84339c" fill-opacity="0.3"/>
        <!-- โคมไฟผ่าตัดเหนือเตียง -->
        <ellipse cx="80" cy="30" rx="30" ry="8" fill="#E2E8F0" stroke="#64748B" stroke-width="2"/>
        <path d="M60 30L45 80M100 30L115 80" stroke="#FDE047" stroke-width="1.5" stroke-dasharray="3 3" opacity="0.6"/>
        <!-- แพทย์/พยาบาล 3 คนในชุดผ่าตัด -->
        <!-- คนกลาง -->
        <circle cx="80" cy="52" r="12" fill="#FED7AA"/>
        <path d="M68 48C68 40 73 38 80 38C87 38 92 40 92 48" fill="#84339c"/>
        <rect x="72" y="52" width="16" height="9" rx="3" fill="#E2E8F0"/>
        <path d="M64 68C64 64 70 62 80 62C90 62 96 64 96 68L98 94H62L64 68Z" fill="#84339c"/>
        <!-- คนซ้าย -->
        <circle cx="50" cy="58" r="10" fill="#FED7AA"/>
        <path d="M40 54C40 48 45 46 50 46C55 46 60 48 60 54" fill="#84339c"/>
        <rect x="44" y="58" width="12" height="7" rx="2" fill="#E2E8F0"/>
        <path d="M36 72C36 68 42 66 50 66C58 66 64 68 64 72L66 94H34L36 72Z" fill="#ff51a3"/>
        <!-- คนขวา -->
        <circle cx="110" cy="58" r="10" fill="#FED7AA"/>
        <path d="M100 54C100 48 105 46 110 46C115 46 120 48 120 54" fill="#84339c"/>
        <rect x="104" y="58" width="12" height="7" rx="2" fill="#E2E8F0"/>
        <path d="M96 72C96 68 102 66 110 66C118 66 124 68 124 72L126 94H94L96 72Z" fill="#ff51a3"/>
        <!-- ผ้าคลุมผ่าตัดด้านล่าง -->
        <path d="M26 94C26 88 50 86 80 86C110 86 134 88 134 94V102H26V94Z" fill="#6c2682"/>
      </svg>
    `
  },
  {
    id: 6,
    name: "กลุ่มงานการพยาบาลผู้คลอด",
    cluster: "specialty",
    clusterLabel: "บริการและตรวจรักษาพิเศษ",
    websiteUrl: "https://www.maesothospital.go.th/labor-room",
    detailUrl: "unit-detail.html?id=6",
    leader: "พว. มาลี วรรณโชติ",
    leaderPos: "หัวหน้ากลุ่มงานการพยาบาลผู้คลอด (LR)",
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80",
    phone: "1387, 1312",
    location: "อาคารเฉลิมพระเกียรติ ชั้น 3",
    hours: "เปิดบริการตลอด 24 ชั่วโมง",
    rnCount: 20,
    tnCount: 2,
    pnCount: 6,
    desc: "ให้บริการบริบาลมารดาและทารกในระยะรอคลอด คลอด และหลังคลอดทันที ด้วยความอบอุ่น ปลอดภัย และส่งเสริมการเลี้ยงลูกด้วยนมแม่",
    duties: [
      "การดูแลและเฝ้าระวังความก้าวหน้าของการคลอด (Partograph)",
      "ทำคลอดปกติและช่วยเหลือการคลอดผิดปกติร่วมกับแพทย์สูติกรรม",
      "การกู้ชีพทารกแรกเกิดในห้องคลอด (Neonatal Resuscitation)",
      "ส่งเสริมสายสัมพันธ์แม่-ลูก (Skin to Skin Contact) และการให้นมแม่"
    ],
    // SVG Illustration: รูปสรีระหญิงตั้งครรภ์และทารกในครรภ์ (สไตล์รูปที่สอง)
    iconSvg: `
      <svg width="130" height="110" viewBox="0 0 160 140" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-width: 130px; max-height: 110px; width: 100%; height: auto; display: block; margin: 0 auto;">
        <circle cx="80" cy="70" r="50" fill="#FFF7ED" opacity="0.8"/>
        <!-- สรีระหญิงตั้งครรภ์โทนสีพีช/ส้มอบอุ่น -->
        <path d="M68 28C68 22 74 18 80 18C86 18 92 22 92 28C92 34 86 38 80 38C74 38 68 34 68 28Z" fill="#FDBA74"/>
        <path d="M78 38C70 42 66 50 64 64C62 76 60 88 56 108C66 109 84 109 98 108C94 92 90 74 88 64C86 52 84 42 78 38Z" fill="#FB923C"/>
        <!-- ครรภ์กลมโต -->
        <circle cx="82" cy="74" r="24" fill="#FDBA74"/>
        <circle cx="82" cy="74" r="20" fill="#F8FAFC" fill-opacity="0.85"/>
        <!-- ทารกในครรภ์ตัวน้อย -->
        <path d="M84 64C87 64 89 66 89 69C89 72 87 74 84 74C81 74 79 72 79 69C79 66 81 64 84 64Z" fill="#F43F5E"/>
        <path d="M85 74C88 75 90 78 88 82C86 85 80 86 78 82C76 78 78 75 85 74Z" fill="#FB7185"/>
        <path d="M82 82C84 84 86 86 84 88" stroke="#FB7185" stroke-width="2" stroke-linecap="round"/>
        <!-- ดอกไม้แห่งการกำเนิด -->
        <circle cx="112" cy="45" r="4" fill="#F472B6"/>
        <circle cx="106" cy="41" r="3" fill="#F472B6"/>
        <circle cx="118" cy="41" r="3" fill="#F472B6"/>
        <circle cx="112" cy="37" r="3" fill="#FDE047"/>
      </svg>
    `
  },
  {
    id: 7,
    name: "กลุ่มงานการพยาบาลด้านการควบคุมและป้องกันการติดเชื้อ",
    cluster: "quality",
    clusterLabel: "พัฒนาคุณภาพ วิชาการ & IC",
    websiteUrl: "https://www.maesothospital.go.th/ic",
    detailUrl: "unit-detail.html?id=7",
    leader: "พว. นงลักษณ์ ชัยพฤกษ์",
    leaderPos: "หัวหน้างานพยาบาล IC (Infection Control)",
    avatar: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&auto=format&fit=crop&q=80",
    phone: "1387, 1344",
    location: "อาคารเฉลิมพระเกียรติ ชั้น 4",
    hours: "08:00 - 16:30 น.",
    rnCount: 10,
    tnCount: 1,
    pnCount: 2,
    desc: "เฝ้าระวัง ป้องกัน และควบคุมการติดเชื้อในโรงพยาบาล พร้อมส่งเสริมสุขอนามัยมือและมาตรฐานความปลอดภัยของผู้ป่วยและบุคลากร",
    duties: [
      "เฝ้าระวังการติดเชื้อในโรงพยาบาล (Hospital-Acquired Infection - HAI)",
      "กำกับดูแลมาตรฐานความสะอาดและการทำลายเชื้อ/ทำให้ปราศจากเชื้อ",
      "ส่งเสริมโครงการสุขอนามัยล้างมือ (Hand Hygiene Compliance)",
      "การรับมือและควบคุมการระบาดของโรคติดเชื้ออุบัติใหม่/อุบัติซ้ำ"
    ],
    // SVG Illustration: พยาบาลหญิงถือโล่ป้องกันเชื้อไวรัส (สไตล์รูปที่สอง)
    iconSvg: `
      <svg width="130" height="110" viewBox="0 0 160 140" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-width: 130px; max-height: 110px; width: 100%; height: auto; display: block; margin: 0 auto;">
        <!-- รัศมีแห่งความปลอดภัย -->
        <circle cx="80" cy="70" r="50" fill="#ECFDF5" opacity="0.8"/>
        <!-- บุคลากรพยาบาลด้านซ้าย -->
        <circle cx="56" cy="48" r="11" fill="#FED7AA"/>
        <path d="M48 46C48 38 52 35 58 35C64 35 66 38 66 46" fill="#1E293B"/>
        <!-- หมวกพยาบาลสีขาวแถบดำ -->
        <path d="M50 40H64L62 34H52L50 40Z" fill="#FFFFFF" stroke="#84339c" stroke-width="1.5"/>
        <line x1="53" y1="36" x2="61" y2="36" stroke="#6c2682" stroke-width="1.5"/>
        <rect x="48" y="59" width="18" height="38" rx="4" fill="#84339c"/>
        <rect x="52" y="59" width="10" height="26" fill="#FFFFFF"/>
        <!-- โล่ป้องกันเชื้อโรคขนาดใหญ่ด้านขวา -->
        <path d="M82 40H118C118 72 100 96 100 96C100 96 82 72 82 40Z" fill="#F43F5E" stroke="#BE123C" stroke-width="2.5"/>
        <path d="M88 46H112C112 68 100 86 100 86C100 86 88 68 88 46Z" fill="#FDA4AF"/>
        <!-- เชื้อไวรัสถูกโล่สกัดกั้น -->
        <circle cx="100" cy="64" r="10" fill="#881337"/>
        <circle cx="100" cy="64" r="8" fill="#E11D48"/>
        <path d="M100 52V55M100 73V76M88 64H91M109 64H112" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
        <!-- ประกายวิ้งค์ความสะอาด -->
        <path d="M124 38L126 42L130 44L126 46L124 50L122 46L118 44L122 42L124 38Z" fill="#FBBF24"/>
      </svg>
    `
  },
  {
    id: 8,
    name: "กลุ่มงานการพยาบาลผู้ป่วยหนัก",
    cluster: "critical",
    clusterLabel: "งานวิกฤต ฉุกเฉิน & ผู้ป่วยนอก",
    websiteUrl: "https://www.maesothospital.go.th/icu",
    detailUrl: "unit-detail.html?id=8",
    leader: "พว. นิภาวรรณ สมศักดิ์",
    leaderPos: "หัวหน้ากลุ่มงานการพยาบาลผู้ป่วยหนัก (ICU)",
    avatar: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&auto=format&fit=crop&q=80",
    phone: "1387, 1220",
    location: "อาคารเฉลิมพระเกียรติ ชั้น 2",
    hours: "เปิดบริการตลอด 24 ชั่วโมง",
    rnCount: 36,
    tnCount: 2,
    pnCount: 12,
    desc: "ให้บริการบริบาลผู้ป่วยวิกฤตที่มีภาวะคุกคามต่อชีวิตอย่างใกล้ชิดตลอด 24 ชม. ด้วยมอนิเตอร์และเครื่องช่วยหายใจขั้นสูง",
    duties: [
      "ติดตามสัญญาณชีพและคลื่นไฟฟ้าหัวใจอย่างต่อเนื่อง (Hemodynamic Monitoring)",
      "ดูแลผู้ป่วยที่ใช้เครื่องช่วยหายใจขั้นสูง (Mechanical Ventilator Care)",
      "การให้ยาสารน้ำและยาช่วยชีวิตความเสี่ยงสูง (High Alert Drugs)",
      "การฟื้นฟูสภาพและป้องกันภาวะแทรกซ้อนในผู้ป่วยวิกฤต"
    ],
    // SVG Illustration: จอมอนิเตอร์ผู้ป่วยหนัก คลื่นหัวใจ และเตียง ICU
    iconSvg: `
      <svg width="130" height="110" viewBox="0 0 160 140" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-width: 130px; max-height: 110px; width: 100%; height: auto; display: block; margin: 0 auto;">
        <rect x="25" y="32" width="110" height="76" rx="10" fill="#0F172A" stroke="#38BDF8" stroke-width="2.5"/>
        <rect x="33" y="40" width="94" height="60" rx="6" fill="#020617"/>
        <!-- กราฟคลื่นไฟฟ้าหัวใจสีเขียวนีออน -->
        <path d="M38 72H56L61 58L68 84L76 46L83 88L88 66L93 74H122" stroke="#22C55E" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        <!-- ตัวเลขสัญญาณชีพ -->
        <text x="104" y="55" font-family="'Prompt', sans-serif" font-size="12" font-weight="bold" fill="#38BDF8">98%</text>
        <text x="104" y="90" font-family="'Prompt', sans-serif" font-size="14" font-weight="bold" fill="#F43F5E">78</text>
        <circle cx="44" cy="48" r="3" fill="#22C55E"/>
        <!-- ฐานตั้งมอนิเตอร์ -->
        <rect x="74" y="108" width="12" height="14" fill="#475569"/>
        <rect x="58" y="120" width="44" height="6" rx="3" fill="#334155"/>
      </svg>
    `
  },
  {
    id: 9,
    name: "กลุ่มงานการพยาบาลผู้ป่วยนอก",
    cluster: "critical",
    clusterLabel: "งานวิกฤต ฉุกเฉิน & ผู้ป่วยนอก",
    websiteUrl: "https://www.maesothospital.go.th/opd",
    detailUrl: "unit-detail.html?id=9",
    leader: "พว. กัลยา นวลจันทร์",
    leaderPos: "หัวหน้ากลุ่มงานการพยาบาลผู้ป่วยนอก (OPD)",
    avatar: "https://images.unsplash.com/photo-1594824813633-5c7423010b99?w=150&auto=format&fit=crop&q=80",
    phone: "1387, 1100",
    location: "อาคารผู้ป่วยนอก ชั้น 1-2",
    hours: "08:00 - 16:00 น.",
    rnCount: 42,
    tnCount: 8,
    pnCount: 22,
    desc: "ให้บริการคัดกรอง ซักประวัติ และจัดบริการคลินิกเฉพาะทางผู้ป่วยนอกทุกแผนกอย่างรวดเร็ว ปลอดภัย และประทับใจ",
    duties: [
      "คัดกรองและประเมินอาการเบื้องต้นผู้ป่วยนอก (Primary Screening)",
      "บริการคลินิกเฉพาะทาง อายุรกรรม ศัลยกรรม กุมารเวชกรรม และสูตินรีเวช",
      "การให้คำแนะนำสุขศึกษาและการปฏิบัติตัวก่อน-หลังพบแพทย์",
      "ระบบนัดหมายออนไลน์และการจัดการคิวบริการอัจฉริยะ (Smart OPD)"
    ],
    // SVG Illustration: คลินิกผู้ป่วยนอก เคาน์เตอร์ซักประวัติและหูฟังแพทย์
    iconSvg: `
      <svg width="130" height="110" viewBox="0 0 160 140" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-width: 130px; max-height: 110px; width: 100%; height: auto; display: block; margin: 0 auto;">
        <circle cx="80" cy="70" r="50" fill="#E0F2FE" opacity="0.7"/>
        <!-- เคาน์เตอร์ตรวจผู้ป่วยนอก -->
        <rect x="34" y="74" width="92" height="36" rx="8" fill="#FFFFFF" stroke="#0284C7" stroke-width="2"/>
        <line x1="42" y1="84" x2="118" y2="84" stroke="#BAE6FD" stroke-width="2"/>
        <!-- พยาบาลต้อนรับซักประวัติ -->
        <circle cx="80" cy="50" r="14" fill="#FED7AA"/>
        <path d="M70 46C70 38 74 34 80 34C86 34 90 38 90 46" fill="#1E293B"/>
        <path d="M72 40H88L86 34H74L72 40Z" fill="#FFFFFF" stroke="#0284C7" stroke-width="1.5"/>
        <rect x="70" y="64" width="20" height="18" fill="#0284C7"/>
        <!-- หูฟังแพทย์ Stethoscope -->
        <path d="M46 54C46 64 54 72 64 72H68" stroke="#84339c" stroke-width="3" stroke-linecap="round"/>
        <circle cx="44" cy="52" r="3.5" fill="#84339c"/>
        <!-- แฟ้มประวัติผู้ป่วย -->
        <rect x="100" y="60" width="18" height="24" rx="3" fill="#F8FAFC" stroke="#64748B" stroke-width="1.5"/>
        <line x1="104" y1="66" x2="114" y2="66" stroke="#94A3B8" stroke-width="2"/>
      </svg>
    `
  },
  {
    id: 10,
    name: "กลุ่มงานการพยาบาลผู้ป่วยอายุรกรรม",
    cluster: "inpatient",
    clusterLabel: "ผู้ป่วยในตามสาขา (IPD)",
    websiteUrl: "https://www.maesothospital.go.th/med-ward",
    detailUrl: "unit-detail.html?id=10",
    leader: "พว. สุชาดา ชัยมงคล",
    leaderPos: "หัวหน้ากลุ่มงานผู้ป่วยอายุรกรรม",
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80",
    phone: "1387, 1330",
    location: "อาคารผู้ป่วยใน ชั้น 4-5",
    hours: "เปิดบริการตลอด 24 ชั่วโมง",
    rnCount: 30,
    tnCount: 4,
    pnCount: 12,
    desc: "ให้การพยาบาลผู้ป่วยในกลุ่มโรคทางอายุรกรรมทั่วไป โรคเรื้อรัง โรคหัวใจ ปอด ไต และผู้สูงอายุด้วยความเชี่ยวชาญ",
    duties: [
      "การดูแลผู้ป่วยโรคเรื้อรัง NCDs เบาหวาน ความดันโลหิตสูง โรคไตวาย",
      "การดูแลผู้ป่วยภาวะติดเชื้อในกระแสเลือดและปอดอักเสบ",
      "การให้สารน้ำ ยาปฏิชีวนะ และการควบคุมสมดุลสารน้ำในร่างกาย",
      "การวางแผนจำหน่ายผู้ป่วย (Discharge Planning) สู่การดูแลที่บ้าน"
    ],
    // SVG Illustration: แฟ้มผู้ป่วยอายุรกรรม หูฟังแพทย์ ยาแคปซูล
    iconSvg: `
      <svg width="130" height="110" viewBox="0 0 160 140" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-width: 130px; max-height: 110px; width: 100%; height: auto; display: block; margin: 0 auto;">
        <rect x="42" y="32" width="76" height="88" rx="8" fill="#FFFFFF" stroke="#84339c" stroke-width="2.5"/>
        <rect x="58" y="26" width="44" height="12" rx="4" fill="#ff51a3"/>
        <circle cx="80" cy="32" r="2.5" fill="#FFFFFF"/>
        <!-- เส้นบรรทัดประวัติ -->
        <line x1="54" y1="50" x2="106" y2="50" stroke="#6c2682" stroke-width="3" stroke-linecap="round"/>
        <line x1="54" y1="62" x2="98" y2="62" stroke="#94A3B8" stroke-width="2" stroke-linecap="round"/>
        <line x1="54" y1="72" x2="92" y2="72" stroke="#94A3B8" stroke-width="2" stroke-linecap="round"/>
        <line x1="54" y1="82" x2="84" y2="82" stroke="#94A3B8" stroke-width="2" stroke-linecap="round"/>
        <!-- ขวดน้ำเกลือ/ยา -->
        <g transform="translate(95, 68)">
          <rect x="0" y="6" width="22" height="34" rx="5" fill="#E0F2FE" stroke="#0284C7" stroke-width="1.5"/>
          <rect x="6" y="0" width="10" height="6" fill="#0284C7"/>
          <line x1="5" y1="18" x2="17" y2="18" stroke="#38BDF8" stroke-width="2"/>
        </g>
      </svg>
    `
  },
  {
    id: 11,
    name: "กลุ่มงานการพยาบาลผู้ป่วยศัลยกรรม",
    cluster: "inpatient",
    clusterLabel: "ผู้ป่วยในตามสาขา (IPD)",
    websiteUrl: "https://www.maesothospital.go.th/surg-ward",
    detailUrl: "unit-detail.html?id=11",
    leader: "พว. ปวีณา ธนกิจ",
    leaderPos: "หัวหน้ากลุ่มงานผู้ป่วยศัลยกรรม",
    avatar: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&auto=format&fit=crop&q=80",
    phone: "1387, 1340",
    location: "อาคารผู้ป่วยใน ชั้น 6",
    hours: "เปิดบริการตลอด 24 ชั่วโมง",
    rnCount: 26,
    tnCount: 3,
    pnCount: 10,
    desc: "ให้การพยาบาลผู้ป่วยก่อนและหลังการผ่าตัด การดูแลแผลผ่าตัด ท่อระบาย และการจัดการความปวดอย่างมีประสิทธิภาพ",
    duties: [
      "เตรียมความพร้อมผู้ป่วยก่อนรับการผ่าตัด (Pre-operative care)",
      "เฝ้าระวังสัญญาณชีพและภาวะแทรกซ้อนหลังผ่าตัด (Post-operative care)",
      "การดูแลแผลผ่าตัด ท่อระบาย (Drainage care) และสายสวนต่างๆ",
      "การจัดการความปวดหลังผ่าตัด (Pain Management)"
    ],
    // SVG Illustration: เครื่องมือผ่าตัด ผ้าพันแผล การเย็บแผลสมาน
    iconSvg: `
      <svg width="130" height="110" viewBox="0 0 160 140" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-width: 130px; max-height: 110px; width: 100%; height: auto; display: block; margin: 0 auto;">
        <circle cx="80" cy="70" r="48" fill="#F0FDF4" opacity="0.8"/>
        <!-- ถาดเครื่องมือศัลยกรรม -->
        <rect x="34" y="65" width="92" height="42" rx="10" fill="#E2E8F0" stroke="#64748B" stroke-width="2"/>
        <!-- มีดผ่าตัด Scalpel -->
        <g transform="rotate(-35 70 50)">
          <path d="M40 50H78L88 56L78 58H40V50Z" fill="#CBD5E1" stroke="#334155" stroke-width="1.5"/>
          <line x1="40" y1="54" x2="65" y2="54" stroke="#475569" stroke-width="2"/>
        </g>
        <!-- กรรไกรผ่าตัด Forceps -->
        <g transform="rotate(35 90 50)">
          <circle cx="106" cy="75" r="5" stroke="#334155" stroke-width="2"/>
          <circle cx="116" cy="75" r="5" stroke="#334155" stroke-width="2"/>
          <line x1="106" y1="70" x2="90" y2="40" stroke="#334155" stroke-width="2.5"/>
          <line x1="116" y1="70" x2="88" y2="40" stroke="#334155" stroke-width="2.5"/>
        </g>
        <rect x="46" y="80" width="30" height="12" rx="3" fill="#FFFFFF" stroke="#84339c" stroke-width="1.5"/>
        <line x1="52" y1="86" x2="70" y2="86" stroke="#ff51a3" stroke-width="2"/>
      </svg>
    `
  },
  {
    id: 12,
    name: "กลุ่มงานการพยาบาลผู้ป่วยสูติ-นรีเวช",
    cluster: "inpatient",
    clusterLabel: "ผู้ป่วยในตามสาขา (IPD)",
    websiteUrl: "https://www.maesothospital.go.th/obgyn-ward",
    detailUrl: "unit-detail.html?id=12",
    leader: "พว. วราภรณ์ มงคลพงษ์",
    leaderPos: "หัวหน้ากลุ่มงานสูติ-นรีเวช",
    avatar: "https://images.unsplash.com/photo-1594824813633-5c7423010b99?w=150&auto=format&fit=crop&q=80",
    phone: "1387, 1350",
    location: "อาคารผู้ป่วยใน ชั้น 3",
    hours: "เปิดบริการตลอด 24 ชั่วโมง",
    rnCount: 22,
    tnCount: 2,
    pnCount: 8,
    desc: "ให้การพยาบาลมารดาหลังคลอด ทารกแรกเกิด และสตรีที่มีปัญหาโรคทางนรีเวชกรรม ด้วยความเข้าอกเข้าใจและเป็นมิตร",
    duties: [
      "การบริบาลมารดาหลังคลอดและการประเมินการหดรัดตัวของมดลูก",
      "การดูแลทารกแรกเกิดปกติและการคัดกรองภาวะตัวเหลือง",
      "การฝึกทักษะการเลี้ยงลูกด้วยนมแม่และการดูแลสุขอนามัยทารก",
      "การพยาบาลผู้ป่วยโรคทางนรีเวชกรรมและการผ่าตัดมดลูก/รังไข่"
    ],
    // SVG Illustration: มารดาอุ้มทารกแรกเกิดในอ้อมแขนอย่างอบอุ่น
    iconSvg: `
      <svg width="130" height="110" viewBox="0 0 160 140" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-width: 130px; max-height: 110px; width: 100%; height: auto; display: block; margin: 0 auto;">
        <circle cx="80" cy="70" r="48" fill="#FDF2F8" opacity="0.8"/>
        <!-- ศีรษะและเส้นผมมารดา -->
        <circle cx="72" cy="46" r="14" fill="#FED7AA"/>
        <path d="M58 46C58 32 64 26 76 26C88 26 92 34 88 48C84 46 80 48 76 46" fill="#831843"/>
        <!-- ตัวมารดาโอบอุ้ม -->
        <path d="M60 62C56 74 62 94 66 106H98C98 90 94 74 88 64L76 68L60 62Z" fill="#F472B6"/>
        <!-- ทารกแรกเกิดในผ้าห่อสีฟ้า/ขาว -->
        <circle cx="94" cy="74" r="9" fill="#FED7AA"/>
        <path d="M90 73Q94 76 97 73" stroke="#78350F" stroke-width="1.5" stroke-linecap="round"/>
        <path d="M86 82C84 88 88 98 98 98C104 98 108 92 106 84L96 80L86 82Z" fill="#BAE6FD"/>
        <circle cx="106" cy="48" r="4" fill="#FB7185"/>
      </svg>
    `
  },
  {
    id: 13,
    name: "กลุ่มงานการพยาบาลจิตเวช",
    cluster: "inpatient",
    clusterLabel: "ผู้ป่วยในตามสาขา (IPD)",
    websiteUrl: "https://www.maesothospital.go.th/psych-ward",
    detailUrl: "unit-detail.html?id=13",
    leader: "พว. ขนิษฐา กิจเจริญ",
    leaderPos: "หัวหน้ากลุ่มงานจิตเวช",
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80",
    phone: "1387, 1370",
    location: "อาคารจิตเวชและส่งเสริมสุขภาพ",
    hours: "เปิดบริการตลอด 24 ชั่วโมง",
    rnCount: 16,
    tnCount: 2,
    pnCount: 6,
    desc: "ให้การพยาบาลบำบัดฟื้นฟูสุขภาพจิต ผู้ป่วยจิตเวช และสารเสพติด ด้วยความเคารพในศักดิ์ศรีความเป็นมนุษย์",
    duties: [
      "การดูแลและบำบัดรักษาผู้ป่วยจิตเวชเฉียบพลันและเรื้อรัง",
      "การบำบัดฟื้นฟูผู้ติดยาเสพติดและสารเสพติด (Matrix Program)",
      "การให้คำปรึกษาทางสุขภาพจิต (Psychological Counseling)",
      "การจัดกิจกรรมกลุ่มบำบัดและฟื้นฟูสมรรถภาพทางจิตสังคม"
    ],
    // SVG Illustration: สมองแห่งความสุข หัวใจแห่งความอบอุ่น และใบไม้ฟื้นฟูจิตใจ
    iconSvg: `
      <svg width="130" height="110" viewBox="0 0 160 140" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-width: 130px; max-height: 110px; width: 100%; height: auto; display: block; margin: 0 auto;">
        <circle cx="80" cy="70" r="50" fill="#FAF5FF"/>
        <!-- สมองสีม่วง/ชมพูแห่งความคิดและสติปัญญา -->
        <path d="M76 42C64 42 56 50 56 60C56 66 60 72 64 74C60 78 60 84 64 88C68 92 74 92 78 90C80 94 88 96 92 92C98 92 102 86 100 80C104 76 104 68 100 64C102 56 98 46 88 44C84 42 80 42 76 42Z" fill="#C084FC" opacity="0.6"/>
        <!-- หัวใจแห่งความเห็นอกเห็นใจ Empathy -->
        <path d="M80 54C74 44 60 48 58 60C56 72 74 84 80 88C86 84 104 72 102 60C100 48 86 44 80 54Z" fill="#9333EA"/>
        <!-- มือสองข้างประคองความรู้สึก -->
        <path d="M42 98C52 92 64 96 74 94" stroke="#A855F7" stroke-width="3" stroke-linecap="round"/>
        <path d="M118 98C108 92 96 96 86 94" stroke="#A855F7" stroke-width="3" stroke-linecap="round"/>
        <!-- ต้นอ่อนแห่งความหวัง -->
        <path d="M80 44V34M76 36C78 32 84 32 84 36" stroke="#10B981" stroke-width="2.5" stroke-linecap="round"/>
      </svg>
    `
  },
  {
    id: 14,
    name: "กลุ่มงานการพยาบาลผู้ป่วยอุบัติเหตุและแผลไหม้",
    cluster: "specialty",
    clusterLabel: "บริการและตรวจรักษาพิเศษ",
    websiteUrl: "https://www.maesothospital.go.th/burn-unit",
    detailUrl: "unit-detail.html?id=14",
    leader: "พว. ธีรนันท์ สุรเดช",
    leaderPos: "หัวหน้ากลุ่มงานอุบัติเหตุและแผลไหม้ (Burn Unit)",
    avatar: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&auto=format&fit=crop&q=80",
    phone: "1387, 1380",
    location: "อาคารอุบัติเหตุ ชั้น 3",
    hours: "เปิดบริการตลอด 24 ชั่วโมง",
    rnCount: 18,
    tnCount: 2,
    pnCount: 6,
    desc: "ให้การพยาบาลดูแลผู้ป่วยแผลไฟไหม้ น้ำร้อนลวก แผลเรื้อรัง และบาดเจ็บรุนแรง ด้วยเทคโนโลยีการทำแผลและควบคุมการติดเชื้อระดับสูง",
    duties: [
      "การประเมินและคำนวณสารน้ำในผู้ป่วยไฟไหม้น้ำร้อนลวก (Parkland Formula)",
      "การทำแผลปลอดเชื้อขั้นสูง (Advanced Wound Dressing)",
      "การฟื้นฟูสภาพและป้องกันข้อติดแข็ง (Rehabilitation & Splinting)",
      "การควบคุมและป้องกันการติดเชื้อในผู้ป่วยแผลไหม้"
    ],
    // SVG Illustration: ผ้าพันแผลสมานแผล และหยดความชุ่มชื้นฟื้นฟู
    iconSvg: `
      <svg width="130" height="110" viewBox="0 0 160 140" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-width: 130px; max-height: 110px; width: 100%; height: auto; display: block; margin: 0 auto;">
        <circle cx="80" cy="70" r="50" fill="#FFF7ED"/>
        <!-- ม้วนผ้าพันแผลเวชภัณฑ์ปลอดเชื้อ -->
        <ellipse cx="64" cy="70" rx="18" ry="24" fill="#FFFFFF" stroke="#EA580C" stroke-width="2"/>
        <ellipse cx="64" cy="70" rx="10" ry="14" fill="#FFEDD5"/>
        <path d="M64 46C86 46 112 56 118 70C122 80 114 92 96 94H64" fill="#FFFFFF" stroke="#EA580C" stroke-width="2"/>
        <line x1="80" y1="52" x2="80" y2="90" stroke="#FED7AA" stroke-width="2" stroke-dasharray="2 2"/>
        <line x1="94" y1="58" x2="94" y2="92" stroke="#FED7AA" stroke-width="2" stroke-dasharray="2 2"/>
        <!-- โล่แห่งการปกป้องแผล -->
        <circle cx="108" cy="46" r="14" fill="#84339c"/>
        <path d="M104 46L107 49L114 42" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `
  },
  {
    id: 15,
    name: "กลุ่มงานการพยาบาลผู้ป่วยออร์โธปิดิกส์",
    cluster: "specialty",
    clusterLabel: "บริการและตรวจรักษาพิเศษ",
    websiteUrl: "https://www.maesothospital.go.th/ortho-ward",
    detailUrl: "unit-detail.html?id=15",
    leader: "พว. อมรรัตน์ แก้วใส",
    leaderPos: "หัวหน้ากลุ่มงานออร์โธปิดิกส์",
    avatar: "https://images.unsplash.com/photo-1594824813633-5c7423010b99?w=150&auto=format&fit=crop&q=80",
    phone: "1387, 1390",
    location: "อาคารเฉลิมพระเกียรติ ชั้น 5",
    hours: "เปิดบริการตลอด 24 ชั่วโมง",
    rnCount: 20,
    tnCount: 2,
    pnCount: 8,
    desc: "ให้การพยาบาลผู้ป่วยกระดูกหัก ข้อเคลื่อน การผ่าตัดเปลี่ยนข้อเข่า-ข้อสะโพกเทียม และการดึงถ่วงน้ำหนักเพื่อฟื้นฟูการเคลื่อนไหว",
    duties: [
      "การดูแลผู้ป่วยใส่เฝือกและอุปกรณ์ดึงถ่วงน้ำหนัก (Traction Care)",
      "การพยาบาลผู้ป่วยผ่าตัดเปลี่ยนข้อเข่าและข้อสะโพกเทียม (Arthroplasty Care)",
      "เฝ้าระวังภาวะแทรกซ้อนหลอดเลือดดำอุดตัน (DVT Prevention)",
      "การฝึกเดินและฟื้นฟูสมรรถภาพร่างกายร่วมกับนักกายภาพบำบัด"
    ],
    // SVG Illustration: กระดูกข้อต่อ ข้อเข่า และการฟื้นฟูการเคลื่อนไหว
    iconSvg: `
      <svg width="130" height="110" viewBox="0 0 160 140" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-width: 130px; max-height: 110px; width: 100%; height: auto; display: block; margin: 0 auto;">
        <circle cx="80" cy="70" r="50" fill="#F0FDF4"/>
        <!-- โครงสร้างกระดูกข้อต่อ -->
        <!-- กระดูกท่อนบน -->
        <rect x="74" y="30" width="12" height="34" rx="6" fill="#FFFFFF" stroke="#059669" stroke-width="2"/>
        <circle cx="72" cy="34" r="7" fill="#FFFFFF" stroke="#059669" stroke-width="2"/>
        <circle cx="88" cy="34" r="7" fill="#FFFFFF" stroke="#059669" stroke-width="2"/>
        <!-- ข้อต่อกลาง Joint -->
        <ellipse cx="80" cy="68" rx="16" ry="6" fill="#34D399"/>
        <!-- กระดูกท่อนล่าง -->
        <rect x="74" y="74" width="12" height="34" rx="6" fill="#FFFFFF" stroke="#059669" stroke-width="2"/>
        <circle cx="72" cy="104" r="7" fill="#FFFFFF" stroke="#059669" stroke-width="2"/>
        <circle cx="88" cy="104" r="7" fill="#FFFFFF" stroke="#059669" stroke-width="2"/>
        <!-- วงประกายการฟื้นตัวแข็งแรง -->
        <path d="M52 68C52 52 64 42 80 42" stroke="#10B981" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="3 3"/>
        <path d="M108 68C108 84 96 94 80 94" stroke="#10B981" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="3 3"/>
      </svg>
    `
  },
  {
    id: 16,
    name: "กลุ่มงานการพยาบาลผู้ป่วยโสต ศอ นาสิก จักษุ",
    cluster: "inpatient",
    clusterLabel: "ผู้ป่วยในตามสาขา (IPD)",
    websiteUrl: "https://www.maesothospital.go.th/ent-eye",
    detailUrl: "unit-detail.html?id=16",
    leader: "พว. ดวงแข ปัญญาวงศ์",
    leaderPos: "หัวหน้ากลุ่มงาน ENT & Eye",
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80",
    phone: "1387, 1360",
    location: "อาคารเฉลิมพระเกียรติ ชั้น 6",
    hours: "เปิดบริการตลอด 24 ชั่วโมง",
    rnCount: 18,
    tnCount: 2,
    pnCount: 6,
    desc: "ให้การพยาบาลผู้ป่วยเฉพาะทาง หู คอ จมูก และตา ทั้งการผ่าตัดต้อกระจก ต้อหิน ทอนซิล และการส่องกล้องตรวจรักษา",
    duties: [
      "การดูแลผู้ป่วยก่อนและหลังผ่าตัดต้อกระจกและโรคทางตา",
      "การหยอดตา ป้ายตา และล้างตาด้วยเทคนิคปลอดเชื้อ",
      "การดูแลผู้ป่วยผ่าตัดต่อมทอนซิล และผ่าตัดไซนัสผ่านกล้อง",
      "การพยาบาลผู้ป่วยเจาะคอ (Tracheostomy Care)"
    ],
    // SVG Illustration: ดวงตาแจ่มใส และสัญลักษณ์การมองเห็น/การได้ยิน
    iconSvg: `
      <svg width="130" height="110" viewBox="0 0 160 140" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-width: 130px; max-height: 110px; width: 100%; height: auto; display: block; margin: 0 auto;">
        <circle cx="80" cy="70" r="50" fill="#F0F9FF"/>
        <!-- ดวงตาสีฟ้าสดใสแจ่มชัด -->
        <path d="M38 70C48 52 66 44 80 44C94 44 112 52 122 70C112 88 94 96 80 96C66 96 48 88 38 70Z" fill="#FFFFFF" stroke="#0284C7" stroke-width="2.5"/>
        <circle cx="80" cy="70" r="20" fill="#0284C7"/>
        <circle cx="80" cy="70" r="14" fill="#0369A1"/>
        <circle cx="80" cy="70" r="8" fill="#0C4A6E"/>
        <circle cx="76" cy="66" r="4" fill="#FFFFFF"/>
        <!-- ประกายวิสัยทัศน์คมชัด -->
        <path d="M80 32V38M80 102V108" stroke="#38BDF8" stroke-width="2" stroke-linecap="round"/>
        <path d="M128 50L122 56" stroke="#38BDF8" stroke-width="2" stroke-linecap="round"/>
      </svg>
    `
  },
  {
    id: 17,
    name: "กลุ่มงานการพยาบาลการรับบริจาค ปลูกถ่ายอวัยวะและเนื้อเยื่อ",
    cluster: "specialty",
    clusterLabel: "บริการและตรวจรักษาพิเศษ",
    websiteUrl: "https://www.maesothospital.go.th/organ-donation",
    detailUrl: "unit-detail.html?id=17",
    leader: "พว. รุ่งทิพย์ เจริญผล",
    leaderPos: "ผู้ประสานงานการปลูกถ่ายอวัยวะ (Organ Donation)",
    avatar: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&auto=format&fit=crop&q=80",
    phone: "1387, 1499",
    location: "อาคารอำนวยการ ชั้น 1",
    hours: "ประสานงานตลอด 24 ชั่วโมง",
    rnCount: 8,
    tnCount: 0,
    pnCount: 2,
    desc: "ขับเคลื่อนศูนย์รับบริจาคและปลูกถ่ายอวัยวะ สภากาชาดไทย ประสานงานทีมแพทย์ผ่าตัดเพื่อมอบชีวิตใหม่แก่เพื่อนมนุษย์",
    duties: [
      "ค้นหาและคัดกรองผู้ป่วยภาวะสมองตายที่สามารถบริจาคอวัยวะได้",
      "เจรจาสร้างความเข้าใจกับครอบครัวผู้บริจาคอวัยวะด้วยความเคารพ",
      "ประสานงานศูนย์รับบริจาคอวัยวะและดวงตาสภากาชาดไทย ตลอด 24 ชม.",
      "ดูแลผู้บริจาคอวัยวะตลอดขั้นตอนและเชิดชูเกียรติผู้บริจาค"
    ],
    // SVG Illustration: สองมือประคองหัวใจแห่งการให้ชีวิต มอบโอกาสใหม่
    iconSvg: `
      <svg width="130" height="110" viewBox="0 0 160 140" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-width: 130px; max-height: 110px; width: 100%; height: auto; display: block; margin: 0 auto;">
        <circle cx="80" cy="70" r="50" fill="#FFF1F2"/>
        <!-- หัวใจสีแดงเปล่งประกาย -->
        <path d="M80 46C72 32 54 36 52 52C50 68 74 86 80 92C86 86 110 68 108 52C106 36 88 32 80 46Z" fill="#F43F5E"/>
        <path d="M68 44C64 48 64 56 68 62" stroke="#FDA4AF" stroke-width="2" stroke-linecap="round"/>
        <!-- สองมือโอบอุ้มส่งมอบชีวิตใหม่ -->
        <path d="M42 92C54 86 66 94 76 96L80 100" stroke="#E11D48" stroke-width="3.5" stroke-linecap="round"/>
        <path d="M118 92C106 86 94 94 84 96L80 100" stroke="#E11D48" stroke-width="3.5" stroke-linecap="round"/>
        <circle cx="80" cy="28" r="3" fill="#F59E0B"/>
        <circle cx="60" cy="34" r="2.5" fill="#F59E0B"/>
        <circle cx="100" cy="34" r="2.5" fill="#F59E0B"/>
      </svg>
    `
  }
];
