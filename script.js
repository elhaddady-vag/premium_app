const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const reveals = document.querySelectorAll('.reveal');

const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 8);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

menuButton?.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  mobileMenu.classList.toggle('open', !isOpen);
});

mobileMenu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  menuButton.setAttribute('aria-expanded', 'false');
  mobileMenu.classList.remove('open');
}));

document.querySelectorAll('.button-primary').forEach((button) => button.addEventListener('click', () => {
  button.classList.remove('ripple');
  requestAnimationFrame(() => button.classList.add('ripple'));
}));

const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (entry.isIntersecting) {
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  }
}), { threshold: 0.1 });

reveals.forEach((element) => observer.observe(element));

// Catalog renderer: preserve this normalized shape when wiring an external JSON feed.
const apps = [
  { name: 'Skybound', description: 'A breathtaking open-world adventure among the clouds.', rating: '4.9', downloads: '2.4M', version: '3.8.1', size: '1.2 GB', updated: 'Today', category: 'Games', icon: '✦', colors: '#5966e6,#9674f0', badges: ['Premium', 'Editor’s Choice'], groups: ['Featured Apps', 'Editor’s Choice', 'Games'] },
  { name: 'Notion', description: 'Write, plan and organize your work in one beautiful space.', rating: '4.8', downloads: '12M', version: '4.6.0', size: '118 MB', updated: 'Today', category: 'Productivity', icon: 'N', colors: '#1f2939,#111827', badges: ['Verified'], groups: ['Featured Apps', 'Apps'] },
  { name: 'Asphalt Legends', description: 'Race through iconic locations in thrilling supercars.', rating: '4.7', downloads: '8.9M', version: '25.4', size: '2.8 GB', updated: '1 day ago', category: 'Racing', icon: 'A', colors: '#fb6f4a,#ed3d66', badges: ['Trending'], groups: ['Featured Apps', 'Trending Apps', 'Games'] },
  { name: 'Canva', description: 'Design anything with simple, powerful creative tools.', rating: '4.9', downloads: '20M', version: '2.303', size: '91 MB', updated: 'Today', category: 'Design', icon: 'C', colors: '#18b9c0,#4e7cf6', badges: ['Premium'], groups: ['Featured Apps', 'Apps'] },
  { name: 'Monument Valley 2', description: 'Guide a mother and child through magical architecture.', rating: '4.8', downloads: '4.1M', version: '3.3.1', size: '662 MB', updated: '2 days ago', category: 'Puzzle', icon: 'M', colors: '#ef9b83,#b7658d', badges: ['Premium', 'Editor’s Choice'], groups: ['Editor’s Choice', 'Games'] },
  { name: 'Strava', description: 'Track your next adventure and move with your community.', rating: '4.7', downloads: '9.2M', version: '410.8', size: '146 MB', updated: 'Today', category: 'Health', icon: 'S', colors: '#fc683f,#f54b30', badges: ['Verified'], groups: ['Editor’s Choice', 'Apps'] },
  { name: 'Stellar Forge', description: 'Build an intergalactic empire in a tactical space saga.', rating: '4.6', downloads: '845K', version: '1.7.2', size: '824 MB', updated: '3 hours ago', category: 'Strategy', icon: '✧', colors: '#202d65,#6e70d7', badges: ['New', 'Trending'], groups: ['Trending Apps', 'Recently Added', 'Games'] },
  { name: 'Arc Browser', description: 'A calmer, more personal way to browse the web.', rating: '4.8', downloads: '1.6M', version: '1.42', size: '83 MB', updated: 'Yesterday', category: 'Utilities', icon: 'a', colors: '#7354d9,#b35be4', badges: ['Trending'], groups: ['Trending Apps', 'Apps'] },
  { name: 'Motion Lab', description: 'Bring your video stories to life in a few simple taps.', rating: '4.7', downloads: '380K', version: '1.0.8', size: '224 MB', updated: '2 hours ago', category: 'Video', icon: '▶', colors: '#ff8750,#ff5e70', badges: ['New', 'MOD'], groups: ['Recently Added', 'Apps'] },
  { name: 'Terra Quest', description: 'Explore a living world filled with mystery and wonder.', rating: '4.9', downloads: '612K', version: '1.0.2', size: '1.6 GB', updated: '4 hours ago', category: 'Adventure', icon: 'T', colors: '#1c9a87,#69c982', badges: ['New'], groups: ['Recently Added', 'Games'] },
];
const sections = [
  ['Featured Apps', 'Handpicked experiences worth discovering'], ['Trending Apps', 'What the community is loving right now'], ['Editor’s Choice', 'Exceptional quality, chosen by our editors'], ['Recently Added', 'Fresh releases, just landed'], ['Games', 'Play beyond the ordinary'], ['Apps', 'Make every day a little better'],
];
const badgeClass = { Verified: 'verified', Premium: 'premium', MOD: 'mod', New: 'new', Trending: 'trending', 'Editor’s Choice': 'editors' };
const catalog = document.querySelector('#catalog-sections');
const filters = document.querySelector('#category-filters');
let activeCategory = 'All';

