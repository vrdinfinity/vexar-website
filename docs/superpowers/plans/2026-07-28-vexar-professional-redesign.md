# VEXAR Professional Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the VEXAR static website (5 HTML pages + shared CSS/JS) from a dark, verse-copy, investor-pitch-deck feel into a light, professional, customer-facing B2B company site, per `docs/superpowers/specs/2026-07-28-vexar-professional-redesign-design.md`.

**Architecture:** No build system — plain HTML/CSS/JS. Most page styling already flows through CSS custom properties defined once in `vexar.css`, so the palette swap is mostly a single-file token change; the remaining work is (a) removing a small number of hardcoded dark-theme colors and dead/cinematic CSS, (b) removing cursor-follower/particle-canvas JS, (c) rewriting page copy from verse/investor tone to plain professional prose, and (d) wiring the contact form to a real backend.

**Tech Stack:** Static HTML5, vanilla CSS (custom properties), vanilla JS, Google Fonts (Inter), Formspree for form submission.

## Global Constraints

- Site has no build step or package manager — every file is edited and served as-is (open directly or via any static file server).
- Keep existing brand: VEXAR wordmark (`assets/logo-white.png`, the black+blue-on-white logo — despite its filename it is NOT a dark-mode asset), tagline "Beyond the Horizon", accent blue `#1A6FFF`.
- Do not modify `admin.html` itself — only remove the public link to it from `index.html`'s footer.
- Do not fabricate content (bios, quotes, stats) beyond what's specified in each task below.
- Contact form must POST to `https://formspree.io/f/mzdnoarz`.
- Social links: X → `https://x.com/VexarDrive`, Instagram → `https://www.instagram.com/vexardrive/`. LinkedIn icon is removed everywhere (no profile exists yet).
- No automated test suite exists for this project and none is being added — "testing" for every task below means: run the given `grep` verification commands (deterministic), and visually open the page in a browser to confirm it renders and behaves as described.

---

### Task 1: Rebuild `vexar.css` design tokens and shared component styles

**Files:**
- Modify: `vexar.css`

**Interfaces:**
- Produces: CSS custom properties `--bg`, `--bg2`, `--bg3`, `--surface`, `--card`, `--blue`, `--blue-d`, `--blue-b`, `--blue-line`, `--white` (now a dark navy value used for headings/high-emphasis text — kept as this name to avoid touching every reference site-wide), `--text`, `--muted`, `--border`, `--ff-d` (aliased to Inter), `--ff-b`, `--nav-h`. All later HTML tasks rely on these resolving to the new light-theme values automatically.

- [ ] **Step 1: Swap the font import to Inter only**

In `vexar.css`, find:
```css
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap');
```
Replace with:
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
```

- [ ] **Step 2: Replace the `:root` token block with the light palette**

Find:
```css
:root {
  --bg:       #030507;
  --bg2:      #060A10;
  --bg3:      #0A101A;
  --surface:  #0D1520;
  --card:     #101828;
  --blue:     #1A6FFF;
  --blue-d:   rgba(26,111,255,0.14);
  --blue-b:   rgba(26,111,255,0.08);
  --blue-line:rgba(26,111,255,0.1);
  --cyan:     #00B4FF;
  --white:    #EFF4FF;
  --text:     #9AAFC8;
  --muted:    #445566;
  --border:   rgba(26,111,255,0.09);
  --ff-d: 'Syne', sans-serif;
  --ff-b: 'Inter', sans-serif;
  --nav-h: 76px;
}
```
Replace with:
```css
:root {
  --bg:       #FAFBFC;
  --bg2:      #EEF1F5;
  --bg3:      #E7EBF1;
  --surface:  #FFFFFF;
  --card:     #FFFFFF;
  --blue:     #1A6FFF;
  --blue-d:   rgba(26,111,255,0.12);
  --blue-b:   rgba(26,111,255,0.06);
  --blue-line:rgba(26,111,255,0.12);
  --cyan:     #00B4FF;
  --white:    #0B1220;
  --text:     #12181F;
  --muted:    #5B6572;
  --border:   #E2E6EC;
  --ff-d: 'Inter', sans-serif;
  --ff-b: 'Inter', sans-serif;
  --nav-h: 76px;
}
```

- [ ] **Step 3: Update text selection color**

Find:
```css
::selection { background: rgba(26,111,255,0.28); color: #fff; }
```
Replace with:
```css
::selection { background: rgba(26,111,255,0.18); color: var(--white); }
```

- [ ] **Step 4: Remove the custom cursor CSS entirely**

Find (including the header comment):
```css
/* ── CURSOR ── */
.cur, .cur-r {
  position: fixed; pointer-events: none; z-index: 9999;
  border-radius: 50%; transform: translate(-50%,-50%);
  transition: opacity .2s;
}
.cur   { width: 5px; height: 5px; background: var(--blue); }
.cur-r {
  width: 30px; height: 30px;
  border: 1px solid rgba(26,111,255,.4);
  transition: transform .18s ease, width .25s, height .25s, border-color .25s;
}
body.hov .cur-r { width: 48px; height: 48px; border-color: var(--blue); }
@media (hover: none) { .cur, .cur-r { display: none; } body { cursor: auto; } }
```
Delete it (replace with nothing).

- [ ] **Step 5: Remove the blend-mode hack from the nav logo**

Find:
```css
.nav-logo img {
  height: 44px; width: auto;
  mix-blend-mode: screen;
  filter: brightness(1.3);
  display: block;
}
```
Replace with:
```css
.nav-logo img {
  height: 44px; width: auto;
  display: block;
}
```

- [ ] **Step 6: Update the sticky-nav and mobile-menu backgrounds to light values**

Find:
```css
#nav.stuck {
  background: rgba(3,5,7,0.88);
  backdrop-filter: blur(24px);
  border-bottom-color: var(--border);
}
```
Replace with:
```css
#nav.stuck {
  background: rgba(250,251,252,0.92);
  backdrop-filter: blur(24px);
  border-bottom-color: var(--border);
}
```

Find:
```css
.mob {
  display: none; position: fixed; inset: 0;
  background: rgba(3,5,7,.96); backdrop-filter: blur(24px);
  z-index: 490; flex-direction: column;
  align-items: center; justify-content: center; gap: 2.5rem;
}
```
Replace with:
```css
.mob {
  display: none; position: fixed; inset: 0;
  background: rgba(250,251,252,.97); backdrop-filter: blur(24px);
  z-index: 490; flex-direction: column;
  align-items: center; justify-content: center; gap: 2.5rem;
}
```

- [ ] **Step 7: Increase heading weight (Inter reads lighter than Syne at the same weight)**

Find:
```css
h1.display {
  font-family: var(--ff-d);
  font-size: clamp(3rem,7vw,6rem);
  font-weight: 700; line-height: 1.0; letter-spacing: -.03em;
  color: var(--white);
}
h2.display {
  font-family: var(--ff-d);
  font-size: clamp(2rem,4.5vw,3.6rem);
  font-weight: 700; line-height: 1.06; letter-spacing: -.025em;
  color: var(--white);
}
h3.display {
  font-family: var(--ff-d);
  font-size: clamp(1.5rem,3vw,2.2rem);
  font-weight: 600; line-height: 1.1; letter-spacing: -.02em;
  color: var(--white);
}
```
Replace with:
```css
h1.display {
  font-family: var(--ff-d);
  font-size: clamp(3rem,7vw,6rem);
  font-weight: 800; line-height: 1.05; letter-spacing: -.03em;
  color: var(--white);
}
h2.display {
  font-family: var(--ff-d);
  font-size: clamp(2rem,4.5vw,3.6rem);
  font-weight: 800; line-height: 1.1; letter-spacing: -.025em;
  color: var(--white);
}
h3.display {
  font-family: var(--ff-d);
  font-size: clamp(1.5rem,3vw,2.2rem);
  font-weight: 700; line-height: 1.15; letter-spacing: -.02em;
  color: var(--white);
}
```

- [ ] **Step 8: Fix hardcoded near-white colors on `.lead` and `.btn-s`**

Find:
```css
.lead {
  font-size: clamp(1rem,2vw,1.15rem); font-weight: 300;
  color: rgba(239,244,255,.65); line-height: 1.85; max-width: 580px;
}
```
Replace with:
```css
.lead {
  font-size: clamp(1rem,2vw,1.15rem); font-weight: 400;
  color: var(--muted); line-height: 1.85; max-width: 580px;
}
```

Find:
```css
.btn-s {
  background: transparent; color: var(--white);
  border: 1px solid rgba(239,244,255,.18);
}
.btn-s:hover { border-color: rgba(239,244,255,.5); transform: translateY(-2px); }
```
Replace with:
```css
.btn-s {
  background: transparent; color: var(--white);
  border: 1px solid var(--border);
}
.btn-s:hover { border-color: rgba(11,18,32,.35); transform: translateY(-2px); }
```

- [ ] **Step 9: Remove the blend-mode hack from the footer logo, and fix footer copyright color**

Find:
```css
.ft-logo img {
  height: 30px; mix-blend-mode: screen;
  filter: brightness(1.2); margin-bottom: .7rem;
}
```
Replace with:
```css
.ft-logo img {
  height: 30px; margin-bottom: .7rem;
}
```

Find:
```css
.ft-copy {
  max-width: 1160px; margin: 1.8rem auto 0;
  display: flex; justify-content: space-between; align-items: center;
  flex-wrap: wrap; gap: .6rem;
  font-size: .62rem; color: rgba(68,85,102,.5); letter-spacing: .07em;
}
.ft-copy a { color: rgba(68,85,102,.5); text-decoration: none; }
.ft-copy a:hover { color: var(--blue); }
```
Replace with:
```css
.ft-copy {
  max-width: 1160px; margin: 1.8rem auto 0;
  display: flex; justify-content: space-between; align-items: center;
  flex-wrap: wrap; gap: .6rem;
  font-size: .62rem; color: rgba(11,18,32,.45); letter-spacing: .07em;
}
.ft-copy a { color: rgba(11,18,32,.45); text-decoration: none; }
.ft-copy a:hover { color: var(--blue); }
```

- [ ] **Step 10: Update form field styling (token-based border + accessible focus ring) and the select-arrow color**

Find:
```css
.fg input, .fg textarea, .fg select {
  background: var(--surface); border: 1px solid rgba(68,85,102,.25);
  color: var(--white); padding: .9rem 1.1rem;
  font-family: var(--ff-b); font-size: .88rem; font-weight: 300;
  outline: none; transition: border-color .2s; -webkit-appearance: none;
}
```
Replace with:
```css
.fg input, .fg textarea, .fg select {
  background: var(--surface); border: 1px solid var(--border);
  color: var(--white); padding: .9rem 1.1rem;
  font-family: var(--ff-b); font-size: .88rem; font-weight: 400;
  outline: none; transition: border-color .2s, box-shadow .2s; -webkit-appearance: none;
}
```

Find:
```css
.fg select {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23445566' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat; background-position: right 1rem center;
  background-size: 10px; cursor: pointer;
}
```
Replace with:
```css
.fg select {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%235B6572' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat; background-position: right 1rem center;
  background-size: 10px; cursor: pointer;
}
```

Find:
```css
.fg input:focus, .fg textarea:focus, .fg select:focus { border-color: rgba(26,111,255,.45); }
```
Replace with:
```css
.fg input:focus, .fg textarea:focus, .fg select:focus { border-color: var(--blue); box-shadow: 0 0 0 3px var(--blue-b); }
```

- [ ] **Step 11: Verify**

Run:
```bash
grep -n "Syne\|mix-blend-mode\|rgba(3,5,7\|rgba(239,244,255\|\.cur, \.cur-r" vexar.css
```
Expected: no output (all four patterns removed).

```bash
grep -n "^  --bg:\|^  --white:\|^  --blue:" vexar.css
```
Expected: `--bg:       #FAFBFC;`, `--white:    #0B1220;`, `--blue:     #1A6FFF;`.

