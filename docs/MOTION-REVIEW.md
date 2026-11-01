# Atelier 05: photography-first creative direction

This revision replaces the previous homepage scenes and removes the accumulated
CSS overrides. It is not another animation layer over The Bespoke Edit layout.
The main palette is warm ivory, deep charcoal, muted champagne and natural fabric
tones. The supplied logo retains its own original gold artwork.

## New composition and motion

| Scene | Composition | Verified motion and interaction |
|---|---|---|
| Opening | Full-screen room photograph; one contained, central gold-logo reveal; exact three-line tagline in normal document flow. No floating EST/1959 block. | Logo mask opens over 1.1 seconds. Typography arrives with restrained stagger. Scrolling moves the copy away, scales the photograph 1→1.08 and changes three source-attributed frames. A final small inset creates a transition into ivory. Photographs are selectable directly. |
| Heritage | A year/caption figure, a narrative column, and a separate portrait image. | Photograph wipes into its own cell as the spread enters. The year stays stationary and the caption has explicit spacing; there is no negative line-height overlap. |
| Atelier | Large fabric image beside a separate charcoal text panel. Mobile uses image above copy. | Normal scrolling advances light, texture and handwork chapters. Still photographs scale subtly; captions crossfade. Chapter controls and a skip link support direct access. These are animated stills, not claimed physical fabric footage. |
| The spaces | Full-bleed room photographs with a separate caption band, rather than oversized type printed over furnishings. | Vertical photographic wipes move through deck selections. Index/arrow controls seek to each scene; a button opens the accessible image gallery. Controls are kept clear of WhatsApp. |
| Collections | Native horizontal exhibition of portrait material cards on ivory. | Touch swipe, keyboard focus and previous/next arrows explore the seven categories. Gentle image zoom on hover. Normal page scrolling is never redirected. |
| Visit | Calm two-column invitation and both location addresses. | Clear appointment access without another pinned animation. |

Under reduced motion, the opening stays static and craft/gallery sequences become
readable stacked panels. Native navigation works without the View Transitions API.
The optional desktop context cursor remains absent on touch, forms, dialogs and
reduced motion.

## Alignment checks

Heading bounds are checked on all six pages at 320, 768, 1366 and 1440px widths.
Home and Legacy receive explicit 1959/caption-gap measurements. Short-screen tests
measure heading/caption/control separation at 320×740, 390×844 and 1366×768.
Screenshots are inspected separately from these geometry assertions. A 16-second
local browser screen recording also captures the opening, heritage, craft,
photographic wipes and native collection exploration; sampled frames were
reviewed for composition. It is a UI walkthrough, not original project footage.

The Legacy year uses generous line-height and a separate flex row for its caption.
The opening's Since 1959 is part of the normal headline flow, not an absolutely
positioned aside. Desktop and mobile craft copy occupy different zones from imagery.

## Real media limitation

Only the supplied pitch deck and its extracted photographs/logo are accessible.
Project names, client identities and credits are not invented. Drive import remains
blocked at the environment proxy; no Drive clips have been reviewed. The actual
opening film is still pending original footage. The current image sequence is
explicitly labelled as pitch-deck photography.

See [current screenshots](previews/README.md), [media access](DRIVE-ACCESS.md),
[original media review](MEDIA-REVIEW.md), and [Windows preview](WINDOWS-PREVIEW.md).
