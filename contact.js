document.addEventListener("DOMContentLoaded", () => {

  // ===== EmailJS Configuration =====
  const EMAILJS_PUBLIC_KEY  = "MGRAzqCWQKugzTwlT";
  const EMAILJS_SERVICE_ID  = "service_jfs4gg6";
  const EMAILJS_TEMPLATE_ID = "template_jgegb2a";

  // Vérifie que le SDK est bien chargé
  if (typeof emailjs === "undefined") {
    console.error("❌ EmailJS SDK introuvable. Vérifie la balise <script> du CDN EmailJS.");
    return;
  }

  emailjs.init(EMAILJS_PUBLIC_KEY);

  // ===== Formulaire de contact =====
  const form = document.getElementById("contact-form");
  const sendBtn = document.getElementById("sendBtn");
  const msgSuccess = document.getElementById("msg-success");
  const msgError = document.getElementById("msg-error");

  let sending = false;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (sending) return;

    const name = form.from_name.value.trim();
    const email = form.from_email.value.trim();
    const subject = form.subject.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !subject || !message) {
      msgError.textContent = "Merci de remplir tous les champs.";
      showMessage(msgError);
      return;
    }

    sending = true;
    sendBtn.disabled = true;
    sendBtn.style.opacity = "0.7";
    sendBtn.querySelector(".btn-text").textContent = "Envoi en cours...";

    emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form, EMAILJS_PUBLIC_KEY)
      .then(() => {
        showMessage(msgSuccess);
        form.reset();
      })
      .catch((err) => {
        console.error("❌ EmailJS error:", err);
        msgError.textContent = "Oups — une erreur est survenue. Réessaie ou contacte-moi via LinkedIn.";
        showMessage(msgError);
      })
      .finally(() => {
        sending = false;
        sendBtn.disabled = false;
        sendBtn.style.opacity = "1";
        sendBtn.querySelector(".btn-text").textContent = "Envoyer le message";
      });
  });

  // ===== Affichage message de feedback =====
  function showMessage(el) {
    msgSuccess.style.display = "none";
    msgError.style.display = "none";
    el.style.display = "inline-flex";
    el.classList.add("is-visible");
    setTimeout(() => el.classList.remove("is-visible"), 4500);
  }

  // ===== Menu burger =====
  const burger = document.getElementById('burger');
  const navList = document.getElementById('nav-list');
  const navLinks = document.querySelectorAll('#nav-list li a');

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
  document.body.appendChild(overlay);

  const closeBtn = document.createElement('button');
  closeBtn.id = 'nav-close';
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

  function openNav() {
    navList.classList.add('show');
    burger.setAttribute('aria-expanded', 'true');
    overlay.style.pointerEvents = 'auto';
    overlay.style.opacity = '1';
    closeBtn.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }

  function closeNav() {
    navList.classList.remove('show');
    burger.setAttribute('aria-expanded', 'false');
    overlay.style.opacity = '0';
    overlay.style.pointerEvents = 'none';
    closeBtn.style.display = 'none';
    document.body.style.overflow = '';
  }

  burger.addEventListener('click', () => {
    navList.classList.contains('show') ? closeNav() : openNav();
  });
  overlay.addEventListener('click', closeNav);
  closeBtn.addEventListener('click', closeNav);
  navLinks.forEach(link => link.addEventListener('click', () => setTimeout(closeNav, 120)));
  window.addEventListener('keydown', e => (e.key === 'Escape' && navList.classList.contains('show')) && closeNav());
  window.addEventListener('resize', () => (window.innerWidth > 900 && navList.classList.contains('show')) && closeNav());

  // ===== Mode clair/sombre =====
  const toggleBtn = document.getElementById('theme-toggle');
  const body = document.body;

  if (localStorage.getItem('theme') === 'light') {
    body.classList.add('light-mode');
    toggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
  }

  toggleBtn.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    const isLight = body.classList.contains('light-mode');
    toggleBtn.innerHTML = isLight
      ? '<i class="fa-solid fa-sun"></i>'
      : '<i class="fa-solid fa-moon"></i>';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });

});
