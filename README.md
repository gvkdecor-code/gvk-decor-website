# GVK Decor

A responsive, six-page portfolio for GVK Decor, a bespoke home furnishings brand
established in 1959 in Jubilee Hills, Hyderabad. React + Vite, reusable layout and
media components, centralized content, and self-hosted open-source fonts.

## Local development

Requires Node.js 22.12+ (validated with 24.19) and npm.

```sh
npm ci
npm run dev -- --port 5173 --strictPort
```

```sh
npm run build
npm run preview -- --port 4173
npm test
```

Browser tests use `/usr/bin/chromium` in this cloud environment. For another
machine, remove `executablePath` from `playwright.config.js` and run
`npx playwright install chromium` first. The development and preview commands
serve locally; they do not publish or deploy anything. Hosting must rewrite
unknown application routes to `index.html` for React Router deep links.

## Content and contact configuration

- `src/data/site.js`: collections, verified project entries, craft film, contacts.
- `src/components/`: layout, navigation, enquiry link, image/video fallback.
- `src/pages.jsx`: six page views and not-found page.
- `src/styles.css`: responsive design tokens and styling, reduced-motion support.
- `public/media/README.md`: adding approved Google Drive photography and video.
- Copy `.env.example` to `.env.local`; set the real `VITE_WHATSAPP_NUMBER`
  (international digits, e.g. country code + number) and `VITE_APPOINTMENT_EMAIL`.
  These are public business details, never secrets. Restart Vite after changes.

WhatsApp opens a prepared chat once configured; until then the floating enquiry
button leads to Contact. The appointment form uses a prepared `mailto:` email;
it does not store data, send automatically, or promise a confirmed booking. It
uses the provisional approved enquiry email by default. Production lead capture can
later use a separately configured server endpoint with appropriate spam protection.

## Content status and launch requirements

The supplied written brief is the current design reference. The pitch deck was
not accessible during implementation; reconcile its typography, logo, collection
names and approved messaging before launch. Collection names and brand copy are
provisional editorial content for review. The only historical claim used is the
provided establishment year, 1959. There are no fictional testimonials, client
names or completed projects. All textile visuals are labeled CSS studies.

Before approved public launch: supply pitch deck, approved logo and original
media; review collection taxonomy and copy; add verified projects; review the editable provisional
business contact details in `src/data/site.js`; test actual WhatsApp and email delivery on target
devices; confirm visit address/hours; decide whether a server-backed enquiry
form is needed; add approved privacy terms and any required disclosures.

No e-commerce, payments, analytics, public deployment or hosting is configured.

Provisional contact configuration: WhatsApp +91 89770 30636; phone +91 89776
30636; gvkdecor@gmail.com; Road No. 39, Jubilee Hills, Hyderabad. These are
editable in `src/data/site.js`; environment variables can override email/WhatsApp.
