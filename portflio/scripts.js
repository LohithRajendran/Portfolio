/* ─────────────────────────────────────────────
   LOHITH R – PORTFOLIO  |  script.js
   ───────────────────────────────────────────── */

/* ── NAVBAR SCROLL ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* ── HAMBURGER MENU ── */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close nav when a link is clicked
navLinks.querySelectorAll('.nav-link, .nav-cta').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

/* ── ACTIVE NAV LINK ON SCROLL ── */
const sections = document.querySelectorAll('section[id]');
const allNavLinks = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      allNavLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { threshold: 0.35 });

sections.forEach(sec => sectionObserver.observe(sec));

/* ── TYPED TEXT ANIMATION ── */
const roles = [
  'Python Developer',
  'Problem Solver',
  'OOP Enthusiast',
  'API Builder',
  'SQL Developer'
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedEl = document.getElementById('typed');

function typeLoop() {
  const current = roles[roleIndex];
  if (isDeleting) {
    typedEl.textContent = current.slice(0, --charIndex);
  } else {
    typedEl.textContent = current.slice(0, ++charIndex);
  }

  let delay = isDeleting ? 60 : 95;

  if (!isDeleting && charIndex === current.length) {
    delay = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    delay = 400;
  }

  setTimeout(typeLoop, delay);
}
typeLoop();

/* ── SCROLL REVEAL ── */
const revealEls = document.querySelectorAll(
  '.skill-category, .project-card, .edu-card, .cert-card, .timeline-item, .detail-card, .contact-card, .contact-form, .about-stats, .proficiency-section'
);

revealEls.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, 80 * (i % 6)); // staggered
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));

/* ── PROFICIENCY BAR ANIMATION ── */
const profBars = document.querySelectorAll('.prof-bar-fill');

const profObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('animated');
      }, 200);
      profObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

profBars.forEach(bar => profObserver.observe(bar));

/* ── COUNTER ANIMATION (stats) ── */
function animateCounter(el, target, duration = 1500) {
  const isDecimal = target % 1 !== 0;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const value = eased * target;

    el.textContent = isDecimal ? value.toFixed(2) : Math.round(value) + (el.dataset.suffix || '');
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

const statNumbers = document.querySelectorAll('.stat-number');
const statData = ['5+', '1', '8.38', '2+'];

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      statNumbers.forEach((el, i) => {
        const raw = parseFloat(statData[i]);
        animateCounter(el, raw);
        // restore suffix after animation
        setTimeout(() => {
          if (statData[i].includes('+')) el.textContent = statData[i];
        }, 1600);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const aboutStats = document.querySelector('.about-stats');
if (aboutStats) statsObserver.observe(aboutStats);

/* ── CONTACT FORM ── */
function handleFormSubmit(e) {
  e.preventDefault();
  const form = document.getElementById('contact-form');
  const success = document.getElementById('form-success');
  const btn = document.getElementById('form-submit-btn');

  btn.disabled = true;
  btn.textContent = 'Sending…';

  // Simulate async submission
  setTimeout(() => {
    form.reset();
    success.style.display = 'block';
    btn.disabled = false;
    btn.innerHTML = '<span class="submit-text">Send Message</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>';
    setTimeout(() => success.style.display = 'none', 5000);
  }, 1200);
}

/* ── SMOOTH HERO PARALLAX ── */
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const orbs = document.querySelectorAll('.hero-orb');
  orbs.forEach((orb, i) => {
    const speed = 0.15 + i * 0.08;
    orb.style.transform = `translateY(${scrollY * speed}px)`;
  });
});

/* ── CURSOR GLOW EFFECT (desktop) ── */
if (window.matchMedia('(pointer:fine)').matches) {
  const cursor = document.createElement('div');
  cursor.style.cssText = `
    width:28px; height:28px; border-radius:50%;
    background: rgba(79,70,229,.15);
    border: 1.5px solid rgba(79,70,229,.35);
    position:fixed; pointer-events:none; z-index:9999;
    transform:translate(-50%,-50%);
    transition: transform 80ms, width 200ms, height 200ms;
    mix-blend-mode: multiply;
  `;
  document.body.appendChild(cursor);

  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });

  // Enlarge on interactive elements
  document.querySelectorAll('a, button, .project-card, .skill-tag').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width = '48px';
      cursor.style.height = '48px';
      cursor.style.background = 'rgba(79,70,229,.1)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width = '28px';
      cursor.style.height = '28px';
      cursor.style.background = 'rgba(79,70,229,.15)';
    });
  });
}

/* ── PAGE LOAD ANIMATION ── */
window.addEventListener('load', () => {
  document.body.style.opacity = '1';
});

document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.4s ease';