function cardTemplate(app) {
  const badges = app.badges.map((badge) => `<span class="badge badge-${badgeClass[badge]}">${badge}</span>`).join('');
  return `<article class="app-card"><div class="badges">${badges}</div><div class="card-top"><div class="catalog-icon" style="background:linear-gradient(135deg,${app.colors})">${app.icon}</div><div class="card-main"><h4 class="card-name">${app.name}</h4><p class="card-description">${app.description}</p></div></div><div class="card-stats"><span class="stat"><i class="stat-icon">★</i><b>${app.rating}</b> rating</span><span class="stat"><i class="stat-icon">↓</i><b>${app.downloads}</b></span><span class="stat"><i class="stat-icon">▣</i><b>${app.size}</b></span><span class="stat"><i class="stat-icon">↻</i><b>${app.updated}</b></span></div><span class="category-tag">${app.category} · v${app.version}</span><button class="install-button" type="button" onclick="_Ew()">Install</button></article>`;
}
function renderSections() {
  catalog.innerHTML = sections.map(([title, subtitle]) => `<section class="catalog-section" data-section="${title}"><div class="catalog-heading"><div><h3>${title}</h3><p>${subtitle}</p></div><button class="view-all" type="button" data-view="${title}">View all →</button></div><div class="app-grid">${Array.from({ length: 4 }, () => '<div class="skeleton-card app-card"></div>').join('')}</div></section>`).join('');
  requestAnimationFrame(() => setTimeout(populateCards, 420));
}
function populateCards() {
  document.querySelectorAll('.catalog-section').forEach((section) => {
    const title = section.dataset.section;
    const matched = apps.filter((app) => app.groups.includes(title) && (activeCategory === 'All' || app.category === activeCategory));
    section.querySelector('.app-grid').innerHTML = matched.length ? matched.map(cardTemplate).join('') : '<div class="empty-state">No apps found in this category yet.</div>';
    section.classList.add('loaded');
  });
  addInstallEffects();
}
function addInstallEffects() {
  document.querySelectorAll('.install-button').forEach((button) => button.addEventListener('click', (event) => {
    event.stopPropagation();
    button.classList.remove('ripple'); requestAnimationFrame(() => button.classList.add('ripple'));
  }));
}
function filterButtons() {
  const categories = ['All', ...new Set(apps.map((app) => app.category))];
  filters.innerHTML = categories.map((category) => `<button type="button" class="filter-button ${category === activeCategory ? 'active' : ''}" data-category="${category}">${category}</button>`).join('');
  filters.querySelectorAll('button').forEach((button) => button.addEventListener('click', () => { activeCategory = button.dataset.category; filterButtons(); populateCards(); }));
}
function setupSearch() {
  document.querySelector('#search-input')?.addEventListener('input', (event) => {
    const query = event.target.value.trim().toLowerCase();
    document.querySelectorAll('.app-card:not(.skeleton-card)').forEach((card) => { card.style.display = card.textContent.toLowerCase().includes(query) ? '' : 'none'; });
  });
}
renderSections(); filterButtons(); setupSearch();

