document.addEventListener("DOMContentLoaded", () => {
// Animation simple fade-in quand on scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.competence-card, .logiciel-card').forEach(el => {
  el.classList.add('invisible');
  observer.observe(el);
});

// Ajouter la classe CSS
document.querySelectorAll('.invisible').forEach(el => {
  el.classList.add('fade-in');
});





  // Création des orbes
  const body = document.querySelector("body");
  const background = document.createElement("div");
  background.classList.add("background-animation");
  background.innerHTML = `
    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>
    <div class="orb orb-3"></div>
  `;
  body.prepend(background);

  // Animation d'arrivée du contenu
  const page = document.querySelector(".competences-page");
  setTimeout(() => {
    page.classList.add("visible");
  }, 100); // délai court pour déclencher l'animation
});

/* ===== Menu burger ===== */
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

  // Création bouton croix
  const closeBtn = document.createElement('button');
  closeBtn.id = 'nav-close';
  closeBtn.setAttribute('aria-label', 'Fermer le menu');
  closeBtn.innerHTML = '&times;';
  Object.assign(closeBtn.style, {
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
  document.body.appendChild(closeBtn);

// Fonction ouvrir menu
  function openNav() {
    navList.classList.add('show');
    burger.setAttribute('aria-expanded', 'true');
    overlay.style.pointerEvents = 'auto';
    overlay.style.opacity = '1';
    closeBtn.style.display = 'block';
    
    document.body.style.overflow = 'hidden'; // bloque scroll
  }

  // Fonction fermer menu
  function closeNav() {
    navList.classList.remove('show');
    burger.setAttribute('aria-expanded', 'false');
    overlay.style.opacity = '0';
    overlay.style.pointerEvents = 'none';
    closeBtn.style.display = 'none';
    document.body.style.overflow = ''; // restore scroll
  }

  // Toggle menu via burger
  burger.addEventListener('click', () => {
    navList.classList.contains('show') ? closeNav() : openNav();
  });

  // Fermer via overlay ou croix
  overlay.addEventListener('click', closeNav);
  closeBtn.addEventListener('click', closeNav);

  // Fermer lorsqu'on clique sur un lien
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      setTimeout(closeNav, 120); // délai pour que navigation commence
    });
  });

   // Fermer menu avec touche Esc
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navList.classList.contains('show')) closeNav();
  });

  // Fermer menu si resize > 900px
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900 && navList.classList.contains('show')) {
      closeNav();
    }
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

  // Changer l’icône
  toggleBtn.innerHTML = isLight
    ? '<i class="fa-solid fa-sun"></i>'
    : '<i class="fa-solid fa-moon"></i>';

  // Sauvegarder la préférence
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
});


/* ===== PAGINATION NUMÉRIQUE AVEC SLIDE ===== */
const logiciels = document.querySelectorAll('.logiciel-card');
const logicielsParPage = 8;
let pageActuelle = 1;

const totalPages = Math.ceil(logiciels.length / logicielsParPage);
const prevBtn = document.getElementById('prevPage');
const nextBtn = document.getElementById('nextPage');
const pageNumbersContainer = document.getElementById('pageNumbers');

// Créer les boutons de page
for (let i = 1; i <= totalPages; i++) {
  const btn = document.createElement('button');
  btn.classList.add('page-number');
  btn.textContent = i;
  if (i === 1) btn.classList.add('active');
  btn.addEventListener('click', () => changerDePage(i));
  pageNumbersContainer.appendChild(btn);
}

function afficherPage(page, direction = 'right') {
  logiciels.forEach((card, index) => {
    const debut = (page - 1) * logicielsParPage;
    const fin = page * logicielsParPage;

    if (index >= debut && index < fin) {
      card.style.display = 'block';
      card.classList.remove('slide-left', 'slide-right', 'show');
      // Retarde légèrement pour effet fluide
      setTimeout(() => {
        card.classList.add('show', direction === 'right' ? 'slide-right' : 'slide-left');
      }, 50);
    } else {
      card.style.display = 'none';
    }
  });

  // Gestion des boutons
  prevBtn.disabled = page === 1;
  nextBtn.disabled = page === totalPages;

  // Actualiser les numéros actifs
  document.querySelectorAll('.page-number').forEach((btn, i) => {
    btn.classList.toggle('active', i + 1 === page);
  });
}

function changerDePage(page) {
  const direction = page > pageActuelle ? 'right' : 'left';
  pageActuelle = page;
  afficherPage(pageActuelle, direction);
}

prevBtn.addEventListener('click', () => {
  if (pageActuelle > 1) {
    pageActuelle--;
    afficherPage(pageActuelle, 'left');
  }
});

nextBtn.addEventListener('click', () => {
  if (pageActuelle < totalPages) {
    pageActuelle++;
    afficherPage(pageActuelle, 'right');
  }
});

// Premier affichage
afficherPage(pageActuelle);


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
