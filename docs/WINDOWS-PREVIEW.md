# Preview GVK Decor privately in Windows Chrome

1. Install the **LTS** version from https://nodejs.org/ using its default options.
2. Sign in to https://github.com/gvkdecor-code/gvk-decor-website. Choose **main**,
   then **Code → Download ZIP**. Download a fresh ZIP for this update.
3. Right-click the ZIP → **Extract All**. Open the extracted folder that contains
   `package.json` and `START-PREVIEW.cmd`.
4. Double-click **START-PREVIEW.cmd**. It checks Node.js and installs dependencies
   if they are missing. Wait for the terminal to say **VITE ready**.
5. Open Chrome and enter **http://127.0.0.1:5173**. Scroll through the material
   sequence, explore collections, use Menu to visit other pages, and try the
   appointment enquiry form. Email preparation does not send an email itself.
6. Keep the terminal open. Press **Ctrl+C** there when finished.

Next visit, double-click START-PREVIEW.cmd again. This binds only to 127.0.0.1
on your own computer; it neither deploys a public website nor pushes Git changes.
No administrator shell, Git installation or hosting account is required.

If the script cannot run, open its folder in File Explorer, click the address
bar, type `cmd`, press Enter, and enter these commands one at a time:

```bat
npm ci
npm run dev -- --host 127.0.0.1 --port 5173 --strictPort
```

Then open the address above. If npm is not recognised, close the terminal and
open a new one after installing Node.js. If port 5173 is occupied, stop the other
preview window with Ctrl+C; do not start another server on the same port.

If Windows displays a download warning, review the plain-text .cmd file before
running it; the manual commands above do the same work. Do not disable Windows
security protections.
