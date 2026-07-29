/* ============================================================
   PORTFOLIO SCRIPT
   Handles: scroll progress, sticky nav, mobile menu,
   active-link tracking, scroll-reveal, and the contact form.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Scroll progress bar + sticky nav ---------- */
  const progressBar = document.getElementById('progressBar');
  const navbar = document.getElementById('navbar');

  function onScroll() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progressBar) progressBar.style.width = pct + '%';
    if (navbar) navbar.classList.toggle('is-scrolled', scrollTop > 40);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('is-open');
      navToggle.classList.toggle('is-active', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('is-open');
        navToggle.classList.remove('is-active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Active nav link on scroll ---------- */
  const sections = document.querySelectorAll('main section[id], header[id]');
  const navAnchors = document.querySelectorAll('[data-nav]');

  if (sections.length && navAnchors.length && 'IntersectionObserver' in window) {
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const id = entry.target.getAttribute('id');
        navAnchors.forEach(a => {
          a.classList.toggle('is-active', a.getAttribute('href') === '#' + id);
        });
      });
    }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });

    sections.forEach(section => navObserver.observe(section));
  }

  /* ---------- Scroll-reveal ---------- */
  const revealSelectors = [
    '#about .section-title', '#about .about-body', '.skill-card',
    '.project-card', '.timeline-entry', '#skills .section-title',
    '#projects .section-title', '#experience .section-title',
    '.contact-copy', '.contact-form'
  ];
  const revealEls = document.querySelectorAll(revealSelectors.join(','));

  if ('IntersectionObserver' in window) {
    revealEls.forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = (i % 4) * 70 + 'ms';
    });

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach(el => revealObserver.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('reveal', 'is-visible'));
  }

  /* ---------- Contact form ---------- */
  const form = document.getElementById('contactForm');
  const formNote = document.getElementById('formNote');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const to = form.dataset.to || '';
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();

      if (!to || to.includes('[EMAIL]')) {
        if (formNote) formNote.textContent = 'Set your email in the form\u2019s data-to attribute to enable sending.';
        return;
      }

      const subject = encodeURIComponent('Portfolio inquiry from ' + name);
      const body = encodeURIComponent(message + '\n\n\u2014 ' + name + ' (' + email + ')');
      window.location.href = 'mailto:' + to + '?subject=' + subject + '&body=' + body;
      if (formNote) formNote.textContent = 'Opening your email client\u2026';
    });
  }

});
