# GVK-CINEMA-04 — visual and motion review

This is a different homepage composition, not only a font/palette adjustment.
Screenshots under docs/previews are actual local browser captures. Open their
GitHub file pages to view them if ChatGPT's image interface does not display them.
They are design-review artifacts, not a public website deployment.

## What moves

| Section | Actual implemented motion | Control and fallback |
|---|---|---|
| Opening / The Bespoke Edit | Three editorial title lines rise and unrotate on arrival. As the visitor scrolls, the image aperture expands from a right-hand cropped panel to the full viewport, the title translates upward and disappears, the photograph zooms from 1.13 to 1, and a second caption arrives. Three stills crossfade at scroll chapters. | GSAP ScrollTrigger, scrub 0.65; native sticky stage. Image selector and explicit Play/Pause **image sequence** controls. Skip to heritage. Reduced motion shows a static composition. No authentic film is claimed. |
| Heritage | Large 1959 composition and source-based founder story reveal as a quiet intermission. | Observer-based reveal and restrained text treatment; immediate static content under reduced motion. |
| Craft | A three-stage pinned photographic sequence changes from window light to fabric to handwork. The image layer shifts, scales and skews subtly while text crossfades between chapters. | Native scroll position, chapter buttons and skip link. Existing video-scrub slot remains tested with a synthetic fixture; it contains no unreviewed Drive clip. Reduced motion becomes three static panels. |
| Furnishing edit | Normal downward scrolling moves seven large cards sideways; the current index/category updates. Product photographs zoom gently on hover. | GSAP ScrollTrigger, scrub 0.6. Buttons jump to collections; keyboard focus brings links into view. Reduced motion becomes a vertical/grid catalogue, with no forced lateral animation. |
| Portfolio | Full-screen panels overlap. Each image opens from an inset crop while scaling 1.13 to 1. | Native sticky screens and ScrollTrigger; each opens the existing accessible full-screen gallery. Reduced motion removes overlap/reveal animation. Source labels explicitly identify pitch-deck selections. |
| Desktop cursor | A damped small ring expands into a labelled Scroll/Discover/View target over media; links use an arrow accent. | Passive pointer events, animation frames. Native pointer retained outside context surfaces. Disabled on touch, form fields, dialogs and reduced-motion preference. |
| Page navigation | Browser-native view transition blends route changes; ordinary navigation if unsupported. | Respects reduced motion. All six routes retain normal links and keyboard navigation. |

## Available images and missing film

The available real images are extracted from the supplied GVK Decor pitch deck.
No new project names, locations or credits are invented. The opening is explicitly
labelled **Pitch-deck still-image sequence — authentic video pending**.

All 14 Drive folders failed at the environment proxy before their contents could
be listed. None of those clips or photographs has been reviewed. The original
project-film acceptance criterion is therefore **not complete**. Upload/access
requirements are in DRIVE-ACCESS.md. No placeholder or synthetic test film is
shipped as GVK Decor work.

## Private Windows preview

Stop the old server, download a fresh main ZIP, extract to a new folder, run
START-PREVIEW.cmd and look for **GVK-CINEMA-04** at bottom left. The previous ZIP
never updates itself. The launcher rejects an occupied port so an old server
cannot be silently confused with the new copy. See WINDOWS-PREVIEW.md.
