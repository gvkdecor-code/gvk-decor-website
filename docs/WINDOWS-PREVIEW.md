# Open Atelier 05 privately on Windows

**Your old ZIP does not update automatically when GitHub changes.**

1. Press **Ctrl+C** in the old preview's command window and close its Chrome tab.
2. Install current **Node.js LTS** from https://nodejs.org/ if needed.
3. Open https://github.com/gvkdecor-code/gvk-decor-website, select **main**, then
   **Code → Download ZIP**. Download again; do not use an old ZIP.
4. Right-click the new ZIP → **Extract All** into a new folder, e.g. GVK-ATELIER-05.
5. Open the extracted folder containing package.json and **START-PREVIEW.cmd**.
   Double-click START-PREVIEW.cmd and wait for **VITE ready**.
6. Open **http://127.0.0.1:5173** in Chrome. Press **Ctrl+Shift+R**.
7. Confirm **GVK-ATELIER-05** appears bottom-left. If you see GVK-CINEMA-04 or an
   older label, a different folder/server is running.
8. Keep the command window open. Press **Ctrl+C** there to stop.

The helper prints its folder, checks Node, refreshes dependencies when the lockfile
changes and rejects an occupied port rather than silently starting a second copy.
It only serves 127.0.0.1 on your own computer. It does not publish or push anything.
The helper's portable flow is tested in Linux; actual Windows wrapper/browser
launching cannot be run in this environment.

## Manual fallback

In the new folder, click File Explorer's address bar, type `cmd`, and press Enter.
Run these one at a time:

```bat
npm ci
npm run dev -- --host 127.0.0.1 --port 5173 --strictPort
```

Then open the same address in Chrome. If npm is not recognised, close the terminal
and reopen it after installing Node.js LTS. If port 5173 is occupied, stop the old
preview window first. Do not disable Windows security protections.

## What to review

- Full-screen room image and gold signature, with the exact tagline in three lines.
- Scroll through the quiet ivory heritage spread; check the 1959 caption spacing.
- Advance the three atelier chapters, then the photographic space-gallery wipes.
- Swipe or use arrows through the native collection exhibition.
- Open Menu and visit all six pages. Test WhatsApp and appointment email preparation.
- Try Windows Accessibility → Visual effects → Animation effects; reduced motion
  should produce readable static chapter layouts.

The current photograph sequence uses the supplied pitch deck. It is not an
unreviewed film from the still-inaccessible Google Drive folders.