- [ ] **Step 12: Commit**

```bash
git add vexar.css
git commit -m "$(cat <<'EOF'
Rebuild vexar.css with a light professional palette

Repoints design tokens to a light theme, removes the cursor-follower
CSS, drops the mix-blend-mode logo hack, and fixes hardcoded
dark-theme colors that don't resolve through tokens.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 2: Rewrite `vexar.js` — remove cinematic effects, wire contact form to Formspree

**Files:**
- Modify: `vexar.js`

**Interfaces:**
- Consumes: form field IDs already present in `contact.html` (`contact-form`, `f-name`, `f-email`, `f-company`, `f-interest`, `f-message`, `form-btn`, `form-msg`) — Task 7 does not change these IDs.
- Produces: nothing new consumed by other tasks; nav-scroll/mobile-menu/active-link/scroll-reveal behavior is unchanged and still expected by every page's markup.

- [ ] **Step 1: Remove the custom cursor code**

Find:
```js
  /* ── CURSOR ── */
  const cur = document.getElementById('C');
  const ring = document.getElementById('CR');
  if (cur && ring) {
    let mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
    (function loop() {
      cur.style.cssText  = `left:${mx}px;top:${my}px`;
      rx += (mx - rx) * .1;
      ry += (my - ry) * .1;
      ring.style.cssText = `left:${rx}px;top:${ry}px`;
      requestAnimationFrame(loop);
    })();
    document.querySelectorAll('a,button,.card,.badge-live,.stat-cell,.sig').forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('hov'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('hov'));
    });
  }

  /* ── NAV SCROLL ── */
```
Replace with:
```js
  /* ── NAV SCROLL ── */
```

- [ ] **Step 2: Replace the contact-form handler with a Formspree submission**

Find:
```js
  /* ── CONTACT FORM + localStorage DB ── */
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn  = document.getElementById('form-btn');
      const msg  = document.getElementById('form-msg');
      const data = {
        id:        Date.now(),
        timestamp: new Date().toISOString(),
        name:      document.getElementById('f-name')?.value.trim()    || '',
        email:     document.getElementById('f-email')?.value.trim()   || '',
        company:   document.getElementById('f-company')?.value.trim() || '',
        interest:  document.getElementById('f-interest')?.value       || '',
        message:   document.getElementById('f-message')?.value.trim() || '',
        page:      window.location.pathname
      };
      // Validate
      if (!data.name || !data.email || !data.message) {
        msg.textContent = 'Please fill in all required fields.';
        msg.style.color = '#f56565';
        return;
      }
      btn.textContent = 'Sending…';
      btn.disabled = true;
      btn.style.opacity = '.6';

      // Store in localStorage
      try {
        const existing = JSON.parse(localStorage.getItem('vexar_enquiries') || '[]');
        existing.push(data);
        localStorage.setItem('vexar_enquiries', JSON.stringify(existing));
      } catch (_) { /* storage full or unavailable */ }

      // Simulate network delay
      setTimeout(() => {
        btn.textContent = 'Message Sent ✓';
        btn.style.background = '#0a3d25';
        btn.style.borderColor = '#0f6b3f';
        btn.style.opacity = '1';
        msg.textContent = 'Thank you — we\'ll be in touch shortly.';
        msg.style.color = '#4ade80';
        form.reset();
        setTimeout(() => {
          btn.textContent = 'Send Message';
          btn.style.background = '';
          btn.style.borderColor = '';
          btn.disabled = false;
          msg.textContent = '';
        }, 5000);
      }, 1400);
    });
  }

})();
```
Replace with:
```js
  /* ── CONTACT FORM ── */
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn  = document.getElementById('form-btn');
      const msg  = document.getElementById('form-msg');
      const name    = document.getElementById('f-name')?.value.trim()    || '';
      const email   = document.getElementById('f-email')?.value.trim()   || '';
      const message = document.getElementById('f-message')?.value.trim() || '';

      if (!name || !email || !message) {
        msg.textContent = 'Please fill in all required fields.';
        msg.style.color = '#d64545';
        return;
      }

      btn.textContent = 'Sending…';
      btn.disabled = true;
      btn.style.opacity = '.6';

      fetch('https://formspree.io/f/mzdnoarz', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form)
      })
        .then(response => {
          if (!response.ok) throw new Error('Form submission failed');
          btn.textContent = 'Message Sent ✓';
          btn.style.background = '#1a7f4b';
          btn.style.borderColor = '#1a7f4b';
          btn.style.opacity = '1';
          msg.textContent = 'Thank you — we\'ll be in touch shortly.';
          msg.style.color = '#1a7f4b';
          form.reset();
        })
        .catch(() => {
          btn.textContent = 'Send Message';
          btn.style.opacity = '1';
          msg.textContent = 'Something went wrong — please email us directly at contact@vexartech.in.';
          msg.style.color = '#d64545';
        })
        .finally(() => {
          btn.disabled = false;
          setTimeout(() => {
            if (btn.textContent === 'Message Sent ✓') {
              btn.textContent = 'Send Message';
              btn.style.background = '';
              btn.style.borderColor = '';
              msg.textContent = '';
            }
          }, 5000);
        });
    });
  }

})();
```

- [ ] **Step 3: Remove the hero particle-canvas code**

Find (this is the remainder of the file, after the closing `})();` from Step 2):
```js

