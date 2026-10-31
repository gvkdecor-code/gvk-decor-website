# Open the NEW GVK Decor preview in Windows Chrome

**Your old downloaded ZIP is a separate copy. GitHub changes do not update it.**

1. Stop the OLD website's command window with **Ctrl+C**. Close its browser tab.
2. Install current **Node.js LTS** from https://nodejs.org/ if it isn't installed.
3. Open https://github.com/gvkdecor-code/gvk-decor-website, select **main**, and choose
   **Code → Download ZIP**. Download a NEW ZIP; do not reopen the old download.
4. Right-click the NEW ZIP → **Extract All** into a NEW folder, e.g. GVK-CINEMA-04.
   Open the folder containing package.json, preview-version.json and START-PREVIEW.cmd.
5. Double-click **START-PREVIEW.cmd**. It checks Node, installs or refreshes locked
   dependencies when needed, checks whether port 5173 is occupied and starts Vite
   only on your own computer (127.0.0.1). Wait for Vite to say ready.
6. Your default browser will open after the server is ready. If necessary, open
   Chrome yourself and enter **http://127.0.0.1:5173**.
7. Press **Ctrl+Shift+R** in Chrome. Confirm **GVK-CINEMA-04** appears at the bottom
   left. If it doesn't, you are viewing the old folder/server, not this redesign.
8. Keep the command window open. Press **Ctrl+C** there when finished.

The launcher does not publish the website or push Git changes. If port 5173 is
occupied, it deliberately stops with a message rather than silently launching a
second copy on another port. Stop the old preview before retrying. It also prints
its folder path so you can check which downloaded copy is being served.

## Manual fallback

In the NEW extracted folder, click File Explorer's address bar, type `cmd`, press
Enter, then run these one at a time:

```bat
npm ci
npm run dev -- --host 127.0.0.1 --port 5173 --strictPort
```

Open the same address in Chrome. If npm isn't recognised, install Node.js LTS,
close the command window and open a new one. Do not disable Windows security
protections. Review downloaded scripts before running them if Windows prompts.

## What to test

- First screen: dark editorial composition with the supplied gold logo and a
  cropped room image. Scroll: the crop expands to full screen while the title
  leaves and a second text layer arrives. This is a disclosed still-image sequence,
  pending review of actual video clips.
- Craft: three photographic chapters progress with scrolling; chapter buttons
  let you jump and the skip link moves to collections.
- Furnishing edit: continue scrolling DOWN; cards travel SIDEWAYS through the
  seven collections. Numbered controls jump to a collection. Links open its page.
- Portfolio: full-screen source-attributed image selections overlap and reveal;
  each opens a keyboard-accessible gallery. These are not invented named projects.
- Menu: all six pages. Contact: existing WhatsApp and appointment-email flows.
- Windows Accessibility → Visual effects → Animation effects: reduced-motion
  preference should produce static readable chapters and a vertical collection grid.

The application and launcher logic are tested on Linux in this environment.
The .cmd wrapper/browser-opening branch cannot be executed on an actual Windows
machine here; report any Windows-specific message verbatim for diagnosis.
