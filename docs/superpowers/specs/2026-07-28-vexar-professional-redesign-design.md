# VEXAR Website Redesign — Pitch Deck to Professional Site

## Problem

The current site (5 static HTML pages + shared `vexar.css`/`vexar.js`) reads as an investor pitch deck rather than a company website:

- Copy is written as verse — one short dramatic line per sentence ("Modern vehicles generate data. / Dashcams record. / Telematics track.") instead of normal prose.
- Content and CTAs are aimed at investors ("Join the Journey," "Invest in the future of safer roads," market-sizing slides, a "Phase 01–04" roadmap) rather than at customers (fleets, insurers, mobility partners).
- Visual execution is cinematic/slide-like: full-bleed animated particle-network hero canvas, custom cursor follower, glow gradients, giant stroked pull-quotes, per-line scroll-reveal animation.
- The dark navy/black theme is applied via a hack — the actual logo asset (`logo-white.png`) is a black-and-blue wordmark designed for light backgrounds, forced onto a dark nav with `mix-blend-mode: screen`.
- The contact form only writes to `localStorage`; it does not notify anyone of real inquiries.
- Minor issues: a low-opacity public link to `admin.html` in the footer; dead (`#`) social links; a founder quote attributed to an anonymous "VEXAR Founding Team" with no named leadership anywhere on the site.

## Goals