/* ── HERO CANVAS (index.html only) ── */
function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, pts = [], trails = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  function initPts() {
    pts = [];
    const n = Math.min(Math.floor(W * H / 9000), 130);
    for (let i = 0; i < n; i++) {
      pts.push({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - .5) * .38, vy: (Math.random() - .5) * .38,
        r: Math.random() * 1.3 + .3, a: Math.random() * .38 + .18
      });
    }
  }
  function addTrail() {
    trails.push({
      x: -300, y: Math.random() * H * .9 + H * .05,
      spd: Math.random() * 3.5 + 1.5,
      len: Math.random() * 240 + 80,
      a: Math.random() * .22 + .04,
      w: Math.random() * .7 + .2
    });
  }
  for (let i = 0; i < 14; i++) setTimeout(addTrail, Math.random() * 3500);

  let mX = 0, mY = 0;
  window.addEventListener('mousemove', e => { mX = e.clientX; mY = e.clientY; }, { passive: true });

  function draw() {
    ctx.clearRect(0, 0, W, H);
    // trails
    for (let i = trails.length - 1; i >= 0; i--) {
      const t = trails[i];
      const g = ctx.createLinearGradient(t.x - t.len, 0, t.x, 0);
      g.addColorStop(0, 'transparent');
      g.addColorStop(.65, `rgba(26,111,255,${t.a})`);
      g.addColorStop(1, 'transparent');
      ctx.beginPath(); ctx.moveTo(t.x - t.len, t.y); ctx.lineTo(t.x, t.y);
      ctx.strokeStyle = g; ctx.lineWidth = t.w; ctx.stroke();
      t.x += t.spd;
      if (t.x > W + 350) { trails.splice(i, 1); addTrail(); }
    }
    // nodes
    const D = 135;
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < D) {
          ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y);
          ctx.strokeStyle = `rgba(26,111,255,${(1 - d / D) * .16})`;
          ctx.lineWidth = .4; ctx.stroke();
        }
      }
      const dx = pts[i].x - mX, dy = pts[i].y - mY, d = Math.sqrt(dx * dx + dy * dy);
      if (d < 170) {
        ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(mX, mY);
        ctx.strokeStyle = `rgba(0,180,255,${(1 - d / 170) * .18})`;
        ctx.lineWidth = .4; ctx.stroke();
      }
      ctx.beginPath(); ctx.arc(pts[i].x, pts[i].y, pts[i].r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(26,111,255,${pts[i].a})`; ctx.fill();
      pts[i].x += pts[i].vx; pts[i].y += pts[i].vy;
      if (pts[i].x < 0 || pts[i].x > W) pts[i].vx *= -1;
      if (pts[i].y < 0 || pts[i].y > H) pts[i].vy *= -1;
    }
    requestAnimationFrame(draw);
  }
  resize(); initPts(); draw();
  window.addEventListener('resize', () => { resize(); initPts(); }, { passive: true });
}
initHeroCanvas();
```
Delete it (replace with nothing — the file should now end at the `})();` closing the IIFE from Step 2).

- [ ] **Step 4: Verify**

Run:
```bash
grep -n "cur\.style\|initHeroCanvas\|localStorage\|body\.hov" vexar.js
```
Expected: no output.

```bash
grep -n "formspree.io/f/mzdnoarz" vexar.js
```
Expected: one match inside the `fetch(...)` call.

- [ ] **Step 5: Commit**

```bash
git add vexar.js
git commit -m "$(cat <<'EOF'
Remove cursor/canvas effects and wire contact form to Formspree

Drops the custom cursor follower and particle-network hero canvas.
Contact form now POSTs to a real Formspree endpoint instead of only
writing to localStorage, so inquiries actually reach someone.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 3: Rewrite `index.html`

**Files:**
- Modify: `index.html`

**Interfaces:**
- Consumes: tokens from Task 1, form/nav/reveal JS from Task 2.
- Produces: nothing consumed by other page tasks (each page is independent).

- [ ] **Step 1: Replace the entire page-specific `<style>` block**

Find the whole block from `<style>\n/* ─── INDEX-SPECIFIC ─── */` through its closing `</style>` (currently lines 10–218 — everything between `<link rel="stylesheet" href="vexar.css">` and `</head>`).

Replace with:
```html
<style>
/* ─── HERO ─── */
#hero {
  padding: clamp(7rem,14vh,10rem) 6% clamp(4rem,8vh,6rem);
  border-bottom: 1px solid var(--border);
  background: linear-gradient(to bottom, var(--blue-b) 0%, transparent 100%);
  text-align: center;
}
.hero-body { max-width: 760px; margin: 0 auto; }
.hero-eyebrow {
  display: inline-flex; align-items: center; gap: 10px;
  font-size: .68rem; letter-spacing: .28em; text-transform: uppercase; color: var(--blue);
  margin-bottom: 1.6rem;
}
.hero-eyebrow::before, .hero-eyebrow::after {
  content: ''; display: block; width: 22px; height: 1px; background: var(--blue); opacity: .5;
}
h1.hero-h {
  font-family: var(--ff-d); font-size: clamp(2.6rem,6vw,4.4rem);
  font-weight: 800; line-height: 1.05; letter-spacing: -.03em;
  color: var(--white); margin-bottom: 1.4rem;
}
.hero-sub {
  font-size: clamp(1rem,1.6vw,1.15rem); font-weight: 400;
  color: var(--muted); max-width: 600px;
  margin: 0 auto 2.4rem; line-height: 1.75;
}
.hero-ctas { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }

/* ─── ABOUT TEASER ─── */
#about { background: var(--bg2); }
.about-grid { display: grid; grid-template-columns: 1fr 1.15fr; gap: 6rem; align-items: center; }

/* ─── PROBLEM ─── */
#problem { background: var(--bg); }
.problem-grid { display: grid; grid-template-columns: 1.1fr 1fr; gap: 6rem; align-items: start; }
.problem-copy p { font-size: .975rem; font-weight: 400; color: var(--text); line-height: 1.9; }
.stat-col { display: flex; flex-direction: column; gap: 0; margin-top: 2.5rem; }
.stat-item {
  padding: 2rem 2.2rem; border-left: 1px solid var(--border);
  transition: border-left-color .3s; cursor: default;
}
.stat-item:not(:last-child) { border-bottom: 1px solid var(--border); }
.stat-item:hover { border-left-color: var(--blue); }
.stat-n { font-family: var(--ff-d); font-size: clamp(2rem,4vw,3rem); font-weight: 700; color: var(--white); line-height: 1; margin-bottom: .3rem; }
.stat-n b { color: var(--blue); font-weight: 700; }
.stat-l { font-size: .7rem; letter-spacing: .08em; text-transform: uppercase; color: var(--muted); line-height: 1.5; }