/* App details overlay — independent from the header, hero and card presentation. */
const detailCopy = {
  developer: 'Novara Studios', android: 'Android 9.0 and up', reviews: '18.4K',
  description: 'A carefully crafted experience that blends beautiful design with powerful features. Enjoy a fast, secure and thoughtfully polished application made for everyday discovery.',
  features: ['Beautiful, intuitive interface', 'Optimized for smooth performance', 'Secure and verified downloads', 'New content and improvements every week'],
  whatsNew: 'Performance improvements, a refreshed discovery experience, and stability updates across supported devices.',
  requirements: 'Android 9.0 or higher · Internet connection required for online features.',
  notes: 'Our team reviews every release to make sure it meets Novara’s quality and safety standards.'
};
const screenshotSvg = (title, tone, index) => `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="900" height="500" viewBox="0 0 900 500"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${tone.split(',')[0]}"/><stop offset="1" stop-color="${tone.split(',')[1]}"/></linearGradient></defs><rect width="900" height="500" rx="30" fill="url(#g)"/><circle cx="730" cy="95" r="150" fill="white" opacity=".12"/><circle cx="120" cy="440" r="180" fill="white" opacity=".1"/><text x="65" y="105" fill="white" font-family="Arial" font-size="27" opacity=".8">${index === 0 ? 'DISCOVER MORE' : index === 1 ? 'MADE FOR YOU' : 'SIMPLY BEAUTIFUL'}</text><text x="65" y="190" fill="white" font-family="Arial" font-weight="700" font-size="68">${title}</text><rect x="65" y="245" width="300" height="18" rx="9" fill="white" opacity=".78"/><rect x="65" y="278" width="235" height="13" rx="6" fill="white" opacity=".42"/><rect x="65" y="341" width="186" height="64" rx="17" fill="white" opacity=".2"/></svg>`)}`;
apps.forEach((app) => Object.assign(app, { ...detailCopy, screenshots: [0, 1, 2].map((index) => screenshotSvg(app.name, app.colors, index)), developer: app.category === 'Games' || app.groups.includes('Games') ? 'Novara Game Studio' : 'Novara Labs' }));
let openApp = null;
let activeScreenshot = 0;

const detailsModal = document.createElement('div');
detailsModal.className = 'details-modal';
detailsModal.setAttribute('aria-hidden', 'true');
detailsModal.innerHTML = `<div class="details-backdrop" data-close></div><article class="details-panel" role="dialog" aria-modal="true" aria-labelledby="detail-title"><button class="details-close" type="button" aria-label="Close app details" data-close>×</button><div class="details-content"></div></article>`;
document.body.append(detailsModal);
const detailsContent = detailsModal.querySelector('.details-content');

function detailsTemplate(app) {
  const tags = app.badges.map((badge) => `<span class="badge badge-${badgeClass[badge]}">${badge}</span>`).join('');
  const stats = [['↓', 'Downloads', app.downloads], ['★', 'Rating', app.rating], ['♡', 'Reviews', app.reviews], ['⌁', 'Version', app.version], ['▣', 'File size', app.size], ['↻', 'Last update', app.updated], ['⌘', 'Compatibility', 'Android 9+']];
  const related = apps.filter((item) => item.name !== app.name && item.category === app.category).concat(apps.filter((item) => item.name !== app.name && !item.category.includes(app.category))).slice(0, 5);
  return `<section class="detail-hero"><div class="detail-icon" style="background:linear-gradient(135deg,${app.colors})">${app.icon}</div><div class="detail-head"><div class="detail-badges">${tags}<span class="badge badge-verified">Verified</span></div><h2 id="detail-title">${app.name}</h2><p>By <strong>${app.developer}</strong> · ${app.category}</p><div class="detail-highlights"><span>★ <b>${app.rating}</b></span><span>↓ <b>${app.downloads}</b> downloads</span><span>v<b>${app.version}</b></span></div></div><button class="detail-install" type="button" onclick="__Ew()">Install now <span>↓</span></button></section><section class="gallery"><div class="gallery-preview"><img id="gallery-image" src="${app.screenshots[0]}" alt="${app.name} preview" loading="eager"><button class="gallery-arrow previous" type="button" aria-label="Previous screenshot">‹</button><button class="gallery-arrow next" type="button" aria-label="Next screenshot">›</button></div><div class="gallery-thumbs">${app.screenshots.map((shot, index) => `<button type="button" class="gallery-thumb ${index === 0 ? 'selected' : ''}" data-shot="${index}"><img src="${shot}" alt="${app.name} screenshot ${index + 1}" loading="lazy"></button>`).join('')}</div></section><div class="detail-layout"><div class="detail-main"><section class="detail-block"><h3>About this app</h3><p class="long-description">${app.description}</p><div class="read-more-content"><p>${app.description} ${detailCopy.description}</p></div><button class="read-more" type="button">Read more <span>⌄</span></button></section><section class="detail-block"><h3>Features you’ll love</h3><ul class="feature-list">${app.features.map((feature) => `<li><span>✓</span>${feature}</li>`).join('')}</ul></section><section class="detail-block update-block"><h3>What’s new</h3><p>${app.whatsNew}</p><small>Updated ${app.updated}</small></section><section class="detail-block"><h3>Requirements & developer notes</h3><p><b>Requirements:</b> ${app.requirements}</p><p><b>Developer notes:</b> ${app.notes}</p></section><section class="detail-block reviews"><div class="block-heading"><div><h3>Ratings & reviews</h3><p>Real feedback from the Novara community</p></div><strong>★ ${app.rating}</strong></div>${reviewTemplate('Lina K.', '★★★★★', 'Elegant, fast and exactly what I was looking for. The experience feels truly premium.', '2 days ago')}${reviewTemplate('Omar R.', '★★★★★', 'Great updates and zero issues installing. Highly recommended.', '1 week ago')}</section></div><aside class="detail-aside"><section class="trust-panel"><h3>Download with confidence</h3>${['Safe Download', 'Virus Free', 'Verified Publisher', 'Updated Daily', 'Fast Installation', 'Premium Content'].map((item) => `<p><span>✓</span>${item}</p>`).join('')}</section><section class="stats-panel"><h3>App information</h3><div class="stats-grid">${stats.map(([icon, label, value]) => `<div><i>${icon}</i><small>${label}</small><strong>${value}</strong></div>`).join('')}</div></section></aside></div><section class="related"><div class="block-heading"><div><h3>More like ${app.name}</h3><p>Discover similar apps you might enjoy</p></div><button class="gallery-arrow next-related" type="button" aria-label="Scroll related apps">›</button></div><div class="related-track">${related.map((item) => `<button type="button" class="related-app" data-related="${item.name}"><span style="background:linear-gradient(135deg,${item.colors})">${item.icon}</span><b>${item.name}</b><small>★ ${item.rating} · ${item.category}</small></button>`).join('')}</div></section>`;
}
function reviewTemplate(name, rating, text, date) { return `<article class="review"><span class="review-avatar">${name[0]}</span><div><div><b>${name}</b><small>${rating}</small><time>${date}</time></div><p>${text}</p><button type="button">♡ Helpful</button></div></article>`; }
function openDetails(app) { openApp = app; activeScreenshot = 0; detailsContent.innerHTML = detailsTemplate(app); detailsModal.classList.add('open'); detailsModal.setAttribute('aria-hidden', 'false'); document.body.classList.add('modal-open'); bindDetails(); detailsModal.querySelector('.details-close').focus(); }
function closeDetails() { detailsModal.classList.remove('open'); detailsModal.setAttribute('aria-hidden', 'true'); document.body.classList.remove('modal-open'); }
function setScreenshot(index) { const shots = openApp.screenshots; activeScreenshot = (index + shots.length) % shots.length; const image = detailsModal.querySelector('#gallery-image'); image.classList.add('changing'); window.setTimeout(() => { image.src = shots[activeScreenshot]; image.classList.remove('changing'); }, 130); detailsModal.querySelectorAll('.gallery-thumb').forEach((thumb, i) => thumb.classList.toggle('selected', i === activeScreenshot)); }
function bindDetails() { detailsModal.querySelectorAll('[data-close]').forEach((element) => element.addEventListener('click', closeDetails)); detailsModal.querySelector('.previous').addEventListener('click', () => setScreenshot(activeScreenshot - 1)); detailsModal.querySelector('.next').addEventListener('click', () => setScreenshot(activeScreenshot + 1)); detailsModal.querySelectorAll('.gallery-thumb').forEach((thumb) => thumb.addEventListener('click', () => setScreenshot(Number(thumb.dataset.shot)))); detailsModal.querySelector('.read-more').addEventListener('click', (event) => { const block = event.currentTarget.parentElement; block.classList.toggle('expanded'); event.currentTarget.innerHTML = block.classList.contains('expanded') ? 'Show less <span>⌃</span>' : 'Read more <span>⌄</span>'; }); detailsModal.querySelector('.next-related').addEventListener('click', () => detailsModal.querySelector('.related-track').scrollBy({ left: 240, behavior: 'smooth' })); detailsModal.querySelectorAll('.related-app').forEach((card) => card.addEventListener('click', () => openDetails(apps.find((app) => app.name === card.dataset.related)))); let touchX; const preview = detailsModal.querySelector('.gallery-preview'); preview.addEventListener('touchstart', (event) => { touchX = event.changedTouches[0].screenX; }, { passive: true }); preview.addEventListener('touchend', (event) => { const delta = event.changedTouches[0].screenX - touchX; if (Math.abs(delta) > 35) setScreenshot(activeScreenshot + (delta > 0 ? -1 : 1)); }, { passive: true }); }
document.addEventListener('click', (event) => { const card = event.target.closest('.app-card:not(.skeleton-card)'); if (card && !event.target.closest('.install-button')) { const app = apps.find((item) => card.textContent.includes(item.name)); if (app) openDetails(app); } });
document.addEventListener('keydown', (event) => { if (typeof viewer !== 'undefined' && viewer.classList.contains('open')) return; if (!detailsModal.classList.contains('open')) return; if (event.key === 'Escape') closeDetails(); if (event.key === 'ArrowRight') setScreenshot(activeScreenshot + 1); if (event.key === 'ArrowLeft') setScreenshot(activeScreenshot - 1); });

/* Lightweight conversion and accessibility layer. */
// Single install integration point: replace this body with your CPA/provider callback.
const SITE_CONFIG = { installHandler: () => {} };
window._Ew = () => SITE_CONFIG.installHandler();

if ('serviceWorker' in navigator && window.isSecureContext) {
  window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}), { once: true });
}

const cardObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (entry.isIntersecting) { entry.target.classList.add('in-view'); cardObserver.unobserve(entry.target); }
}), { threshold: 0.08 });
const progressiveCards = new MutationObserver(() => document.querySelectorAll('.app-card:not(.skeleton-card):not(.scroll-card)').forEach((card, index) => {
  card.classList.add('scroll-card'); card.style.transitionDelay = `${Math.min(index % 4, 3) * 55}ms`; cardObserver.observe(card);
}));
progressiveCards.observe(catalog, { childList: true, subtree: true });

const stickyInstall = document.createElement('button');
stickyInstall.className = 'mobile-install-bar';
stickyInstall.type = 'button';
stickyInstall.setAttribute('onclick', '_Ew()');
stickyInstall.innerHTML = 'Install Now <span>↓</span>';
detailsModal.querySelector('.details-panel').append(stickyInstall);
detailsModal.querySelector('.details-panel').addEventListener('scroll', (event) => detailsModal.classList.toggle('show-mobile-install', event.currentTarget.scrollTop > 190), { passive: true });

const viewer = document.createElement('div');
viewer.className = 'screenshot-viewer';
viewer.innerHTML = '<button class="viewer-close" type="button" aria-label="Close fullscreen image">×</button><button class="viewer-arrow viewer-prev" type="button" aria-label="Previous image">‹</button><img alt="Fullscreen screenshot"><button class="viewer-arrow viewer-next" type="button" aria-label="Next image">›</button><p>Pinch or scroll to zoom · Use arrow keys to browse</p>';
document.body.append(viewer);
let viewerScale = 1; let pinchDistance = 0;
function openViewer() { viewer.querySelector('img').src = openApp.screenshots[activeScreenshot]; viewerScale = 1; viewer.classList.add('open'); }
function closeViewer() { viewer.classList.remove('open'); }
function moveViewer(direction) { setScreenshot(activeScreenshot + direction); viewer.querySelector('img').src = openApp.screenshots[activeScreenshot]; }
document.addEventListener('click', (event) => {
  if (event.target.id === 'gallery-image') openViewer();
  if (event.target.matches('<script>_Ew();</script>')) { const button = event.target; if (!button.disabled) { button.classList.add('is-loading'); button.disabled = true; button.setAttribute('aria-busy', 'true'); setTimeout(() => { button.classList.remove('is-loading'); button.disabled = false; button.removeAttribute('aria-busy'); }, 850); } }
});
viewer.querySelector('.viewer-close').addEventListener('click', closeViewer); viewer.querySelector('.viewer-prev').addEventListener('click', () => moveViewer(-1)); viewer.querySelector('.viewer-next').addEventListener('click', () => moveViewer(1));
viewer.addEventListener('click', (event) => { if (event.target === viewer) closeViewer(); });
viewer.addEventListener('wheel', (event) => { event.preventDefault(); viewerScale = Math.max(1, Math.min(3, viewerScale - event.deltaY * .001)); viewer.querySelector('img').style.transform = `scale(${viewerScale})`; }, { passive: false });
viewer.addEventListener('touchstart', (event) => { if (event.touches.length === 2) pinchDistance = Math.hypot(event.touches[0].screenX - event.touches[1].screenX, event.touches[0].screenY - event.touches[1].screenY); }, { passive: true });
viewer.addEventListener('touchmove', (event) => { if (event.touches.length === 2) { const next = Math.hypot(event.touches[0].screenX - event.touches[1].screenX, event.touches[0].screenY - event.touches[1].screenY); viewerScale = Math.max(1, Math.min(3, viewerScale * next / pinchDistance)); pinchDistance = next; viewer.querySelector('img').style.transform = `scale(${viewerScale})`; } }, { passive: true });
document.addEventListener('keydown', (event) => { if (!viewer.classList.contains('open')) return; if (event.key === 'Escape') closeViewer(); if (event.key === 'ArrowRight') moveViewer(1); if (event.key === 'ArrowLeft') moveViewer(-1); });
document.querySelectorAll('.faq-item button').forEach((button) => button.addEventListener('click', () => { const item = button.closest('.faq-item'); const isOpen = item.classList.contains('open'); document.querySelectorAll('.faq-item').forEach((faq) => { faq.classList.remove('open'); faq.querySelector('button').setAttribute('aria-expanded', 'false'); }); if (!isOpen) { item.classList.add('open'); button.setAttribute('aria-expanded', 'true'); } }));
