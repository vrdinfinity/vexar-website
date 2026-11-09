(()=>{const p=(e,t,i,r="light")=>`
    <g class="moving-vehicle vehicle-${r}" data-route="${e}" data-duration="${t}" data-offset="${i}">
      <rect class="vehicle-shadow" x="-22" y="-12" width="44" height="24" rx="9"/>
      <rect class="vehicle-body" x="-18" y="-9" width="36" height="18" rx="7"/>
      <rect class="vehicle-glass" x="-3" y="-7" width="10" height="14" rx="3"/>
      <circle class="vehicle-lamp" cx="15" cy="-5" r="2"/><circle class="vehicle-lamp" cx="15" cy="5" r="2"/>
    </g>`,P=(e,t,i,r=!1)=>`
    <g class="moving-vehicle overpass-truck${r?" small-truck":""}" data-route="${e}" data-duration="${t}" data-offset="${i}">
      <g transform="scale(${r?".72":"1"})">
        <rect class="truck-shadow" x="-47" y="-17" width="90" height="34" rx="8"/>
        <rect class="truck-trailer" x="-45" y="-14" width="56" height="28" rx="5"/>
        <path class="truck-roof" d="M-37 -9H1M-37 9H1"/>
        <rect class="truck-cab" x="13" y="-13" width="28" height="26" rx="6"/>
        <rect class="truck-windscreen" x="27" y="-10" width="8" height="20" rx="3"/>
        <circle class="truck-lamp" cx="39" cy="-8" r="2"/><circle class="truck-lamp" cx="39" cy="8" r="2"/>
      </g>
    </g>`,N=`
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
        ${p("underpass-east",9500,.08,"blue")}${p("underpass-west",10500,.58,"silver")}
        <path d="M802 -100 C877 150 932 330 1002 520 S1132 730 1197 850" fill="none" stroke="#030b10" stroke-opacity=".66" stroke-width="203" filter="url(#bridge-shadow)" transform="translate(14 17)"/>
        <path class="bridge-guardrail" d="M802 -100 C877 150 932 330 1002 520 S1132 730 1197 850" fill="none" stroke="#7f969e" stroke-width="177"/>
        <path d="M802 -100 C877 150 932 330 1002 520 S1132 730 1197 850" fill="none" stroke="#34464c" stroke-width="164"/>
        <path d="M802 -100 C877 150 932 330 1002 520 S1132 730 1197 850" fill="none" stroke="#b5c5c7" stroke-opacity=".55" stroke-width="3" stroke-dasharray="19 25"/>
        <path id="overpass-west" d="M770 -100 C845 150 900 330 970 520 S1100 730 1165 850" fill="none" stroke="none"/>
        <path id="overpass-east" d="M834 -100 C909 150 964 330 1034 520 S1164 730 1229 850" fill="none" stroke="none"/>
        ${P("overpass-west",11500,.19)}${P("overpass-east",1e4,.62,!0)}
      </svg>
    </div>`,Z=`<div class="product-hero-art grid-hero-art" aria-hidden="true">
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
      ${p("grid-hero-route",8e3,.17,"grid")}${p("grid-hero-route",8e3,.66,"silver")}
    </svg></div>`,j=`<div class="product-hero-art go-hero-art" aria-hidden="true">
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
      ${p("go-hero-route",8e3,.17,"go")}${p("go-hero-route",8e3,.62,"silver")}
    </svg></div>`,z=`<div class="vision-horizon-art" aria-hidden="true">
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
    </svg></div>`,V=document.querySelector('body[data-page="grid"] .page-hero'),B=document.querySelector('body[data-page="go"] .page-hero'),l=document.querySelector('body[data-page="vision"] .page-hero');if(V&&V.insertAdjacentHTML("afterbegin",Z),B&&B.insertAdjacentHTML("afterbegin",j),l&&l.insertAdjacentHTML("afterbegin",z),l&&window.matchMedia("(pointer:fine)").matches){const e=l.querySelector(".vision-horizon-art");l.addEventListener("pointermove",t=>{if(document.body.classList.contains("motion-paused"))return;const i=l.getBoundingClientRect(),r=(t.clientX-i.left)/i.width-.5,h=(t.clientY-i.top)/i.height-.5;e.style.setProperty("--vision-x",`${(-r*18).toFixed(1)}px`),e.style.setProperty("--vision-y",`${(-h*10).toFixed(1)}px`)}),l.addEventListener("pointerleave",()=>{e.style.setProperty("--vision-x","0px"),e.style.setProperty("--vision-y","0px")})}const M=[["Monitor","Review available fleet and vehicle information."],["Detect","Identify an alert or event that needs attention."],["Investigate","Review related vehicle, driver, trip or alert details."],["Act","Take an available operational action."],["Resolve","Record and resolve the event."],["Learn","Use operational insights to understand what happened."]],Y=`
    <div class="workflow-story">
      <div class="story-copy">${M.map(([e,t],i)=>`
        <article class="story-step${i===0?" active":""}" data-step="${i}">
          <h3>${e}</h3><p>${t}</p>
        </article>`).join("")}</div>
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
    </div>`,C=document.querySelector('body[data-page="home"] .hero-motion-layer');if(C){C.innerHTML=N;const e=C.querySelector(".bridge-scene"),t=window.matchMedia("(max-width: 760px)"),i=()=>e.setAttribute("viewBox",t.matches?"700 0 500 760":"0 0 1440 760");i(),t.addEventListener?.("change",i)}const G=document.querySelector('body[data-page="grid"] .workflow');G&&(G.outerHTML=Y);const d=window.matchMedia("(prefers-reduced-motion: reduce)");let x=!1,L=0,I=0,$=0;const T=[...document.querySelectorAll(".moving-vehicle")].map(e=>({node:e,path:e.ownerSVGElement.querySelector(`#${e.dataset.route}`),duration:Number(e.dataset.duration),offset:Number(e.dataset.offset)})).filter(e=>e.path);function O(){for(const e of T){const t=e.path.getTotalLength(),i=((I/e.duration+e.offset)%1+1)%1,r=Number(e.node.dataset.manualProgress),h=e.node.hasAttribute("data-manual-progress")&&Number.isFinite(r)?Math.max(0,Math.min(1,r)):i,s=e.path.getPointAtLength(h*t),n=Math.min(t,h*t+2),y=Math.max(0,h*t-2),f=e.path.getPointAtLength(n<t?n:y),k=Math.atan2(n<t?f.y-s.y:s.y-f.y,n<t?f.x-s.x:s.x-f.x)*180/Math.PI;e.node.setAttribute("transform",`translate(${s.x.toFixed(1)} ${s.y.toFixed(1)}) rotate(${k.toFixed(1)})`)}}function U(e){x&&(I+=Math.min(50,e-$),$=e,O(),L=requestAnimationFrame(U))}function A(){x||d.matches||document.hidden||(x=!0,$=performance.now(),T.length&&(L=requestAnimationFrame(U)),document.body.classList.remove("motion-paused"))}function q(){x=!1,cancelAnimationFrame(L),document.body.classList.add("motion-paused")}document.addEventListener("visibilitychange",()=>document.hidden?q():A()),d.addEventListener?.("change",()=>d.matches?q():A()),O(),d.matches?q():A();const u=document.querySelector(".workflow-story");if(u){let E=function(o){if(o===s)return;cancelAnimationFrame(y);const a=n,c=(o+1)/e.length;if(s===-1||d.matches)n=c,k(c);else{const v=performance.now(),g=b=>{const w=Math.min(1,(b-v)/700),D=1-(1-w)**3;n=a+(c-a)*D,k(n),w<1&&(y=requestAnimationFrame(g))};y=requestAnimationFrame(g)}s=o,t.dataset.step=String(o),e.forEach((v,g)=>v.classList.toggle("active",g===o)),t.querySelector("[data-story-title]").textContent=M[o][0],t.querySelector("[data-story-body]").textContent=M[o][1],t.querySelector("[data-story-chip]").textContent=h[o]},S=function(){const o=window.innerWidth<=760?Math.min(window.innerHeight-60,t.getBoundingClientRect().bottom+66):window.innerHeight*.48;let a=0,c=1/0;e.forEach((v,g)=>{const b=v.getBoundingClientRect(),w=Math.abs(b.top+b.height/2-o);w<c&&(c=w,a=g)}),E(a)};var W=E,X=S;const e=[...u.querySelectorAll(".story-step")],t=u.querySelector(".story-visual"),i=u.querySelector("#story-route"),r=u.querySelector(".story-vehicle"),h=["Fleet activity in view","Event needs attention","Context connected","Next step available","Event resolved","Insight retained"];let s=-1,n=0,y=0;const f=i.getTotalLength(),k=o=>{const a=i.getPointAtLength(f*o);r.setAttribute("transform",`translate(${a.x.toFixed(2)} ${a.y.toFixed(2)})`),t.style.setProperty("--story-progress",(o*100).toFixed(4))};let R=!1;window.addEventListener("scroll",()=>{R||(R=!0,requestAnimationFrame(()=>{R=!1,S()}))},{passive:!0}),e.forEach((o,a)=>o.addEventListener("pointerenter",c=>{c.pointerType==="mouse"&&E(a)})),window.addEventListener("resize",S),S()}const m=document.querySelector(".story-bridge"),H=document.querySelector(".immersive-hero"),F=H?.querySelector(".mobility-stage");if((m||F)&&!d.matches){let t=function(){if(e=0,m){const i=m.getBoundingClientRect(),r=Math.max(0,Math.min(1,(window.innerHeight-i.top)/(window.innerHeight+i.height)*1.5));m.style.setProperty("--bridge-progress",r.toFixed(3))}if(F){const i=Math.max(0,Math.min(1,-H.getBoundingClientRect().top/H.offsetHeight));F.style.setProperty("--scroll-scale",(1+i*.055).toFixed(3))}};var J=t;let e=0;window.addEventListener("scroll",()=>{e||(e=requestAnimationFrame(t))},{passive:!0}),window.addEventListener("resize",t),t()}if("IntersectionObserver"in window&&!d.matches){const e=[...document.querySelectorAll("main > .section, main > .section-sm")].filter(i=>!i.id||i.id!=="how-it-works");e.forEach(i=>i.classList.add("reveal-on-scroll"));const t=new IntersectionObserver(i=>{for(const r of i)r.isIntersecting&&(r.target.classList.add("in-view"),t.unobserve(r.target))},{rootMargin:"0px 0px -8% 0px",threshold:.08});e.forEach(i=>t.observe(i)),document.documentElement.classList.add("motion-ready")}})();