/* ─── BUILDING ─── */
#building { background: var(--bg2); }
.build-header { max-width: 580px; margin-bottom: 3.5rem; }
.pillars-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 1px; background: var(--border); border: 1px solid var(--border); }
.pillar-n { font-size: .58rem; letter-spacing: .25em; color: rgba(26,111,255,.5); display: block; margin-bottom: 1.6rem; font-family: var(--ff-d); }

/* ─── WHO ─── */
#who { background: var(--bg); }
.who-header { text-align: center; margin-bottom: 3.5rem; }
.who-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 1px; background: var(--border); border: 1px solid var(--border); }
.who-card {
  background: var(--surface); padding: 2.8rem 2.2rem; text-align: center;
  transition: background .3s;
}
.who-card:hover { background: var(--bg2); }
.who-ico {
  width: 52px; height: 52px; border: 1px solid var(--border); background: var(--blue-b);
  display: flex; align-items: center; justify-content: center; margin: 0 auto 1.6rem;
  transition: all .3s;
}
.who-card:hover .who-ico { border-color: var(--blue); background: var(--blue-d); }
.who-ico svg { width: 20px; height: 20px; stroke: var(--blue); fill: none; stroke-width: 1.5; }
.who-card h3 { font-family: var(--ff-d); font-size: 1.1rem; font-weight: 700; color: var(--white); margin-bottom: .5rem; }
.who-card p { font-size: .85rem; color: var(--muted); line-height: 1.75; }

/* ─── CTA BAND ─── */
#cta-band {
  background: var(--bg2);
  padding: clamp(4rem,8vh,6rem) 6%;
  border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);
  text-align: center;
}
.cta-band-inner { max-width: 700px; margin: 0 auto; }
.cta-band-inner h2 { margin-bottom: 1rem; }
.cta-band-inner p { margin-bottom: 2.5rem; color: var(--muted); }
.cta-band-inner .hero-ctas { justify-content: center; }

@media (max-width: 1024px) {
  .about-grid, .problem-grid { grid-template-columns: 1fr; gap: 3rem; }
}
@media (max-width: 768px) {
  .pillars-grid, .who-grid { grid-template-columns: 1fr; }
}
</style>
```

- [ ] **Step 2: Replace the body**

Find everything from `<body>` through `</html>` and replace with:
```html
<body>
<!-- NAV -->
<nav id="nav">
  <a href="index.html" class="nav-logo" aria-label="VEXAR — Home">
    <img src="assets/logo-white.png" alt="VEXAR">
  </a>
  <ul class="nav-links">
    <li><a href="index.html">Home</a></li>
    <li><a href="about.html">About</a></li>
    <li><a href="technology.html">Technology</a></li>
    <li><a href="vision.html">Vision</a></li>
  </ul>
  <a href="contact.html" class="nav-contact">Contact</a>
  <button class="hbg" id="hbg" aria-label="Menu"><span></span><span></span><span></span></button>
</nav>
<div class="mob" id="mob">
  <a href="index.html">Home</a>
  <a href="about.html">About</a>
  <a href="technology.html">Technology</a>
  <a href="vision.html">Vision</a>
  <a href="contact.html">Contact</a>
</div>

<!-- HERO -->
<section id="hero">
  <div class="hero-body">
    <p class="hero-eyebrow">AI Driver Safety · Intelligent Mobility</p>
    <h1 class="hero-h">Driver safety, reengineered.</h1>
    <p class="hero-sub">VEXAR builds intelligent systems that understand driving in real time — preventing accidents, responding instantly, and redefining how safety works on the road.</p>
    <div class="hero-ctas">
      <a href="contact.html" class="btn-p">Talk to Us</a>
      <a href="technology.html" class="btn-s">See the Technology</a>
    </div>
  </div>
</section>

<!-- WHAT IS VEXAR -->
<section id="about">
  <div class="si about-grid">
    <div>
      <span class="tag r">What is VEXAR</span>
      <h2 class="display r">Intelligence built<br>into every <span class="acc">journey</span></h2>
      <div class="rule r"></div>
      <div class="r d1" style="margin-top: .5rem;">
        <a href="about.html" class="btn-s" style="font-size:.7rem;">Learn More →</a>
      </div>
    </div>
    <div>
      <p class="prose r d1">VEXAR is focused on one problem: road safety still reacts too late. We're building systems that observe, understand, and respond to driving as it happens — combining real-time intelligence, behavioral analysis, and automated response into a single safety layer for fleets, insurers, and everyday mobility.</p>
      <div class="r d2" style="display:flex;gap:.6rem;flex-wrap:wrap;margin-top:2rem;">
        <span class="pill">Open for Pilots</span>
        <span class="pill">Bengaluru, India</span>
      </div>
    </div>
  </div>
</section>

<!-- THE PROBLEM -->
<section id="problem">
  <div class="si">
    <div class="problem-grid">
      <div>
        <span class="tag r">The Problem</span>
        <h2 class="display r">The problem isn't<br>visibility. It's <span class="acc">timing.</span></h2>
        <div class="rule r"></div>
        <div class="problem-copy r d1">
          <p>Modern vehicles already generate plenty of data — dashcams record, telematics track — but none of it intervenes when it matters most. Accidents are still detected too late, decisions are still reactive, and response is still delayed. Safety today is passive. That's the gap VEXAR exists to close.</p>
        </div>
      </div>
      <div class="stat-col r d2">
        <div class="stat-item">
          <div class="stat-n">1.35<b>M</b></div>
          <div class="stat-l">Lives lost on roads every year — globally</div>
        </div>
        <div class="stat-item">
          <div class="stat-n">94<b>%</b></div>
          <div class="stat-l">Of crashes caused by human behavioural factors</div>
        </div>
        <div class="stat-item">
          <div class="stat-n">$1.8<b>T</b></div>
          <div class="stat-l">Annual economic cost of road accidents worldwide</div>
        </div>
        <div class="stat-item">
          <div class="stat-n">&lt;3<b>%</b></div>
          <div class="stat-l">Fleet operators with AI-grade real-time safety monitoring</div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- WHAT WE'RE BUILDING -->
<section id="building">
  <div class="si">
    <div class="build-header">
      <span class="tag r">What We're Building</span>
      <h2 class="display r">Four pillars of<br><span class="acc">intelligent safety</span></h2>
    </div>
    <div class="pillars-grid">
      <div class="card r">
        <span class="pillar-n">01</span>
        <div class="card-icon"><svg viewBox="0 0 24 24"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2"/><path d="M12 6v6l4 2"/></svg></div>
        <h3>Real-Time Driving Intelligence</h3>
        <p>Systems that continuously interpret driving behavior, not just record it.</p>
      </div>
      <div class="card r d1">
        <span class="pillar-n">02</span>
        <div class="card-icon"><svg viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></div>
        <h3>Crash Detection &amp; Response</h3>
        <p>Immediate recognition of impact events with automated emergency signaling.</p>
      </div>
      <div class="card r d2">
        <span class="pillar-n">03</span>
        <div class="card-icon"><svg viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg></div>
        <h3>Behavioral Risk Analysis</h3>
        <p>Understanding patterns that lead to accidents — before they happen.</p>
      </div>
      <div class="card r d3">
        <span class="pillar-n">04</span>
        <div class="card-icon"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg></div>
        <h3>Integrated Safety Layer</h3>
        <p>A unified system designed to plug into fleets, insurers, and mobility platforms.</p>
      </div>
    </div>
    <div class="r" style="margin-top:2.5rem; text-align:center;">
      <a href="technology.html" class="btn-s">Explore Technology →</a>
    </div>
  </div>
