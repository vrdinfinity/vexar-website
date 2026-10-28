const page = document.body.dataset.page || 'home';
const app = document.getElementById('app');
const arrowIcon = (name, className = 'arrow') => `<span class="asset-icon ${className}" style="--asset-icon:url('assets/grid-icons/${name}.svg')" aria-hidden="true"></span>`;
const link = (href, label, cls = 'button') => `<a class="${cls}" href="${href}">${label}${arrowIcon('ArrowUpRight')}</a>`;
const eyebrow = (label, green = false) => `<div class="eyebrow${green ? ' green' : ''}">${label}</div>`;

const header = `<header class="site-header"><div class="container nav-wrap">
  <a class="brand" href="./" aria-label="VexarDrive home"><img src="assets/vexar-logo.png?v=tag" alt="VEXAR" width="150" height="66"></a>
  <nav class="nav-links" id="primary-nav" aria-label="Main navigation">
    <a class="nav-link ${page === 'home' ? 'active' : ''}" href="./">Home</a>
    <a class="nav-link ${page === 'about' ? 'active' : ''}" href="about">About</a>
    <div class="nav-dropdown"><button class="nav-link nav-dropdown-toggle ${['grid','go'].includes(page) ? 'active' : ''}" type="button" aria-expanded="false" aria-controls="technology-menu"><span>Technology</span><span class="asset-icon nav-caret" style="--asset-icon:url('assets/grid-icons/CaretDown.svg')" aria-hidden="true"></span></button><div class="nav-submenu" id="technology-menu"><a class="${page === 'grid' ? 'active' : ''}" href="grid"><span class="technology-logo-slot"><img src="assets/vexar-grid-menu-logo.svg" alt="" width="88" height="88"></span><span><strong>VexarGrid</strong><small>Fleet Intelligence</small></span></a><a class="${page === 'go' ? 'active' : ''}" href="go"><span class="technology-logo-slot go-logo-slot"><img src="assets/VexarGo%20logo.svg" alt="" width="88" height="88"></span><span><strong>VexarGo</strong><small>Mobility Companion</small></span></a></div></div>
    <a class="nav-link ${page === 'vision' ? 'active' : ''}" href="vision">Vision</a>
    <a class="button nav-cta" href="contact?interest=fleet">Talk to us ${arrowIcon('ArrowUpRight')}</a>
  </nav>
  <button class="menu-toggle" aria-controls="primary-nav" aria-expanded="false" aria-label="Open menu">${arrowIcon('List','menu-icon')}</button>
</div></header>`;

const footer = `<footer class="site-footer"><div class="container">
  <div class="footer-main"><div><a class="brand" href="./" aria-label="VexarDrive home"><img src="assets/vexar-logo.png?v=tag" alt="VEXAR" width="150" height="66"></a></div>
  <div><div class="footer-title">Explore</div><div class="footer-links"><a href="grid">VexarGrid</a><a href="go">VexarGo</a></div></div>
  <div><div class="footer-title">Company</div><div class="footer-links"><a href="about">About us</a><a href="vision">Our vision</a><a href="contact">Contact</a></div></div>
  <div><div class="footer-title">Connect</div><div class="footer-links"><a href="mailto:contact@vexartech.in">contact@vexartech.in</a><a href="tel:+916374743899">+91 63747 43899</a></div></div>
  <div><div class="footer-title">Follow</div><div class="footer-links"><a href="https://instagram.com/vexardrive/" target="_blank" rel="noopener">Instagram ${arrowIcon('ArrowUpRight', 'inline-arrow')}</a><a href="https://x.com/VexarDrive" target="_blank" rel="noopener">X ${arrowIcon('ArrowUpRight', 'inline-arrow')}</a><a href="https://www.linkedin.com/company/vexardrivetechnologies/" target="_blank" rel="noopener">LinkedIn ${arrowIcon('ArrowUpRight', 'inline-arrow')}</a></div></div></div>
  <div class="footer-bottom"><span>© 2026 VexarDrive Technologies Private Limited</span><span>Bengaluru, India </span></div>
</div></footer>`;

