document.addEventListener("DOMContentLoaded", () => {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projects = document.querySelectorAll('.project-card');

  // === FILTRE DES PROJETS ===
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      projects.forEach(proj => {
        if (filter === 'all' || proj.classList.contains(filter)) {
          proj.style.display = 'flex';
          setTimeout(() => proj.classList.add('show'), 50);
        } else {
          proj.style.display = 'none';
          proj.classList.remove('show');
        }
      });
    });
  });

  // === MODAL DES PROJETS ===
  const modal = document.querySelector('.project-modal');
  const modalMedia = modal.querySelector('.modal-media');
  const modalDetails = modal.querySelector('.modal-details');
  const pdfBtn = modal.querySelector('.pdf-btn');
  const githubBtn = modal.querySelector('.github-btn');
  const modalCloseBtn = modal.querySelector('.close-btn'); // ✅ renommé ici

  projects.forEach(project => {
    project.addEventListener('click', () => {
      const images = JSON.parse(project.dataset.images || "[]");
      const video = project.dataset.video;
      const pdf = project.dataset.pdf;
      const github = project.dataset.github;
      modalMedia.innerHTML = '';
      modalDetails.innerHTML = project.querySelector('.project-info').innerHTML;
      images.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        modalMedia.appendChild(img);
      });
      if (video) {
        const vid = document.createElement('video');
        vid.src = video;
        vid.controls = true;
        vid.loop = true;
        vid.autoplay = true;
        modalMedia.appendChild(vid);
      }
      pdfBtn.href = pdf || "#";
      githubBtn.href = github || "#";
      modal.style.display = 'flex';
    });
  });

  modalCloseBtn.addEventListener('click', () => modal.style.display = 'none');
  window.addEventListener('click', e => { if (e.target === modal) modal.style.display = 'none'; });

  window.addEventListener('load', () => {
    projects.forEach((proj, index) => {
      setTimeout(() => proj.classList.add('show'), index * 150);
    });
  });

  /* ===== MENU BURGER ===== */
  const burger = document.getElementById('burger');
  const navList = document.getElementById('nav-list');
  const navLinks = document.querySelectorAll('#nav-list li a');

  // Création overlay
  const overlay = document.createElement('div');
  overlay.id = 'nav-overlay';
  Object.assign(overlay.style, {
    position: 'fixed',
    inset: '0',
    background: 'rgba(0,0,0,0.45)',
    opacity: '0',
    pointerEvents: 'none',
    transition: 'opacity .35s ease',
    zIndex: '1050'
  });
  

  // Création bouton croix (renommé)
  const navCloseBtn = document.createElement('button');
  navCloseBtn.id = 'nav-close';
  navCloseBtn.setAttribute('aria-label', 'Fermer le menu');
  navCloseBtn.innerHTML = '&times;';
  Object.assign(navCloseBtn.style, {
    position: 'fixed',
    top: '18px',
    right: '18px',
    fontSize: '55px',
    color: '#ff4444',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    zIndex: '1230',
    display: 'none'
  });
  document.body.appendChild(navCloseBtn);

  function openNav() {
    navList.classList.add('show');
    burger.setAttribute('aria-expanded', 'true');
    overlay.style.pointerEvents = 'auto';
    overlay.style.opacity = '1';
    navCloseBtn.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }

  function closeNav() {
    navList.classList.remove('show');
    burger.setAttribute('aria-expanded', 'false');
    overlay.style.opacity = '0';
    overlay.style.pointerEvents = 'none';
    navCloseBtn.style.display = 'none';
    document.body.style.overflow = '';
  }

  burger.addEventListener('click', () => {
    navList.classList.contains('show') ? closeNav() : openNav();
  });

  overlay.addEventListener('click', closeNav);
  navCloseBtn.addEventListener('click', closeNav);

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      setTimeout(closeNav, 120);
    });
  });

  window.addEventListener('keydown', e => {
    if (e.key === 'Escape' && navList.classList.contains('show')) closeNav();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900 && navList.classList.contains('show')) {
      closeNav();
    }
  });
});


/* ===== TOGGLE DARK/LIGHT MODE ===== */
const toggleBtn = document.getElementById('theme-toggle');
const body = document.body;

// Charger le thème sauvegardé
if (localStorage.getItem('theme') === 'light') {
  body.classList.add('light-mode');
  toggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
}

// Clique sur le bouton
toggleBtn.addEventListener('click', () => {
  body.classList.toggle('light-mode');
  const isLight = body.classList.contains('light-mode');

  // Change l’icône
  toggleBtn.innerHTML = isLight
    ? '<i class="fa-solid fa-sun"></i>'
    : '<i class="fa-solid fa-moon"></i>';

  // Sauvegarde le choix
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
});


/* ===== GOOGLE ANALYTICS EVENTS ===== */

// 1️⃣ Suivi du téléchargement du CV
const cvBtn = document.querySelector('.btn.download');
if (cvBtn) {
  cvBtn.addEventListener('click', () => {
    gtag('event', 'download_cv', {
      event_category: 'Portfolio',
      event_label: 'CV principal',
      value: 1
    });
  });
}

// 2️⃣ Suivi du clic sur le bouton "Contactez-moi"
const contactBtn = document.querySelector('.btn.contact');
if (contactBtn) {
  contactBtn.addEventListener('click', () => {
    gtag('event', 'click_contact', {
      event_category: 'Portfolio',
      event_label: 'Bouton contact',
      value: 1
    });
  });
}

// 3️⃣ Suivi du changement de thème
toggleBtn.addEventListener('click', () => {
  const theme = body.classList.contains('light-mode') ? 'light' : 'dark';
  gtag('event', 'change_theme', {
    event_category: 'Interface',
    event_label: theme
  });
});