</section>

<!-- WHO IT'S FOR -->
<section id="who">
  <div class="si">
    <div class="who-header">
      <span class="tag r">Who It's For</span>
      <h2 class="display r">Designed for systems<br>that <span class="acc">move people</span></h2>
    </div>
    <div class="who-grid">
      <div class="who-card r">
        <div class="who-ico"><svg viewBox="0 0 24 24"><rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 4v4h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg></div>
        <h3>Fleets</h3>
        <p>Reduce risk, monitor behavior, and move from reactive safety to real-time control.</p>
      </div>
      <div class="who-card r d1">
        <div class="who-ico"><svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div>
        <h3>Insurance</h3>
        <p>Move beyond static risk models toward dynamic, behavior-based understanding.</p>
      </div>
      <div class="who-card r d2">
        <div class="who-ico"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg></div>
        <h3>Mobility Ecosystems</h3>
        <p>Embed intelligence directly into the infrastructure of modern transportation.</p>
      </div>
    </div>
  </div>
</section>

<!-- CTA BAND -->
<section id="cta-band">
  <div class="cta-band-inner">
    <span class="tag r" style="display:block;">Start a Conversation</span>
    <h2 class="display r">Let's build safer mobility<br><span class="acc">together</span></h2>
    <p class="prose r d1">Open for fleet pilots, insurance collaboration, and strategic partnership.</p>
    <div class="hero-ctas r d2">
      <a href="contact.html" class="btn-p">Talk to Us</a>
      <a href="about.html" class="btn-s">Learn About VEXAR</a>
    </div>
  </div>
</section>

<!-- FOOTER -->
<footer>
  <div class="ft">
    <div class="ft-logo">
      <img src="assets/logo-white.png" alt="VEXAR">
      <p class="ft-tagline">VEXAR - Building intelligence into motion.</p>
      <div class="ft-socials" style="margin-top:.8rem;">
        <a href="https://x.com/VexarDrive" class="soc" aria-label="X" target="_blank" rel="noopener"><svg viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg></a>
        <a href="https://www.instagram.com/vexardrive/" class="soc" aria-label="Instagram" target="_blank" rel="noopener"><svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></a>
      </div>
    </div>
    <nav class="ft-nav" aria-label="Footer">
      <a href="index.html">Home</a>
      <a href="about.html">About</a>
      <a href="technology.html">Technology</a>
      <a href="vision.html">Vision</a>
      <a href="contact.html">Contact</a>
    </nav>
    <div class="ft-contact">
      <a href="mailto:contact@vexartech.in">contact@vexartech.in</a>
      <a href="tel:+919360498704">+91 93604 98704</a>
      <a href="tel:+917550195718">+91 75501 95718</a>
      <a href="https://vexartech.in" target="_blank">vexartech.in</a>
      <span style="font-size:.72rem;color:var(--muted);margin-top:.4rem;line-height:1.6;">Prestige Atlanta, 80 Feet Rd<br>Koramangala, Bengaluru — 560034</span>
    </div>
  </div>
  <div class="ft-copy">
    <span>© 2026 VexarDrive Technologies Private Limited. All rights reserved.</span>
    <span>AI Driver Safety · Crash Detection · Intelligent Mobility</span>
  </div>
</footer>

<script src="vexar.js"></script>
</body>
</html>
```

- [ ] **Step 3: Verify**

Run:
```bash
grep -n "hero-canvas\|class=\"cur\"\|admin.html\|LinkedIn\|Join the Journey\|Invest in the future\|Early Stage" index.html
```
Expected: no output.

```bash
grep -n "Talk to Us\|See the Technology\|x.com/VexarDrive\|instagram.com/vexardrive" index.html
```
Expected: matches for all four.

Open `index.html` directly in a browser (double-click or `file://` path) and confirm: light background, logo renders in its natural black/blue colors, hero has no canvas animation, nav becomes opaque on scroll, mobile hamburger menu opens/closes below 768px width, all nav links work.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "$(cat <<'EOF'
Redesign index.html as a professional landing page

Removes the animated particle hero, verse-style copy, and dead
CSS left over from an earlier page layout. Rewrites the problem/about
sections as plain prose and tightens CTAs toward customers.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 4: Rewrite `about.html`

**Files:**
- Modify: `about.html`

**Interfaces:**
- Consumes: tokens from Task 1.
- Produces: nothing consumed by other tasks.

- [ ] **Step 1: Replace the entire page-specific `<style>` block**

Find the block from `<style>` through `</style>` in the `<head>` and replace with:
```html
<style>
.about-hero-grid { display:grid; grid-template-columns:1fr 1fr; gap:6rem; align-items:start; }
.problem-block { background:var(--bg2); border-left:2px solid var(--blue); padding:2.5rem; margin-top:3rem; }
.problem-block p { font-size:1rem; line-height:2; color:var(--text); }
.problem-block p.dim { color:var(--muted); }
.problem-block p.closer { color:var(--blue); font-weight:600; }
.matters-list { margin-top:2rem; display:flex; flex-direction:column; gap:2rem; }
.matters-item { display:flex; gap:1.5rem; align-items:flex-start; }
.matters-icon { width:42px; height:42px; border:1px solid var(--border); background:var(--blue-b); display:flex; align-items:center; justify-content:center; flex-shrink:0; transition:all .3s; }
.matters-item:hover .matters-icon { border-color:var(--blue); background:var(--blue-d); }
.matters-icon svg { width:16px; height:16px; stroke:var(--blue); fill:none; stroke-width:1.5; }
.matters-text h4 { font-family:var(--ff-d); font-size:.96rem; font-weight:700; color:var(--white); margin-bottom:.3rem; }
.matters-text p { font-size:.85rem; color:var(--muted); line-height:1.75; }
.cred-section { background:var(--bg2); }
.cred-inner { display:grid; grid-template-columns:1fr 1fr; gap:5rem; align-items:start; }
.sigs { display:flex; flex-direction:column; gap:1px; background:var(--border); }
.sig { background:var(--bg2); display:flex; align-items:flex-start; gap:1.2rem; padding:1.5rem 1.4rem; border-left:2px solid transparent; transition:border-left-color .3s,background .3s; }
.sig:hover { border-left-color:var(--blue); background:var(--surface); }
.sig-dot { width:6px; height:6px; background:var(--blue); border-radius:50%; flex-shrink:0; margin-top:.55rem; }
.sig-text h5 { font-family:var(--ff-d); font-size:.92rem; font-weight:700; color:var(--white); margin-bottom:.25rem; }
.sig-text p { font-size:.82rem; color:var(--muted); line-height:1.65; }
.founders-note { margin-top:2.5rem; padding:2rem; border:1px solid var(--border); background:var(--blue-b); }
.founders-note blockquote { font-size:.88rem; color:var(--text); line-height:1.85; font-style:italic; margin-bottom:.8rem; }
.founders-note cite { font-size:.62rem; letter-spacing:.18em; text-transform:uppercase; color:var(--blue); font-style:normal; }
.leaders-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:1px; background:var(--border); border:1px solid var(--border); margin-top:3rem; }
.leader-card { background:var(--surface); padding:2.2rem 2rem; text-align:center; transition:background .3s; }
.leader-card:hover { background:var(--bg2); }
.leader-card h4 { font-family:var(--ff-d); font-size:1rem; font-weight:700; color:var(--white); margin-bottom:.3rem; }
.leader-card p { font-size:.78rem; letter-spacing:.08em; text-transform:uppercase; color:var(--blue); }
@media(max-width:1024px){ .about-hero-grid,.cred-inner{grid-template-columns:1fr;gap:3rem} }
@media(max-width:768px){ .leaders-grid{grid-template-columns:1fr} }
</style>
```

- [ ] **Step 2: Replace the body**