const routeSvg = `<svg viewBox="0 0 360 200" role="img" aria-label="Route lines on a map"><path d="M-10 154 C46 144 51 164 91 127 S158 125 196 85 S283 75 369 15" fill="none" stroke="#9baea3" stroke-width="3" opacity=".6"/><path d="M26 185 C86 176 107 126 151 120 S221 153 253 106 S302 48 359 68" fill="none" stroke="#0575ee" stroke-width="5" stroke-linecap="round"/><circle cx="151" cy="120" r="8" fill="#0575ee" stroke="#fff" stroke-width="4"/><circle cx="253" cy="106" r="8" fill="#1fd760" stroke="#fff" stroke-width="4"/><circle cx="330" cy="64" r="8" fill="#1fd760" stroke="#fff" stroke-width="4"/></svg>`;
const dashboard = `<div class="hero-visual"><div class="visual-orbit" aria-hidden="true"></div><div class="product-ui" aria-label="VexarGrid interface preview"><div class="ui-top"><span class="ui-brand">Vexar<b>Grid</b></span><span class="ui-breadcrumb">Overview / Fleet</span><span class="ui-avatar">V</span></div><div class="ui-main"><div class="ui-side" aria-hidden="true"><i></i><i></i><i></i><i></i></div><div class="ui-body"><div class="ui-title"><span>Fleet overview</span><span class="ui-chip">Operations view</span></div><div class="ui-stats"><div class="ui-stat"><small>Vehicles</small><span class="skel"></span></div><div class="ui-stat"><small>Trips</small><span class="skel"></span></div><div class="ui-stat"><small>Alerts</small><span class="skel"></span></div></div><div class="ui-grid"><div class="ui-map"><span class="ui-map-label">Live map</span>${routeSvg}</div><div class="ui-mini"><div class="ui-mini-card"><strong>Recent activity</strong><div class="ui-line green"></div><div class="ui-line"></div><div class="ui-line"></div></div><div class="ui-mini-card"><strong>Needs attention</strong><div class="ui-alert">Review operational events</div></div></div></div></div></div></div><div class="floating-tag">One connected view</div></div>`;

const iconGrid = `<img src="assets/grid-icons/FleetGroup.svg" alt="" width="58" height="58" loading="lazy">`;
const iconGo = `<img src="assets/grid-icons/Path.svg" alt="" width="58" height="58" loading="lazy">`;
const productCards = `<div class="grid-2"><article class="product-card grid-card"><div class="label">VexarGrid</div><div class="product-icon">${iconGrid}</div><div><h3>Fleet operations. Clearly in view.</h3><p>Bring vehicles, drivers, trips and operational alerts into one place to understand what is happening and decide what needs attention.</p><a class="text-link" href="grid">Explore VexarGrid ${arrowIcon('ArrowUpRight')}</a></div></article><article class="product-card go-card"><div class="label">VexarGo</div><div><h3>Your journeys, easier to revisit.</h3><p>A personal mobility experience being developed to keep a clearer record of everyday journeys and ride details.</p><a class="text-link" href="go">Explore VexarGo ${arrowIcon('ArrowUpRight')}</a></div></article></div>`;
const visionProductCards = `<div class='grid-2 vision-product-grid'>
  <article class='product-card grid-card'><div class='label'>VexarGrid</div><div class='vision-card-brand-slot'><img src='assets/vexar-grid-logo-white.svg' alt='VexarGrid logo' width='300' height='123'></div><div><h3>Fleet operations. Clearly in view.</h3><p>Bring vehicles, drivers, trips and operational alerts into one place to understand what is happening and decide what needs attention.</p><a class='text-link' href='grid'>Explore VexarGrid ${arrowIcon('ArrowUpRight')}</a></div></article>
  <article class='product-card go-card'><div class='label'>VexarGo</div><div class='vision-card-brand-slot'><img src='assets/VexarGo%20logo.svg' alt='VexarGo logo' width='300' height='123'></div><div><h3>Your journeys, easier to revisit.</h3><p>A personal mobility experience being developed to keep a clearer record of everyday journeys and ride details.</p><a class='text-link' href='go'>Explore VexarGo ${arrowIcon('ArrowUpRight')}</a></div></article>
</div>`;
const productCarousel = `<div class="product-carousel" role="region" aria-roledescription="carousel" aria-label="VexarDrive products">
  <div class="carousel-viewport" id="product-carousel-viewport" tabindex="0" aria-label="Product carousel. Use left and right arrow keys or swipe to change products">${productCards.replace('class="grid-2"', 'class="carousel-track"')}</div>
</div>`;

