document.addEventListener("DOMContentLoaded", () => {

  // ===== MENU + =====
  const plusBtn = document.getElementById("plusBtn");
  const menuOptions = document.getElementById("menuOptions");

  if (plusBtn && menuOptions) {
    // Quand on clique sur le bouton +
    plusBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      menuOptions.classList.toggle("active");
      plusBtn.classList.toggle("open");
    });

    // Fermer le menu si on clique ailleurs
    document.addEventListener("click", (e) => {
      if (!menuOptions.contains(e.target) && !plusBtn.contains(e.target)) {
        menuOptions.classList.remove("active");
        plusBtn.classList.remove("open");
      }
    });

    // Fermer aussi quand la souris quitte le menu
    const actionMenu = document.querySelector(".action-menu");
    if (actionMenu) {
      actionMenu.addEventListener("mouseleave", () => {
        menuOptions.classList.remove("active");
        plusBtn.classList.remove("open");
      });
    }
  }

  // ===== APPARITION AU SCROLL =====
  const fadeElems = document.querySelectorAll(".fade-up, .fade-in-left, .fade-in-right, .fade-in-top");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, { threshold: 0.2 });

  fadeElems.forEach(el => observer.observe(el));

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

});



// Fermer le menu quand on clique n'importe où en dehors du menu, burger ou croix
document.addEventListener('click', (e) => {
  if (navList.classList.contains('show')) {
    if (!navList.contains(e.target) && e.target !== burger && e.target !== closeBtn) {
      closeNav();
    }
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