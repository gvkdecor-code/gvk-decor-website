# Original GVK Decor media

Download approved originals from Google Drive and put web-optimized copies here.
Use stable filenames, e.g. `jubilee-hills-living-room.webp`. Do not use Drive
sharing-page URLs as image/video sources: they return HTML and may require login.
Keep raw masters outside the repository. Prefer WebP/AVIF images, compressed MP4
(H.264) videos with poster images, and WebVTT captions. Obtain permission before
publishing identifiable client spaces.

Edit `src/data/site.js` to populate collection images and films and add verified
projects. `image`, `video`, `poster`, and optional `captions` accept `/media/...`
paths or stable HTTPS media URLs. Every photograph needs descriptive `alt` text.
All projects must have a unique id, title, category (Homes or Collaborations),
location, description, and a nonempty media array. The abstract textile studies
are CSS illustrations, not photographs or actual GVK Decor projects.

## Cinematic homepage

`heroMedia` controls the full-screen introduction; `craftStudies` controls the
three interactive macro views; `brandFilm` controls the Behind the Craft film.
For the hero, choose an approved image with generous negative space on the left
for legible titles. A video needs a lightweight poster: visitors explicitly play
it and can pause it. Do not place essential spoken content only in a muted film;
provide WebVTT captions via `captions` and a descriptive `alt` label.

Images support `srcSet`, `sizes`, `width`, and `height`. Export multiple widths
rather than serving raw full-resolution Drive masters. Use landscape crops for
hero/project media and portrait crops for collections, and check both mobile and
desktop framing. The first verified project supplies the homepage portfolio media.

Example (replace paths and text with actual approved media):

```js
{
  image: '/media/approved-room-1600.webp',
  srcSet: '/media/approved-room-800.webp 800w, /media/approved-room-1600.webp 1600w',
  sizes: '(max-width: 760px) 100vw, 50vw',
  width: 1600,
  height: 1100,
  alt: 'Describe the actual furnishing, material and room shown',
  video: '',
  poster: ''
}
```