const cta = (title, text, href = 'contact?interest=fleet', button = 'Start a conversation') => `<section class="section-sm site-cta"><div class="container"><div class="cta-panel"><div><h2>${title}</h2><p>${text}</p></div>${link(href, button, 'button light')}</div></div></section>`;

const pages = {
home: `<main>
  <section class="hero immersive-hero"><div class="hero-motion-layer" aria-hidden="true"></div><div class="hero-scrim" aria-hidden="true"></div><div class="container hero-inner"><div class="hero-copy"><h1>Make sense of movement.</h1><p>From fleet operations to everyday journeys, VexarDrive makes vehicle and trip information easier to understand and use.</p><div class="button-group">${link('grid','Explore VexarGrid')}${link('go','Discover VexarGo','button outline')}</div></div></div></section>
  <section class="section-sm statement story-bridge"><div class="container statement-inner"><div class="line-art" aria-hidden="true"></div><div><p class="statement-large">Movement creates data. Clarity makes it useful.</p></div><div class="statement-side"><p>Location and trip information should be easier to access, understand and use, whether you operate a fleet or want to revisit your own journeys.</p></div><div class="bridge-track" aria-hidden="true"><span class="bridge-fill"></span><span>MOVE</span><span>UNDERSTAND</span><span>ACT</span></div></div></section>
  <section class="section home-products"><div class="container"><div class="section-head"><h2>Two experiences.<br>One connected foundation.</h2><p>Different needs call for different experiences. VexarGrid focuses on fleet operations. VexarGo focuses on personal journeys.</p></div>${productCarousel}</div></section>
  <section class="section" style="background:#F6F6F6"><div class="container split"><div><h2>Built around a clearer picture of movement.</h2><p class="lead">Our shared technology foundation connects vehicle location and trip information, then shapes it around the decisions each person needs to make.</p>${link('about','Discover our approach','button text')}</div><div class="mini-list"><div><span>01</span><p><strong>Connected mobility intelligence</strong>Bring location and trip information together.</p></div><div><span>02</span><p><strong>Timely visibility</strong>Help people stay informed about vehicle activity and journeys.</p></div><div><span>03</span><p><strong>Useful insights</strong>Make movement information easier to understand and act on.</p></div><div><span>04</span><p><strong>Room to evolve</strong>Build from a flexible technology foundation.</p></div></div></div></section>
  <section class="section"><div class="container split reverse"><div class="soft-panel"><div class="quote">“There was no grand idea at the beginning. Just a recurring question: Why was something as common as movement still so difficult to understand?”</div><p style="margin:25px 0 0">— VexarDrive founding team</p></div><div><h2>Building with purpose. Growing with direction.</h2><p>VexarDrive is an early-stage mobility technology company in Bengaluru. We are focused on the fundamentals, learning from real-world needs and preparing our products for wider use.</p>${link('about','Meet VexarDrive','button text')}</div></div></section>
  ${cta('Let’s talk about what your fleet needs.','Exploring fleet visibility or a potential partnership? Tell us what you are working towards, and we can discuss whether VexarGrid fits.','contact?interest=fleet','Talk to our team')}
</main>`,

grid: `<main>
  <section class="page-hero grid-page"><div class="container"><div class="page-hero-mark" aria-hidden="true"></div><h1>Know what is happening across your fleet.</h1><p class="lead">VexarGrid brings available vehicle, driver, trip and alert information into one place, helping fleet teams monitor activity, investigate events and take the next operational step.</p><div class="button-group">${link('contact?interest=fleet','Talk about VexarGrid','button green')}${link('#how-it-works','See how it works','button light')}</div></div></section>
  <section class="section-sm grid-intro"><div class="container split"><div><h2>From vehicle tracking to fleet understanding.</h2><p>Knowing where a vehicle is provides one part of the picture. VexarGrid connects available fleet information with alerts, investigation and resolution workflows in one operations interface.</p></div><div class="grid-editorial"><img src="assets/grid-operations-editorial.webp" alt="Fleet operations team overlooking an urban vehicle depot" loading="lazy"></div></div></section>
  <section class="section" style="background:#F6F6F6"><div class="container"><div class="section-head"><h2>One platform. Different operating needs.</h2><p>VexarGrid is designed to support organizations operating a single vehicle, several vehicles or larger fleets.</p></div><div class="grid-3"><div class="audience-card"><div class="glyph"><img src="assets/grid-icons/SteeringWheel.svg" alt="" width="28" height="28" loading="lazy"></div><strong>Cab &amp; Ride Fleets</strong><p>Taxi operators, corporate cab fleets and chauffeur fleets.</p></div><div class="audience-card"><div class="glyph"><img src="assets/grid-icons/RoadHorizon.svg" alt="" width="28" height="28" loading="lazy"></div><strong>Travel &amp; Passenger Transport</strong><p>Travel companies, tour operators, buses, intercity fleets, and school and employee transport.</p></div><div class="audience-card"><div class="glyph"><img src="assets/grid-icons/NavigationArrow.svg" alt="" width="28" height="28" loading="lazy"></div><strong>Delivery &amp; Two-Wheeler Fleets</strong><p>Food and grocery delivery, courier, hyperlocal and rider-heavy fleets.</p></div><div class="audience-card"><div class="glyph"><img src="assets/grid-icons/VehicleAssignment.svg" alt="" width="28" height="28" loading="lazy"></div><strong>Rental &amp; Shared Mobility</strong><p>Car and bike rental, leasing, shared mobility and corporate vehicle pools.</p></div><div class="audience-card"><div class="glyph"><img src="assets/grid-icons/Truck.svg" alt="" width="28" height="28" loading="lazy"></div><strong>Logistics &amp; Commercial Transport</strong><p>Trucking, goods carriers, courier and logistics, 3PL, regional freight and larger commercial fleets.</p></div></div></div></section>
  <section class="section" id="how-it-works"><div class="container"><div class="section-head"><h2>See the event. Follow it through.</h2><p>VexarGrid is organized around a continuous operational cycle, from monitoring fleet activity to learning from what happened.</p></div><div class="workflow"><div class="workflow-step"><div class="step-no">01</div><strong>Monitor</strong><p>Review available fleet and vehicle information.</p></div><div class="workflow-step"><div class="step-no">02</div><strong>Detect</strong><p>Identify an alert or event that needs attention.</p></div><div class="workflow-step"><div class="step-no">03</div><strong>Investigate</strong><p>Review related vehicle, driver, trip or alert details.</p></div><div class="workflow-step"><div class="step-no">04</div><strong>Act</strong><p>Take an available operational action.</p></div><div class="workflow-step"><div class="step-no">05</div><strong>Resolve</strong><p>Record and resolve the event.</p></div><div class="workflow-step"><div class="step-no">06</div><strong>Learn</strong><p>Use operational insights to understand what happened.</p></div></div></div></section>
  <section class="section"><div class="container"><div class="section-head"><h2>Questions about VexarGrid.</h2></div><div class="faq"><details><summary>Who is VexarGrid designed for?</summary><p>Fleet owners and organizations operating multiple vehicles, including managers and operations teams.</p></details><details><summary>Can VexarGrid support small and large fleets?</summary><p>VexarGrid is designed with the same underlying product structure across different fleet sizes and operating models.</p></details><details><summary>What does the core platform include?</summary><p>The supplied product content lists safety and operational alerts, live maps, trips, drivers and core insights.</p></details><details><summary>Can VexarGrid be accessed on mobile?</summary><p>Yes, VexarGrid can be accessed on mobile.</p></details><details><summary>How is VexarGrid different from basic vehicle tracking?</summary><p>VexarGrid goes beyond showing where a vehicle is. It helps you understand what’s happening across your fleet, identify problems, take action and keep track of what happens next.</p></details><details><summary>What are VexarGrid’s paid add-ons?</summary><p>Optional add-ons listed in the product content include Driver Intelligence, Advanced Safety, Advanced Reporting and Advanced Alerting.</p></details><details><summary>What is the VexarGrid web application used for?</summary><p>The web application provides the organization-facing VexarGrid experience with greater screen space and higher information density.</p></details></div></div></section>
  ${cta('Ready to see VexarGrid in context?','Tell us about your fleet and the information your team needs to act on.','contact?interest=fleet','Start a conversation')}
</main>`,

go: `<main><section class="page-hero go-page"><div class="container"><div class="page-hero-mark" aria-hidden="true"></div><h1>Your journeys, easier to revisit.</h1><p class="lead">VexarGo is a personal mobility experience in development, designed to make journey information easier to access and understand.</p><div class="button-group">${link('contact?interest=ride','Ask about early access')}</div></div></section><section class="section"><div class="container split"><div><h2>A record of movement that stays with you.</h2><p>Daily commutes and personal rides add up. VexarGo is being designed to keep a clearer record of journeys so riders can revisit trip information without maintaining manual logs.</p></div><figure class="go-editorial"><img src="assets/go-personal-journey-editorial.png?v=20261028" alt="Rider checking a phone beside a parked scooter on a city street" loading="lazy" decoding="async"></figure></div></section>${cta('Interested in VexarGo?','Tell us about the journeys you want to track. We are connecting with early riders as the product develops.','contact?interest=ride','Get in touch')}</main>`,

about: `<main><section class="page-hero"><div class="container"><div class="page-hero-mark" aria-hidden="true"></div><h1>Making vehicle movement easier to understand.</h1><p class="lead">We are an early-stage mobility technology company building around a simple idea: the people responsible for a vehicle should have a clearer picture of what is happening with it.</p></div></section><section class="section"><div class="container split"><div><h2>One technology foundation. Different needs.</h2><p>Location tracking and trip information sit at the heart of VexarDrive. The foundation supports experiences shaped for fleet operations and individual riders, while leaving room to evolve as real-world needs change.</p><div class="button-group">${link('grid','Explore VexarGrid')}${link('go','Explore VexarGo','button outline')}</div></div><div class="soft-panel"><div class="quote">Movement happens. Visibility should follow.</div><p style="margin:25px 0 0">Fleet teams need an operational view. Riders need accessible journey information. We are building both on a connected technology base.</p></div></div></section><section class="section" style="background:#F6F6F6"><div class="container"><div class="section-head"><h2>Important information is often scattered.</h2><p>A clearer picture helps people understand what is happening, review what happened and respond when needed.</p></div><div class="grid-4"><div class="feature-card"><div class="num">01 / VISIBILITY</div><h3>Fleet activity</h3><p>Vehicles, drivers and trips can be difficult to view together.</p></div><div class="feature-card"><div class="num">02 / UPDATES</div><h3>Manual follow-up</h3><p>Calls, messages and separate records add effort to daily operations.</p></div><div class="feature-card"><div class="num">03 / CONTEXT</div><h3>Trip information</h3><p>Journey details need to be accessible when questions arise.</p></div><div class="feature-card"><div class="num">04 / PERSONAL</div><h3>Ride history</h3><p>Individual riders benefit from an easier way to revisit journeys.</p></div></div></div></section><section class="section"><div class="container"><div class="section-head"><h2>Three perspectives. One direction.</h2></div><div class="founder-grid"><article class="founder"><div class="avatar">VD</div><h3>Vaibhav Raj Dikshit P</h3><p>Founder & CEO · Technology, product, market and business direction.</p></article><article class="founder"><div class="avatar">SV</div><h3>Shriram V</h3><p>Co-founder & COO · Execution, operations and delivery.</p></article><article class="founder"><div class="avatar">DN</div><h3>Dharshini NT</h3><p>Co-founder & CMO · Marketing, communication and brand identity.</p></article></div></div></section>${cta('Come be part of the journey.','Have a question, idea or potential partnership in mind? We would like to hear from you.','contact','Talk to the team')}</main>`,

vision: `<main><section class="page-hero"><div class="container"><div class="page-hero-mark" aria-hidden="true"></div><h1>A future built on visibility.</h1><p class="lead">We envision a world where useful mobility information is accessible, connected and part of everyday life.</p></div></section><section class='section vision-why'><div class='container vision-why-layout'><div class='vision-why-heading'><h2>Understand the journey as it unfolds.</h2></div><div class='vision-why-detail'><p>Fleet owners and operations teams should be able to understand vehicles, drivers and trips without piecing together scattered updates. Individuals should be able to access meaningful information about their own journeys, too.</p><blockquote class='vision-quote-card'><p class='vision-why-statement'>“A clearer picture can make everyday mobility easier to understand and use.”</p></blockquote></div></div></section><section class="section" style="background:#F6F6F6"><div class="container"><div class="section-head"><h2>A clear path to growth.</h2><p>Our focus is on proving what works, simplifying how people get started and continuing to learn from real-world needs.</p></div><div class="grid-2"><div class="feature-card"><div class="num">MARKET</div><h3>Bring products to people</h3><p>Prepare VexarDrive’s products for launch and the audiences they are designed for.</p></div><div class="feature-card"><div class="num">EXPERIENCE</div><h3>Make getting started easier</h3><p>Create clear product experiences that explain the value and the next step.</p></div><div class="feature-card"><div class="num">PRACTICE</div><h3>Build for real-world needs</h3><p>Keep fleet operators and individual riders at the centre of development.</p></div><div class="feature-card"><div class="num">FUTURE</div><h3>Lay the foundation for what is next</h3><p>Strengthen the technology and evolve capabilities as needs change.</p></div></div></div></section><section class="section vision-explore"><div class="container"><div class="section-head"><h2>Two ways to experience better mobility.</h2></div>${visionProductCards}</div></section>${cta('Ready to take the first step?','Explore our products, then tell us which mobility challenge matters most to you.','contact','Connect with us')}</main>`,

contact: `<main><section class="page-hero"><div class="container"><div class="page-hero-mark" aria-hidden="true"></div><h1>Let’s start a conversation.</h1><p class="lead">Exploring fleet operations, personal ride tracking or a partnership? Tell us what you have in mind.</p></div></section><section class="section"><div class="container contact-layout"><div><h2>Every conversation starts somewhere.</h2><div class="contact-detail"><strong>Email</strong><a href="mailto:contact@vexartech.in">contact@vexartech.in</a></div><div class="contact-detail"><strong>Phone</strong><a href="tel:+916374743899">+91 63747 43899</a></div><div class="contact-detail"><strong>Address</strong><p>VexarDrive Technologies Private Limited<br>Prestige Atlanta, 80 Feet Rd, 1A Block<br>Koramangala, Bengaluru 560034, India</p></div></div><div class="contact-form"><h3>Tell us what you are working towards.</h3><p>Share a little about your interest and our team can follow up.</p><form id="contact-form"><div class="form-grid"><div class="form-field"><label for="name">Full name *</label><input id="name" name="name" required autocomplete="name"></div><div class="form-field"><label for="email">Email address *</label><input id="email" name="email" type="email" required autocomplete="email"></div></div><div class="form-grid"><div class="form-field"><label for="company">Company / organisation</label><input id="company" name="company" autocomplete="organization"></div><div class="form-field"><label for="interest">Area of interest *</label><select id="interest" name="interest" required><option value="">Select an option</option><option value="fleet">Fleet operations / VexarGrid</option><option value="ride">Personal ride tracking / VexarGo</option><option value="partner">Partnership</option><option value="general">General inquiry</option></select></div></div><div class="form-field"><label for="message">Message *</label><textarea id="message" name="message" required></textarea></div><button class="button" type="submit">Send message ${arrowIcon('ArrowUpRight')}</button><div class="form-message" role="status" aria-live="polite"></div></form></div></div></section></main>`
};