Find everything from `<body>` through `</html>` and replace with:
```html
<body>
<nav id="nav">
  <a href="index.html" class="nav-logo"><img src="assets/logo-white.png" alt="VEXAR"></a>
  <ul class="nav-links">
    <li><a href="index.html">Home</a></li>
    <li><a href="about.html">About</a></li>
    <li><a href="technology.html">Technology</a></li>
    <li><a href="vision.html">Vision</a></li>
  </ul>
  <a href="contact.html" class="nav-contact">Contact</a>
  <button class="hbg" id="hbg" aria-label="Menu"><span></span><span></span><span></span></button>
</nav>
<div class="mob" id="mob">
  <a href="index.html">Home</a><a href="about.html">About</a>
  <a href="technology.html">Technology</a><a href="vision.html">Vision</a>
  <a href="contact.html">Contact</a>
</div>

<main class="page">

  <div class="page-hero">
    <div class="si">
      <span class="tag r" style="display:block;">About VEXAR</span>
      <h1 class="display r" style="max-width:700px;">What is VEXAR</h1>
      <div class="rule r"></div>
    </div>
  </div>

  <section>
    <div class="si about-hero-grid">
      <div>
        <p class="prose r" style="font-size:1.1rem;">
          VEXAR is an early-stage technology company focused on one problem: road safety still reacts too late.
        </p>
        <p class="prose r d1">We're building systems that observe, understand, and respond to driving as it happens — not after something goes wrong.</p>
        <p class="prose r d2">Our approach combines real-time intelligence, behavioral analysis, and automated response into a single layer of safety that can integrate across fleets, insurance, and everyday mobility.</p>
        <div class="r d3" style="display:flex;gap:.6rem;flex-wrap:wrap;margin-top:2rem;">
          <span class="pill">Open for Pilots</span>
          <span class="pill">Koramangala, Bengaluru</span>
          <span class="pill">VexarDrive Technologies Pvt. Ltd.</span>
        </div>
      </div>
      <div>
        <div class="stat-grid r d1">
          <div class="stat-cell">
            <div class="stat-n">1.35<span>M</span></div>
            <div class="stat-l">Road deaths annually</div>
          </div>
          <div class="stat-cell">
            <div class="stat-n">94<span>%</span></div>
            <div class="stat-l">Caused by human error</div>
          </div>
          <div class="stat-cell">
            <div class="stat-n">$1.8<span>T</span></div>
            <div class="stat-l">Global economic cost</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <div class="sec-divider"></div>

  <section style="background:var(--bg2);">
    <div class="si">
      <span class="tag r">The Problem</span>
      <h2 class="display r" style="max-width:640px;">The problem isn't visibility.<br>It's <span class="acc">timing.</span></h2>
      <div class="rule r"></div>
      <div class="problem-block r d1">
        <p>Modern vehicles already generate plenty of data. Dashcams record. Telematics track. But none of it intervenes when it matters most — accidents are still detected too late, decisions are still reactive, and response is still delayed.</p>
        <p class="dim" style="margin-top:1rem;">Safety today is passive.</p>
        <p class="closer" style="margin-top:1rem;">That's the gap VEXAR exists to close.</p>
      </div>
    </div>
  </section>

  <div class="sec-divider"></div>

  <section>
    <div class="si">
      <span class="tag r">Why This Matters</span>
      <h2 class="display r" style="max-width:600px;">Every delay<br>compounds <span class="acc">risk.</span></h2>
      <div class="rule r"></div>
      <div class="matters-list">
        <div class="matters-item r d1">
          <div class="matters-icon"><svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 015.11 15 19.79 19.79 0 012.04 6.37 2 2 0 014 4h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 11.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg></div>
          <div class="matters-text">
            <h4>A second too late in detection</h4>
            <p>The window between a dangerous situation and a collision is often measured in fractions of a second. Current systems don't operate at that speed. VEXAR does.</p>
          </div>
        </div>
        <div class="matters-item r d2">
          <div class="matters-icon"><svg viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg></div>
          <div class="matters-text">
            <h4>A missed pattern in behavior</h4>
            <p>Accidents rarely come from nowhere. They come from patterns — driver fatigue, distraction, aggression — that build invisibly over time. Identifying them requires intelligence, not just recording.</p>
          </div>
        </div>
        <div class="matters-item r d3">
          <div class="matters-icon"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg></div>
          <div class="matters-text">
            <h4>A system that observes but doesn't act</h4>
            <p>Road safety isn't just about information — it's about intervention. VEXAR is built to close that gap.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <div class="sec-divider"></div>

  <section class="cred-section">
    <div class="si cred-inner">
      <div>
        <span class="tag r">Where We Are</span>
        <h2 class="display r" style="max-width:480px;">Early, focused, and<br><span class="acc">building for scale</span></h2>
        <div class="rule r"></div>
        <p class="prose r d1">We're an early-stage company, based in Bengaluru, building the core intelligence systems behind VEXAR. We're building deliberately — validating the technology through pilots before scaling — because the problems we're solving are urgent and long-term at once.</p>
        <div class="sigs r d2" style="margin-top:2rem;">
          <div class="sig">
            <div class="sig-dot"></div>
            <div class="sig-text">
              <h5>Early-stage, focused on building core intelligence systems</h5>
              <p>We're building from first principles, prioritizing a solid foundation over rushed features.</p>
            </div>
          </div>
          <div class="sig">
            <div class="sig-dot"></div>
            <div class="sig-text">
              <h5>Actively exploring pilot opportunities and partnerships</h5>
              <p>Open to conversations with fleet operators, insurers, and strategic partners.</p>
            </div>
          </div>
          <div class="sig">
            <div class="sig-dot"></div>
            <div class="sig-text">
              <h5>Designed with long-term integration and scale in mind</h5>
              <p>Every architectural decision is made for scale — not just an early demo.</p>
            </div>
          </div>
          <div class="sig">
            <div class="sig-dot"></div>
            <div class="sig-text">
              <h5>Built with a clear focus on real-world deployment</h5>
              <p>VEXAR is designed for roads, fleets, and lives — not just experimentation.</p>
            </div>
          </div>
        </div>
      </div>
      <div class="r d2">
        <div style="display:flex;flex-direction:column;gap:.7rem;margin-bottom:2rem;">
          <div class="badge-live"><div class="dot"></div><span>Core systems — actively in development</span></div>
          <div class="badge-live"><div class="dot"></div><span>Open for fleet pilot partnerships</span></div>
          <div class="badge-live"><div class="dot"></div><span>Insurance co-development welcome</span></div>
          <div class="badge-live"><div class="dot"></div><span>Direct, founder-level engagement for early partners</span></div>
        </div>
        <div class="founders-note">
          <blockquote>"We are at the beginning of making roads intelligent. VEXAR exists to ensure that intelligence is, above all else, safe."</blockquote>
          <cite>— VEXAR Founding Team</cite>
        </div>
        <div style="margin-top:1.5rem;">
          <a href="contact.html" class="btn-p">Work With Us</a>
        </div>
      </div>
    </div>
  </section>

  <div class="sec-divider"></div>

  <section>
    <div class="si">
      <span class="tag r" style="display:block;">Leadership</span>
      <h2 class="display r" style="max-width:520px;">Who's building <span class="acc">VEXAR</span></h2>
      <div class="rule r"></div>
      <div class="leaders-grid">
        <div class="leader-card r"><h4>Vaibhav Raj Dikshit</h4><p>Director</p></div>
        <div class="leader-card r d1"><h4>Shriram Venugopalakrishnan</h4><p>Director</p></div>
        <div class="leader-card r d2"><h4>Dharshini Nagarajan</h4><p>Director</p></div>
      </div>
    </div>
  </section>

</main>

<footer>
  <div class="ft">
    <div class="ft-logo">
      <img src="assets/logo-white.png" alt="VEXAR">
      <p class="ft-tagline">VEXAR — Building intelligence into motion.</p>
      <div class="ft-socials">
        <a href="https://x.com/VexarDrive" class="soc" aria-label="X" target="_blank" rel="noopener"><svg viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg></a>
        <a href="https://www.instagram.com/vexardrive/" class="soc" aria-label="Instagram" target="_blank" rel="noopener"><svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></a>
      </div>
    </div>
    <nav class="ft-nav"><a href="index.html">Home</a><a href="about.html">About</a><a href="technology.html">Technology</a><a href="vision.html">Vision</a><a href="contact.html">Contact</a></nav>
    <div class="ft-contact">
      <a href="mailto:contact@vexartech.in">contact@vexartech.in</a>
      <a href="tel:+919360498704">+91 93604 98704</a>
      <a href="tel:+917550195718">+91 75501 95718</a>
      <a href="https://vexartech.in" target="_blank">vexartech.in</a>
    </div>
  </div>
  <div class="ft-copy">
    <span>© 2026 VexarDrive Technologies Private Limited. All rights reserved.</span>
    <span>AI Driver Safety · Intelligent Mobility</span>
  </div>
</footer>
<script src="vexar.js"></script>
</body>
</html>
```

