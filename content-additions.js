// Additional approved website copy from the supplied content document.
// Draft headline options and layout notes in that document are editorial references.
(() => {
  const page = document.body.dataset.page;
  const main = document.querySelector('main');
  if (!main) return;

  const sectionFor = label => [...main.querySelectorAll(':scope > section')].find(section =>
    section.querySelector('.eyebrow')?.textContent.trim().toLowerCase() === label.toLowerCase()
  );
  const beforeCTA = html => main.querySelector(':scope > .site-cta')?.insertAdjacentHTML('beforebegin', html);

  if (page === 'home') {
    main.querySelector('.home-products .section-head p')?.remove();
    const productCards = main.querySelectorAll('.home-products .product-card');
    productCards[0]?.querySelector('.text-link')?.insertAdjacentHTML('beforebegin', '<div class="product-focus"><span>Visibility</span><span>Tracking</span><span>Alerts</span><span>Trip history</span></div>');
    productCards[1]?.querySelector('.text-link')?.insertAdjacentHTML('beforebegin', '<div class="product-focus"><span>Journey history</span><span>Trip details</span><span>Alerts</span><span>Analytics</span></div>');
  }

  if (page === 'grid') {
    const gridSections = [...main.querySelectorAll(':scope > section')];
    const intro = sectionFor('What is VexarGrid?') || gridSections[1];
    intro?.querySelector('.split > div:first-child')?.insertAdjacentHTML('beforeend', `<div class="source-copy"><p class="source-kicker">Automotive intelligence, built for the people running the operation.</p><p>VexarGrid is a fleet operations platform designed to help vehicle owners and fleet-operating organizations monitor vehicles, drivers, trips, alerts, and fleet activity from one unified interface.</p><p>Managing a fleet involves more than knowing where vehicles are. Organizations also need to understand what is happening across their fleet, identify events that require attention, investigate issues, and take appropriate operational action. VexarGrid brings these activities together to support more informed fleet management and decision-making.</p><p>Its underlying product structure remains consistent across different fleet sizes and operating models. Traditional vehicle tracking focuses on location; VexarGrid also connects available information with investigation, action and resolution.</p></div>`);
    const introDetail = intro?.querySelector('.source-copy');
    if (introDetail) introDetail.outerHTML = `<details class="source-copy grid-intro-disclosure"><summary>More about VexarGrid <span class="asset-icon" style="--asset-icon:url('assets/grid-icons/CaretDown.svg')" aria-hidden="true"></span></summary>${introDetail.innerHTML}</details>`;

    const audience = sectionFor('Built for real operations') || gridSections[2];
    if (audience) audience.id = 'grid-operating-needs';
    const audienceGrid = audience?.querySelector('.grid-3');
    if (audienceGrid) {
      const audienceDetails = [
        '<span class="audience-extra-copy">Vehicles, drivers, trips and alerts come together in one view, so teams running rides can see what is happening across the fleet and follow up on events that need attention.</span>',
        '<span class="audience-extra-copy">Operations teams get a central view of vehicle, driver and trip information across routes, so journeys can be monitored and events reviewed in one place.</span>',
        '<span class="audience-extra-copy">Understand day-to-day vehicle and rider activity across many small vehicles, and review trips and alerts without chasing separate updates.</span>',
        '<span class="audience-extra-copy">Keep track of vehicles shared between many users and review trip history and alerts, to better understand how each vehicle is being used.</span>',
        '<span class="audience-extra-copy">Review fleet activity, investigate operational events and access available insights across regional freight and larger commercial fleets.</span>'
      ];
      const cards = [...audienceGrid.querySelectorAll('.audience-card')].map((card,index) => {
        const button = document.createElement('button');
        const title = card.querySelector('strong')?.textContent || '';
        const summary = card.querySelector('p')?.textContent || '';
        const icon = card.querySelector('.glyph img')?.outerHTML || '';
        button.type = 'button';
        button.className = 'audience-card';
        button.setAttribute('aria-labelledby',`grid-audience-title-${index}`);
        button.setAttribute('aria-describedby',`grid-audience-summary-${index}`);
        button.setAttribute('aria-controls',`grid-audience-detail-${index}`);
        button.innerHTML = `<span class="glyph">${icon}</span><strong id="grid-audience-title-${index}">${title}</strong><span class="audience-card-summary" id="grid-audience-summary-${index}">${summary}</span><span class="audience-card-hint" aria-hidden="true"><img src="assets/grid-icons/CaretDown.svg" alt="" width="17" height="17"></span><span class="audience-card-extra" id="grid-audience-detail-${index}" aria-hidden="true"><span class="audience-card-extra-inner">${audienceDetails[index]}</span></span>`;
        return button;
      });
      audienceGrid.classList.add('audience-explorer');
      audienceGrid.setAttribute('aria-label','Explore VexarGrid operating teams');
      audienceGrid.replaceChildren(...[0,3].map(start => {
        const row = document.createElement('div');
        row.className = 'audience-row';
        row.append(...cards.slice(start,start + 3));
        return row;
      }));
      let selected = null;
      let preview = null;
      let hoverTimer;
      let lastScroll = 0;
      addEventListener('scroll',() => { lastScroll = performance.now(); },{ passive:true });
      const rows = [...audienceGrid.querySelectorAll('.audience-row')];
      const rowOf = index => rows.indexOf(cards[index].parentElement);
      let heights = null;
      const paint = forced => {
        const current = forced ?? preview ?? selected;
        cards.forEach((card,index) => {
          const active = index === current;
          card.classList.toggle('is-active',active);
          card.setAttribute('aria-expanded',String(active));
          card.querySelector('.audience-card-extra').setAttribute('aria-hidden',String(!active));
        });
        rows.forEach((row,rowIndex) => {
          row.style.gridTemplateColumns = [...row.children].map(card => card.classList.contains('is-active') ? '2fr' : '1fr').join(' ');
          row.style.height = heights ? `${current !== null && rowOf(current) === rowIndex ? heights.open[current] : heights.closed[rowIndex]}px` : '';
        });
      };
      const fit = () => {
        heights = null;
        if (innerWidth <= 1000) { paint(); return; }
        audienceGrid.classList.add('is-measuring');
        rows.forEach(row => { row.style.height = ''; });
        const measured = { open:[], closed:[] };
        cards.forEach((card,index) => {
          paint(index);
          measured.open[index] = Math.ceil(rows[rowOf(index)].offsetHeight);
        });
        rows.forEach((row,rowIndex) => {
          paint(cards.findIndex((card,index) => rowOf(index) !== rowIndex));
          measured.closed[rowIndex] = Math.ceil(row.offsetHeight);
        });
        paint(0);
        const extra = cards[0].querySelector('.audience-card-extra');
        audienceGrid.style.setProperty('--extra-w',`${Math.floor(extra.getBoundingClientRect().width)}px`);
        heights = measured;
        paint();
        audienceGrid.classList.remove('is-measuring');
      };
      let fitTimer;
      addEventListener('resize',() => { clearTimeout(fitTimer); fitTimer = setTimeout(fit,150); });
      document.fonts?.ready.then(fit);
      const hoverCard = index => {
        if (performance.now() - lastScroll < 250) return;
        clearTimeout(hoverTimer);
        hoverTimer = setTimeout(() => { preview = index; paint(); },90);
      };
      cards.forEach((card,index) => {
        card.addEventListener('pointermove',event => { if (event.pointerType === 'mouse' && (event.movementX || event.movementY) && preview !== index) hoverCard(index); });
        card.addEventListener('focus',() => { preview = index; paint(); });
        card.addEventListener('click',() => { selected = selected === index ? null : index; preview = selected; paint(); });
      });
      audienceGrid.addEventListener('pointerleave',() => { clearTimeout(hoverTimer); preview = null; paint(); });
      audienceGrid.addEventListener('focusout',event => { if (!audienceGrid.contains(event.relatedTarget)) { preview = null; paint(); } });
      paint();
      fit();
    }

    const challengeCases = [
      { label:'LIMITED FLEET VISIBILITY', title:'Understanding what is happening.', problem:'Relevant operational information can be difficult to understand when it is not available in one consistent view.', response:'It brings available vehicle, driver, trip and alert information into a unified fleet operations interface.', icon:'EyeSlash.svg' },
      { label:'VEHICLE TRACKING ALONE', title:'Location is only part of the picture.', problem:"Knowing a vehicle's location does not necessarily explain what is happening during a trip or whether an event requires attention.", response:'It connects available fleet information with operational alerts, investigation and resolution workflows.', icon:'Path.svg' },
      { label:'EVENTS NEEDING ATTENTION', title:'Identify what needs a response.', problem:'Fleet teams need to identify relevant alerts or operational events instead of simply viewing fleet activity.', response:'Its monitoring and detection workflow helps authorized users identify events that may require further investigation or action.', icon:'WarningCircle.svg' },
      { label:'FLEET PERFORMANCE', title:'Understand what happened.', problem:'Fleet operators need a view of what happened across operations rather than isolated vehicle or trip information.', response:'Core insights and available operational information help users review fleet activity and better understand events.', icon:'ChartLineUp.svg' }
    ];
    audience?.insertAdjacentHTML('afterend', `<section class="content-section grid-challenges" id="grid-challenges"><div class="container"><div class="section-head"><h2>From a gap in visibility to an operational next step.</h2></div><div class="challenge-experience"><div class="challenge-picker" role="group" aria-label="Explore fleet challenges">${challengeCases.map((item,index) => `<button class="challenge-option" type="button" data-challenge="${index}" aria-pressed="false" aria-controls="grid-challenge-response"><span class="challenge-option-top"><span class="challenge-option-icon"><img src="assets/grid-icons/${item.icon}" alt="" width="24" height="24"></span><span class="challenge-option-label">${item.label}</span><span class="challenge-option-arrow" aria-hidden="true"><img src="assets/grid-icons/ArrowRight.svg" alt="" width="18" height="18"></span></span><strong>${item.title}</strong><span class="challenge-option-problem">${item.problem}</span><span class="challenge-inline-response" aria-hidden="true"><span>How VexarGrid helps</span>${item.response}</span></button>`).join('')}</div><div class="challenge-stage" data-current="0"><div class="challenge-stage-top"><span>OPERATIONAL VIEW</span></div><div class="challenge-viz" aria-hidden="true"><div class="challenge-viz-inputs"><span class="challenge-viz-caption">AVAILABLE INFORMATION</span><span class="challenge-viz-chip"><img src="assets/grid-icons/Car.svg" alt="">Vehicles</span><span class="challenge-viz-chip"><img src="assets/grid-icons/Path.svg" alt="">Trips</span><span class="challenge-viz-chip"><img src="assets/grid-icons/WarningCircle.svg" alt="">Alerts</span><span class="challenge-viz-chip"><img src="assets/grid-icons/ChartLineUp.svg" alt="">Insights</span></div><div class="challenge-viz-flow"><span></span></div><div class="challenge-viz-core"><img src="assets/vexar-grid-logo-white.svg" alt=""><span>ONE OPERATIONAL VIEW</span><div class="challenge-viz-bars"><i></i><i></i><i></i><i></i><i></i><i></i></div></div></div><div class="challenge-stage-copy" id="grid-challenge-response" role="status" aria-live="polite"><span class="challenge-label">How VexarGrid helps</span><p class="challenge-response"></p></div></div></div></div></section>`);
    const challengeSection = main.querySelector('.grid-challenges');
    if (challengeSection) {
      const buttons = [...challengeSection.querySelectorAll('.challenge-option')];
      const stage = challengeSection.querySelector('.challenge-stage');
      const response = stage.querySelector('.challenge-response');
      const chips = [...stage.querySelectorAll('.challenge-viz-chip')];
      const reducedMotion = matchMedia('(prefers-reduced-motion:reduce)');
      const selectChallenge = index => {
        stage.dataset.current = String(index);
        buttons.forEach((button,buttonIndex) => {
          const active = buttonIndex === index;
          button.classList.toggle('is-active',active);
          button.setAttribute('aria-pressed',String(active));
          button.querySelector('.challenge-inline-response').setAttribute('aria-hidden',String(!active));
        });
        chips.forEach((chip,chipIndex) => chip.classList.toggle('is-lit',index === 0 || chipIndex === index));
        response.textContent = challengeCases[index].response;
        if (!reducedMotion.matches && response.animate) response.animate([{opacity:.35,transform:'translateY(8px)'},{opacity:1,transform:'translateY(0)'}],{duration:350,easing:'ease-out'});
      };
      buttons.forEach((button,index) => button.addEventListener('click',() => selectChallenge(index)));
      buttons.forEach((button,index) => button.addEventListener('pointerenter',event => { if (event.pointerType === 'mouse') selectChallenge(index); }));
      selectChallenge(0);
    }

    (sectionFor('The VexarGrid workflow') || gridSections[3])?.insertAdjacentHTML('afterend', `<section class="content-section grid-use-cases"><div class="container"><div class="section-head"><h2>Fleet information when it matters.</h2><p>For owners asking where a vehicle is, VexarGrid brings available live fleet information and operational context into one place.</p></div><div class="content-grid three">
      <article class="content-card"><h3>Fleet monitoring</h3><p>Access available information about vehicles and overall fleet activity. Maintain a unified view of operational information.</p></article>
      <article class="content-card"><h3>Vehicle tracking and live visibility</h3><p>Access available live fleet information through live maps and review vehicle-related information in the operations interface.</p></article>
      <article class="content-card"><h3>Trip information and review</h3><p>Access trip-related information to understand vehicle activity and investigate relevant trips when reviewing an event.</p></article>
      <article class="content-card"><h3>Driver information</h3><p>Access relevant driver information as part of fleet operations and support investigation of events involving a particular driver.</p></article>
      <article class="content-card"><h3>Safety and operational alerts</h3><p>Identify alerts and events that may require attention. Investigate relevant vehicle, driver, trip or alert information.</p></article>
      <article class="content-card"><h3>Investigation and resolution</h3><p>Follow a structured process to investigate an event, take an available operational action and record or resolve the event.</p></article>
    </div></div></section>`);
    main.querySelector('.grid-use-cases .section-head p')?.remove();


    const faq = (sectionFor('Frequently asked questions') || gridSections[4])?.querySelector('.faq');
    faq?.closest('section')?.classList.add('grid-faq');
  }

  if (page === 'about') {
    const aboutHero = main.querySelector('.page-hero');
    aboutHero?.classList.add('about-hero');
    aboutHero?.querySelector('.lead')?.insertAdjacentHTML('afterend', `<nav class="about-story-nav" aria-label="Explore the VexarDrive story"><a href="#about-foundation">Foundation</a><a href="#about-challenge">Challenge</a><a href="#about-idea">The idea</a><a href="#about-people">People</a></nav>`);
    aboutHero?.querySelector('.container')?.insertAdjacentHTML('beforeend', `<figure class="about-hero-media"><img src="assets/about-city-movement.png" alt="Cars moving in opposite directions on a tree-lined city boulevard" loading="eager"></figure>`);
    const aboutSections = [...main.querySelectorAll(':scope > section')];
    const foundation = sectionFor('Our foundation') || aboutSections[1];
    foundation?.classList.add('about-foundation');
    if (foundation) foundation.id = 'about-foundation';
    foundation?.querySelector('.split > div:first-child')?.insertAdjacentHTML('beforeend', `<div class="source-copy"><p>Whether it is an organisation managing a fleet or an individual keeping track of personal journeys, access to reliable location and trip insights can make a meaningful difference. This information is not always easy to access, understand or keep track of.</p><p>VexarDrive is developing technology to address this gap, bringing location and trip information together through a shared technology foundation. The aim is to make vehicle movement more visible, reduce dependence on manual updates and make journey information easier to access when it is needed.</p></div>`);
    const foundationDetail = foundation?.querySelector('.source-copy');
    if (foundationDetail) foundationDetail.outerHTML = `<details class="source-copy about-disclosure"><summary>Explore the foundation in detail</summary>${foundationDetail.innerHTML}</details>`;
    const foundationButtons = foundation?.querySelector('.button-group');
    const foundationDisclosure = foundation?.querySelector('.about-disclosure');
    if (foundationButtons && foundationDisclosure) foundationButtons.before(foundationDisclosure);
    foundation?.querySelector('.soft-panel')?.classList.add('about-foundation-visual');
    foundation?.querySelector('.soft-panel')?.insertAdjacentHTML('afterbegin', '<img src="assets/about-connected-roads.png" alt="Vehicles following an urban road at blue hour" loading="lazy">');
    foundation?.querySelector('.container')?.insertAdjacentHTML('afterend', `<div class="container foundation-points"><div class="content-grid three"><article class="content-card"><h3>For fleet operations</h3><p>Tools that help fleet operators view vehicles, drivers and trips in one place, stay informed about operational activity and identify situations that may need attention.</p></article><article class="content-card"><h3>For individual riders</h3><p>A personal tracking experience that keeps a record of journeys, making trip information available without requiring riders to maintain manual logs.</p></article><article class="content-card"><h3>For evolving needs</h3><p>Technology built with long-term development and expansion in mind, so solutions can evolve as practical requirements and opportunities emerge.</p></article></div></div>`);

    const challenge = sectionFor('The challenge') || aboutSections[2];
    challenge?.classList.add('about-challenge');
    if (challenge) challenge.id = 'about-challenge';
    const gapCopy = [
      'Fleet teams may struggle to maintain a clear, up-to-date picture of vehicles, drivers and ongoing trips.',
      'When information relies on calls, messages or separate records, getting an accurate operational picture can take extra effort.',
      'Journey details may be difficult to review when information is not brought together in an accessible way.',
      'Individual riders may not have an easy way to revisit the details of their journeys.'
    ];
    challenge?.querySelectorAll('.feature-card .num').forEach(node => node.remove());
    challenge?.querySelectorAll('.feature-card p').forEach((node, index) => {
      if (gapCopy[index]) node.insertAdjacentHTML('afterend', `<details class="about-card-detail"><summary><span class="about-detail-label-closed">View more</span><span class="about-detail-label-open">View less</span><span class="about-detail-chevron" aria-hidden="true"><span class="asset-icon about-detail-caret" style="--asset-icon:url('assets/grid-icons/CaretDown.svg')"></span></span></summary><p>${gapCopy[index]}</p></details>`);
    });
    challenge?.querySelectorAll('.feature-card').forEach(card => {
      const detail = card.querySelector('.about-card-detail');
      if (!detail) return;
      card.addEventListener('pointerenter', event => { if (event.pointerType === 'mouse') detail.open = true; });
      card.addEventListener('pointerleave', event => { if (event.pointerType === 'mouse') detail.open = false; });
    });
    challenge?.insertAdjacentHTML('afterend', `<section class="content-section about-idea" id="about-idea"><div class="container"><div class="section-head"><h2>From a question to an idea.</h2></div><div class="content-grid four"><article class="content-card"><span class="content-index">BRING TOGETHER</span><h3>Bring vehicle information together</h3><p>Developing a fleet dashboard that gives operators a clearer view of vehicles, drivers and trips in one place.</p></article><article class="content-card"><span class="content-index">REDUCE MANUAL WORK</span><h3>Make tracking less dependent on updates</h3><p>Building around location and trip information so users can rely less on chasing updates and piecing together separate records.</p></article><article class="content-card"><span class="content-index">KEEP A RECORD</span><h3>Keep journey records accessible</h3><p>Developing a personal tracking experience that records individual journeys and makes trip information easier to revisit.</p></article><article class="content-card"><span class="content-index">KEEP EVOLVING</span><h3>Build a foundation that can evolve</h3><p>Focusing on core tracking infrastructure first, then refining and expanding as real-world needs become clearer.</p></article></div></div></section>`);

    const founders = sectionFor('The people behind VexarDrive') || aboutSections[3];
    founders?.classList.add('about-founders');
    if (founders) founders.id = 'about-people';
    const founderGrid = founders?.querySelector('.founder-grid');
    const founderKeys = ['vaibhav', 'shriram', 'dharshini'];
    const founderHeadlines = ['From a question to a company.', 'Turning an idea into something real.', 'Giving an idea its identity.'];
    const founderLinks = [
      'https://www.linkedin.com/in/vaibhavrajdikshit/',
      'https://www.linkedin.com/in/shriramvenugopalakrishnan/',
      'https://www.linkedin.com/in/dharshini-nagarajan74/'
    ];
    founderGrid?.insertAdjacentHTML('beforebegin', '<p class="founder-team-kicker">Meet the founding team</p>');
    const founderCards = [...(founderGrid?.querySelectorAll(':scope > .founder') || [])];
    founderCards.forEach((card, index) => {
      const founderName = card.querySelector('h3')?.textContent || 'Founder';
      card.classList.add('founder-card');
      card.insertAdjacentHTML('beforeend', `<div class="founder-card-actions"><a class="founder-link-inline" href="${founderLinks[index]}" target="_blank" rel="noopener noreferrer" aria-label="View ${founderName} on LinkedIn">LinkedIn <span class="asset-icon" style="--asset-icon:url('assets/grid-icons/ArrowUpRight.svg')" aria-hidden="true"></span></a><button type="button" class="founder-story-button" aria-controls="founder-story-stage" aria-label="View the full story of ${founderName}">View Full Story <span class="asset-icon" style="--asset-icon:url('assets/grid-icons/ArrowRight.svg')" aria-hidden="true"></span></button></div>`);
    });
    if (founderGrid) {
      const layout = document.createElement('div');
      layout.className = 'founder-story-layout';
      founderGrid.parentNode.insertBefore(layout, founderGrid.previousElementSibling);
      const rail = document.createElement('div');
      rail.className = 'founder-story-rail';
      rail.append(founderGrid.previousElementSibling, founderGrid);
      layout.append(rail);
      layout.insertAdjacentHTML('beforeend', `<article class="founder-story-stage" id="founder-story-stage" aria-labelledby="founder-stage-title"><div class="founder-stage-heading"><span class="founder-stage-role"></span><h3 id="founder-stage-title" tabindex="-1"></h3><p class="founder-stage-name"></p></div><div class="founder-stage-story"></div></article>`);
      const stage = layout.querySelector('.founder-story-stage');
      const selectFounder = (index, moveFocus = false) => {
        const card = founderCards[index];
        const story = (window.vexarFounderStories?.[founderKeys[index]] || '').trim().replace(/^[“"]\s*/,'').replace(/\s*[”"]$/,'');
        founderCards.forEach((item, itemIndex) => {
          item.classList.toggle('is-active', itemIndex === index);
          item.querySelector('.founder-story-button')?.setAttribute('aria-pressed', String(itemIndex === index));
        });
                stage.querySelector('.founder-stage-role').textContent = card.querySelector('p')?.textContent.split(' · ')[0] || '';
        stage.querySelector('.founder-stage-name').textContent = card.querySelector('h3')?.textContent || '';
        stage.querySelector('#founder-stage-title').textContent = founderHeadlines[index];
        const sentences = [...new Intl.Segmenter('en', { granularity:'sentence' }).segment(story)].map(part => part.segment);
        const copy = stage.querySelector('.founder-stage-story');
        copy.replaceChildren();
        for (let offset = 0; offset < sentences.length; offset += 3) {
          const paragraph = document.createElement('p');
          paragraph.textContent = sentences.slice(offset, offset + 3).join('').trim();
          copy.append(paragraph);
        }
                if (moveFocus) {
          stage.querySelector('#founder-stage-title').focus({ preventScroll:true });
          if (matchMedia('(max-width:850px)').matches) stage.scrollIntoView({ behavior:matchMedia('(prefers-reduced-motion:reduce)').matches ? 'instant' : 'smooth', block:'start' });
        }
      };
      let current = -1;
      const show = (index, moveFocus = false) => {
        if (index === current && !moveFocus) return;
        current = index;
        selectFounder(index, moveFocus);
        stage.classList.remove('is-swapping');
        void stage.offsetWidth;
        stage.classList.add('is-swapping');
      };
      let hoverTimer;
      founderCards.forEach((card, index) => {
        card.querySelector('.founder-story-button').addEventListener('click', () => show(index, true));
        card.addEventListener('pointerenter', event => { if (event.pointerType === 'mouse') { clearTimeout(hoverTimer); hoverTimer = setTimeout(() => show(index), 70); } });
        card.addEventListener('pointerleave', () => clearTimeout(hoverTimer));
        card.addEventListener('focusin', () => show(index));
      });
      const fitStage = () => {
        stage.style.minHeight = '';
        if (matchMedia('(max-width:850px)').matches) return;
        const keep = current;
        let tallest = 0;
        founderCards.forEach((card, index) => { selectFounder(index); tallest = Math.max(tallest, stage.offsetHeight); });
        selectFounder(Math.max(keep, 0));
        stage.style.minHeight = `${Math.ceil(tallest)}px`;
      };
      show(0);
      fitStage();
      document.fonts?.ready.then(fitStage);
      let fitTimer;
      addEventListener('resize', () => { clearTimeout(fitTimer); fitTimer = setTimeout(fitStage, 150); });
    }
  }

  if (page === 'go') {
    beforeCTA(`<section class="content-section go-focus"><div class="container"><div class="section-head"><h2>A clearer record for everyday journeys.</h2><p>VexarGo is being developed to make a record of personal rides available without requiring riders to maintain manual logs.</p></div><div class="content-grid four"><div class="content-card"><h3>Journey history</h3><p>Revisit daily commutes and personal rides.</p></div><div class="content-card"><h3>Trip details</h3><p>Find information about an individual journey.</p></div><div class="content-card"><h3>Alerts</h3><p>Keep relevant journey updates within reach as the experience develops.</p></div><div class="content-card"><h3>Analytics</h3><p>Understand patterns in personal mobility over time.</p></div></div></div></section>`);
    main.querySelector('.go-focus .section-head p')?.remove();
  }

  if (page === 'contact') {
    const contactSection = sectionFor('Ways to reach us');
    contactSection?.querySelector('.contact-layout > div:first-child')?.insertAdjacentHTML('beforeend', '<div class="contact-detail"><strong>Website</strong><a href="https://vexartech.in/">vexartech.in</a></div>');
    contactSection?.querySelector('.form-note')?.insertAdjacentHTML('beforebegin', '<p class="response-time">We respond to queries within 24–48 hours.</p>');
  }
  if (location.hash) {
    const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (target) requestAnimationFrame(() => target.scrollIntoView({ block:'start' }));
  }
})();
