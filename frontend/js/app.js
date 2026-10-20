/**
 * กลุ่มการพยาบาล โรงพยาบาลแม่สอด
 * Nursing Division, Mae Sot Hospital
 * Frontend Logic & Interactions
 */

let allFetchedPosts = [];

// ================= 1. Modern Compact Dropdown Menu & Mobile Menu =================
function toggleDropdown(menuId) {
  const currentMenu = document.getElementById(menuId);
  if (!currentMenu) return;
  const isOpen = !currentMenu.classList.contains('hidden');
  closeAllDropdowns();
  if (!isOpen) {
    currentMenu.classList.remove('hidden');
    const btn = currentMenu.previousElementSibling;
    if (btn) btn.setAttribute('aria-expanded', 'true');
  }
}

function closeAllDropdowns() {
  document.querySelectorAll('.dropdown-menu, .mega-popup').forEach(p => {
    p.classList.add('hidden');
    const btn = p.previousElementSibling;
    if (btn) btn.setAttribute('aria-expanded', 'false');
  });
}

function toggleMobileMenu() {
  const navLinks = document.querySelector('.nav-links');
  if (navLinks) {
    navLinks.classList.toggle('mobile-open');
  }
}

document.addEventListener('click', (e) => {
  if (!e.target.closest('.nav-dropdown')) {
    closeAllDropdowns();
  }
  const navLinks = document.querySelector('.nav-links');
  if (navLinks && navLinks.classList.contains('mobile-open') && !e.target.closest('.mobile-toggle-btn') && !e.target.closest('.nav-dropdown')) {
    navLinks.classList.remove('mobile-open');
  }
});

// ================= 2. วันที่ภาษาไทย & Utilities =================
function formatThaiDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;

  const thaiMonths = [
    'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
    'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'
  ];
  const day = date.getDate();
  const month = thaiMonths[date.getMonth()];
  const year = date.getFullYear() + 543; // พ.ศ.
  return `${day} ${month} ${year}`;
}

// ================= 3. ดึงข้อมูลข่าวสาร & กิจกรรมหน้าแรก พร้อมระบบแบ่งหน้า (Pagination) & ค้นหาอัจฉริยะ (Live Search) =================
const POSTS_PER_PAGE = 8;
let currentNewsPage = 1;
let currentActivityPage = 1;
let currentNewsSearch = '';
let currentActivitySearch = '';

// กรองข่าวประชาสัมพันธ์ตามคำค้นหา
function getNewsPosts() {
  let list = allFetchedPosts.filter(p => p.category === 'news');
  if (currentNewsSearch && currentNewsSearch.trim() !== '') {
    const q = currentNewsSearch.trim().toLowerCase();
    list = list.filter(p => 
      (p.title && p.title.toLowerCase().includes(q)) || 
      (p.description && p.description.toLowerCase().includes(q))
    );
  }
  return list;
}

// กรองกิจกรรมตามคำค้นหา
function getActivityPosts() {
  let list = allFetchedPosts.filter(p => p.category === 'activity');
  if (currentActivitySearch && currentActivitySearch.trim() !== '') {
    const q = currentActivitySearch.trim().toLowerCase();
    list = list.filter(p => 
      (p.title && p.title.toLowerCase().includes(q)) || 
      (p.description && p.description.toLowerCase().includes(q))
    );
  }
  return list;
}

