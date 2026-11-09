/* Original, browser-native motion graphics for the local VexarDrive concept. */
(() => {
  const vehicle = (route, duration, offset, tone = 'light') => `
    <g class="moving-vehicle vehicle-${tone}" data-route="${route}" data-duration="${duration}" data-offset="${offset}">
      <rect class="vehicle-shadow" x="-22" y="-12" width="44" height="24" rx="9"/>
      <rect class="vehicle-body" x="-18" y="-9" width="36" height="18" rx="7"/>
      <rect class="vehicle-glass" x="-3" y="-7" width="10" height="14" rx="3"/>
      <circle class="vehicle-lamp" cx="15" cy="-5" r="2"/><circle class="vehicle-lamp" cx="15" cy="5" r="2"/>
    </g>`;

  const truckVehicle = (route, duration, offset, small = false) => `
    <g class="moving-vehicle overpass-truck${small ? ' small-truck' : ''}" data-route="${route}" data-duration="${duration}" data-offset="${offset}">
      <g transform="scale(${small ? '.72' : '1'})">
        <rect class="truck-shadow" x="-47" y="-17" width="90" height="34" rx="8"/>
        <rect class="truck-trailer" x="-45" y="-14" width="56" height="28" rx="5"/>
        <path class="truck-roof" d="M-37 -9H1M-37 9H1"/>
        <rect class="truck-cab" x="13" y="-13" width="28" height="26" rx="6"/>
        <rect class="truck-windscreen" x="27" y="-10" width="8" height="20" rx="3"/>
        <circle class="truck-lamp" cx="39" cy="-8" r="2"/><circle class="truck-lamp" cx="39" cy="8" r="2"/>
      </g>
    </g>`;

  const homeScene = `
    <div class="mobility-stage">
      <svg class="mobility-map bridge-scene" viewBox="0 0 1440 760" preserveAspectRatio="xMidYMid slice" focusable="false" aria-hidden="true">
        <defs>
          <linearGradient id="home-night" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#151c20"/><stop offset="1" stop-color="#26363b"/></linearGradient>
          <pattern id="map-grid" width="72" height="72" patternUnits="userSpaceOnUse"><path d="M72 0H0V72" fill="none" stroke="#91a2aa" stroke-opacity=".075" stroke-width="1"/></pattern>
          <filter id="car-shadow"><feGaussianBlur stdDeviation="5"/></filter>
          <filter id="bridge-shadow"><feGaussianBlur stdDeviation="14"/></filter>
        </defs>
        <rect width="1440" height="760" fill="url(#home-night)"/><rect width="1440" height="760" fill="url(#map-grid)"/>
        <g class="city-plots" fill="#2a3539" stroke="#64777b" stroke-opacity=".27" stroke-width="2">
          <rect x="594" y="74" width="132" height="126" rx="11"/><rect x="1054" y="58" width="142" height="132" rx="11"/>
          <rect x="1250" y="77" width="145" height="148" rx="11"/><rect x="548" y="245" width="150" height="141" rx="11"/>
          <rect x="1169" y="298" width="182" height="109" rx="11"/><rect x="531" y="664" width="155" height="127" rx="11"/>
          <rect x="1220" y="626" width="160" height="141" rx="11"/>
        </g>
        <path class="underpass-shoulder" d="M350 622 C624 589 836 550 1073 545 S1342 522 1530 503" fill="none" stroke="#63747a" stroke-width="181"/>
        <path d="M350 622 C624 589 836 550 1073 545 S1342 522 1530 503" fill="none" stroke="#28343a" stroke-width="169"/>
        <path d="M350 622 C624 589 836 550 1073 545 S1342 522 1530 503" fill="none" stroke="#9fb2b8" stroke-opacity=".42" stroke-width="3" stroke-dasharray="19 23"/>
        <path class="route-trace" d="M350 583 C624 550 836 511 1073 506 S1342 483 1530 464" fill="none" stroke="#0575ee" stroke-width="3"/>
        <path id="underpass-east" d="M350 583 C624 550 836 511 1073 506 S1342 483 1530 464" fill="none" stroke="none"/>
        <path id="underpass-west" d="M1530 542 C1342 561 1190 578 1073 584 S624 628 350 661" fill="none" stroke="none"/>
        ${vehicle('underpass-east', 9500, .08, 'blue')}${vehicle('underpass-west', 10500, .58, 'silver')}
        <path d="M802 -100 C877 150 932 330 1002 520 S1132 730 1197 850" fill="none" stroke="#030b10" stroke-opacity=".66" stroke-width="203" filter="url(#bridge-shadow)" transform="translate(14 17)"/>
        <path class="bridge-guardrail" d="M802 -100 C877 150 932 330 1002 520 S1132 730 1197 850" fill="none" stroke="#7f969e" stroke-width="177"/>
        <path d="M802 -100 C877 150 932 330 1002 520 S1132 730 1197 850" fill="none" stroke="#34464c" stroke-width="164"/>
        <path d="M802 -100 C877 150 932 330 1002 520 S1132 730 1197 850" fill="none" stroke="#b5c5c7" stroke-opacity=".55" stroke-width="3" stroke-dasharray="19 25"/>
        <path id="overpass-west" d="M770 -100 C845 150 900 330 970 520 S1100 730 1165 850" fill="none" stroke="none"/>
        <path id="overpass-east" d="M834 -100 C909 150 964 330 1034 520 S1164 730 1229 850" fill="none" stroke="none"/>
        ${truckVehicle('overpass-west', 11500, .19)}${truckVehicle('overpass-east', 10000, .62, true)}
      </svg>
    </div>`;

  // Page hero backgrounds continue the same movement language at each product's scale.
  const gridHeroScene = `<div class="product-hero-art grid-hero-art" aria-hidden="true">
    <svg viewBox="0 0 1440 760" preserveAspectRatio="xMidYMid slice" focusable="false">
      <defs><pattern id="grid-hero-grid" width="74" height="74" patternUnits="userSpaceOnUse"><path d="M74 0H0V74" fill="none" stroke="#a9d4b6" stroke-opacity=".08"/></pattern></defs>
      <rect width="1440" height="760" fill="#103b2c"/><rect width="1440" height="760" fill="url(#grid-hero-grid)"/>
      <g class="product-hero-blocks" fill="#1a4735" stroke="#80aa8c" stroke-opacity=".18">
        <rect x="728" y="65" width="180" height="132" rx="12"/><rect x="963" y="46" width="164" height="141" rx="12"/><rect x="1201" y="38" width="164" height="163" rx="12"/>
        <rect x="650" y="301" width="141" height="157" rx="12"/><rect x="854" y="260" width="168" height="142" rx="12"/><rect x="1192" y="316" width="183" height="129" rx="12"/>
        <rect x="701" y="559" width="183" height="147" rx="12"/><rect x="1020" y="555" width="174" height="126" rx="12"/><rect x="1268" y="532" width="151" height="153" rx="12"/>
      </g>
      <path id="grid-hero-route" d="M544 770 C705 683 704 560 842 563 S1034 504 1080 390 S1235 307 1262 220 S1384 139 1510 58" fill="none" stroke="#669078" stroke-opacity=".55" stroke-width="84" stroke-linecap="round"/>
      <path d="M544 770 C705 683 704 560 842 563 S1034 504 1080 390 S1235 307 1262 220 S1384 139 1510 58" fill="none" stroke="#173f2d" stroke-width="76" stroke-linecap="round"/>
      <path class="product-hero-route-flow" d="M544 770 C705 683 704 560 842 563 S1034 504 1080 390 S1235 307 1262 220 S1384 139 1510 58" fill="none" stroke="#1fd760" stroke-width="4" stroke-linecap="round"/>
      <circle cx="842" cy="563" r="19" fill="#1fd760" fill-opacity=".16"/><circle cx="842" cy="563" r="6" fill="#1fd760"/>
      <circle cx="1262" cy="220" r="19" fill="#1fd760" fill-opacity=".16"/><circle cx="1262" cy="220" r="6" fill="#1fd760"/>
      ${vehicle('grid-hero-route', 8000, .17, 'grid')}${vehicle('grid-hero-route', 8000, .66, 'silver')}
    </svg></div>`;

  const goHeroScene = `<div class="product-hero-art go-hero-art" aria-hidden="true">
    <svg viewBox="0 0 1440 760" preserveAspectRatio="xMidYMid slice" focusable="false">
      <defs><pattern id="go-hero-grid" width="92" height="92" patternUnits="userSpaceOnUse"><path d="M92 0H0V92" fill="none" stroke="#e6a3c6" stroke-opacity=".08"/></pattern></defs>
      <rect width="1440" height="760" fill="#3a0f2a"/><rect width="1440" height="760" fill="url(#go-hero-grid)"/>
      <g class="product-hero-blocks" fill="#4d1738" stroke="#c985a8" stroke-opacity=".18">
        <rect x="702" y="87" width="187" height="123" rx="18"/><rect x="954" y="36" width="193" height="147" rx="18"/><rect x="1205" y="84" width="161" height="165" rx="18"/>
        <rect x="640" y="309" width="194" height="132" rx="18"/><rect x="929" y="299" width="150" height="159" rx="18"/><rect x="1251" y="359" width="177" height="125" rx="18"/>
        <rect x="777" y="564" width="191" height="134" rx="18"/><rect x="1084" y="556" width="176" height="138" rx="18"/>
      </g>
      <path id="go-hero-route" d="M547 681 C657 648 710 602 739 523 S807 443 883 456 S994 408 1050 331 S1163 293 1233 223 S1394 138 1510 131" fill="none" stroke="#a66a8a" stroke-opacity=".55" stroke-width="75" stroke-linecap="round"/>
      <path d="M547 681 C657 648 710 602 739 523 S807 443 883 456 S994 408 1050 331 S1163 293 1233 223 S1394 138 1510 131" fill="none" stroke="#43132f" stroke-width="68" stroke-linecap="round"/>
      <path class="product-hero-route-flow" d="M547 681 C657 648 710 602 739 523 S807 443 883 456 S994 408 1050 331 S1163 293 1233 223 S1394 138 1510 131" fill="none" stroke="#e0509a" stroke-width="4" stroke-linecap="round"/>
      <circle cx="739" cy="523" r="20" fill="#e0509a" fill-opacity=".13"/><circle cx="739" cy="523" r="6" fill="#e0509a"/>
      <circle cx="1233" cy="223" r="20" fill="#e0509a" fill-opacity=".13"/><circle cx="1233" cy="223" r="6" fill="#e0509a"/>
      ${vehicle('go-hero-route', 8000, .17, 'go')}${vehicle('go-hero-route', 8000, .62, 'silver')}
    </svg></div>`;

  // Vision uses an opening horizon rather than the vehicle-route treatment.
  const visionHeroScene = `<div class="vision-horizon-art" aria-hidden="true">
    <svg viewBox="0 0 1440 760" preserveAspectRatio="xMaxYMid slice" focusable="false">
      <defs>
        <linearGradient id="vision-sky" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#f8fbfd"/><stop offset=".56" stop-color="#edf6fb"/><stop offset="1" stop-color="#d9ecf7"/></linearGradient>
        <radialGradient id="vision-light"><stop stop-color="#ffffff" stop-opacity=".9"/><stop offset=".45" stop-color="#dcefff" stop-opacity=".55"/><stop offset="1" stop-color="#dcefff" stop-opacity="0"/></radialGradient>
        <linearGradient id="vision-path" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#9fccea" stop-opacity=".12"/><stop offset="1" stop-color="#0575ee" stop-opacity=".18"/></linearGradient>
      </defs>
      <rect width="1440" height="760" fill="url(#vision-sky)"/>
      <g class="vision-clouds" fill="#fff" fill-opacity=".47"><path d="M528 124 C752 76 854 115 1070 86 S1324 89 1486 57 L1486 195 C1292 199 1170 161 970 185 S716 173 528 211Z"/><path d="M618 244 C827 207 940 250 1160 220 S1378 223 1485 211 L1485 275 C1313 288 1188 269 1001 282 S737 268 618 303Z"/></g>
      <circle class="vision-light" cx="1115" cy="331" r="302" fill="url(#vision-light)"/>
      <g class="vision-landscape-back"><path d="M0 466 C220 413 416 455 615 422 S953 361 1122 396 S1324 405 1440 361 V760 H0Z" fill="#d9ecf5"/><path d="M0 521 C233 500 424 465 646 485 S960 437 1122 402 S1357 445 1440 415 V760 H0Z" fill="#c8e1ee"/></g>
      <path class="vision-landscape-front" d="M0 611 C210 591 388 626 602 574 S833 486 1119 410 S1348 477 1440 490 V760 H0Z" fill="#e8f3f8"/>
      <path class="vision-journey" d="M595 760 C734 654 887 530 1112 407 C1273 510 1379 649 1510 760Z" fill="url(#vision-path)"/>
      <path class="vision-guide" d="M607 760 C760 637 905 507 1112 407" fill="none" stroke="#96c3de" stroke-opacity=".58" stroke-width="2"/>
      <path class="vision-guide" d="M1510 760 C1368 635 1241 500 1112 407" fill="none" stroke="#96c3de" stroke-opacity=".58" stroke-width="2"/>
      <path class="vision-clear-line" d="M539 422 C707 410 881 391 1112 407 S1337 390 1495 358" fill="none" stroke="#0575ee" stroke-width="3" stroke-linecap="round" pathLength="100"/>
      <circle class="vision-destination" cx="1112" cy="407" r="9" fill="#0575ee" stroke="#fff" stroke-width="5"/>
    </svg></div>`;

  const gridHero = document.querySelector('body[data-page="grid"] .page-hero');
  const goHero = document.querySelector('body[data-page="go"] .page-hero');
  const visionHero = document.querySelector('body[data-page="vision"] .page-hero');
  if (gridHero) gridHero.insertAdjacentHTML('afterbegin', gridHeroScene);
  if (goHero) goHero.insertAdjacentHTML('afterbegin', goHeroScene);
  if (visionHero) visionHero.insertAdjacentHTML('afterbegin', visionHeroScene);
  if (visionHero && window.matchMedia('(pointer:fine)').matches) {
    const horizon = visionHero.querySelector('.vision-horizon-art');
    visionHero.addEventListener('pointermove', (event) => {
      if (document.body.classList.contains('motion-paused')) return;
      const bounds = visionHero.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - .5;
      const y = (event.clientY - bounds.top) / bounds.height - .5;
      horizon.style.setProperty('--vision-x', `${(-x * 18).toFixed(1)}px`);
      horizon.style.setProperty('--vision-y', `${(-y * 10).toFixed(1)}px`);
    });
    visionHero.addEventListener('pointerleave', () => {
      horizon.style.setProperty('--vision-x', '0px');
      horizon.style.setProperty('--vision-y', '0px');
    });
  }

  const storySteps = [
    ['Monitor', 'Review available fleet and vehicle information.'],
    ['Detect', 'Identify an alert or event that needs attention.'],
    ['Investigate', 'Review related vehicle, driver, trip or alert details.'],
    ['Act', 'Take an available operational action.'],
    ['Resolve', 'Record and resolve the event.'],
    ['Learn', 'Use operational insights to understand what happened.']
  ];

  const gridStory = `
    <div class="workflow-story">
      <div class="story-copy">${storySteps.map(([title, body], i) => `
        <article class="story-step${i === 0 ? ' active' : ''}" data-step="${i}">
          <h3>${title}</h3><p>${body}</p>
        </article>`).join('')}</div>
      <div class="story-visual-wrap"><div class="story-visual" data-step="0" aria-label="Illustrative VexarGrid workflow graphic">
        <div class="story-screen-top"><span>Vexar<b>Grid</b></span><span>OPERATIONS</span></div>
        <div class="story-map">
          <svg viewBox="0 0 620 430" preserveAspectRatio="none" aria-hidden="true">
            <pattern id="story-grid" width="44" height="44" patternUnits="userSpaceOnUse"><path d="M44 0H0V44" fill="none" stroke="#a6c6b0" stroke-opacity=".14"/></pattern>
            <rect width="620" height="430" fill="#17362d"/><rect width="620" height="430" fill="url(#story-grid)"/>
            <path id="story-route" d="M55 325 C120 300 158 345 225 252 S330 210 383 175 S490 145 575 74" fill="none" stroke="#6e907b" stroke-width="34" stroke-linecap="round"/>
            <path d="M55 325 C120 300 158 345 225 252 S330 210 383 175 S490 145 575 74" fill="none" stroke="#254739" stroke-width="28" stroke-linecap="round"/>
            <path class="story-progress-path" d="M55 325 C120 300 158 345 225 252 S330 210 383 175 S490 145 575 74" fill="none" stroke="#1fd760" stroke-width="4" stroke-linecap="round" pathLength="100"/>
            <circle cx="55" cy="325" r="8" fill="#1fd760"/><circle cx="575" cy="74" r="8" fill="#1fd760"/>
            <g class="story-vehicle" transform="translate(55 325)"><circle r="21" fill="#1fd760" fill-opacity=".2"/><circle r="8" fill="#eaffef" stroke="#1fd760" stroke-width="3"/></g>
          </svg>
          <div class="story-alert"><span class="alert-pulse"></span><span data-story-chip>Fleet activity in view</span></div>
        </div>
        <div class="story-screen-bottom"><div><strong data-story-title>Monitor</strong><span data-story-body>Review available fleet and vehicle information.</span></div><span class="story-bars" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i></span></div>
      </div></div>
    </div>`;

  const homeVisual = document.querySelector('body[data-page="home"] .hero-motion-layer');
  if (homeVisual) {
    homeVisual.innerHTML = homeScene;
    const heroMap = homeVisual.querySelector('.bridge-scene');
    const mobileViewport = window.matchMedia('(max-width: 760px)');
    const frameHero = () => heroMap.setAttribute('viewBox', mobileViewport.matches ? '700 0 500 760' : '0 0 1440 760');
    frameHero();
    mobileViewport.addEventListener?.('change', frameHero);
  }
  const workflow = document.querySelector('body[data-page="grid"] .workflow');
  if (workflow) workflow.outerHTML = gridStory;
  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  let running = false;
  let frameId = 0;
  let elapsed = 0;
  let previousTime = 0;
  const vehicles = [...document.querySelectorAll('.moving-vehicle')].map(node => ({
    node,
    path: node.ownerSVGElement.querySelector(`#${node.dataset.route}`),
    duration: Number(node.dataset.duration),
    offset: Number(node.dataset.offset)
  })).filter(item => item.path);

  function placeVehicles() {
    for (const item of vehicles) {
      const length = item.path.getTotalLength();
      const automatic = ((elapsed / item.duration + item.offset) % 1 + 1) % 1;
      const manual = Number(item.node.dataset.manualProgress);
      const progress = item.node.hasAttribute('data-manual-progress') && Number.isFinite(manual)
        ? Math.max(0, Math.min(1, manual)) : automatic;
      const point = item.path.getPointAtLength(progress * length);
      const ahead = Math.min(length, progress * length + 2);
      const behind = Math.max(0, progress * length - 2);
      const tangentPoint = item.path.getPointAtLength(ahead < length ? ahead : behind);
      const angle = Math.atan2(
        ahead < length ? tangentPoint.y - point.y : point.y - tangentPoint.y,
        ahead < length ? tangentPoint.x - point.x : point.x - tangentPoint.x
      ) * 180 / Math.PI;
      item.node.setAttribute('transform', `translate(${point.x.toFixed(1)} ${point.y.toFixed(1)}) rotate(${angle.toFixed(1)})`);
    }
  }

  function animate(now) {
    if (!running) return;
    elapsed += Math.min(50, now - previousTime);
    previousTime = now;
    placeVehicles();
    frameId = requestAnimationFrame(animate);
  }

  function startMotion() {
    if (running || motionPreference.matches || document.hidden) return;
    running = true;
    previousTime = performance.now();
    if (vehicles.length) frameId = requestAnimationFrame(animate);
    document.body.classList.remove('motion-paused');
  }

  function stopMotion() {
    running = false;
    cancelAnimationFrame(frameId);
    document.body.classList.add('motion-paused');
  }

  document.addEventListener('visibilitychange', () => document.hidden ? stopMotion() : startMotion());
  motionPreference.addEventListener?.('change', () => motionPreference.matches ? stopMotion() : startMotion());
  placeVehicles();
  if (motionPreference.matches) stopMotion(); else startMotion();

  const story = document.querySelector('.workflow-story');
  if (story) {
    const steps = [...story.querySelectorAll('.story-step')];
    const visual = story.querySelector('.story-visual');
    const route = story.querySelector('#story-route');
    const marker = story.querySelector('.story-vehicle');
    const chips = ['Fleet activity in view', 'Event needs attention', 'Context connected', 'Next step available', 'Event resolved', 'Insight retained'];
    let active = -1;
    let currentProgress = 0;
    let routeFrame = 0;
    const routeLength = route.getTotalLength();
    const placeOnRoute = progress => {
      const point = route.getPointAtLength(routeLength * progress);
      marker.setAttribute('transform', `translate(${point.x.toFixed(2)} ${point.y.toFixed(2)})`);
      visual.style.setProperty('--story-progress', (progress * 100).toFixed(4));
    };
    function setStep(index) {
      if (index === active) return;
      cancelAnimationFrame(routeFrame);
      const previous = currentProgress;
      const target = (index + 1) / steps.length;
      if (active === -1 || motionPreference.matches) {
        currentProgress = target;
        placeOnRoute(target);
      } else {
        const started = performance.now();
        const animateRoute = now => {
          const progress = Math.min(1, (now - started) / 700);
          const eased = 1 - (1 - progress) ** 3;
          currentProgress = previous + (target - previous) * eased;
          placeOnRoute(currentProgress);
          if (progress < 1) routeFrame = requestAnimationFrame(animateRoute);
        };
        routeFrame = requestAnimationFrame(animateRoute);
      }
      active = index;
      visual.dataset.step = String(index);
      steps.forEach((step, i) => step.classList.toggle('active', i === index));
      visual.querySelector('[data-story-title]').textContent = storySteps[index][0];
      visual.querySelector('[data-story-body]').textContent = storySteps[index][1];
      visual.querySelector('[data-story-chip]').textContent = chips[index];
    }
    function updateStory() {
      const target = window.innerWidth <= 760
        ? Math.min(window.innerHeight - 60, visual.getBoundingClientRect().bottom + 66)
        : window.innerHeight * .48;
      let best = 0, distance = Infinity;
      steps.forEach((step, i) => {
        const rect = step.getBoundingClientRect();
        const delta = Math.abs(rect.top + rect.height / 2 - target);
        if (delta < distance) { distance = delta; best = i; }
      });
      setStep(best);
    }
    let pending = false;
    window.addEventListener('scroll', () => {
      if (pending) return;
      pending = true;
      requestAnimationFrame(() => { pending = false; updateStory(); });
    }, { passive: true });
    steps.forEach((step, i) => step.addEventListener('pointerenter', event => { if (event.pointerType === 'mouse') setStep(i); }));
    window.addEventListener('resize', updateStory);
    updateStory();
  }

  const bridge = document.querySelector('.story-bridge');
  const hero = document.querySelector('.immersive-hero');
  const heroMap = hero?.querySelector('.mobility-stage');
  if ((bridge || heroMap) && !motionPreference.matches) {
    let scrollFrame = 0;
    function updatePageMotion() {
      scrollFrame = 0;
      if (bridge) {
        const rect = bridge.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + rect.height) * 1.5));
        bridge.style.setProperty('--bridge-progress', progress.toFixed(3));
      }
      if (heroMap) {
        const progress = Math.max(0, Math.min(1, -hero.getBoundingClientRect().top / hero.offsetHeight));
        heroMap.style.setProperty('--scroll-scale', (1 + progress * .055).toFixed(3));
      }
    }
    window.addEventListener('scroll', () => {
      if (!scrollFrame) scrollFrame = requestAnimationFrame(updatePageMotion);
    }, { passive: true });
    window.addEventListener('resize', updatePageMotion);
    updatePageMotion();
  }

  if ('IntersectionObserver' in window && !motionPreference.matches) {
    const targets = [...document.querySelectorAll('main > .section, main > .section-sm')]
      .filter(node => !node.id || node.id !== 'how-it-works');
    targets.forEach(node => node.classList.add('reveal-on-scroll'));
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    }, { rootMargin: '0px 0px -8% 0px', threshold: .08 });
    targets.forEach(node => observer.observe(node));
    document.documentElement.classList.add('motion-ready');
  }
})();
