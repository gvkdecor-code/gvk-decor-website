import { test, expect } from "@playwright/test";
const routes = [
  ["/", "Crafting"],
  ["/our-legacy", "A legacy"],
  ["/collections", "A language"],
  ["/projects", "Spaces with"],
  ["/behind-the-craft", "The details"],
  ["/contact", "Let’s create"],
];

test("six pages, navigation and shipped media load without errors", async ({
  page,
  request,
}) => {
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });
  const links = new Set(),
    media = new Set();
  for (const [route, title] of routes) {
    expect((await page.goto(route)).status()).toBe(200);
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator("h1")).toContainText(title);
    const found = await page.locator("a[href],img[src]").evaluateAll((nodes) =>
      nodes.map((el) => ({
        tag: el.tagName,
        url: el.getAttribute(el.tagName === "IMG" ? "src" : "href"),
      })),
    );
    for (const entry of found)
      if (entry.url?.startsWith("/"))
        (entry.tag === "IMG" ? media : links).add(entry.url.split("#")[0]);
  }
  for (const path of [...links, ...media])
    expect((await request.get(path || "/")).ok(), path).toBeTruthy();
  expect(errors).toEqual([]);
});

test("headings fit their text zones at small phone, tablet and desktop widths", async ({
  page,
}) => {
  for (const viewport of [
    { width: 320, height: 740 },
    { width: 768, height: 1024 },
    { width: 1366, height: 768 },
    { width: 1440, height: 1000 },
  ]) {
    await page.setViewportSize(viewport);
    for (const [route] of routes) {
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      const problems = await page.locator("h1,h2,h3").evaluateAll((headings) =>
        headings.flatMap((h) => {
          if (
            h.closest('[hidden],[aria-hidden="true"]') ||
            !h.getClientRects().length
          )
            return [];
          const b = h.getBoundingClientRect(),
            text = h.textContent.trim();
          const errors = [];
          if (h.scrollWidth > h.clientWidth + 2)
            errors.push(`${text}: text wider than heading`);
          if (
            !h.closest(".material-track") &&
            (b.left < -2 || b.right > innerWidth + 2)
          )
            errors.push(`${text}: outside viewport`);
          const p = h.nextElementSibling;
          if (
            p?.tagName === "P" &&
            p.getBoundingClientRect().top < b.bottom - 2
          )
            errors.push(`${text}: following paragraph overlaps`);
          return errors;
        }),
      );
      expect(problems, `${route} at ${viewport.width}px`).toEqual([]);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth + 1,
        ),
      ).toBeTruthy();
    }
  }
});

test("1959 has safe caption spacing and the exact tagline has separate lines", async ({
  page,
}) => {
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator("h1")).toHaveAccessibleName(
    "Crafting Timeless Spaces Since 1959",
  );
  const lines = await page
    .locator(".film-title > span")
    .evaluateAll((nodes) =>
      nodes.map((el) => el.getBoundingClientRect().toJSON()),
    );
  for (let i = 1; i < lines.length; i++)
    expect(lines[i].top).toBeGreaterThanOrEqual(lines[i - 1].bottom - 1);
  const year = page.locator(".heritage-year"),
    caption = page.locator(".heritage-origin figcaption");
  await year.scrollIntoViewIfNeeded();
  expect(
    (await caption.boundingBox()).y -
      ((await year.boundingBox()).y + (await year.boundingBox()).height),
  ).toBeGreaterThanOrEqual(20);
  await page.goto("/our-legacy");
  const gap = await page.locator(".legacy-number").evaluate((el) => {
    const text = el.firstChild;
    const range = document.createRange();
    range.selectNode(text);
    return (
      el.querySelector("span").getBoundingClientRect().top -
      range.getBoundingClientRect().bottom
    );
  });
  expect(gap).toBeGreaterThan(15);
});