// แปลงตัวอักษรพิเศษป้องกัน XSS
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ไฮไลท์คำค้นหาที่ตรงกันในข้อความ
function highlightKeyword(text, keyword) {
  if (!text || !keyword || keyword.trim() === '') return text;
  const escaped = keyword.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escaped})`, 'gi');
  return text.replace(regex, '<mark class="search-highlight-text">$1</mark>');
}

// จัดการค้นหาข่าวประชาสัมพันธ์ (Live Search)
function handleNewsSearch(keyword) {
  currentNewsSearch = keyword || '';
  const clearBtn = document.getElementById('btn-clear-news-search');
  const resultBar = document.getElementById('news-search-result-bar');

  if (clearBtn) {
    if (currentNewsSearch.trim() !== '') {
      clearBtn.classList.remove('hidden');
    } else {
      clearBtn.classList.add('hidden');
    }
  }

  renderNewsSection(1);

  if (resultBar) {
    if (currentNewsSearch.trim() !== '') {
      const count = getNewsPosts().length;
      resultBar.classList.remove('hidden');
      resultBar.innerHTML = `
        <div>
          <i class="fa-solid fa-magnifying-glass" style="color: var(--primary-600); margin-right: 6px;"></i>
          <span>ผลการค้นหาข่าวสำหรับ:</span> <strong class="search-highlight">"${escapeHtml(currentNewsSearch)}"</strong>
          <span>(พบทั้งหมด <strong>${count}</strong> รายการ)</span>
        </div>
        <button type="button" class="btn-reset-search-chip" onclick="clearNewsSearch()">
          <i class="fa-solid fa-xmark"></i> ล้างการค้นหา
        </button>
      `;
    } else {
      resultBar.classList.add('hidden');
      resultBar.innerHTML = '';
    }
  }
}

// ล้างคำค้นหาข่าว
function clearNewsSearch() {
  currentNewsSearch = '';
  const input = document.getElementById('news-search-input');
  const clearBtn = document.getElementById('btn-clear-news-search');
  const resultBar = document.getElementById('news-search-result-bar');

  if (input) input.value = '';
  if (clearBtn) clearBtn.classList.add('hidden');
  if (resultBar) {
    resultBar.classList.add('hidden');
    resultBar.innerHTML = '';
  }

  renderNewsSection(1);
}

// จัดการค้นหากิจกรรม (Live Search)
function handleActivitySearch(keyword) {
  currentActivitySearch = keyword || '';
  const clearBtn = document.getElementById('btn-clear-activity-search');
  const resultBar = document.getElementById('activity-search-result-bar');

  if (clearBtn) {
    if (currentActivitySearch.trim() !== '') {
      clearBtn.classList.remove('hidden');
    } else {
      clearBtn.classList.add('hidden');
    }
  }

  renderActivitySection(1);

  if (resultBar) {
    if (currentActivitySearch.trim() !== '') {
      const count = getActivityPosts().length;
      resultBar.classList.remove('hidden');
      resultBar.innerHTML = `
        <div>
          <i class="fa-solid fa-magnifying-glass" style="color: var(--primary-600); margin-right: 6px;"></i>
          <span>ผลการค้นหากิจกรรมสำหรับ:</span> <strong class="search-highlight">"${escapeHtml(currentActivitySearch)}"</strong>
          <span>(พบทั้งหมด <strong>${count}</strong> รายการ)</span>
        </div>
        <button type="button" class="btn-reset-search-chip" onclick="clearActivitySearch()">
          <i class="fa-solid fa-xmark"></i> ล้างการค้นหา
        </button>
      `;
    } else {
      resultBar.classList.add('hidden');
      resultBar.innerHTML = '';
    }
  }
}

// ล้างคำค้นหากิจกรรม
function clearActivitySearch() {
  currentActivitySearch = '';
  const input = document.getElementById('activity-search-input');
  const clearBtn = document.getElementById('btn-clear-activity-search');
  const resultBar = document.getElementById('activity-search-result-bar');

  if (input) input.value = '';
  if (clearBtn) clearBtn.classList.add('hidden');
  if (resultBar) {
    resultBar.classList.add('hidden');
    resultBar.innerHTML = '';
  }

  renderActivitySection(1);
}

async function loadDynamicPosts() {
  const newsGrid = document.getElementById('dynamic-news-grid');
  const activityGrid = document.getElementById('dynamic-activity-grid');

  try {
    const backendHost = (window.location.hostname && window.location.hostname !== '') ? window.location.hostname : 'localhost';
    const res = await fetch(`http://${backendHost}:4000/api/posts`);
    if (!res.ok) throw new Error('Network response was not ok');
    allFetchedPosts = await res.json();

    renderNewsSection(1);
    renderActivitySection(1);
  } catch (err) {
    console.warn('โหลดข้อมูลจาก API ไม่สำเร็จ (หรือเซิร์ฟเวอร์ยังไม่เปิด):', err);
    if (newsGrid) {
      newsGrid.innerHTML = `
        <div class="empty-state">
          <i class="fa-solid fa-circle-exclamation" style="color: #f59e0b;"></i>
          <p>กำลังเชื่อมต่อระบบข้อมูลข่าวสาร...</p>
        </div>
      `;
    }
    if (activityGrid) {
      activityGrid.innerHTML = `
        <div class="empty-state">
          <i class="fa-solid fa-circle-exclamation" style="color: #f59e0b;"></i>
          <p>กำลังเชื่อมต่อระบบข้อมูลกิจกรรม...</p>
        </div>
      `;
    }
  }
}

