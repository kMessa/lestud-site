// Pack icons (design constant — not editable via CMS)
const packIcons = [
  `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="13" rx="2"/><path d="M16 2l2 5H6l2-5h8z"/><circle cx="12" cy="13.5" r="2.5"/></svg>`,
  `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="7" y="2" width="10" height="20" rx="2"/><circle cx="12" cy="17.5" r="1" fill="currentColor" stroke="none"/></svg>`,
  `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 9h20M2 15h20M7 5v14M17 5v14"/></svg>`,
];

// Load theme (colors) then content, then portfolio — in parallel
Promise.all([
  fetch('/data/theme.json').then(r => r.json()),
  fetch('/data/content.json').then(r => r.json()),
  fetch('/data/portfolio.json').then(r => r.json()),
]).then(([theme, content, portfolio]) => {

  // ── Theme ─────────────────────────────────────────────────────────────
  const root = document.documentElement;
  root.style.setProperty('--accent',  theme.accent_color);
  root.style.setProperty('--accent2', theme.accent2_color);
  // Services background
  document.getElementById('services').style.background = theme.services_bg_color;

  // ── Hero ──────────────────────────────────────────────────────────────
  const h = content.hero;
  document.getElementById('heroEyebrow').textContent      = h.eyebrow;
  document.getElementById('heroTitle').textContent        = h.title;
  document.getElementById('heroSubtitle').textContent     = h.subtitle;
  document.getElementById('heroDescription').textContent  = h.description || '';
  document.getElementById('heroCta1').textContent         = h.cta_primary;
  document.getElementById('heroCta2').textContent         = h.cta_secondary;

  // ── Services ──────────────────────────────────────────────────────────
  const s = content.services;
  document.getElementById('servicesTitle').textContent    = s.title;
  document.getElementById('servicesSubtitle').textContent = s.subtitle;
  const servicesList = document.getElementById('servicesList');
  s.items.forEach(item => {
    const li = document.createElement('li');
    li.className = 'service-item';
    li.innerHTML = `
      <span class="service-num">${item.num}</span>
      <h3>${item.title}</h3>
      <p>${item.description}</p>`;
    servicesList.appendChild(li);
  });

  // ── Packs ─────────────────────────────────────────────────────────────
  const pk = content.packs;
  document.getElementById('packsTitle').textContent = pk.title;
  document.getElementById('packsNote').textContent  = pk.note;
  const packsGrid = document.getElementById('packsGrid');
  pk.items.forEach((item, i) => {
    const div = document.createElement('div');
    div.className = 'pack-item';
    div.innerHTML = `
      <span class="pack-icon" aria-hidden="true">${packIcons[i] || ''}</span>
      <h3>${item.title}</h3>
      <p>${item.description}</p>`;
    packsGrid.appendChild(div);
  });

  // ── About ─────────────────────────────────────────────────────────────
  const a = content.about;
  document.getElementById('aboutTitle').textContent = a.title;
  const aboutParagraphs = document.getElementById('aboutParagraphs');
  a.paragraphs.forEach(text => {
    const p = document.createElement('p');
    p.textContent = text;
    aboutParagraphs.appendChild(p);
  });
  const aboutCaps = document.getElementById('aboutCaps');
  a.capabilities.forEach(cap => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${cap.highlight}</strong> ${cap.text}`;
    aboutCaps.appendChild(li);
  });

  // ── Contact ───────────────────────────────────────────────────────────
  const c = content.contact;
  document.getElementById('contactTitle').textContent    = c.title;
  document.getElementById('contactSubtitle').textContent = c.subtitle;
  document.getElementById('contactEmail').textContent    = c.email;
  document.getElementById('contactAddress').textContent  = c.address;
  document.getElementById('contactSiret').textContent    = 'N° ' + c.siret;

  // ── Footer ────────────────────────────────────────────────────────────
  document.getElementById('footerCopyright').textContent = content.footer.copyright;

  // ── Portfolio ─────────────────────────────────────────────────────────
  const grid = document.getElementById('portfolioGrid');
  portfolio.items.forEach((item, i) => {
    const div = document.createElement('div');
    div.className = 'portfolio-item' + (i === 0 ? ' portfolio-featured' : '');
    div.innerHTML = `
      <img src="${item.image}" alt="${item.alt}" loading="lazy" />
      <div class="portfolio-overlay">
        <span class="portfolio-tag">${item.tag}</span>
        <h3>${item.title}</h3>
        ${item.role ? `<p class="portfolio-role">${item.role}</p>` : ''}
      </div>`;
    grid.appendChild(div);
  });

}).catch(err => console.error('Erreur chargement contenu :', err));

// Netlify Identity — redirige vers /admin après connexion
if (window.netlifyIdentity) {
  window.netlifyIdentity.on('init', user => {
    if (!user) {
      window.netlifyIdentity.on('login', () => {
        document.location.href = '/admin/';
      });
    }
  });
}

// ── Navbar scroll state ────────────────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// ── Mobile menu toggle ────────────────────────────────────────────────
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ── Active section nav indicator ──────────────────────────────────────
const navAnchors  = document.querySelectorAll('.nav-links a[href^="#"]');
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
}, { threshold: 0.2 });

navSections.forEach(s => activeObserver.observe(s));

// ── Scroll reveal ─────────────────────────────────────────────────────
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

// ── Copy / right-click protection ────────────────────────────────────
(function () {
  const msgs = ['Bien essayé', 'non.', 'Pourquoi faire ?'];
  let toastEl = null;
  let hideTimer = null;

  function showToast() {
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.id = 'copy-toast';
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msgs[Math.floor(Math.random() * msgs.length)];
    toastEl.classList.add('visible');
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => toastEl.classList.remove('visible'), 1800);
  }

  document.addEventListener('contextmenu', e => { e.preventDefault(); showToast(); });
  document.addEventListener('copy',        e => { e.preventDefault(); showToast(); });
  document.addEventListener('cut',         e => { e.preventDefault(); showToast(); });
  document.addEventListener('selectstart', e => e.preventDefault());
  document.addEventListener('dragstart',   e => { e.preventDefault(); showToast(); });
})();

// ── Contact form — mailto ─────────────────────────────────────────────
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
