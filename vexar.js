/* ============================================================
   VEXAR — Shared JavaScript
   ============================================================ */

(function () {
  'use strict';

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
  const nav = document.getElementById('nav');
  if (nav) {
    const check = () => nav.classList.toggle('stuck', window.scrollY > 30);
    check();
    window.addEventListener('scroll', check, { passive: true });
  }

  /* ── ACTIVE NAV LINK ── */
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-contact, .mob a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === 'index.html' && href === 'index.html') || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  /* ── HAMBURGER ── */
  const hbg = document.getElementById('hbg');
  const mob = document.getElementById('mob');
  if (hbg && mob) {
    hbg.addEventListener('click', () => {
      hbg.classList.toggle('open');
      mob.classList.toggle('open');
    });
    mob.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hbg.classList.remove('open');
        mob.classList.remove('open');
      });
    });
  }

  /* ── SCROLL REVEAL ── */
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('on'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.r').forEach(el => obs.observe(el));

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