test("opening, craft and gallery compositions change with real scrolling", async ({
  page,
}) => {
  await page.goto("/");
  const before = await page
    .locator(".film-images img")
    .first()
    .evaluate((el) => getComputedStyle(el).transform);
  await page.evaluate(() => {
    const r = document.querySelector(".film-opening");
    window.scrollTo({
      top: r.offsetTop + (r.offsetHeight - innerHeight) * 0.7,
      behavior: "instant",
    });
  });
  await expect
    .poll(() =>
      page
        .locator(".film-copy")
        .evaluate((el) => Number(getComputedStyle(el).opacity)),
    )
    .toBeLessThan(0.1);
  await expect
    .poll(() =>
      page
        .locator(".film-images img")
        .first()
        .evaluate((el) => getComputedStyle(el).transform),
    )
    .not.toBe(before);
  await page.getByRole("button", { name: /Texture, layered/ }).click();
  await expect(page.locator(".craft-scene.is-active h3")).toHaveText(
    "Texture, layered.",
  );
  await page.evaluate(() =>
    window.scrollTo({
      top: document.querySelector(".space-gallery").offsetTop,
      behavior: "instant",
    }),
  );
  await expect(page.locator(".space-caption h2")).toHaveText("Light & living");
  await page
    .getByRole("button", { name: "Next selection", exact: true })
    .click();
  await expect(page.locator(".space-caption h2")).toHaveText(
    "The curtain studies",
  );
  await expect
    .poll(() =>
      page
        .locator(".space-frame")
        .nth(1)
        .evaluate((el) => getComputedStyle(el).clipPath),
    )
    .toMatch(/inset\(0/);
});

test("gallery shows source attribution, navigation and focus restoration", async ({
  page,
}) => {
  await page.goto("/projects");
  const card = page.getByRole("button", { name: /Light & living/ });
  await card.click();
  const dialog = page.getByRole("dialog", { name: "Light & living" });
  await expect(dialog).toContainText("awaiting confirmation");
  const image = dialog.locator(".viewer-stage img");
  await expect(image).toBeVisible();
  await expect
    .poll(() => image.evaluate((el) => el.complete && el.naturalWidth > 0))
    .toBeTruthy();
  await dialog.getByRole("button", { name: "Next image" }).click();
  await expect(dialog.locator("img")).toHaveAttribute("alt", /Ochre armchair/);
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(card).toBeFocused();
});

test("mobile-friendly navigation and native collection exhibition work", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Open navigation" }).click();
  await expect(
    page.getByRole("dialog", { name: "Site navigation" }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("button", { name: "Open navigation" }),
  ).toBeFocused();
  await page.locator(".material-exhibition").scrollIntoViewIfNeeded();
  await page.getByRole("button", { name: "Next collections" }).click();
  await expect
    .poll(() => page.locator(".material-track").evaluate((el) => el.scrollLeft))
    .toBeGreaterThan(100);
  const link = page.getByRole("link", {
    name: "Discover Upholstery",
    exact: true,
  });
  await link.focus();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/collections#upholstery/);
  await expect(
    page.getByRole("heading", { name: "Upholstery", exact: true }),
  ).toBeVisible();
});

test("reduced motion is a readable static experience and changes live", async ({
  page,
}) => {
  await page.goto("/");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".film-opening")).toHaveClass(/is-static/);
  await expect(page.locator(".craft-chapter")).toHaveClass(/is-static/);
  await expect(page.locator(".space-gallery")).toHaveClass(/is-static/);
  await expect(page.locator(".craft-scene")).toHaveCount(3);
  for (const scene of await page.locator(".craft-scene").all()) {
    await scene.scrollIntoViewIfNeeded();
    await expect(scene).toHaveAttribute("aria-hidden", "false");
    await expect(scene).toBeVisible();
  }
  await expect(page.locator(".cursor-aura")).not.toBeVisible();
  await expect(page.locator(".craft-sticky")).toHaveCSS("position", "relative");
  expect(
    await page.evaluate(
      () =>
        document.getAnimations().filter((a) => a.playState === "running")
          .length,
    ),
  ).toBe(0);
});