app.innerHTML = header + (pages[page] || pages.home) + footer;
const headerEl = document.querySelector('.site-header');
const updateHeaderSurface = () => headerEl.classList.toggle('is-scrolled', window.scrollY > 24);
window.addEventListener('scroll', updateHeaderSurface, { passive:true });
updateHeaderSurface();
const menuButton = document.querySelector('.menu-toggle');
const technologyMenu = document.querySelector('.nav-dropdown');
const technologyButton = document.querySelector('.nav-dropdown-toggle');
function setTechnologyOpen(open) {
  technologyMenu.classList.toggle('is-open', open);
  technologyButton.setAttribute('aria-expanded', String(open));
}
function setMenuOpen(open) {
  headerEl.classList.toggle('open', open);
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  menuButton.innerHTML = open ? arrowIcon('Cross X','menu-icon') : arrowIcon('List','menu-icon');
  if (!open) setTechnologyOpen(false);
}
menuButton.addEventListener('click', event => {
  event.stopPropagation();
  setMenuOpen(!headerEl.classList.contains('open'));
});
window.matchMedia('(min-width: 1001px)').addEventListener('change', event => {
  if (event.matches) setMenuOpen(false);
});
document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => setMenuOpen(false)));
technologyButton.addEventListener('click', () => setTechnologyOpen(!technologyMenu.classList.contains('is-open')));
document.addEventListener('click', event => {
  if (!technologyMenu.contains(event.target)) setTechnologyOpen(false);
  if (!headerEl.contains(event.target)) setMenuOpen(false);
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && technologyMenu.classList.contains('is-open')) {
    setTechnologyOpen(false);
    technologyButton.focus();
    return;
  }
  if (event.key === 'Escape' && headerEl.classList.contains('open')) {
    setMenuOpen(false);
    menuButton.focus();
  }
});