- Redesign all five pages (`index.html`, `about.html`, `technology.html`, `vision.html`, `contact.html`) plus `vexar.css`/`vexar.js` to read as a professional B2B company website for an AI driver-safety company, primarily addressing customers (fleets, insurance, mobility partners) rather than investors.
- Keep the existing brand: VEXAR wordmark, blue accent color (`#1A6FFF`), the tagline "Beyond the Horizon."
- Preserve all real factual content (stats, four pillars, who-it's-for segments, contact details) — rewrite tone and presentation, not the underlying facts, except where explicitly scoped for removal below.
- Fix the two functional gaps found during review: the non-functional contact form, and the public admin link.

## Non-goals

- No backend/CMS build-out beyond wiring the existing contact form to Formspree.
- No new pages beyond what exists today (no blog, careers, case studies) — those are future scope if wanted later.
- No changes to `admin.html` itself, only removal of its public footer link.
- No professional photography/illustration commissioning — the redesign uses typographic layout, icons, and structured grids rather than photography, since none exists.

## Visual System

**Palette**
| Token | Value | Use |
|---|---|---|
| `--bg` | `#FAFBFC` | Page background |
| `--bg2` | `#EEF1F5` | Card/section alt background |
| `--surface` | `#FFFFFF` | Card surfaces on `--bg2` |
| `--border` | `#E2E6EC` | Hairlines, dividers |
| `--navy` | `#0B1220` | Headings |
| `--text` | `#12181F` | Body text |
| `--muted` | `#5B6572` | Secondary/caption text |
| `--blue` | `#1A6FFF` | Accent — links, CTAs, highlights (unchanged from current brand) |
| `--blue-b` | `rgba(26,111,255,.06)` | Subtle accent backgrounds (icon chips, pills) |

**Typography** — Inter only, loaded at weights 300–800. Headings use 600–800, body uses 400, captions/labels use 500 with letter-spacing. Syne is removed.

**Logo** — `logo-white.png` (the black+blue wordmark) used at natural colors in nav and footer; no blend-mode/filter hacks. `logo-gradient.png` removed from all pages (retained in `assets/` for social/avatar use only, not linked from any page).

**Motion/JS** — Remove: custom cursor (`.cur`/`.cur-r` and its JS), `hero-canvas` particle network and `initHeroCanvas()`, per-line `.r`/`.d1`–`.d4` staggered verse-reveal classes. Keep: sticky nav on scroll, mobile hamburger menu, active nav-link detection. Add: a single, restrained one-time fade/slide-up (~200ms) on section entry via the existing `IntersectionObserver`, applied at the section level rather than per-line.

**Layout patterns** — Standard content sections (eyebrow label + heading + body copy), card grids for pillars/segments, a plain stat strip for factual figures, hairline section dividers. No radial glow backgrounds, no full-bleed vertical-stroke pull quotes, no giant stacked one-line paragraphs.

## Page-by-Page Content Plan

### Home (`index.html`)
- Hero: headline + one-sentence subhead + two CTAs (primary: "Talk to Us" → contact; secondary: "See the Technology" → technology.html). Static background (no canvas).
- "What is VEXAR" teaser: 2–3 sentence plain-prose summary + "Learn More →" link to About. Drop the "Early Stage" pill (undercuts credibility for enterprise buyers); keep "Open for Pilots" and location pills.
- "The Problem": condensed prose paragraph (2–3 sentences) + the existing stat strip (1.35M deaths, 94% human error, $1.8T cost, <3% fleets with real-time AI safety monitoring), presented as a normal stat row, not a poem.
- "Four Pillars": kept as a feature grid (icon, title, description), copy tightened, light-card styling.
- "Who It's For": kept as a 3-card grid (Fleets, Insurance, Mobility Ecosystems).
- Closing CTA band: "Talk to our team" / "Learn About VEXAR" — no "build the future" language.

### About (`about.html`)
- Owns the full company narrative (Home's version is a condensed teaser only — dedupe the current word-for-word repetition between the two pages).
- "The Problem" / "Why This Matters": rewritten as prose paragraphs, not verse or a bulleted "matters-item" list styled like slide callouts (list format itself is fine; the copy inside becomes plain sentences).
- "Where We Are" (currently "Early. Intentional. Focused."): rewritten out of pitch tone into a grounded statement of fact — early-stage, Bengaluru-based, open for pilots, building toward long-term deployment — without "we are early, we know it" framing.
- New **Leadership** section: Vaibhav Raj Dikshit, Shriram Venugopalakrishnan, Dharshini Nagarajan, each listed as Director.
- Founder's note quote retained, attributed to "— VEXAR Founding Team" (now backed by the named Leadership section above it).

### Technology (`technology.html`)
- Structure kept as-is (four-pillar deep dive + Who It's For trio) — this page was already the most content-solid. Re-skinned to the light system; copy lightly tightened for consistency with the new tone (drop any remaining dramatic italic asides that don't fit).

### Vision (`vision.html`)
- Opening "cinematic verse" ("We see a shift coming...") replaced with a plain-prose statement of where the industry/product is headed and why that matters operationally to a fleet/insurance reader.
- Market-sizing stats ($50B+ market, 4.5B+ connected vehicles, 12× ROI) and the "Phase 01–04" investor roadmap removed from the public site.
- Replaced with a customer-relevant equivalent: what a partner can expect working with VEXAR over time (e.g., pilot → integration → scale), written from the customer's perspective, not an investor pitch.
- Closing CTA: "Talk to our team" — no "Invest in the future of safer roads."

### Contact (`contact.html`)
- Layout unchanged (info column + form panel + reach-band). Re-skinned to the light system.
- Form JS rewritten to `fetch()`-POST to `https://formspree.io/f/mzdnoarz` instead of `localStorage`, keeping the existing "Sending… → Message Sent ✓" UI states and client-side required-field validation.

## Site-wide fixes
- Footer `admin.html` link removed from all pages (page itself untouched, just unlinked).
- Social icons: LinkedIn removed (not yet created), X → `https://x.com/VexarDrive`, Instagram → `https://www.instagram.com/vexardrive/`.

## Testing / Verification
- Visual check of all 5 pages at desktop and mobile breakpoints (existing `@media` breakpoints at 1024px/768px preserved, adjusted for new grid needs).
- Manual click-through of nav, mobile menu, and all internal links across all 5 pages.
- Manual submission test of the contact form against the live Formspree endpoint, confirming the "Message Sent" state and that a real submission arrives.
- No automated test suite exists or is being added — this is a static marketing site.
