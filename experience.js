/* Experimental motion layer. Remove this file to return to the quieter concept. */
(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const clamp = (value, min = 0, max = 1) => Math.max(min, Math.min(max, value));
  const page = document.body.dataset.page;
  const main = document.querySelector('main');
  if (!main) return;

  // A slim reading progress indicator.
  const rail = document.createElement('div');
  rail.className = 'experience-progress';
  rail.setAttribute('aria-hidden', 'true');
  rail.innerHTML = '<span></span>';
  document.body.prepend(rail);

  // Individual panels enter in a short sequence as their section comes into view.
  if ('IntersectionObserver' in window && !reduceMotion.matches) {
    const panels = [...main.querySelectorAll('.audience-card,.feature-card,.founder,.capability,.grid-editorial,.go-editorial,.soft-panel,.cta-panel')];
    panels.forEach((panel, index) => {
      panel.classList.add('kinetic-panel');
      panel.style.setProperty('--enter-delay', `${(index % 4) * 85}ms`);
    });
    const panelObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        panelObserver.unobserve(entry.target);
      });
    }, { threshold: .1, rootMargin: '0px 0px -4% 0px' });
    panels.forEach(panel => panelObserver.observe(panel));
  }

  let scrollFrame = 0;
  function updateScroll() {
    scrollFrame = 0;
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    rail.style.setProperty('--scroll-progress', clamp(scrollY / maxScroll).toFixed(4));
    const bridge = document.querySelector('.story-bridge');
    if (bridge && !reduceMotion.matches) {
      const rect = bridge.getBoundingClientRect();
      const progress = clamp((innerHeight - rect.top) / (innerHeight + rect.height) * 1.5);
      bridge.style.setProperty('--bridge-lift', `${((1 - progress) * 18).toFixed(1)}px`);
      bridge.style.setProperty('--bridge-side-lift', `${((1 - progress) * 35).toFixed(1)}px`);
      bridge.style.setProperty('--bridge-ring-shift', `${(-progress * 65).toFixed(1)}px`);
      bridge.style.setProperty('--bridge-ring-scale', (0.85 + progress * .25).toFixed(3));
    }
  }
  addEventListener('scroll', () => {
    if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScroll);
  }, { passive: true });
  addEventListener('resize', updateScroll);
  updateScroll();

  // Depth follows the visitor's pointer across the moving route, below the copy.
  const hero = document.querySelector('.immersive-hero');
  if (hero && finePointer.matches && !reduceMotion.matches) {
    const stage = hero.querySelector('.mobility-stage');
    const beacon = document.createElement('span');
    beacon.className = 'hero-beacon';
    beacon.setAttribute('aria-hidden', 'true');
    hero.querySelector('.hero-motion-layer')?.append(beacon);
    hero.addEventListener('pointermove', event => {
      const rect = hero.getBoundingClientRect();
      const x = clamp((event.clientX - rect.left) / rect.width);
      const y = clamp((event.clientY - rect.top) / rect.height);
      stage?.style.setProperty('--pointer-x', `${((x - .5) * -34).toFixed(1)}px`);
      stage?.style.setProperty('--pointer-y', `${((y - .5) * -26).toFixed(1)}px`);
      beacon.style.left = `${(x * 100).toFixed(2)}%`;
      beacon.style.top = `${(y * 100).toFixed(2)}%`;
      beacon.classList.add('is-visible');
    });
    hero.addEventListener('pointerleave', () => {
      stage?.style.setProperty('--pointer-x', '0px');
      stage?.style.setProperty('--pointer-y', '0px');
      beacon.classList.remove('is-visible');
    });
  }

  // The existing four foundation points now drive one moving route illustration.
  const foundation = page === 'home' ? document.querySelector('.mini-list') : null;
  if (foundation) {
    const items = [...foundation.children];
    const visual = document.createElement('div');
    visual.className = 'foundation-route';
    visual.setAttribute('aria-hidden', 'true');
    visual.innerHTML = `<svg viewBox="0 0 680 175" preserveAspectRatio="xMidYMid meet">
      <path class="foundation-grid" d="M0 45H680M0 88H680M0 131H680M85 0V175M255 0V175M425 0V175M595 0V175"/>
      <path class="foundation-base" d="M38 123 C112 123 108 54 183 54 S277 127 350 127 S462 50 523 50 S601 94 641 73"/>
      <path class="foundation-active" d="M38 123 C112 123 108 54 183 54 S277 127 350 127 S462 50 523 50 S601 94 641 73" pathLength="100"/>
      <g class="foundation-nodes"><circle cx="38" cy="123" r="7"/><circle cx="183" cy="54" r="7"/><circle cx="350" cy="127" r="7"/><circle cx="523" cy="50" r="7"/></g>
      <circle class="foundation-marker" cx="38" cy="123" r="11"/>
    </svg><div class="foundation-readout"><span></span><span>VexarDrive</span></div>`;
    foundation.prepend(visual);
    const path = visual.querySelector('.foundation-base');
    const marker = visual.querySelector('.foundation-marker');
    const readout = visual.querySelector('.foundation-readout span');
    const pathLength = path.getTotalLength();
    const nodes = [...visual.querySelectorAll('.foundation-nodes circle')].map(node => ({
      x: Number(node.getAttribute('cx')),
      y: Number(node.getAttribute('cy'))
    }));
    const distanceToNode = (length, node) => {
      const point = path.getPointAtLength(length);
      return (point.x - node.x) ** 2 + (point.y - node.y) ** 2;
    };
    const stops = nodes.map(node => {
      const sampleCount = 160;
      let nearest = 0;
      for (let sample = 1; sample <= sampleCount; sample++) {
        const length = pathLength * sample / sampleCount;
        if (distanceToNode(length, node) < distanceToNode(nearest, node)) nearest = length;
      }
      const step = pathLength / sampleCount;
      let left = Math.max(0, nearest - step);
      let right = Math.min(pathLength, nearest + step);
      for (let pass = 0; pass < 20; pass++) {
        const first = left + (right - left) / 3;
        const second = right - (right - left) / 3;
        if (distanceToNode(first, node) < distanceToNode(second, node)) right = second;
        else left = first;
      }
      return (left + right) / 2;
    });
    let currentLength = stops[0];
    let markerFrame = 0;
    const placeMarker = (length, node) => {
      const point = node || path.getPointAtLength(length);
      marker.setAttribute('cx', point.x.toFixed(2));
      marker.setAttribute('cy', point.y.toFixed(2));
      foundation.style.setProperty('--route-progress', (length / pathLength * 100).toFixed(4));
    };
    const activate = index => {
      cancelAnimationFrame(markerFrame);
      const start = currentLength;
      const target = stops[index];
      if (reduceMotion.matches || Math.abs(target - start) < .01) {
        currentLength = target;
        placeMarker(target, nodes[index]);
      } else {
        const started = performance.now();
        const animateMarker = now => {
          const progress = clamp((now - started) / 700);
          const eased = 1 - (1 - progress) ** 3;
          currentLength = start + (target - start) * eased;
          placeMarker(currentLength);
          if (progress < 1) markerFrame = requestAnimationFrame(animateMarker);
          else placeMarker(target, nodes[index]);
        };
        markerFrame = requestAnimationFrame(animateMarker);
      }
      
      items.forEach((item, i) => item.classList.toggle('is-active', i === index));
    };
    items.forEach((item, index) => {
      item.tabIndex = 0;
      item.setAttribute('role', 'button');
      item.setAttribute('aria-label', `Explore ${item.querySelector('strong')?.textContent || `point ${index + 1}`}`);
      item.addEventListener('pointerenter', () => activate(index));
      item.addEventListener('focus', () => activate(index));
      item.addEventListener('click', () => activate(index));
      item.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); activate(index); }
      });
    });
    activate(0);
  }

  // Cards lean gently toward the pointer and settle when the pointer leaves.
  if (finePointer.matches && !reduceMotion.matches) {
    document.querySelectorAll('.carousel-track > .product-card').forEach(card => {
      card.addEventListener('pointermove', event => {
        const rect = card.getBoundingClientRect();
        const x = clamp((event.clientX - rect.left) / rect.width);
        const y = clamp((event.clientY - rect.top) / rect.height);
        card.style.setProperty('--tilt-x', `${((.5 - y) * 4).toFixed(2)}deg`);
        card.style.setProperty('--tilt-y', `${((x - .5) * 5).toFixed(2)}deg`);
        card.style.setProperty('--shine-x', `${(x * 100).toFixed(1)}%`);
        card.style.setProperty('--shine-y', `${(y * 100).toFixed(1)}%`);
      });
      card.addEventListener('pointerleave', () => {
        card.style.setProperty('--tilt-x', '0deg');
        card.style.setProperty('--tilt-y', '0deg');
      });
    });
  }

  // Scroll or choose any VexarGrid workflow step to direct the illustration.
  document.querySelectorAll('.workflow-story .story-step').forEach(step => {
    step.tabIndex = 0;
    step.setAttribute('role', 'button');
    step.setAttribute('aria-label', `Show ${step.querySelector('h3')?.textContent || 'workflow step'}`);
    const moveToStep = () => {
      const visual = document.querySelector('.workflow-story .story-visual');
      const target = innerWidth <= 760
        ? Math.min(innerHeight - 60, (visual?.getBoundingClientRect().bottom || 0) + 66)
        : innerHeight * .48;
      const rect = step.getBoundingClientRect();
      window.scrollTo({
        top: scrollY + rect.top + rect.height / 2 - target,
        behavior: reduceMotion.matches ? 'instant' : 'smooth'
      });
    };
    step.addEventListener('click', moveToStep);
    step.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); moveToStep(); }
    });
  });

})();
