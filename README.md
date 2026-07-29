# Portfolio

A premium, dark "blueprint" themed developer portfolio — no framework, just HTML/CSS/JS.

## Structure

```
portfolio/
├── source/
│   ├── template/
│   │   └── index.html      # the page
│   └── static/
│       ├── style.css       # theme + layout
│       └── script.js       # nav, scroll effects, contact form
├── images/
│   └── profile.jpg         # placeholder — replace with your photo
├── assets/
│   └── resume.pdf          # placeholder — replace with your resume
└── README.md
```

## Customize

Open `source/template/index.html` and replace every bracketed placeholder:

- `[NAME]`, `[ROLE]`, `[TAGLINE]` — hero copy
- `[ABOUT ...]`, `[CITY, COUNTRY]`, focus/availability — About section
- Skill cards — swap the Font Awesome icon class, label, and `data-level` (1–5)
- `[PROJECT ...]` cards — title, description, tags, live/code links
- `[EXP ...]` entries — job title, company, dates, description
- `[EMAIL]` — appears twice: the mailto link and the form's `data-to` attribute
- `[SOCIAL ...]` links — GitHub / LinkedIn / X hrefs (hero and footer)

Then swap `images/profile.jpg` and `assets/resume.pdf` for your own files (keep the same filenames, or update the two paths in `index.html` if you rename them).

## Preview locally

No build step required. Either:
- Open `source/template/index.html` directly in a browser, or
- Serve it so relative paths behave the same as they will on GitHub:
  ```bash
  cd portfolio
  python3 -m http.server 8000
  # visit http://localhost:8000/source/template/index.html
  ```

## Deploying with GitHub Pages

GitHub Pages serves from the repo root (or `/docs`) by default — it won't automatically find `index.html` nested inside `source/template/`. Two easy options:

1. **Flatten for deploy**: copy `source/template/index.html` to the repo root and update its three relative paths (`../static/` → `source/static/`, `../../images/` → `images/`, `../../assets/` → `assets/`).
2. **Redirect stub**: add a one-line `index.html` at the repo root with `<meta http-equiv="refresh" content="0; url=source/template/index.html">` so Pages hands off to the real page. (Ask and this can be added for you.)

## Notes

- Fonts (Fraunces, IBM Plex Mono, Inter) and Font Awesome load from CDNs — no install needed, just internet access at page-load time.
- Respects `prefers-reduced-motion` and has visible keyboard focus states.
- Fully responsive with a mobile nav menu below 720px.
