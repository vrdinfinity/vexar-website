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

  /* ── HERO PARALLAX ── */
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let ticking = false;
    const updateParallax = () => {
      heroBg.style.transform = `translateY(${window.scrollY * 0.15}px)`;
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (!ticking) { requestAnimationFrame(updateParallax); ticking = true; }
    }, { passive: true });
  }

  /* ── HERO 3D SCENE (lazy, desktop only) ── */
  (function () {
    const canvas = document.getElementById('hero3d');
    if (!canvas) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || window.innerWidth < 900 || !window.WebGLRenderingContext) return;

    const start = () => {
      import('https://unpkg.com/three@0.160.0/build/three.module.js').then(THREE => {
        const hero = document.getElementById('hero');
        if (!hero) return;
        let width = hero.clientWidth, height = hero.clientHeight;

        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        renderer.setSize(width, height);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
        camera.position.z = 6;

        const geo = new THREE.IcosahedronGeometry(2.1, 1);
        const mat = new THREE.MeshBasicMaterial({ color: 0x1a6fff, wireframe: true, transparent: true, opacity: 0.5 });
        const mesh = new THREE.Mesh(geo, mat);
        scene.add(mesh);

        let mouseX = 0, mouseY = 0;
        window.addEventListener('mousemove', e => {
          mouseX = (e.clientX / window.innerWidth) - 0.5;
          mouseY = (e.clientY / window.innerHeight) - 0.5;
        }, { passive: true });

        let visible = true;
        new IntersectionObserver(entries => { visible = entries[0].isIntersecting; }, { threshold: 0 }).observe(hero);

        window.addEventListener('resize', () => {
          if (window.innerWidth < 900) return;
          width = hero.clientWidth; height = hero.clientHeight;
          camera.aspect = width / height; camera.updateProjectionMatrix();
          renderer.setSize(width, height);
        }, { passive: true });

        const clock = new THREE.Clock();
        (function animate() {
          requestAnimationFrame(animate);
          if (!visible) return;
          const t = clock.getElapsedTime();
          mesh.rotation.x = t * 0.08 + mouseY * 0.4;
          mesh.rotation.y = t * 0.11 + mouseX * 0.4;
          renderer.render(scene, camera);
        })();

        canvas.classList.add('on');
      }).catch(() => {});
    };

    if ('requestIdleCallback' in window) {
      window.addEventListener('load', () => requestIdleCallback(start, { timeout: 2000 }));
    } else {
      window.addEventListener('load', () => setTimeout(start, 300));
    }
  })();

  /* ── CARD TILT (desktop only) ── */
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    document.querySelectorAll('.card, .who-card, .leader-card').forEach(el => {
      el.style.transformStyle = 'preserve-3d';
      el.style.willChange = 'transform';
      const strength = 8;
      el.addEventListener('mousemove', e => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        el.style.transition = 'transform .1s ease-out';
        el.style.transform = `perspective(800px) rotateX(${(-py * strength).toFixed(2)}deg) rotateY(${(px * strength).toFixed(2)}deg) translateY(-5px)`;
      }, { passive: true });
      el.addEventListener('mouseleave', () => {
        el.style.transition = 'transform .5s ease';
        el.style.transform = '';
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