test("business identity, two locations and appointment email are preserved", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator(".film-signature img")).toBeVisible();
  expect(
    await page
      .locator("header .official-logo")
      .evaluate((img) => img.complete && img.naturalWidth > 0),
  ).toBeTruthy();
  await expect(page.locator(".preview-badge")).toContainText("GVK-ATELIER-05");
  await expect(page.locator(".visit-spread")).toContainText("Jubilee Hills");
  await expect(page.locator(".visit-spread")).toContainText("Secunderabad");
  await page.goto("/contact");
  await expect(
    page.locator("main").getByRole("link", { name: "gvkdecor@gmail.com" }),
  ).toHaveAttribute("href", "mailto:gvkdecor@gmail.com");
  await expect(
    page.getByRole("link", { name: "Talk to us on WhatsApp" }),
  ).toHaveAttribute("href", "https://wa.me/918977030636");
  await page.getByLabel("Your name").fill("Design review");
  await page.getByLabel("Email address").fill("review@example.com");
  await page.getByLabel("Visit location").selectOption("GVK Decor Store");
  await page
    .getByLabel("A little about your project")
    .fill("Curtains and upholstery for a home.");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Prepare appointment email" }).click();
  await expect(page.getByRole("status")).toContainText(
    "Your request is prepared",
  );
  await expect(
    page.getByRole("link", { name: "Open appointment email" }),
  ).toHaveAttribute(
    "href",
    /mailto:gvkdecor@gmail.com.*review%40example.com.*GVK%20Decor%20Store/,
  );
});

test("short-screen craft captions and controls have separate safe zones", async ({
  page,
}) => {
  for (const viewport of [
    { width: 320, height: 740 },
    { width: 390, height: 844 },
    { width: 1366, height: 768 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/");
    for (const index of [0, 1, 2]) {
      await page.evaluate((index) => {
        const r = document.querySelector(".craft-chapter");
        window.scrollTo({
          top:
            r.offsetTop + (r.offsetHeight - innerHeight) * ((index + 0.2) / 3),
          behavior: "instant",
        });
      }, index);
      await expect(page.locator(".craft-scene.is-active")).toHaveCount(1);
      const boxes = await page.evaluate(() => {
        const h = document
          .querySelector(".craft-heading")
          .getBoundingClientRect();
        const c = document
          .querySelector(".craft-scene.is-active .craft-caption")
          .getBoundingClientRect();
        const n = document
          .querySelector(".craft-navigation")
          .getBoundingClientRect();
        return {
          headingBottom: h.bottom,
          captionTop: c.top,
          captionBottom: c.bottom,
          navTop: n.top,
          navBottom: n.bottom,
          height: innerHeight,
        };
      });
      expect(
        boxes.captionTop - boxes.headingBottom,
        JSON.stringify({ viewport, index, boxes }),
      ).toBeGreaterThan(12);
      expect(
        boxes.navTop - boxes.captionBottom,
        JSON.stringify({ viewport, index, boxes }),
      ).toBeGreaterThan(10);
      expect(boxes.navBottom).toBeLessThanOrEqual(boxes.height);
    }
  }
});

test("gallery controls remain clickable beside the floating enquiry button", async ({
  page,
}) => {
  await page.goto("/");
  await page.evaluate(() =>
    window.scrollTo({
      top: document.querySelector(".space-gallery").offsetTop,
      behavior: "instant",
    }),
  );
  const next = page.getByRole("button", {
    name: "Next selection",
    exact: true,
  });
  await expect
    .poll(() =>
      next.evaluate((button) => {
        const r = button.getBoundingClientRect();
        return (
          document
            .elementFromPoint(r.x + r.width / 2, r.y + r.height / 2)
            ?.closest("button") === button
        );
      }),
    )
    .toBeTruthy();
  await next.click();
  await expect(page.locator(".space-caption h2")).toHaveText(
    "The curtain studies",
  );
});

test("original video slot retains deliberate play and reduced-motion pause", async ({
  page,
}) => {
  await page.route("**/src/data/site.js*", async (route) => {
    const response = await route.fetch();
    const body = (await response.text()).replace(
      /export const heroMedia = \{[\s\S]*?\};/,
      'export const heroMedia={video:"/tests/fixtures/scroll-seek-test.mp4",alt:"Test-only video",poster:"",tone:"cinema"};',
    );
    await route.fulfill({ response, body });
  });
  await page.goto("/");
  const video = page.locator(".film-images video");
  await expect(video).toHaveJSProperty("paused", true);
  await page.getByRole("button", { name: "Play film", exact: true }).click();
  await expect(video).toHaveJSProperty("paused", false);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(video).toHaveJSProperty("paused", true);
});
