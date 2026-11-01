# GVK Decor — Atelier 05

**Crafting Timeless Spaces Since 1959**

The existing six-page GVK Decor luxury portfolio: Home, Our Legacy, Collections,
Projects, Behind the Craft and Contact. No e-commerce or public deployment.

## Review the NEW version on Windows

An old downloaded ZIP does **not** update when GitHub changes.

1. Stop the old preview terminal with **Ctrl+C**.
2. Download **main → Code → Download ZIP** again and **Extract All** into a new folder.
3. Install current **Node.js LTS** from https://nodejs.org/ if needed.
4. Double-click **START-PREVIEW.cmd** in the new folder.
5. Open **http://127.0.0.1:5173** in Chrome, press **Ctrl+Shift+R**, and verify the
   **GVK-ATELIER-05** badge at bottom left.

The launcher binds only to your computer, checks port occupancy and dependency
fingerprints, and identifies the folder being served. It does not publish or push
anything. [Detailed Windows instructions](docs/WINDOWS-PREVIEW.md).
The portable launcher has been exercised in Linux; Windows-specific execution
cannot be verified on this machine.

## Development

Node.js 22.12+ and npm are required (validated on Node 24.19).

```sh
npm ci
npm run dev -- --host 127.0.0.1 --port 5173 --strictPort
npm run build
npm test
npm run format:check
```

Browser tests use `/usr/bin/chromium`. On another machine, adjust executablePath
in playwright.config.js or use Playwright's installed Chromium after
`npx playwright install chromium`. A future approved deployment needs SPA route
rewrites to index.html. No hosting/deployment configuration is added here.

## Creative correction

The prior homepage components and accumulated override stylesheet were removed.
Atelier 05 uses new photography-first scenes and a clean shared design system:

- `src/styles.css`: shared typography, navigation, footer, forms and interior pages.
- `src/experience.css`: restrained ivory/charcoal/champagne homepage compositions.
- `src/components/experience/FilmOpening.jsx`: full-bleed image, contained gold-logo
  reveal, exact tagline in flow layout, gentle scale and changing photographic frames.
- `HeritageSpread.jsx`: a separate year/caption figure, narrative and image spread.
- `CraftChapter.jsx`: three scroll-controlled craft chapters with separate image
  and text zones; readable static panels for reduced motion.
- `SpaceGallery.jsx`: full-screen photographic wipes and a separate caption band;
  accessible gallery viewer, selection controls and source attribution.
- `MaterialExhibition.jsx`: native horizontal exhibition with touch/keyboard/arrow
  access, without forcing visitors through a long pinned horizontal sequence.

GSAP ScrollTrigger drives the primary visual sequences. Page transitions use the
native View Transitions API with ordinary-navigation fallback. Fonts are self-hosted.
[Section-by-section motion notes](docs/MOTION-REVIEW.md).

## Media honesty and import status

The supplied gold logo and reviewed photographs come from the uploaded
GVK Decor_Pitch Deck.pdf. Logo extraction preserves the original artwork; photos
are optimized WebP crops of the deck's existing collage panels. Source pages and
crop rectangles are recorded in [the manifest](docs/deck-media-manifest.json).
The source PDF is not exposed by the website.

**Original Drive files remain inaccessible.** There is no connected Drive import
tool in this session, and the current proxy policy still blocks drive.google.com.
No inaccessible photos/videos have been reviewed. A fresh sample request remained
403; the earlier per-folder check of all 14 URLs is preserved in the access report.
The two external reference sites were also blocked; their written design principles,
not copied layouts or assets, informed the design.

The supported fallback is to attach original files or a per-project ZIP in chat.
Start with 3–5 landscape photographs, 2–3 room/fabric-motion clips, 2–3 craft details,
and approved project attribution/permissions. Preserve filenames. See
[media access and upload requirements](docs/DRIVE-ACCESS.md).

No footage or completed project identities are invented. `projects` is empty;
`deckSelections` has explicitly attributed descriptive image groups. The opening
film cannot be finalized until original clips are accessible and reviewed.

## Brand, locations and enquiries

Central data: `src/data/site.js`. Both branches remain visible:

- Experience Centre — Road No. 39, Jubilee Hills, Hyderabad
- Store — Secunderabad, Hyderabad

Phone +91 89776 30636; WhatsApp +91 89770 30636; email gvkdecor@gmail.com.
Existing public overrides VITE_WHATSAPP_NUMBER and VITE_APPOINTMENT_EMAIL remain
supported via .env.local. Never put secrets in VITE variables.

The appointment form retains validation, consent and branch selection. It prepares
a reviewable mailto message and does not send automatically or confirm a booking.
The latest user-provided tagline and contacts take precedence over older deck text.
