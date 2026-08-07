document.addEventListener('DOMContentLoaded', () => {

  // Update Copyright Year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Elements
  const navbar = document.getElementById('navbar');
  const progressBar = document.getElementById('progressBar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const navItems = document.querySelectorAll('[data-nav]');
  const reveals = document.querySelectorAll('.reveal');

  // ================= Scroll Handling =================
  function handleScroll() {
    const scrollY = window.scrollY;
    
    // Navbar styling on scroll
    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scroll Progress Bar
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight > 0) {
      const scrolled = (scrollY / docHeight) * 100;
      progressBar.style.width = scrolled + '%';
    } else {
      progressBar.style.width = '0%';
    }

    // Reveal Animations
    const windowHeight = window.innerHeight;
    const elementVisible = 100;

    reveals.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      if (elementTop < windowHeight - elementVisible) {
        element.classList.add('active');
      }
    });

    // Active Nav Link highlighting
    const sections = document.querySelectorAll('section, header');
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 150;
      const sectionId = current.getAttribute('id');
      
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navItems.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Trigger on initial load

  // ================= Mobile Navigation =================
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    // Close menu when link clicked
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }

  // ================= Contact Form Handling =================
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      const btn = document.getElementById('submitBtn');
      
      // Update this email to your actual email
      const targetEmail = 'lohith@example.com'; 
      const mailtoLink = `mailto:${targetEmail}?subject=Portfolio Inquiry from ${name}&body=${encodeURIComponent(message + '\n\nSender Email: ' + email)}`;
      
      window.location.href = mailtoLink;
      
      // UI Feedback
      const originalText = btn.innerHTML;
      btn.innerHTML = 'Opening Mail App...';
      btn.style.backgroundColor = '#10B981'; // Green
      
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.backgroundColor = '';
        contactForm.reset();
      }, 3000);
    });
  }
});