const carousel = document.querySelector('.product-carousel');
if (carousel) {
  const viewport = carousel.querySelector('.carousel-viewport');
  const slides = [...carousel.querySelectorAll('.carousel-track > .product-card')];
  const tabs = [...carousel.querySelectorAll('.carousel-tab')];
  const previous = carousel.querySelector('.carousel-prev');
  const next = carousel.querySelector('.carousel-next');
  const count = carousel.querySelector('.carousel-count');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let active = 0;
  let scrollFrame = 0;
  slides.forEach((slide, index) => {
    slide.setAttribute('role', 'group');
    slide.setAttribute('aria-roledescription', 'slide');
    slide.setAttribute('aria-label', `${index + 1} of ${slides.length}, ${index === 0 ? 'VexarGrid' : 'VexarGo'}`);
  });
  function setActive(index) {
    active = index;
    slides.forEach((slide, i) => slide.classList.toggle('is-current', i === index));
    tabs.forEach((tab, i) => {
      tab.classList.toggle('is-active', i === index);
      if (i === index) tab.setAttribute('aria-current', 'true');
      else tab.removeAttribute('aria-current');
    });
    if (count) count.textContent = `0${index + 1} / 0${slides.length}`;
    if (previous) previous.disabled = index === 0;
    if (next) next.disabled = index === slides.length - 1;
  }
  function goTo(index) {
    const target = Math.max(0, Math.min(index, slides.length - 1));
    const left = slides[target].getBoundingClientRect().left - viewport.getBoundingClientRect().left + viewport.scrollLeft;
    viewport.scrollTo({ left, behavior: reducedMotion.matches ? 'auto' : 'smooth' });
    setActive(target);
  }
  tabs.forEach((tab, index) => tab.addEventListener('click', () => goTo(index)));
  previous?.addEventListener('click', () => goTo(active - 1));
  next?.addEventListener('click', () => goTo(active + 1));
  viewport.addEventListener('keydown', event => {
    if (event.target !== viewport || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    goTo(active + (event.key === 'ArrowRight' ? 1 : -1));
  });
  viewport.addEventListener('scroll', () => {
    if (scrollFrame) return;
    scrollFrame = requestAnimationFrame(() => {
      scrollFrame = 0;
      const left = viewport.getBoundingClientRect().left;
      const nearest = slides.reduce((best, slide, index) => Math.abs(slide.getBoundingClientRect().left - left) < Math.abs(slides[best].getBoundingClientRect().left - left) ? index : best, 0);
      setActive(nearest);
    });
  }, { passive: true });
  setActive(0);
}
const selectedInterest = new URLSearchParams(location.search).get('interest');
if (page === 'contact' && selectedInterest) {
  const select = document.querySelector('#interest');
  if ([...select.options].some(option => option.value === selectedInterest)) select.value = selectedInterest;
}
const form = document.querySelector('#contact-form');
if (form) form.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const subject = `VexarDrive enquiry — ${data.get('interest') || 'general'}`;
  const body = [
    `Name: ${data.get('name')}`,
    `Email: ${data.get('email')}`,
    `Company: ${data.get('company') || '—'}`,
    `Interest: ${data.get('interest')}`,
    '',
    String(data.get('message') || '')
  ].join('\n');
  window.location.href = `mailto:contact@vexartech.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});


document.addEventListener('click', event => {
  const card = event.target.closest('.product-card');
  const link = card && card.querySelector('a.text-link');
  if (!link || event.target.closest('a, button')) return;
  window.location.href = link.href;
});
