/* ============================================================
   VEXAR — Shared JavaScript
   ============================================================ */

(function () {
  'use strict';

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