- [ ] **Step 3: Verify**

Run:
```bash
grep -n "rgba(239,244,255\|class=\"cur\"\|LinkedIn\|Early Stage\|VEXAR Founding Team" about.html
```
Expected: no match for the first four patterns; one match for "VEXAR Founding Team" (the retained quote attribution).

```bash
grep -n "Vaibhav Raj Dikshit\|Shriram Venugopalakrishnan\|Dharshini Nagarajan" about.html
```
Expected: one match each.

Open `about.html` in a browser and confirm the Leadership section renders as a 3-card row (stacking to 1 column below 768px).

- [ ] **Step 4: Commit**

```bash
git add about.html
git commit -m "$(cat <<'EOF'
Redesign about.html and add a Leadership section

Rewrites the credibility section out of investor-pitch tone into
grounded factual copy, and adds a Leadership section naming the
three company directors instead of an anonymous founder quote.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 5: Rewrite `technology.html`

**Files:**
- Modify: `technology.html`

**Interfaces:**
- Consumes: tokens from Task 1. No style-block changes needed — this file has no hardcoded dark-theme colors.

- [ ] **Step 1: Remove the cursor divs**

Find:
```html
<div class="cur" id="C"></div><div class="cur-r" id="CR"></div>

<nav id="nav">
```
Replace with:
```html
<nav id="nav">
```

- [ ] **Step 2: Remove the four dramatic italic taglines from the pillar cards**

Find:
```html
          <p style="margin-top:1rem;font-size:.82rem;color:rgba(68,85,102,.6);font-style:italic;">Not a dashcam. An intelligence layer.</p>
```
Delete it (replace with nothing).

Find:
```html
          <p style="margin-top:1rem;font-size:.82rem;color:rgba(68,85,102,.6);font-style:italic;">Detection in milliseconds. Response in seconds.</p>
```
Delete it.

Find:
```html
          <p style="margin-top:1rem;font-size:.82rem;color:rgba(68,85,102,.6);font-style:italic;">Predictive, not reactive.</p>
```
Delete it.

Find:
```html
          <p style="margin-top:1rem;font-size:.82rem;color:rgba(68,85,102,.6);font-style:italic;">Infrastructure, not a product add-on.</p>
```
Delete it.

- [ ] **Step 3: Verify**

Run:
```bash
grep -n "class=\"cur\"\|font-style:italic\|rgba(68,85,102" technology.html
```
Expected: no output.

Open `technology.html` in a browser and confirm all four pillar cards still render cleanly (title + one paragraph, no trailing italic line) and colors match the new light theme (inherited automatically from `vexar.css`).

- [ ] **Step 4: Commit**

```bash
git add technology.html
git commit -m "$(cat <<'EOF'
Clean up technology.html for the light theme

Removes the cursor-follower markup and the dramatic italic taglines
on each pillar card. No content restructuring needed — this page's
styling already flowed entirely through vexar.css tokens.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 6: Rewrite `vision.html`

**Files:**
- Modify: `vision.html`

**Interfaces:**
- Consumes: tokens from Task 1.

- [ ] **Step 1: Replace the entire page-specific `<style>` block**

Find the block from `<style>` through `</style>` and replace with:
```html
<style>
.market-copy { max-width:640px; }
.arc-grid { display:grid; grid-template-columns:1fr 1fr; gap:1px; background:var(--border); border:1px solid var(--border); }
.arc-cell { background:var(--surface); padding:2.8rem 2.5rem; transition:background .3s,border-left-color .3s; border-left:2px solid transparent; }
.arc-cell:hover { background:var(--bg2); border-left-color:var(--blue); }
.arc-num { font-size:.58rem; letter-spacing:.25em; color:rgba(26,111,255,.5); font-family:var(--ff-d); display:block; margin-bottom:1.2rem; }
.arc-cell h3 { font-family:var(--ff-d); font-size:1.1rem; font-weight:700; color:var(--white); margin-bottom:.55rem; letter-spacing:-.01em; }
.arc-cell p { font-size:.86rem; color:var(--muted); line-height:1.75; }
@media(max-width:768px){ .arc-grid{ grid-template-columns:1fr; } }
</style>
```

- [ ] **Step 2: Replace the body**

Find everything from `<body>` through `</html>` and replace with:
```html
<body>
<nav id="nav">
  <a href="index.html" class="nav-logo"><img src="assets/logo-white.png" alt="VEXAR"></a>
  <ul class="nav-links">
    <li><a href="index.html">Home</a></li>
    <li><a href="about.html">About</a></li>
    <li><a href="technology.html">Technology</a></li>
    <li><a href="vision.html">Vision</a></li>
  </ul>
  <a href="contact.html" class="nav-contact">Contact</a>
  <button class="hbg" id="hbg" aria-label="Menu"><span></span><span></span><span></span></button>
</nav>
<div class="mob" id="mob">
  <a href="index.html">Home</a><a href="about.html">About</a>
  <a href="technology.html">Technology</a><a href="vision.html">Vision</a>
  <a href="contact.html">Contact</a>
</div>

<main class="page">

  <div class="page-hero">
    <div class="si">
      <span class="tag r" style="display:block;">Our Vision</span>
      <h1 class="display r" style="max-width:700px;">The future of safety<br>isn't <span class="acc">reactive</span></h1>
      <div class="rule r"></div>
    </div>
  </div>

  <section>
    <div class="si">
      <span class="tag r">Where We're Headed</span>
      <h2 class="display r" style="max-width:640px;">From reporting to <span class="acc">understanding</span></h2>
      <div class="rule r"></div>
      <p class="prose r d1" style="max-width:640px;">The mobility industry is shifting — from systems that report after the fact to systems that understand in the moment, from delayed response to immediate action, from fragmented tools to a single, unified safety layer across mobility. VEXAR is built for that shift, and we're building it alongside the fleets, insurers, and mobility partners who will use it every day.</p>
    </div>
  </section>

  <div class="sec-divider"></div>

  <section style="background:var(--bg2);">
    <div class="si">
      <span class="tag r">Why Now</span>
      <h2 class="display r" style="max-width:600px;">The conditions for<br><span class="acc">real-time safety</span> finally exist</h2>
      <div class="rule r"></div>
      <p class="prose market-copy r d1">AI, connected vehicles, and regulatory pressure are converging at once. Vehicles are more instrumented than ever, the compute needed to interpret their data in real time is finally affordable, and regulators and insurers alike are pushing for safety systems that do more than record. VEXAR exists to meet that moment.</p>
    </div>
  </section>

  <div class="sec-divider"></div>

  <section>
    <div class="si">
      <span class="tag r">How We Work With Partners</span>
      <h2 class="display r" style="max-width:600px;">What to expect, from<br><span class="acc">pilot to scale</span></h2>
      <div class="rule r"></div>
      <p class="prose r d1" style="max-width:560px;margin-bottom:3rem;">Working with VEXAR follows a deliberate path — proving value early, then integrating and scaling on your timeline.</p>
      <div class="arc-grid">
        <div class="arc-cell r d1">
          <span class="arc-num">Step 01</span>
          <h3>Pilot</h3>
          <p>We start with a focused pilot on a subset of your fleet, validating real-time detection and response in your actual operating conditions.</p>
        </div>
        <div class="arc-cell r d2">
          <span class="arc-num">Step 02</span>
          <h3>Integration</h3>
          <p>Once validated, VEXAR integrates into your existing fleet management, telematics, or insurance workflows — an addition, not a replacement.</p>
        </div>
        <div class="arc-cell r d3">
          <span class="arc-num">Step 03</span>
          <h3>Scale</h3>
          <p>We expand across your full fleet or portfolio, with the intelligence layer improving as it sees more real-world driving data.</p>
        </div>
        <div class="arc-cell r d4">
          <span class="arc-num">Step 04</span>
          <h3>Ongoing Partnership</h3>
          <p>We stay engaged after deployment, refining detection models and response protocols alongside your team.</p>
        </div>
      </div>
    </div>
  </section>

  <div class="sec-divider"></div>

  <section style="text-align:center;padding:clamp(5rem,10vh,8rem) 6%;">
    <div class="si" style="max-width:680px;">
      <span class="tag r" style="display:block;">Let's Talk</span>
      <h2 class="display r">Start a conversation about<br><span class="acc">your fleet</span></h2>
      <p class="prose r d1" style="margin:.8rem auto 2.5rem;max-width:500px;color:var(--muted);">We're in active conversations with fleet operators, insurers, and mobility partners exploring what real-time safety intelligence looks like for their operations. If that's you, let's talk.</p>
      <a href="contact.html" class="btn-p r d2">Talk to Our Team</a>
    </div>
  </section>

</main>

<footer>
  <div class="ft">
    <div class="ft-logo"><img src="assets/logo-white.png" alt="VEXAR"><p class="ft-tagline">VEXAR — Building intelligence into motion.</p></div>
    <nav class="ft-nav"><a href="index.html">Home</a><a href="about.html">About</a><a href="technology.html">Technology</a><a href="vision.html">Vision</a><a href="contact.html">Contact</a></nav>
    <div class="ft-contact"><a href="mailto:contact@vexartech.in">contact@vexartech.in</a><a href="tel:+919360498704">+91 93604 98704</a><a href="https://vexartech.in" target="_blank">vexartech.in</a></div>
  </div>
  <div class="ft-copy"><span>© 2026 VexarDrive Technologies Private Limited. All rights reserved.</span></div>
</footer>
<script src="vexar.js"></script>
</body>
</html>
```

