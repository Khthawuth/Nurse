/**
 * กลุ่มการพยาบาล โรงพยาบาลแม่สอด
 * Nursing Division, Mae Sot Hospital
 * Frontend Logic & Interactions (Modern Healthcare Edition)
 */

let allFetchedPosts = [];

// ================= 0. Dynamic API Base URL Configuration =================
function getApiBaseUrl() {
  const host = window.location.hostname;
  // ถ้าทำงานบนเครื่อง Localhost ให้ชี้ไปที่พอร์ต 4000
  if (host === 'localhost' || host === '127.0.0.1') {
    return 'http://localhost:4000/api';
  }
  // ถ้าอยู่บนเซิร์ฟเวอร์จริง (Plesk / Domain) ให้ใช้ Relative Path ตรงๆ
  return '/api';
}

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

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function highlightKeyword(text, keyword) {
  if (!text || !keyword || keyword.trim() === '') return text;
  const escaped = keyword.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escaped})`, 'gi');
  return text.replace(regex, '<mark class="search-highlight-text">$1</mark>');
}

// ================= 3. ดึงข้อมูลข่าวสาร & กิจกรรมหน้าแรก =================
const POSTS_PER_PAGE = 8;
let currentNewsPage = 1;
let currentActivityPage = 1;
let currentNewsSearch = '';
let currentActivitySearch = '';

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
    const apiUrl = `${getApiBaseUrl()}/posts`;
    const res = await fetch(apiUrl);
    if (!res.ok) throw new Error('Network response was not ok');
    allFetchedPosts = await res.json();

    renderNewsSection(1);
    renderActivitySection(1);
  } catch (err) {
    console.warn('โหลดข้อมูลจาก API ไม่สำเร็จ:', err);
    if (newsGrid) {
      newsGrid.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1; text-align: center; padding: 40px 20px;">
          <i class="fa-solid fa-circle-exclamation" style="color: #f59e0b; font-size: 32px; margin-bottom: 12px; display: block;"></i>
          <p style="color: #64748b;">กำลังเชื่อมต่อระบบฐานข้อมูลข่าวสาร...</p>
        </div>
      `;
    }
    if (activityGrid) {
      activityGrid.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1; text-align: center; padding: 40px 20px;">
          <i class="fa-solid fa-circle-exclamation" style="color: #f59e0b; font-size: 32px; margin-bottom: 12px; display: block;"></i>
          <p style="color: #64748b;">กำลังเชื่อมต่อระบบฐานข้อมูลกิจกรรม...</p>
        </div>
      `;
    }
  }
}

function renderNewsSection(page = 1) {
  const newsGrid = document.getElementById('dynamic-news-grid');
  const paginationContainer = document.getElementById('news-pagination');
  if (!newsGrid) return;

  const newsList = getNewsPosts();
  currentNewsPage = page;

  if (newsList.length === 0) {
    if (currentNewsSearch.trim() !== '') {
      newsGrid.innerHTML = `
        <div class="empty-search-state" style="grid-column: 1 / -1; text-align: center; padding: 40px 20px;">
          <i class="fa-solid fa-magnifying-glass" style="font-size: 32px; color: #cbd5e1; margin-bottom: 10px; display: block;"></i>
          <h3 style="color: #0f172a; margin-bottom: 6px;">ไม่พบข่าวประชาสัมพันธ์ที่ตรงกับ "${escapeHtml(currentNewsSearch)}"</h3>
          <p style="color: #64748b; margin-bottom: 16px;">ลองตรวจสอบตัวสะกด หรือค้นหาด้วยคำอื่น</p>
          <button type="button" class="btn-outline" onclick="clearNewsSearch()">
            <i class="fa-solid fa-rotate-left"></i> ดูข่าวประชาสัมพันธ์ทั้งหมด
          </button>
        </div>
      `;
    } else {
      newsGrid.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1; text-align: center; padding: 40px 20px;">
          <i class="fa-solid fa-newspaper" style="font-size: 32px; color: #cbd5e1; margin-bottom: 10px; display: block;"></i>
          <p style="color: #64748b;">ยังไม่มีข่าวประชาสัมพันธ์ในขณะนี้</p>
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
  pageItems.forEach((item, index) => {
    newsGrid.innerHTML += createCardHtml(item, currentNewsSearch, index);
  });

  if (paginationContainer) {
    paginationContainer.innerHTML = createPaginationHtml('news', totalPages, currentNewsPage);
  }

  initScrollReveal();
}

function renderActivitySection(page = 1) {
  const activityGrid = document.getElementById('dynamic-activity-grid');
  const paginationContainer = document.getElementById('activity-pagination');
  if (!activityGrid) return;

  const activityList = getActivityPosts();
  currentActivityPage = page;

  if (activityList.length === 0) {
    if (currentActivitySearch.trim() !== '') {
      activityGrid.innerHTML = `
        <div class="empty-search-state" style="grid-column: 1 / -1; text-align: center; padding: 40px 20px;">
          <i class="fa-solid fa-magnifying-glass" style="font-size: 32px; color: #cbd5e1; margin-bottom: 10px; display: block;"></i>
          <h3 style="color: #0f172a; margin-bottom: 6px;">ไม่พบกิจกรรมที่ตรงกับ "${escapeHtml(currentActivitySearch)}"</h3>
          <p style="color: #64748b; margin-bottom: 16px;">ลองตรวจสอบตัวสะกด หรือค้นหาด้วยคำอื่น</p>
          <button type="button" class="btn-outline" onclick="clearActivitySearch()">
            <i class="fa-solid fa-rotate-left"></i> ดูกิจกรรมทั้งหมด
          </button>
        </div>
      `;
    } else {
      activityGrid.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1; text-align: center; padding: 40px 20px;">
          <i class="fa-solid fa-calendar-check" style="font-size: 32px; color: #cbd5e1; margin-bottom: 10px; display: block;"></i>
          <p style="color: #64748b;">ยังไม่มีกิจกรรมในขณะนี้</p>
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
  pageItems.forEach((item, index) => {
    activityGrid.innerHTML += createCardHtml(item, currentActivitySearch, index);
  });

  if (paginationContainer) {
    paginationContainer.innerHTML = createPaginationHtml('activity', totalPages, currentActivityPage);
  }

  initScrollReveal();
}

function createPaginationHtml(type, totalPages, currentPage) {
  if (totalPages <= 1) return '';

  let html = `<nav class="pagination-wrapper" aria-label="การแบ่งหน้า" style="display:flex; justify-content:center; gap:8px; margin-top:30px;">`;

  const isFirst = currentPage === 1;
  html += `
    <button type="button" class="pagination-btn prev-btn" ${isFirst ? 'disabled' : ''} 
      onclick="goToPage('${type}', ${currentPage - 1})" aria-label="หน้าก่อนหน้า">
      <i class="fa-solid fa-chevron-left"></i> ก่อนหน้า
    </button>
  `;

  for (let p = 1; p <= totalPages; p++) {
    const isActive = p === currentPage;
    html += `
      <button type="button" class="pagination-btn num-btn ${isActive ? 'active' : ''}" 
        onclick="goToPage('${type}', ${p})" aria-label="หน้าที่ ${p}" ${isActive ? 'aria-current="page"' : ''}>
        ${p}
      </button>
    `;
  }

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

function goToPage(type, targetPage) {
  if (type === 'news') {
    renderNewsSection(targetPage);
    const section = document.getElementById('news-section');
    if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else if (type === 'activity') {
    renderActivitySection(targetPage);
    const section = document.getElementById('activities-section');
    if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function createCardHtml(item, searchKeyword = '', index = 0) {
  const isNews = item.category === 'news';
  const categoryLabel = isNews ? 'ข่าวประชาสัมพันธ์' : 'กิจกรรม';
  const dateFormatted = formatThaiDate(item.created_at);
  const fallbackImg = isNews ? 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=500&auto=format&fit=crop&q=80' : 'images/welcome-hero.jpg';

  const safeTitle = escapeHtml(item.title || '');
  const safeDesc = escapeHtml(item.description || '');

  const displayTitle = searchKeyword ? highlightKeyword(safeTitle, searchKeyword) : safeTitle;
  const displayDesc = searchKeyword ? highlightKeyword(safeDesc, searchKeyword) : safeDesc;

  const delaySec = ((index % 4) * 0.08).toFixed(2);

  return `
    <article class="news-card reveal-bounce" style="animation-delay: ${delaySec}s;">
      ${item.is_pinned ? `
        <div class="pinned-badge" style="position:absolute; top:12px; left:12px; background:#ea580c; color:#fff; font-size:11px; font-weight:700; padding:3px 10px; border-radius:50px; z-index:2; box-shadow:0 2px 6px rgba(0,0,0,0.2);">
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

// ================= 4. Modal อ่านต่อ & Photo Gallery =================
let currentModalImages = [];
let currentLightboxIndex = 0;

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

  const fallbackImg = post.category === 'news' ? 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&auto=format&fit=crop&q=80' : 'images/welcome-hero.jpg';
  const mainImgUrl = currentModalImages.length > 0 ? currentModalImages[0] : fallbackImg;

  if (modalImg) {
    modalImg.src = mainImgUrl;
    modalImg.onerror = () => { modalImg.src = fallbackImg; };
  }

  if (modalGallery) {
    if (currentModalImages.length > 1) {
      modalGallery.classList.remove('hidden');
      modalGallery.innerHTML = '';

      const maxThumbnails = 4;
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

  let descHtml = `<div style="white-space: pre-wrap; line-height: 1.85;">${escapeHtml(post.description || '')}</div>`;
  if (post.file_url) {
    descHtml += `
      <div style="margin-top: 24px; padding: 16px 20px; background: #fff7ed; border: 1.5px dashed #fb923c; border-radius: 12px;">
        <strong style="color: #c2410c; display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
          <i class="fa-solid fa-paperclip"></i> เอกสารแนบสำหรับดาวน์โหลด:
        </strong>
        <a href="${post.file_url}" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; gap: 8px; background: #ea580c; color: white; padding: 9px 18px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">
          <i class="fa-solid fa-file-pdf"></i> คลิกเพื่อเปิดดู / ดาวน์โหลดเอกสารแนบ
        </a>
      </div>
    `;
  }

  if (modalText) modalText.innerHTML = descHtml;

  const modal = document.getElementById('news-modal');
  if (modal) modal.classList.remove('hidden');
}

function openLightboxCurrent() {
  openLightbox(0);
}

// ================= 4.5 Fullscreen Lightbox Viewer =================
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

// ================= 5. ดูทั้งหมด =================
function openAllModal(category) {
  closeAllDropdowns();
  const targetCategory = category === 'activity' ? 'activity' : 'news';
  window.location.href = `all-posts.html?type=${targetCategory}`;
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
  const loginBtn = document.getElementById('nav-login-link');

  if (token && loginBtn) {
    loginBtn.innerHTML = '<i class="fa-solid fa-gauge-high"></i> จัดการข้อมูล (Admin)';
    loginBtn.href = 'admin.html';
  }
}

// ================= 7. Scroll Reveal & Interaction =================
let scrollRevealObserver = null;

function initScrollReveal() {
  document.body.classList.add('js-enabled');
  const selector = '.reveal-on-scroll, .reveal-bounce, .reveal-scale, .reveal-stagger';

  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll(selector).forEach(el => el.classList.add('is-visible'));
    return;
  }

  if (!scrollRevealObserver) {
    scrollRevealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        } else if (entry.boundingClientRect.top > (window.innerHeight || document.documentElement.clientHeight)) {
          entry.target.classList.remove('is-visible');
        }
      });
    }, {
      threshold: 0.05,
      rootMargin: '0px 0px -20px 0px'
    });
  }

  document.querySelectorAll(selector).forEach(el => {
    scrollRevealObserver.observe(el);
  });
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function initScrollInteractions() {
  const progressBar = document.getElementById('scroll-progress-bar');
  const backToTopBtn = document.getElementById('back-to-top-btn');

  const onScroll = () => {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    if (progressBar) {
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      progressBar.style.width = scrolled + '%';
    }

    if (backToTopBtn) {
      if (winScroll > 320) {
        backToTopBtn.classList.add('is-visible');
      } else {
        backToTopBtn.classList.remove('is-visible');
      }
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ================= 7.5 ระบบสไลเดอร์แบนเนอร์หน้าแรก (Hero Carousel) =================
let heroCurrentSlide = 0;
let heroSlideCount = 0;
let heroAutoSlideTimer = null;
let heroBannersData = [];

async function loadHeroBannerSlider() {
  const track = document.getElementById('hero-carousel-track');
  if (!track) return;

  try {
    const apiUrl = `${getApiBaseUrl()}/hero-banners`;
    const res = await fetch(apiUrl);
    if (res.ok) {
      const banners = await res.json();
      if (Array.isArray(banners) && banners.length > 0) {
        heroBannersData = banners;
      }
    }
  } catch (err) {
    console.debug('โหลดแบนเนอร์จาก API ไม่สำเร็จ ใช้ค่าเริ่มต้น:', err);
  }

  if (!heroBannersData || heroBannersData.length === 0) {
    heroBannersData = [
      {
        id: 1,
        title: '',
        subtitle: '',
        image_url: 'images/welcome-hero.jpg',
        link_url: ''
      }
    ];
  }

  renderHeroSlides(heroBannersData);
  setupHeroCarouselControls();
}

function renderHeroSlides(banners) {
  const track = document.getElementById('hero-carousel-track');
  const dotsContainer = document.getElementById('hero-carousel-dots');
  const prevBtn = document.getElementById('hero-carousel-prev');
  const nextBtn = document.getElementById('hero-carousel-next');

  if (!track) return;

  heroSlideCount = banners.length;
  heroCurrentSlide = 0;

  track.innerHTML = banners.map((b, idx) => {
    const hasLink = b.link_url && b.link_url.trim() !== '';
    const clickAttr = hasLink ? `onclick="window.location.href='${escapeHtml(b.link_url)}'"` : '';
    const classHasLink = hasLink ? 'has-link' : '';

    const hasCaption = (b.title && b.title.trim()) || (b.subtitle && b.subtitle.trim());
    let captionHtml = '';
    if (hasCaption) {
      captionHtml = `
        <div class="hero-slide-caption">
          ${b.tag ? `<span class="hero-slide-tag"><i class="fa-solid fa-award"></i> ${escapeHtml(b.tag)}</span>` : ''}
          ${b.title ? `<h2 class="hero-slide-title">${escapeHtml(b.title)}</h2>` : ''}
          ${b.subtitle ? `<p class="hero-slide-subtitle">${escapeHtml(b.subtitle)}</p>` : ''}
        </div>
      `;
    }

    return `
      <div class="hero-slide ${classHasLink}" ${clickAttr} role="group" aria-roledescription="slide" aria-label="สไลด์ที่ ${idx + 1} จาก ${banners.length}">
        <img src="${escapeHtml(b.image_url)}" alt="${escapeHtml(b.title || 'แบนเนอร์ประชาสัมพันธ์ โรงพยาบาลแม่สอด')}" class="hero-slide-img" onerror="this.src='images/welcome-hero.jpg'">
        ${captionHtml}
      </div>
    `;
  }).join('');

  if (dotsContainer) {
    if (heroSlideCount <= 1) {
      dotsContainer.classList.add('hidden');
    } else {
      dotsContainer.classList.remove('hidden');
      dotsContainer.innerHTML = banners.map((_, idx) => `
        <button type="button" class="hero-dot ${idx === 0 ? 'active' : ''}" onclick="goToHeroSlide(${idx})" aria-label="ไปยังสไลด์ที่ ${idx + 1}"></button>
      `).join('');
    }
  }

  if (prevBtn && nextBtn) {
    if (heroSlideCount <= 1) {
      prevBtn.classList.add('hidden');
      nextBtn.classList.add('hidden');
    } else {
      prevBtn.classList.remove('hidden');
      nextBtn.classList.remove('hidden');
    }
  }

  updateHeroCarouselView();
}

function updateHeroCarouselView() {
  const track = document.getElementById('hero-carousel-track');
  const dots = document.querySelectorAll('.hero-dot');
  const slides = document.querySelectorAll('.hero-slide');

  if (track) {
    track.style.transform = `translateX(-${heroCurrentSlide * 100}%)`;
  }

  slides.forEach((slide, idx) => {
    if (idx === heroCurrentSlide) {
      slide.classList.add('active');
    } else {
      slide.classList.remove('active');
    }
  });

  dots.forEach((dot, idx) => {
    if (idx === heroCurrentSlide) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

function moveHeroSlide(direction) {
  if (heroSlideCount <= 1) return;
  heroCurrentSlide = (heroCurrentSlide + direction + heroSlideCount) % heroSlideCount;
  updateHeroCarouselView();
  restartHeroAutoSlide();
}

function goToHeroSlide(index) {
  if (index < 0 || index >= heroSlideCount) return;
  heroCurrentSlide = index;
  updateHeroCarouselView();
  restartHeroAutoSlide();
}

function startHeroAutoSlide() {
  if (heroSlideCount <= 1) return;
  stopHeroAutoSlide();
  heroAutoSlideTimer = setInterval(() => {
    heroCurrentSlide = (heroCurrentSlide + 1) % heroSlideCount;
    updateHeroCarouselView();
  }, 5000);
}

function stopHeroAutoSlide() {
  if (heroAutoSlideTimer) {
    clearInterval(heroAutoSlideTimer);
    heroAutoSlideTimer = null;
  }
}

function restartHeroAutoSlide() {
  stopHeroAutoSlide();
  startHeroAutoSlide();
}

function setupHeroCarouselControls() {
  const container = document.getElementById('hero-carousel-card');
  if (!container) return;

  container.addEventListener('mouseenter', stopHeroAutoSlide);
  container.addEventListener('mouseleave', startHeroAutoSlide);

  let touchStartX = 0;
  let touchEndX = 0;

  container.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  container.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        moveHeroSlide(1);
      } else {
        moveHeroSlide(-1);
      }
    }
  }, { passive: true });

  startHeroAutoSlide();
}

// ================= 8. Initial Load =================
document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initScrollInteractions();
  loadHeroBannerSlider();
  loadDynamicPosts();
  checkNavUserStatus();

  document.querySelectorAll('.subpage-nav-tabs .subpage-tab-link[href^="#"]').forEach(tab => {
    tab.addEventListener('click', function () {
      document.querySelectorAll('.subpage-nav-tabs .subpage-tab-link[href^="#"]').forEach(t => t.classList.remove('active'));
      this.classList.add('active');
    });
  });
});