# GVK Decor

**Crafting Timeless Spaces Since 1959**

The existing GVK Decor luxury portfolio, built with React and Vite. Six pages:
Home, Our Legacy, Collections, Projects, Behind the Craft and Contact. No store,
checkout, payment, public deployment or analytics is configured.

## Private Windows preview

1. Install Node.js **LTS** from https://nodejs.org/.
2. Download the **main** branch from GitHub via **Code → Download ZIP**, then
   **Extract All**. Use a fresh download for this revision.
3. Open the extracted folder containing package.json and double-click
   **START-PREVIEW.cmd**. Wait for **VITE ready**.
4. Open **http://127.0.0.1:5173** in Chrome. Keep the command window open;
   press **Ctrl+C** there to stop.

The helper binds only to your Windows computer. It does not upload files,
push Git changes or publish the website. Full troubleshooting and manual commands:
[Windows preview guide](docs/WINDOWS-PREVIEW.md). The application was built and browser-tested on Linux; the .cmd file itself
has not been executed on Windows here.

## Development and verification

Requires Node.js 22.12+ (validated on 24.19), npm and a modern browser.

```sh
npm ci
npm run dev -- --host 127.0.0.1 --port 5173 --strictPort
```

```sh
npm run build
npm test
npm run format:check
```

Browser tests use `/usr/bin/chromium` in this cloud environment. On another
machine, remove executablePath from playwright.config.js and run
`npx playwright install chromium` before testing. Deployment, if later approved,
must rewrite application routes to index.html for React Router deep links.

## Current brand and media status

The uploaded **GVK Decor_Pitch Deck.pdf** was reviewed page by page. Its embedded
gold logo was extracted with its alpha mask and transparent padding trimmed;
the artwork was not redrawn or recoloured. Selected photographs were extracted
and optimized as WebP; collage panels were cropped at their existing boundaries.
Their source pages, PDF image IDs, crop rectangles, dimensions and selection
reasons are recorded in [the media manifest](docs/deck-media-manifest.json).
The 21MB source PDF stays outside the public application.

The opening uses the deck's largest room photograph, pending an actual opening
film. The craft sequence uses deck curtain and handwork photographs. Three
source-attributed deck selections have full-screen presentations and galleries.
Their titles describe images, not invented completed projects. Project names,
locations, credits and permissions need confirmation before final case studies.
`projects` remains empty; `deckSelections` is explicitly separate.

**No real video clips have been supplied.** Review them before choosing a final
opening film or scroll-scrub cut. See [media review and outstanding files](docs/MEDIA-REVIEW.md).
The deck uses an older tagline and contact details; the latest user-supplied
exact tagline, phone, WhatsApp and email take precedence.

## Structure and motion

- `src/data/site.js`: exact tagline, gold logo path, both locations, collection
  assets, source-attributed deck selections, verified projects and film slots.
- `src/Home.jsx`: opening, heritage, collection explorer and visit invitation.
- `src/components/ScrollStory.jsx`: native sticky three-stage scroll sequence,
  chapter controls, skip link and optional paused video scrubbing. Reduced motion
  becomes a static readable chapter stack; no scroll/touch interception.
- `src/components/PortfolioStage.jsx`: full-screen verified projects or distinctly
  attributed deck selections. Reuses the keyboard-accessible ProjectViewer.
- `src/components/Media.jsx`: responsive/lazy images, posters, explicit film play,
  off-screen pause and load-error fallback.
- `src/hooks/useExperience.js`: observer-based reveals, rAF-batched parallax and
  native View Transitions with ordinary-navigation fallback.
- `src/components/Locations.jsx`: consistent branch details across home/menu/footer/contact.
- `src/pages.jsx`: remaining page views and appointment enquiry form.
- `public/media/README.md`: adding actual Drive originals as optimized web assets.

Self-hosted fonts; GSAP ScrollTrigger for the cinematic sequences, with no forced media autoplay. Decorative
cursor is desktop-only and keeps the native cursor. Reduced motion removes
parallax, text reveals, cursor effects and route-transition animation.

## Editable contact details

- GVK Decor Experience Centre — Road No. 39, Jubilee Hills, Hyderabad
- GVK Decor Store — Secunderabad, Hyderabad
- Phone: +91 89776 30636
- WhatsApp: +91 89770 30636
- Enquiry email: gvkdecor@gmail.com

Edit `src/data/site.js`. Public email and WhatsApp overrides are supported via
VITE_APPOINTMENT_EMAIL and VITE_WHATSAPP_NUMBER in .env.local (see .env.example).
Never put secrets in browser-exposed VITE variables.

The appointment enquiry form retains required fields and consent, adds branch
selection, and prepares a reviewable mailto link. It does not store data or
send email automatically, and does not confirm bookings. Test real mail-app
and WhatsApp handoff on target Windows/mobile devices before approved launch.

## GVK-CINEMA-04 redesign and the old-ZIP problem

An old ZIP **does not update** when commits are pushed to GitHub. Stop the old
server, download main again, extract to a new folder, and open START-PREVIEW.cmd.
Look for the **GVK-CINEMA-04** badge in the local browser. The badge is dev-only
and is omitted from production builds. See docs/WINDOWS-PREVIEW.md.

GSAP + ScrollTrigger now drive the opening's expanding aperture, layered title
movement, image zoom and horizontal furnishing rail. Full-screen portfolio panels
overlap and reveal. The desktop cursor has contextual labels and a damped pointer
ring. All animations have static reduced-motion layouts; normal vertical scrolling
is preserved without intercepting wheel/touch events.

The opening uses reviewed pitch-deck stills, explicitly labelled as a still-image
sequence. The authentic-video acceptance criterion remains **blocked on media**:
all 14 supplied Drive folders were denied by the environment proxy before any
contents could be listed. See docs/DRIVE-ACCESS.md and the per-folder access report.
Do not call the supplied Drive videos reviewed or the real opening film complete.

The Windows launcher now checks Node version, lockfile fingerprint, port occupancy
and folder identity; it opens a browser only after Vite reports ready. Its portable
logic can be checked with `node scripts/preview-local.mjs --check`. Windows-specific
execution remains to be confirmed on the user's laptop.