// แสดงรายการข่าวประชาสัมพันธ์ตามหน้าที่เลือก
function renderNewsSection(page = 1) {
  const newsGrid = document.getElementById('dynamic-news-grid');
  const paginationContainer = document.getElementById('news-pagination');
  if (!newsGrid) return;

  const newsList = getNewsPosts();
  currentNewsPage = page;

  if (newsList.length === 0) {
    if (currentNewsSearch.trim() !== '') {
      newsGrid.innerHTML = `
        <div class="empty-search-state">
          <i class="fa-solid fa-magnifying-glass"></i>
          <h3>ไม่พบข่าวประชาสัมพันธ์ที่ตรงกับ "${escapeHtml(currentNewsSearch)}"</h3>
          <p>ลองตรวจสอบตัวสะกด หรือค้นหาด้วยคำอื่นที่ใกล้เคียง</p>
          <button type="button" class="btn-outline" onclick="clearNewsSearch()">
            <i class="fa-solid fa-rotate-left"></i> ดูข่าวประชาสัมพันธ์ทั้งหมด
          </button>
        </div>
      `;
    } else {
      newsGrid.innerHTML = `
        <div class="empty-state">
          <i class="fa-solid fa-newspaper"></i>
          <p>ยังไม่มีข่าวประชาสัมพันธ์ในขณะนี้</p>
        </div>
      `;
    }
    if (paginationContainer) paginationContainer.innerHTML = '';
    return;
  }

  const totalPages = Math.ceil(newsList.length / POSTS_PER_PAGE);
  if (currentNewsPage > totalPages) currentNewsPage = totalPages;
  if (currentNewsPage < 1) currentNewsPage = 1;

  const startIndex = (currentNewsPage - 1) * POSTS_PER_PAGE;
  const pageItems = newsList.slice(startIndex, startIndex + POSTS_PER_PAGE);

  newsGrid.innerHTML = '';
  pageItems.forEach(item => {
    newsGrid.innerHTML += createCardHtml(item, currentNewsSearch);
  });

  if (paginationContainer) {
    paginationContainer.innerHTML = createPaginationHtml('news', totalPages, currentNewsPage);
  }

  initScrollReveal();
}

// แสดงรายการกิจกรรมและโครงการตามหน้าที่เลือก
function renderActivitySection(page = 1) {
  const activityGrid = document.getElementById('dynamic-activity-grid');
  const paginationContainer = document.getElementById('activity-pagination');
  if (!activityGrid) return;

  const activityList = getActivityPosts();
  currentActivityPage = page;

  if (activityList.length === 0) {
    if (currentActivitySearch.trim() !== '') {
      activityGrid.innerHTML = `
        <div class="empty-search-state">
          <i class="fa-solid fa-magnifying-glass"></i>
          <h3>ไม่พบกิจกรรมที่ตรงกับ "${escapeHtml(currentActivitySearch)}"</h3>
          <p>ลองตรวจสอบตัวสะกด หรือค้นหาด้วยคำอื่นที่ใกล้เคียง</p>
          <button type="button" class="btn-outline" onclick="clearActivitySearch()">
            <i class="fa-solid fa-rotate-left"></i> ดูกิจกรรมทั้งหมด
          </button>
        </div>
      `;
    } else {
      activityGrid.innerHTML = `
        <div class="empty-state">
          <i class="fa-solid fa-calendar-check"></i>
          <p>ยังไม่มีกิจกรรมในขณะนี้</p>
        </div>
      `;
    }
    if (paginationContainer) paginationContainer.innerHTML = '';
    return;
  }

  const totalPages = Math.ceil(activityList.length / POSTS_PER_PAGE);
  if (currentActivityPage > totalPages) currentActivityPage = totalPages;
  if (currentActivityPage < 1) currentActivityPage = 1;

  const startIndex = (currentActivityPage - 1) * POSTS_PER_PAGE;
  const pageItems = activityList.slice(startIndex, startIndex + POSTS_PER_PAGE);

  activityGrid.innerHTML = '';
  pageItems.forEach(item => {
    activityGrid.innerHTML += createCardHtml(item, currentActivitySearch);
  });

  if (paginationContainer) {
    paginationContainer.innerHTML = createPaginationHtml('activity', totalPages, currentActivityPage);
  }

  initScrollReveal();
}