- [ ] **Step 3: Verify**

Run:
```bash
grep -n "vision-cinematic\|vc-glow\|market-grid\|Phase 0\|\\$50B\|4.5B\|12×\|Invest in the future\|Join the Journey\|class=\"cur\"" vision.html
```
Expected: no output.

```bash
grep -n "Pilot</h3>\|Integration</h3>\|Scale</h3>\|Ongoing Partnership</h3>" vision.html
```
Expected: one match each.

Open `vision.html` in a browser and confirm the 4-step "pilot to scale" grid renders as a 2×2 grid (1 column below 768px), and there is no market-size stat row or investor CTA anywhere on the page.

- [ ] **Step 4: Commit**

```bash
git add vision.html
git commit -m "$(cat <<'EOF'
Rewrite vision.html for a customer audience

Replaces the cinematic verse intro and investor market-sizing/roadmap
content with plain prose on industry direction and a customer-facing
"pilot to scale" partnership path. Drops all investor-pitch framing
and CTAs from the page.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 7: Update `contact.html`

**Files:**
- Modify: `contact.html`

**Interfaces:**
- Consumes: tokens from Task 1, the Formspree submit handler from Task 2 (relies on `contact-form`/`f-name`/`f-email`/`f-company`/`f-interest`/`f-message`/`form-btn`/`form-msg` IDs, all unchanged by this task).

- [ ] **Step 1: Remove the cursor divs**

Find:
```html
<div class="cur" id="C"></div><div class="cur-r" id="CR"></div>

<nav id="nav">
```
Replace with:
```html
<nav id="nav">
```

- [ ] **Step 2: Point the social icons at real profiles and drop LinkedIn**

Find:
```html
            <a href="#" class="soc" aria-label="LinkedIn" style="width:38px;height:38px;"><svg viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg></a>
            <a href="#" class="soc" aria-label="X" style="width:38px;height:38px;"><svg viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg></a>
            <a href="#" class="soc" aria-label="Instagram" style="width:38px;height:38px;"><svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></a>
```
Replace with:
```html
            <a href="https://x.com/VexarDrive" class="soc" aria-label="X" style="width:38px;height:38px;" target="_blank" rel="noopener"><svg viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg></a>
            <a href="https://www.instagram.com/vexardrive/" class="soc" aria-label="Instagram" style="width:38px;height:38px;" target="_blank" rel="noopener"><svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></a>
```

- [ ] **Step 3: Verify**

Run:
```bash
grep -n "class=\"cur\"\|aria-label=\"LinkedIn\"" contact.html
```
Expected: no output.

```bash
grep -n "x.com/VexarDrive\|instagram.com/vexardrive" contact.html
```
Expected: one match each.

- [ ] **Step 4: Commit**

```bash
git add contact.html
git commit -m "$(cat <<'EOF'
Fix contact.html social links and remove cursor markup

Points X/Instagram icons at real profiles, drops the LinkedIn icon
(no profile exists yet), and removes the cursor-follower divs. Page
already used token-based styling so no theme changes were needed.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 8: Site-wide verification pass

**Files:** none (verification only — no code changes expected; if this step finds a problem, fix it in the relevant file and re-run this task).

- [ ] **Step 1: Confirm no page still references removed dark-theme/cinematic artifacts**

Run:
```bash
grep -rn "class=\"cur\"\|hero-canvas\|initHeroCanvas\|mix-blend-mode\|Syne\|localStorage\|aria-label=\"LinkedIn\"" *.html vexar.css vexar.js
```
Expected: no output.

- [ ] **Step 2: Confirm the admin link is gone from the public site and every nav is consistent**

Run:
```bash
grep -l "admin.html" *.html
```
Expected: no output (admin.html itself doesn't self-reference, and no other page should link to it).

```bash
for f in index.html about.html technology.html vision.html contact.html; do echo "== $f =="; grep -c 'href="index.html"\|href="about.html"\|href="technology.html"\|href="vision.html"\|href="contact.html"' "$f"; done
```
Expected: each file reports at least 8 (nav + mobile menu + footer all present).

- [ ] **Step 3: Manual browser walkthrough**

Open each of `index.html`, `about.html`, `technology.html`, `vision.html`, `contact.html` directly in a browser (or via a simple static server, e.g. `python -m http.server` from the project root) and confirm for each:
- Light theme renders correctly with no leftover dark backgrounds or invisible text.
- Logo appears in its natural black/blue colors in the nav and footer.
- Clicking every nav link (desktop) and every mobile-menu link (resize below 768px, use the hamburger) lands on the correct page.
- No browser console errors.

- [ ] **Step 4: Live contact form test**

On `contact.html`, fill in Name, Email, and Message, then submit. Confirm the button shows "Sending…" then "Message Sent ✓", the note reads "Thank you — we'll be in touch shortly.", and the submission appears in the Formspree dashboard at `https://formspree.io/forms/mzdnoarz/submissions` (or the equivalent path in your Formspree account).

- [ ] **Step 5: Final commit (only if Steps 1–4 required fixes)**

If any fixes were needed, stage and commit them with a message describing what verification caught, e.g.:
```bash
git add -A
git commit -m "$(cat <<'EOF'
Fix issues found during redesign verification pass

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```
If no fixes were needed, skip this step — there is nothing to commit.
