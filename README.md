# VexarDrive website

This is a local, static website with six responsive pages: Home, About, VEXAR GRID, VEXAR GO, Vision, and Contact.

## Open it

Open `index.html` in a modern browser. Keep all files and the `assets` folder together. No installation or build step is required. To host it, upload the entire folder to any static web host.

## Interactions

- The Technology menu links to GRID and GO on desktop and mobile.
- The Home hero shows two vehicles on the lower road and two trucks on the elevated bridge. The Home, GRID, and GO hero vehicles follow SVG routes in continuous loops. Motion pauses when the tab is hidden and respects the browser's reduced motion preference.
- The Home product carousel supports buttons, arrow keys, and touch scrolling.
- The Home roadmap has four selectable milestones. A vehicle and highlighted route follow the selected phase, with a vertical route on narrow screens. Reduced motion settings are respected.
- The GRID and GO pages include interactive product stories and journey controls.
- The GRID operating-needs cards reveal each team's full explanation on hover or selection. Click a card to keep it open; the separate explanation block has been incorporated into the cards.
- The GRID Fleet Challenges section presents four selectable issues. Each selection updates the matching response and highlights the relevant information in the GRID visual. On smaller screens, the response opens inside the selected card.
- The GRID Technical Overview shows permission roles and platform capabilities directly in two cards.
- Section spacing is shared across desktop and mobile layouts, and the floating navigation uses layered translucent glass that becomes more pronounced as you scroll.
- The About hero uses a two-way boulevard image with traffic traveling in opposite directions. Its web-ready image is `assets/about-two-way-movement.webp`.
- The About page shows the complete founder stories in the founder section. The three equal cards select a story in place, and each has a separate LinkedIn link.
- The Contact form validates fields and opens a populated draft in the visitor's email app. It does not submit to a server; connect a form service or backend before expecting direct form delivery.

The site uses Google Fonts when available and system fonts as a fallback. The VEXAR logos were prepared from the supplied corporate brand guidelines PDF.

The GRID audience and capability icons, arrows, carets, and menu controls use the supplied `Grid Icons` SVG files. The Technology menu uses the supplied GRID logo in a compact row, with a matching empty slot reserved for the future GO logo. Global canvas, text, accent, and footer colors follow the supplied `Light.tokens.json` website color file.


## Clean URLs (no `.html`)

Pages link to `/grid`, `/go`, `/about`, `/vision` and `/contact`. Most hosts serve these automatically from the `.html` files:

- **Cloudflare Pages, Netlify, GitHub Pages:** nothing to configure.
- **Vercel:** `vercel.json` (included) turns on `cleanUrls`.
- **Apache / shared hosting:** `.htaccess` (included) rewrites the URLs.
- **nginx:** add `location / { try_files $uri $uri.html $uri/ =404; }`.

Opening the files directly from disk (`file://`) or with a plain static server will not resolve `/grid`; use a host above or `python3 serve.py` below.