// สร้างปุ่มเลขหน้า (1, 2, 3...) และปุ่ม ก่อนหน้า/ถัดไป
function createPaginationHtml(type, totalPages, currentPage) {
  if (totalPages <= 1) {
    return ''; // ไม่เกิน 8 รายการไม่ต้องแสดงปุ่มเปลี่ยนหน้า
  }

  let html = `<nav class="pagination-wrapper" aria-label="การแบ่งหน้า">`;

  // ปุ่มก่อนหน้า
  const isFirst = currentPage === 1;
  html += `
    <button type="button" class="pagination-btn prev-btn" ${isFirst ? 'disabled' : ''} 
      onclick="goToPage('${type}', ${currentPage - 1})" aria-label="หน้าก่อนหน้า">
      <i class="fa-solid fa-chevron-left"></i> ก่อนหน้า
    </button>
  `;

  // ปุ่มตัวเลขหน้า 1, 2, 3... เพิ่มขึ้นตามจำนวนเนื้อหา
  for (let p = 1; p <= totalPages; p++) {
    const isActive = p === currentPage;
    html += `
      <button type="button" class="pagination-btn num-btn ${isActive ? 'active' : ''}" 
        onclick="goToPage('${type}', ${p})" aria-label="หน้าที่ ${p}" ${isActive ? 'aria-current="page"' : ''}>
        ${p}
      </button>
    `;
  }

  // ปุ่มถัดไป
  const isLast = currentPage === totalPages;
  html += `
    <button type="button" class="pagination-btn next-btn" ${isLast ? 'disabled' : ''} 
      onclick="goToPage('${type}', ${currentPage + 1})" aria-label="หน้าถัดไป">
      ถัดไป <i class="fa-solid fa-chevron-right"></i>
    </button>
  `;

  html += `</nav>`;
  return html;
}

