# CyberBootcamp — Lesson Hub
### Hosted on Cloudflare Pages

Static lesson site for the 8-Week Cybersecurity Bootcamp.  
Serves all weekly lesson HTML files via Cloudflare's global CDN.

---

## Structure

```
lessons-site/
├── index.html          ← Landing page (lesson hub)
├── _redirects          ← Cloudflare URL redirects
├── _headers            ← Security headers for all pages
├── css/
│   └── shared.css      ← Shared styles across all weeks
├── js/
│   └── shared.js       ← Shared JS (tabs, quizzes, keyboard nav)
└── weeks/
    ├── week1.html      ← Phase 1: Foundations
    ├── week2.html      ← Phase 1: Networking
    ├── week3.html      ← Phase 2: Enumeration
    ├── week4.html      ← Phase 2: Exploitation
    ├── week5.html      ← Phase 3: Privilege Escalation
    ├── week6.html      ← Phase 3: Red Team
    ├── week7.html      ← Phase 4: Detection & IR
    └── week8.html      ← Phase 4: Hardening & Cloud
```

---

## Cloudflare Pages Setup

| Setting              | Value              |
|----------------------|--------------------|
| Framework preset     | None               |
| Build command        | *(leave blank)*    |
| Build output dir     | `.` *(root)*       |
| Root directory       | *(leave blank)*    |

---

## Short URLs (after deploying)

| Short URL        | Goes to           |
|------------------|-------------------|
| `/w1` or `/week1` | Week 1 lesson    |
| `/w2` or `/week2` | Week 2 lesson    |
| `/phase1`         | Week 1 (Phase 1) |
| `/phase2`         | Week 3 (Phase 2) |
| `/phase3`         | Week 5 (Phase 3) |
| `/phase4`         | Week 7 (Phase 4) |

---

## Updating a Lesson

```bash
# Edit the HTML file locally
# Then push to GitHub — Cloudflare auto-deploys in ~30 seconds
git add weeks/week1.html
git commit -m "Update week 1 — added Day 3 content"
git push origin main
```

---

## Features

- ← → **Arrow keys** navigate between days within each week
- **Copy buttons** on every code/terminal block
- **Breadcrumb** navigation back to lesson hub
- **Prev / Next week** links at the bottom of every week
- **Reading time** estimate on every day panel
- **Print-friendly** styles (header/nav hidden on print)
- Lessons open in the **same tab** — no popups

---

## Linking from Your Main Site

```html
<!-- Link to the hub -->
<a href="https://your-project.pages.dev">View Lessons</a>

<!-- Link to a specific week -->
<a href="https://your-project.pages.dev/week3">Week 3 — Enumeration</a>

<!-- Short URL -->
<a href="https://your-project.pages.dev/w5">Week 5</a>
```
