// Navbar scroll state
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// Mobile menu toggle
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Active section nav indicator
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
const navSections = document.querySelectorAll('section[id]');

const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navAnchors.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { threshold: 0.35 });

navSections.forEach(s => activeObserver.observe(s));

// Scroll reveal — fires once per element
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -52px 0px' });

document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => {
  revealObserver.observe(el);
});

// Contact form — mailto with all fields
function sendForm(e) {
  e.preventDefault();
  const form = e.target;
  const btn  = form.querySelector('button[type="submit"]');
  const d    = new FormData(form);

  btn.textContent = 'Envoi en cours…';
  btn.disabled = true;

  const subject = encodeURIComponent(`Demande Le Stud — ${d.get('type') || 'Projet'}`);
  const body = encodeURIComponent([
    `Nom : ${d.get('nom') || '—'}`,
    `Entreprise / projet : ${d.get('entreprise') || '—'}`,
    `Email : ${d.get('email') || '—'}`,
    `Téléphone : ${d.get('tel') || '—'}`,
    `Type de projet : ${d.get('type') || '—'}`,
    `Budget approximatif : ${d.get('budget') || '—'}`,
    `Délai souhaité : ${d.get('delai') || '—'}`,
    '',
    d.get('message') || '',
  ].join('\n'));

  window.location.href = `mailto:armeldali.pro@gmail.com?subject=${subject}&body=${body}`;

  setTimeout(() => {
    btn.textContent = 'Demande envoyée';
    form.reset();
    setTimeout(() => {
      btn.textContent = 'Envoyer';
      btn.disabled = false;
    }, 3000);
  }, 800);
}