// สลับหน้าพร้อมเลื่อนหน้าจอไปยังส่วนของเนื้อหานั้น
function goToPage(type, targetPage) {
  if (type === 'news') {
    renderNewsSection(targetPage);
    const section = document.getElementById('news-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  } else if (type === 'activity') {
    renderActivitySection(targetPage);
    const section = document.getElementById('activities-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}

// สร้าง Card HTML พร้อมรองรับไฮไลท์คำค้นหา
function createCardHtml(item, searchKeyword = '') {
  const isNews = item.category === 'news';
  const categoryLabel = isNews ? 'ข่าวประชาสัมพันธ์' : 'กิจกรรม';
  const dateFormatted = formatThaiDate(item.created_at);
  const fallbackImg = isNews ? 'images/ประกาศ.png' : 'images/welcome-hero.jpg';

  const safeTitle = escapeHtml(item.title || '');
  const safeDesc = escapeHtml(item.description || '');

  const displayTitle = searchKeyword ? highlightKeyword(safeTitle, searchKeyword) : safeTitle;
  const displayDesc = searchKeyword ? highlightKeyword(safeDesc, searchKeyword) : safeDesc;

  return `
    <article class="news-card reveal-on-scroll">
      ${item.is_pinned ? `
        <div class="pinned-badge">
          <i class="fa-solid fa-thumbtack"></i> ปักหมุด
        </div>` : ''}
      <div class="card-media">
        <img src="${item.image_url || fallbackImg}" 
             alt="${safeTitle}" 
             loading="lazy"
             onerror="this.onerror=null; this.src='${fallbackImg}';">
        <span class="category-tag">${categoryLabel}</span>
      </div>
      <div class="card-body">
        <div class="card-meta">
          <span><i class="fa-regular fa-calendar"></i> ${dateFormatted}</span>
        </div>
        <h4 class="card-title">${displayTitle}</h4>
        <p class="card-text">${displayDesc}</p>
        <button type="button" class="card-link-btn" onclick="openPostDetail(event, ${item.id})">
          อ่านรายละเอียด <i class="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </article>
  `;
}

// ================= 4. เปิดดูรายละเอียดข่าว (Modal อ่านต่อ) & Photo Gallery =================
let currentModalImages = []; // รายการรูปภาพทั้งหมดของโพสต์ปัจจุบัน
let currentLightboxIndex = 0; // ลำดับรูปที่กำลังดูใน Lightbox

function openPostDetail(event, id) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }

  const post = allFetchedPosts.find(p => p.id == id);
  if (!post) return;

  const modalTitle = document.getElementById('modal-title');
  const modalImg = document.getElementById('modal-img');
  const modalGallery = document.getElementById('modal-gallery');
  const modalText = document.getElementById('modal-text');

  if (modalTitle) modalTitle.innerText = post.title;

  // รวบรวมรูปภาพทั้งหมด (ทั้งจาก gallery_urls และ image_url)
  currentModalImages = [];
  if (post.gallery_urls) {
    try {
      const parsed = JSON.parse(post.gallery_urls);
      if (Array.isArray(parsed) && parsed.length > 0) {
        currentModalImages = parsed;
      }
    } catch (e) {
      console.warn('แปลงข้อมูล gallery_urls ไม่สำเร็จ:', e);
    }
  }
  if (currentModalImages.length === 0 && post.image_url) {
    currentModalImages = [post.image_url];
  }

  // รูปภาพหน้าปกหลัก
  const fallbackImg = post.category === 'news' ? 'images/ประกาศ.png' : 'images/welcome-hero.jpg';
  const mainImgUrl = currentModalImages.length > 0 ? currentModalImages[0] : fallbackImg;
  
  if (modalImg) {
    modalImg.src = mainImgUrl;
    modalImg.onerror = () => { modalImg.src = fallbackImg; };
  }

  // แสดงแกลเลอรีรูปภาพย่อ (แบบที่ 1: Photo Grid) ถ้ามีรูปมากกว่า 1 รูป
  if (modalGallery) {
    if (currentModalImages.length > 1) {
      modalGallery.classList.remove('hidden');
      modalGallery.innerHTML = '';

      const maxThumbnails = 4; // แสดงตารางสูงสุด 4 ช่อง (ช่องที่ 4 มี +N ถ้ามีรูปเกิน)
      const displayCount = Math.min(currentModalImages.length, maxThumbnails);

      for (let i = 0; i < displayCount; i++) {
        const imgUrl = currentModalImages[i];
        const isLastThumb = (i === maxThumbnails - 1) && (currentModalImages.length > maxThumbnails);
        const remainingCount = currentModalImages.length - maxThumbnails + 1;

        const thumbItem = document.createElement('div');
        thumbItem.className = `gallery-thumb-item ${i === 0 ? 'active-thumb' : ''}`;
        thumbItem.onclick = () => openLightbox(i);

        thumbItem.innerHTML = `
          <img src="${imgUrl}" alt="รูปภาพที่ ${i + 1}" loading="lazy" onerror="this.src='${fallbackImg}'">
          ${isLastThumb ? `<div class="gallery-more-overlay">+${remainingCount} ภาพ</div>` : ''}
        `;
        modalGallery.appendChild(thumbItem);
      }
    } else {
      modalGallery.classList.add('hidden');
      modalGallery.innerHTML = '';
    }
  }

  let descHtml = `<div style="white-space: pre-wrap; line-height: 1.85;">${post.description || ''}</div>`;
  if (post.file_url) {
    descHtml += `
      <div style="margin-top: 24px; padding: 16px 20px; background: #fff7ed; border: 1.5px dashed #fb923c; border-radius: 12px;">
        <strong style="color: #c2410c; display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
          <i class="fa-solid fa-paperclip"></i> เอกสารแนบสำหรับดาวน์โหลด:
        </strong>
        <a href="${post.file_url}" target="_blank" style="display: inline-flex; align-items: center; gap: 8px; background: #ea580c; color: white; padding: 9px 18px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">
          <i class="fa-solid fa-file-pdf"></i> คลิกเพื่อเปิดดู / ดาวน์โหลดเอกสารแนบ
        </a>
      </div>
    `;
  }

  if (modalText) modalText.innerHTML = descHtml;
  
  const modal = document.getElementById('news-modal');
  if (modal) modal.classList.remove('hidden');
}

// คลิกที่รูปหลักใน Modal เพื่อเปิด Lightbox ดูรูปใหญ่
function openLightboxCurrent() {
  openLightbox(0);
}

// ================= 4.5 ระบบ Fullscreen Lightbox Viewer =================
function openLightbox(index = 0) {
  if (!currentModalImages || currentModalImages.length === 0) return;
  currentLightboxIndex = index;

  const lightbox = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const counter = document.getElementById('lightbox-counter');
  const prevBtn = document.querySelector('.lightbox-prev');
  const nextBtn = document.querySelector('.lightbox-next');

  if (lightboxImg) lightboxImg.src = currentModalImages[currentLightboxIndex];
  if (counter) counter.innerText = `${currentLightboxIndex + 1} / ${currentModalImages.length}`;

  if (prevBtn) prevBtn.disabled = currentModalImages.length <= 1;
  if (nextBtn) nextBtn.disabled = currentModalImages.length <= 1;

  if (lightbox) lightbox.classList.remove('hidden');

  // เพิ่มการรองรับกดปุ่มลูกศรบนคีย์บอร์ด
  document.removeEventListener('keydown', handleLightboxKeydown);
  document.addEventListener('keydown', handleLightboxKeydown);
}

function closeLightbox(event) {
  if (!event || event.target.id === 'lightbox-modal' || event.target.classList.contains('lightbox-close-btn') || event.key === 'Escape') {
    const lightbox = document.getElementById('lightbox-modal');
    if (lightbox) lightbox.classList.add('hidden');
    document.removeEventListener('keydown', handleLightboxKeydown);
  }
}

function prevLightboxImage(event) {
  if (event) event.stopPropagation();
  if (currentModalImages.length <= 1) return;
  currentLightboxIndex = (currentLightboxIndex - 1 + currentModalImages.length) % currentModalImages.length;
  updateLightboxView();
}

function nextLightboxImage(event) {
  if (event) event.stopPropagation();
  if (currentModalImages.length <= 1) return;
  currentLightboxIndex = (currentLightboxIndex + 1) % currentModalImages.length;
  updateLightboxView();
}

function updateLightboxView() {
  const lightboxImg = document.getElementById('lightbox-img');
  const counter = document.getElementById('lightbox-counter');
  if (lightboxImg) {
    lightboxImg.src = currentModalImages[currentLightboxIndex];
  }
  if (counter) {
    counter.innerText = `${currentLightboxIndex + 1} / ${currentModalImages.length}`;
  }
}

function handleLightboxKeydown(e) {
  if (e.key === 'Escape') closeLightbox(e);
  else if (e.key === 'ArrowLeft') prevLightboxImage();
  else if (e.key === 'ArrowRight') nextLightboxImage();
}

function closeNewsModal(event) {
  if (!event || event.target.id === 'news-modal' || event.target.closest('.btn-close-modal') || event.target.closest('.btn-back')) {
    const modal = document.getElementById('news-modal');
    if (modal) modal.classList.add('hidden');
  }
}

// ================= 5. Modal ดูทั้งหมด =================
function openAllModal(category) {
  closeAllDropdowns();
  const modal = document.getElementById('view-all-modal');
  const title = document.getElementById('all-modal-title');
  const grid = document.getElementById('all-posts-grid');
  if (!modal || !title || !grid) return;

  grid.innerHTML = '';

  if (category === 'news') {
    title.innerHTML = '<i class="fa-solid fa-bullhorn" style="color: var(--primary-600);"></i> ข่าวประชาสัมพันธ์ทั้งหมด';
    const list = allFetchedPosts.filter(p => p.category === 'news');
    if (list.length === 0) {
      grid.innerHTML = '<div class="empty-state"><p>ยังไม่มีข่าวประชาสัมพันธ์ในขณะนี้</p></div>';
    } else {
      list.forEach(item => grid.innerHTML += createCardHtml(item));
    }
  } else {
    title.innerHTML = '<i class="fa-solid fa-calendar-days" style="color: var(--primary-600);"></i> กิจกรรมทั้งหมด';
    const list = allFetchedPosts.filter(p => p.category === 'activity');
    if (list.length === 0) {
      grid.innerHTML = '<div class="empty-state"><p>ยังไม่มีกิจกรรมในขณะนี้</p></div>';
    } else {
      list.forEach(item => grid.innerHTML += createCardHtml(item));
    }
  }

  modal.classList.remove('hidden');
}

function closeAllModal(event) {
  if (!event || event.target.id === 'view-all-modal' || event.target.closest('.btn-close-modal') || event.target.closest('.btn-back')) {
    const modal = document.getElementById('view-all-modal');
    if (modal) modal.classList.add('hidden');
  }
}

// ================= 6. ตรวจสอบสถานะการล็อกอิน =================
function checkNavUserStatus() {
  const token = localStorage.getItem('nursing_token');
  const userRole = localStorage.getItem('nursing_user_role');
  const loginBtn = document.getElementById('nav-login-link');

  if (token && loginBtn) {
    if (userRole === 'developer') {
      loginBtn.innerHTML = '<i class="fa-solid fa-code"></i> เมนูผู้พัฒนา';
      loginBtn.href = 'developer.html';
    } else {
      loginBtn.innerHTML = '<i class="fa-solid fa-gear"></i> จัดการข้อมูล';
      loginBtn.href = 'admin.html';
    }
  }
}

// ================= 7. Scroll Reveal Animation =================
function initScrollReveal() {
  document.body.classList.add('js-enabled');

  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal-on-scroll').forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.reveal-on-scroll').forEach(el => {
    observer.observe(el);
  });
}

// ================= 7.5 โหลดภาพและข้อความไฮไลท์ส่วนหัวเว็บ (Hero Banner) =================
async function loadHeroBanner() {
  const heroTag = document.getElementById('hero-tag');
  const heroImg = document.getElementById('hero-img');
  const heroTitle = document.getElementById('hero-title');
  const heroSubtitle = document.getElementById('hero-subtitle');
  const heroCard = document.getElementById('hero-photo-card');

  if (!heroImg) return;

  try {
    const backendHost = (window.location.hostname && window.location.hostname !== '') ? window.location.hostname : 'localhost';
    const res = await fetch(`http://${backendHost}:4000/api/hero-banner`);
    if (!res.ok) return;
    const data = await res.json();
    if (!data) return;

    if (heroTag && data.tag) {
      heroTag.innerHTML = `<i class="fa-solid fa-award"></i> ${escapeHtml(data.tag)}`;
    }
    if (heroImg && data.image_url) {
      heroImg.src = data.image_url;
      if (data.title) heroImg.alt = data.title;
    }
    if (heroTitle && data.title) {
      heroTitle.innerText = data.title;
    }
    if (heroSubtitle && data.subtitle) {
      heroSubtitle.innerText = data.subtitle;
    }
    if (heroCard && data.link_url) {
      heroCard.style.cursor = 'pointer';
      heroCard.title = 'คลิกเพื่อดูรายละเอียด';
      heroCard.onclick = () => {
        window.location.href = data.link_url;
      };
    }
  } catch (err) {
    console.debug('ใช้รูปภาพ Hero Banner ค่าเริ่มต้น');
  }
}

// ================= 8. Initial Load =================
document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  loadHeroBanner();
  loadDynamicPosts();
  checkNavUserStatus();
});