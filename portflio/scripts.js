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
// Exposed so dynamically-rendered cards (mini projects) can hook in too.
let bindCursorGlow = () => { };

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
  bindCursorGlow = (elements) => {
    elements.forEach(el => {
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
  };

  bindCursorGlow(document.querySelectorAll('a, button, .project-card, .skill-tag'));
}

/* ── PAGE LOAD ANIMATION ── */
window.addEventListener('load', () => {
  document.body.style.opacity = '1';
});

document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.4s ease';

/* ─────────────────────────────────────────────
   MINI PYTHON PROJECTS — AUTO-SYNC FROM GITHUB
   Every top-level folder (or loose .py file) in the
   python-mini-projects repo becomes a card here.
   Push a new folder → it shows up on its own.
   ───────────────────────────────────────────── */

const MINI_CFG = {
  owner: 'LohithRajendran',
  repo: 'python-mini-projects',
  branch: 'main',
  cacheMinutes: 10,
  // Folders that are not projects
  ignore: ['assets', 'docs', 'images', 'img', 'media', 'tests', 'venv', 'node_modules']
};

/* Optional hand-written details. Key = folder name in lowercase.
   Anything left out falls back to the folder's README.md,
   and then to an auto-generated description. */
const MINI_OVERRIDES = {
  'quiz_game': {
    title: 'Python Quiz Game',
    icon: '❓',
    desc: 'A command-line quiz game that asks multiple-choice questions, validates answers and keeps a running score.',
    tags: ['Python', 'CLI', 'Logic']
  }
};

const miniGrid = document.getElementById('mini-grid');
const miniCount = document.getElementById('mini-count');
const miniNote = document.getElementById('mini-note');

/* ── helpers ── */
const miniRepoUrl = `https://github.com/${MINI_CFG.owner}/${MINI_CFG.repo}`;

function miniPrettify(name) {
  return name
    .replace(/[_\-]+/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function miniPickIcon(name) {
  const n = name.toLowerCase();
  const map = [
    ['quiz', '❓'], ['game', '🎮'], ['calc', '🧮'], ['convert', '🔄'],
    ['password', '🔐'], ['weather', '⛅'], ['todo', '📝'], ['task', '📝'],
    ['bank', '🏦'], ['atm', '🏧'], ['dice', '🎲'], ['tic', '⭕'],
    ['scrap', '🕸️'], ['bot', '🤖'], ['chat', '💬'], ['file', '📁'],
    ['timer', '⏱️'], ['clock', '⏰'], ['email', '📧'], ['api', '🔌'],
    ['data', '📊'], ['chart', '📈'], ['image', '🖼️'], ['music', '🎵']
  ];
  for (const [key, emoji] of map) if (n.includes(key)) return emoji;
  return '🐍';
}

function miniInferTags(name, files) {
  const tags = ['Python'];
  const blob = (name + ' ' + files.join(' ')).toLowerCase();
  if (blob.includes('tkinter') || blob.includes('gui')) tags.push('Tkinter');
  if (files.some(f => f.endsWith('.json'))) tags.push('JSON');
  if (files.some(f => f.toLowerCase() === 'requirements.txt')) tags.push('Libraries');
  if (tags.length === 1) tags.push('CLI');
  return tags;
}

function miniAutoDesc(pyCount, files) {
  if (pyCount === 1) {
    const f = files.find(x => x.endsWith('.py'));
    return `A single-file Python mini project (${f}).`;
  }
  if (pyCount > 1) return `A Python mini project built across ${pyCount} modules.`;
  return 'A small Python project from my mini-projects collection.';
}

/* Pull the first real paragraph out of a README */
function miniFirstParagraph(md) {
  const lines = md.split('\n');
  const buf = [];
  for (const raw of lines) {
    const line = raw.trim();
    if (!line) { if (buf.length) break; else continue; }
    if (line.startsWith('#') || line.startsWith('![') || line.startsWith('---') ||
      line.startsWith('```') || line.startsWith('|') || line.startsWith('>')) {
      if (buf.length) break; else continue;
    }
    buf.push(line);
    if (buf.join(' ').length > 200) break;
  }
  let text = buf.join(' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')   // links → text
    .replace(/[*_`]/g, '')                      // md emphasis
    .trim();
  if (text.length > 190) text = text.slice(0, 187).replace(/\s\S*$/, '') + '…';
  return text;
}

/* ── build the project list from one tree request ── */
async function miniFetchProjects() {
  const { owner, repo, branch, ignore } = MINI_CFG;
  const res = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`,
    { headers: { Accept: 'application/vnd.github+json' } }
  );
  if (!res.ok) throw new Error(`GitHub API responded ${res.status}`);
  const data = await res.json();
  const tree = data.tree || [];

  const folders = tree
    .filter(n => n.type === 'tree' && !n.path.includes('/'))
    .map(n => n.path)
    .filter(p => !p.startsWith('.') && !p.startsWith('_') && !ignore.includes(p.toLowerCase()));

  const items = folders.map(folder => {
    const files = tree
      .filter(n => n.type === 'blob' && n.path.startsWith(folder + '/'))
      .map(n => n.path.slice(folder.length + 1));
    const flat = files.map(f => f.split('/').pop());
    return {
      key: folder.toLowerCase(),
      folder,
      files: flat,
      pyCount: flat.filter(f => f.endsWith('.py')).length,
      hasReadme: files.some(f => f.toLowerCase() === 'readme.md'),
      url: `${miniRepoUrl}/tree/${branch}/${encodeURIComponent(folder)}`
    };
  }).filter(i => i.pyCount > 0);

  // Loose .py files sitting in the repo root also count as mini projects
  tree
    .filter(n => n.type === 'blob' && !n.path.includes('/') && n.path.endsWith('.py'))
    .forEach(n => {
      const base = n.path.replace(/\.py$/, '');
      items.push({
        key: base.toLowerCase(),
        folder: base,
        files: [n.path],
        pyCount: 1,
        hasReadme: false,
        url: `${miniRepoUrl}/blob/${branch}/${encodeURIComponent(n.path)}`
      });
    });

  // Descriptions from each folder's README (raw CDN — no API rate limit)
  await Promise.all(items.map(async item => {
    if (!item.hasReadme || MINI_OVERRIDES[item.key]) return;
    try {
      const r = await fetch(
        `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${item.folder}/README.md`
      );
      if (r.ok) item.readmeDesc = miniFirstParagraph(await r.text());
    } catch (_) { /* description is optional */ }
  }));

  items.sort((a, b) => a.folder.localeCompare(b.folder));
  return items;
}

/* ── render ── */
function miniRender(items) {
  miniGrid.innerHTML = '';
  miniGrid.setAttribute('aria-busy', 'false');

  if (!items.length) {
    miniGrid.innerHTML =
      `<p class="mini-empty">No mini projects published yet — they'll appear here automatically.
       <a href="${miniRepoUrl}" target="_blank" class="mini-repo-link">Browse the repo</a></p>`;
    return;
  }

  const cards = items.map(item => {
    const o = MINI_OVERRIDES[item.key] || {};
    const title = o.title || miniPrettify(item.folder);
    const icon = o.icon || miniPickIcon(item.folder);
    const desc = o.desc || item.readmeDesc || miniAutoDesc(item.pyCount, item.files);
    const tags = o.tags || miniInferTags(item.folder, item.files);

    const a = document.createElement('a');
    a.className = 'mini-card';
    a.href = item.url;
    a.target = '_blank';
    a.rel = 'noopener';
    a.innerHTML = `
      <div class="mini-card-top">
        <span class="mini-card-icon">${icon}</span>
        <h4 class="mini-card-title"></h4>
      </div>
      <p class="mini-card-desc"></p>
      <div class="mini-card-tags"></div>
      <span class="mini-card-foot">View code →</span>`;

    a.querySelector('.mini-card-title').textContent = title;
    a.querySelector('.mini-card-desc').textContent = desc;

    const tagWrap = a.querySelector('.mini-card-tags');
    tags.slice(0, 4).forEach(t => {
      const span = document.createElement('span');
      span.className = 'tech-tag' + (t === 'Python' ? ' tech-python' : '');
      span.textContent = t;
      tagWrap.appendChild(span);
    });

    return a;
  });

  cards.forEach(c => miniGrid.appendChild(c));

  miniCount.textContent = `${items.length} project${items.length === 1 ? '' : 's'}`;
  miniCount.hidden = false;

  miniNote.textContent = 'This list is pulled live from GitHub — new folders appear here automatically.';
  miniNote.hidden = false;

  // Hook the new cards into the existing scroll-reveal + cursor effects
  cards.forEach(c => {
    c.classList.add('reveal');
    revealObserver.observe(c);
  });
  bindCursorGlow(cards);
}

function miniRenderError() {
  miniGrid.setAttribute('aria-busy', 'false');
  const fallback = Object.keys(MINI_OVERRIDES).map(key => ({
    key,
    folder: key,
    files: [],
    pyCount: 1,
    url: `${miniRepoUrl}/tree/${MINI_CFG.branch}/${key}`
  }));

  if (fallback.length) {
    miniRender(fallback);
    miniNote.textContent = "Couldn't reach GitHub just now — showing the last known list.";
    miniNote.hidden = false;
    return;
  }

  miniGrid.innerHTML =
    `<p class="mini-empty">Couldn't load the list right now.
     <a href="${miniRepoUrl}" target="_blank" class="mini-repo-link">View them on GitHub →</a></p>`;
}

/* ── run (lazily, when the section comes into view) ── */
async function miniLoad() {
  const cacheKey = `mini-projects:${MINI_CFG.owner}/${MINI_CFG.repo}`;
  try {
    const cached = JSON.parse(sessionStorage.getItem(cacheKey) || 'null');
    if (cached && Date.now() - cached.at < MINI_CFG.cacheMinutes * 60 * 1000) {
      miniRender(cached.items);
      return;
    }
  } catch (_) { /* cache is a nice-to-have */ }

  try {
    const items = await miniFetchProjects();
    miniRender(items);
    try {
      sessionStorage.setItem(cacheKey, JSON.stringify({ at: Date.now(), items }));
    } catch (_) { /* storage may be unavailable */ }
  } catch (err) {
    console.warn('Mini projects failed to load:', err);
    miniRenderError();
  }
}

if (miniGrid) {
  const miniSection = document.getElementById('mini-projects');
  const miniLoadObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        miniLoadObserver.unobserve(entry.target);
        miniLoad();
      }
    });
  }, { rootMargin: '250px' });
  miniLoadObserver.observe(miniSection);
}
