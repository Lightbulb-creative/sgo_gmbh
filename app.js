/* SGO GmbH & Co. KG — app.js */

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initHeroSlider();
  initScrollReveal();
  initCookieBanner();
  initModal();
  initContactForm();
  setActiveNavLink();
});

/* --- Hero Slider --- */
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero__slide');
  const btns = document.querySelectorAll('.hero__slider-btn');
  const seps = document.querySelectorAll('.hero__slider-sep');
  if (!slides.length || !btns.length) return;
  let current = 0;
  let timer;

  function goTo(idx) {
    slides[current].classList.remove('active');
    btns[current].classList.remove('active');
    if (seps[current]) seps[current].classList.remove('active');
    current = idx;
    slides[current].classList.add('active');
    btns[current].classList.add('active');
    if (seps[current]) seps[current].classList.add('active');
  }

  btns.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      clearInterval(timer);
      goTo(i);
      startAuto();
    });
  });

  function startAuto() {
    timer = setInterval(() => goTo((current + 1) % slides.length), 5000);
  }
  startAuto();
}

/* --- Navigation --- */
function initNav() {
  const nav = document.getElementById('nav');
  if (!nav) return;

  const isHero = nav.classList.contains('nav--hero');

  function updateNav() {
    const scrolled = window.scrollY > 60;
    if (isHero) {
      nav.classList.toggle('nav--scrolled', scrolled);
    }
  }
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  const burger = document.getElementById('navBurger');
  const links = document.querySelector('.nav__links');
  if (burger && links) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('active');
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        burger.classList.remove('active');
        links.classList.remove('open');
      });
    });
  }
}

function setActiveNavLink() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
}

/* --- Scroll Reveal --- */
function initScrollReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  items.forEach(el => io.observe(el));
}

/* --- Cookie Banner --- */
function initCookieBanner() {
  const banner = document.getElementById('cookieBanner');
  if (!banner) return;
  if (localStorage.getItem('sgo_cookies')) return;

  banner.classList.add('visible');

  document.getElementById('cookieAccept').addEventListener('click', () => {
    localStorage.setItem('sgo_cookies', 'accepted');
    banner.classList.remove('visible');
  });
  document.getElementById('cookieDecline').addEventListener('click', () => {
    localStorage.setItem('sgo_cookies', 'declined');
    banner.classList.remove('visible');
  });
}

/* --- Modal (Wohnungen) --- */
function initModal() {
  const overlay = document.getElementById('modalOverlay');
  if (!overlay) return;

  document.querySelectorAll('[data-modal]').forEach(card => {
    card.addEventListener('click', () => openModal(card.dataset.modal));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') openModal(card.dataset.modal);
    });
  });

  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeModal();
  });

  document.getElementById('modalClose').addEventListener('click', closeModal);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });
}

function openModal(id) {
  const data = WOHNUNGEN[id];
  if (!data) return;
  const overlay = document.getElementById('modalOverlay');

  document.getElementById('modalNr').textContent = `Projekt Bahnhofstraße 46 · ${data.nr}`;
  document.getElementById('modalTitle').textContent = data.title;
  document.getElementById('modalImg').src = data.img;
  document.getElementById('modalImg').alt = `Grundriss ${data.title}`;
  document.getElementById('modalEtage').textContent = data.etage;
  document.getElementById('modalZimmer').textContent = data.zimmer;
  document.getElementById('modalFlaeche').textContent = data.flaeche;
  document.getElementById('modalPreis').textContent = data.preis;
  document.getElementById('modalDesc').textContent = data.desc;

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

window.closeModal = function() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
};

/* --- Wohnungen Data --- */
const WOHNUNGEN = {
  w1: {
    nr: 'Wohnung 1', title: 'Wohnung 1 – Erdgeschoss',
    img: 'assets/images/grundriss-wohnung-1.png',
    etage: 'Erdgeschoss', zimmer: 'Auf Anfrage', flaeche: 'Auf Anfrage', preis: 'Preis auf Anfrage',
    desc: 'Helle, großzügige Wohnung im Erdgeschoss mit hochwertiger Ausstattung. Ruhige Lage im Innenstadtbereich von Weyhe mit kurzen Wegen zu Einkaufsmöglichkeiten und öffentlichen Verkehrsmitteln.'
  },
  w2: {
    nr: 'Wohnung 2', title: 'Wohnung 2 – Erdgeschoss',
    img: 'assets/images/grundriss-wohnung-2.png',
    etage: 'Erdgeschoss', zimmer: 'Auf Anfrage', flaeche: 'Auf Anfrage', preis: 'Preis auf Anfrage',
    desc: 'Moderne Wohnung im Erdgeschoss mit zeitgemäßem Grundriss. Hochwertige Materialien und durchdachte Raumaufteilung für anspruchsvolles Wohnen in Weyhe.'
  },
  w3: {
    nr: 'Wohnung 3', title: 'Wohnung 3 – Erdgeschoss',
    img: 'assets/images/grundriss-wohnung-3.png',
    etage: 'Erdgeschoss', zimmer: 'Auf Anfrage', flaeche: 'Auf Anfrage', preis: 'Preis auf Anfrage',
    desc: 'Attraktive Erdgeschosswohnung mit modernem Grundriss. Ideale Lage im Herzen von Weyhe, alle wichtigen Einrichtungen fußläufig erreichbar.'
  },
  w4: {
    nr: 'Wohnung 4', title: 'Wohnung 4 – Obergeschoss',
    img: 'assets/images/grundriss-wohnung-4.png',
    etage: '1. Obergeschoss', zimmer: 'Auf Anfrage', flaeche: 'Auf Anfrage', preis: 'Preis auf Anfrage',
    desc: 'Großzügige Wohnung im ersten Obergeschoss mit hervorragender Raumaufteilung. Beste Ausstattungsqualität und lichtdurchflutete Räume.'
  },
  w5: {
    nr: 'Wohnung 5', title: 'Wohnung 5 – Obergeschoss',
    img: 'assets/images/grundriss-wohnung-5.png',
    etage: '1. Obergeschoss', zimmer: 'Auf Anfrage', flaeche: 'Auf Anfrage', preis: 'Preis auf Anfrage',
    desc: 'Elegante Wohnung im ersten Obergeschoss. Durchdachter Grundriss, hochwertige Ausbaustandards und optimale Anbindung an die Innenstadt von Weyhe.'
  },
  w6: {
    nr: 'Wohnung 6', title: 'Wohnung 6 – Obergeschoss',
    img: 'assets/images/grundriss-wohnung-6.png',
    etage: '1. Obergeschoss', zimmer: 'Auf Anfrage', flaeche: 'Auf Anfrage', preis: 'Preis auf Anfrage',
    desc: 'Komfortable Wohnung im ersten Obergeschoss mit modernem Schnitt und gehobener Ausstattung. Alle Annehmlichkeiten der Innenstadt bequem fußläufig erreichbar.'
  },
  w7: {
    nr: 'Wohnung 7', title: 'Wohnung 7 – Penthouse',
    img: 'assets/images/grundriss-wohnung-7.png',
    etage: 'Penthouse', zimmer: 'Auf Anfrage', flaeche: 'Auf Anfrage', preis: 'Preis auf Anfrage',
    desc: 'Exklusives Penthouse mit einzigartiger Lage im Dachgeschoss. Großzügige Räume, hochwertige Materialien und ein besonderes Wohngefühl auf höchstem Niveau.'
  },
  w8: {
    nr: 'Wohnung 8', title: 'Wohnung 8 – Penthouse',
    img: 'assets/images/grundriss-wohnung-8.png',
    etage: 'Penthouse', zimmer: 'Auf Anfrage', flaeche: 'Auf Anfrage', preis: 'Preis auf Anfrage',
    desc: 'Repräsentatives Penthouse mit exklusivem Charakter. Erstklassige Ausstattung, lichtdurchflutete Räume und eine zentrale Lage in Weyhe.'
  },
  w9: {
    nr: 'Wohnung 9', title: 'Wohnung 9 – Penthouse',
    img: 'assets/images/grundriss-wohnung-9.png',
    etage: 'Penthouse', zimmer: 'Auf Anfrage', flaeche: 'Auf Anfrage', preis: 'Preis auf Anfrage',
    desc: 'Luxuriöses Penthouse der Extraklasse. Das Beste aus Architektur, Lage und Ausstattung vereint in einer einzigartigen Wohnung im Dachgeschoss.'
  }
};

/* --- Contact Form --- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    const btn = this.querySelector('[type=submit]');
    const status = document.getElementById('formStatus');
    const originalText = btn.textContent;

    btn.disabled = true;
    btn.textContent = 'Wird gesendet…';
    status.textContent = '';
    status.className = 'form__status';

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(this),
        headers: { Accept: 'application/json' }
      });
      const json = await res.json();
      if (json.success) {
        status.textContent = '✓ Ihre Nachricht wurde erfolgreich übermittelt. Wir melden uns in Kürze.';
        status.className = 'form__status form__status--success';
        this.reset();
      } else {
        throw new Error(json.message || '');
      }
    } catch {
      status.textContent = 'Ein Fehler ist aufgetreten. Bitte kontaktieren Sie uns telefonisch.';
      status.className = 'form__status form__status--error';
    } finally {
      btn.disabled = false;
      btn.textContent = originalText;
    }
  });
}
