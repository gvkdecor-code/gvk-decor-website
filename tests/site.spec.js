import { test, expect } from "@playwright/test";
test("six pages render without errors or horizontal overflow", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  for (const [path, title] of [
    ["/", "Crafting Timeless"],
    ["/our-legacy", "A legacy"],
    ["/collections", "A language"],
    ["/projects", "Spaces with"],
    ["/behind-the-craft", "The details"],
    ["/contact", "Let’s create"],
  ]) {
    await page.goto(path);
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator("h1")).toContainText(title);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBeTruthy();
  }
  expect(errors).toEqual([]);
});
test("navigation reaches collections on mobile and desktop", async ({
  page,
}, info) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page
    .locator("nav")
    .getByRole("link", { name: "Collections", exact: true })
    .click();
  await expect(page).toHaveURL(/collections/);
  await page.getByRole("link", { name: "Upholstery", exact: true }).click();
  await expect(page).toHaveURL(/#upholstery/);
});
test("project filters stay honest, craft accordion works, appointment form prepares an email without claiming delivery", async ({
  page,
}) => {
  await page.goto("/projects");
  await page.getByRole("button", { name: "Homes", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Homes", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(
    page.getByRole("heading", { name: "Our homes journal is coming soon." }),
  ).toBeVisible();
  await page.goto("/behind-the-craft");
  await page.getByRole("button", { name: /A material dialogue/ }).click();
  await expect(
    page.getByText(
      "Explore textures, colours and finishes in relation to your interiors.",
    ),
  ).toBeVisible();
  await page.goto("/contact");
  await expect(
    page.getByRole("button", { name: "Prepare appointment email" }),
  ).toBeEnabled();
  await expect(
    page.getByRole("link", { name: "Talk to us on WhatsApp" }),
  ).toHaveAttribute("href", "https://wa.me/918977030636");
  await expect(
    page.locator("main").getByRole("link", { name: "gvkdecor@gmail.com" }),
  ).toHaveAttribute("href", "mailto:gvkdecor@gmail.com");
  await page.getByLabel("Your name").fill("Test visitor");
  await expect(page.getByLabel("Your name")).toHaveValue("Test visitor");
  await page.getByLabel("Email address").fill("visitor@example.com");
  await page
    .getByLabel("A little about your project")
    .fill("Curtains for our home.");
  await page.getByLabel("Visit location").selectOption("GVK Decor Store");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Prepare appointment email" }).click();
  await expect(page.getByRole("status")).toContainText(
    "Your request is prepared",
  );
  await expect(
    page.getByRole("link", { name: "Open appointment email" }),
  ).toHaveAttribute(
    "href",
    /mailto:gvkdecor@gmail.com.*visitor%40example.com.*GVK%20Decor%20Store/,
  );
});

test("small phones remain within the viewport after fonts load", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 740 });
  for (const path of ["/", "/contact", "/collections"]) {
    await page.goto(path);
    await page.evaluate(() => document.fonts.ready);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBeTruthy();
  }
});

test("cinematic chapters respond to exploration without inventing projects", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveAccessibleName(
    "Crafting Timeless Spaces Since 1959",
  );
  await expect(page.locator(".hero-media-credit")).toContainText(/Pitch.deck/);
  await page.getByRole("button", { name: /Designer blinds/ }).click();
  await expect(
    page.getByRole("button", { name: /Designer blinds/ }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("#collection-preview")).toContainText(
    "Precision meets softness",
  );
  await expect(
    page.getByRole("link", { name: "Discover Designer blinds" }),
  ).toHaveAttribute("href", "/collections#blinds");
  await page.getByRole("button", { name: /Texture, layered/ }).click();
  await expect(page.locator(".scroll-story")).toHaveAttribute(
    "data-active",
    "1",
  );
  await expect(page.locator(".portfolio-screen")).toHaveCount(3);
  await expect(page.locator(".portfolio-screen").first()).toContainText(
    "Pitch-deck selection",
  );
});

test("menu supports keyboard dismissal and releases scroll lock", async ({
  page,
}) => {
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Open navigation" });
  await trigger.click();
  await expect(
    page.getByRole("dialog", { name: "Site navigation" }),
  ).toBeVisible();
  expect(await page.evaluate(() => document.body.style.overflow)).toBe(
    "hidden",
  );
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("dialog", { name: "Site navigation" }),
  ).not.toBeVisible();
  await expect(trigger).toBeFocused();
  expect(await page.evaluate(() => document.body.style.overflow)).toBe("");
});

test("reduced motion keeps storytelling visible and disables parallax and cursor", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator("h1")).toBeVisible();
  await page.locator(".heritage-words").scrollIntoViewIfNeeded();
  await expect(page.locator(".heritage-words")).toHaveCSS("opacity", "1");
  await expect(page.locator(".hero-backdrop.is-active")).toHaveCSS(
    "transform",
    "none",
  );
  await expect(page.locator(".cursor-aura")).not.toBeVisible();
  expect(
    await page.evaluate(
      () =>
        document.getAnimations().filter((a) => a.playState === "running")
          .length,
    ),
  ).toBe(0);
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page
    .locator("nav")
    .getByRole("link", { name: "Contact", exact: true })
    .click();
  await expect(page).toHaveURL(/contact/);
});

test("fullscreen project viewer navigates and returns keyboard focus using test-only media", async ({
  page,
}) => {
  const image =
    "data:image/svg+xml," +
    encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" fill="#a99c83"/></svg>',
    );
  const fixture = [
    {
      id: "test-only",
      title: "Test-only gallery fixture",
      location: "Test environment",
      category: "Homes",
      description: "Test fixture, never a published project.",
      media: [
        { image, alt: "Test slide one" },
        { image, alt: "Test slide two" },
      ],
    },
  ];
  await page.route("**/src/data/site.js*", async (route) => {
    const response = await route.fetch();
    const body = (await response.text()).replace(
      "export const projects = [];",
      `export const projects = ${JSON.stringify(fixture)};`,
    );
    await route.fulfill({ response, body });
  });
  await page.goto("/projects");
  const card = page.getByRole("button", { name: /Test-only gallery fixture/ });
  await card.click();
  await expect(
    page.getByRole("dialog", { name: "Test-only gallery fixture" }),
  ).toBeVisible();
  await expect(
    page.getByRole("dialog").getByRole("img", { name: "Test slide one" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Next image" }).click();
  await expect(
    page.getByRole("dialog").getByRole("img", { name: "Test slide two" }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(card).toBeFocused();
});

test("cinematic film requires play, pauses off-screen and respects motion changes", async ({
  page,
}) => {
  await page.route("**/src/data/site.js*", async (route) => {
    const response = await route.fetch();
    const body = (await response.text()).replace(
      /export const heroMedia = \{[\s\S]*?\};/,
      'export const heroMedia = { video: "/media/material-test.webm", alt: "Test-only film", tone: "cinema" };',
    );
    await route.fulfill({ response, body });
  });
  await page.route("**/media/material-test.webm", (route) =>
    route.fulfill({
      path: "tests/fixtures/material-test.webm",
      contentType: "video/webm",
    }),
  );
  await page.goto("/");
  const film = page.locator(".hero-backdrop video");
  await expect(film).toHaveJSProperty("paused", true);
  await page.getByRole("button", { name: "Play film" }).click();
  await expect(film).toHaveJSProperty("paused", false);
  await page.locator(".collection-voyage").scrollIntoViewIfNeeded();
  expect(
    (await film.boundingBox()).y + (await film.boundingBox()).height,
  ).toBeLessThan(0);
  await expect(film).toHaveJSProperty("paused", true);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.getByRole("button", { name: "Play film" }).click();
  await expect(film).toHaveJSProperty("paused", false);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(film).toHaveJSProperty("paused", true);
});

test("homepage scroll sequence changes with scroll and exposes both locations", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator("h1")).toHaveAccessibleName(
    "Crafting Timeless Spaces Since 1959",
  );
  await expect(page.locator("header .official-logo")).toBeVisible();
  expect(
    await page
      .locator("header .official-logo")
      .evaluate((img) => img.complete && img.naturalWidth > 0),
  ).toBeTruthy();
  const sequence = page.locator(".scroll-story");
  await page.evaluate(() => {
    const el = document.querySelector(".scroll-story");
    window.scrollTo({
      top:
        el.getBoundingClientRect().top +
        scrollY +
        (el.offsetHeight - innerHeight) * 0.85,
      behavior: "instant",
    });
  });
  await expect(sequence).toHaveAttribute("data-active", "2");
  await page.getByRole("button", { name: /Light, framed/ }).click();
  await expect(sequence).toHaveAttribute("data-active", "0");
  await page.locator(".story-skip").click();
  await expect(page).toHaveURL(/#collections/);
  await expect(page.locator(".home-locations")).toContainText(
    "GVK Decor Experience Centre",
  );
  await expect(page.locator(".home-locations")).toContainText(
    "Road No. 39, Jubilee Hills, Hyderabad",
  );
  await expect(page.locator(".home-locations")).toContainText(
    "GVK Decor Store",
  );
  await expect(page.locator(".home-locations")).toContainText(
    "Secunderabad, Hyderabad",
  );
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBeTruthy();
});

test("reviewed deck selection opens full-screen without invented attribution", async ({
  page,
}) => {
  await page.goto("/");
  const first = page.locator(".portfolio-screen").first();
  await first.getByRole("button", { name: "View the deck selection" }).click();
  const dialog = page.getByRole("dialog", { name: "Light & living" });
  await expect(dialog).toBeVisible();
  await expect(dialog).toContainText(
    "Project name, location and credits are awaiting confirmation",
  );
  const photo = dialog.locator(".viewer-stage img");
  await expect(photo).toBeVisible();
  expect(
    await photo.evaluate((img) => img.complete && img.naturalWidth > 0),
  ).toBeTruthy();
  await dialog.getByRole("button", { name: "Next image" }).click();
  await expect(dialog.locator(".viewer-stage img")).toHaveAttribute(
    "alt",
    /Ochre armchair/,
  );
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
});

test("reduced motion renders each scroll chapter as readable static content", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".scroll-story")).toHaveClass(/is-reduced/);
  await expect(page.locator(".story-frame")).toHaveCount(3);
  for (const frame of await page.locator(".story-frame").all()) {
    await frame.scrollIntoViewIfNeeded();
    await expect(frame).toBeVisible();
    await expect(frame).toHaveAttribute("aria-hidden", "false");
  }
  await expect(page.locator(".story-sticky")).toHaveCSS("position", "relative");
});

test("scroll film seeks to the scroll position without autoplay and falls back for reduced motion", async ({
  page,
}) => {
  await page.route("**/src/data/site.js*", async (route) => {
    const response = await route.fetch();
    const body = (await response.text()).replace(
      /export const sequenceFilm = \{[\s\S]*?\};/,
      'export const sequenceFilm = {video:"/tests/fixtures/scroll-seek-test.mp4",poster:"",alt:"Test scroll film"};',
    );
    await route.fulfill({ response, body });
  });
  await page.goto("/");
  const film = page.locator(".scroll-film");
  await page.locator(".scroll-story").scrollIntoViewIfNeeded();
  await expect(film).toHaveClass(/is-ready/);
  for (const progress of [0.25, 0.8]) {
    await page.evaluate((progress) => {
      const el = document.querySelector(".scroll-story");
      window.scrollTo({
        top:
          el.getBoundingClientRect().top +
          scrollY +
          (el.offsetHeight - innerHeight) * progress,
        behavior: "instant",
      });
    }, progress);
    await expect
      .poll(() =>
        film.evaluate((video) =>
          Math.abs(
            video.currentTime -
              (video.duration - 0.08) *
                Number(
                  document.querySelector(".scroll-story").dataset.progress,
                ),
          ),
        ),
      )
      .toBeLessThan(0.15);
    await expect(film).toHaveJSProperty("paused", true);
  }
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(film).toHaveCount(0);
  await expect(page.locator(".story-frame")).toHaveCount(3);
});

test("opening aperture and collection rail visibly move with scroll", async ({
  page,
}) => {
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  const aperture = page.locator(".opening-media");
  const before = await aperture.evaluate((el) => getComputedStyle(el).clipPath);
  await page.evaluate(() => {
    const root = document.querySelector(".opening-experience");
    window.scrollTo({
      top: root.offsetTop + (root.offsetHeight - innerHeight) * 0.8,
      behavior: "instant",
    });
  });
  await expect
    .poll(() =>
      page
        .locator(".opening-display")
        .evaluate((el) => Number(getComputedStyle(el).opacity)),
    )
    .toBeLessThan(0.1);
  await expect
    .poll(() => aperture.evaluate((el) => getComputedStyle(el).clipPath))
    .not.toBe(before);
  await expect(page.locator(".opening-after")).toHaveCSS("opacity", "1");
  const rail = page.locator(".voyage-track");
  await page.evaluate(() => {
    const root = document.querySelector(".collection-voyage");
    window.scrollTo({ top: root.offsetTop, behavior: "instant" });
  });
  await expect
    .poll(() => rail.evaluate((el) => el.getBoundingClientRect().left))
    .toBeGreaterThan(-100);
  await page.evaluate(() => {
    const root = document.querySelector(".collection-voyage");
    window.scrollTo({
      top: root.offsetTop + (root.offsetHeight - innerHeight) * 0.7,
      behavior: "instant",
    });
  });
  await expect
    .poll(() => rail.evaluate((el) => el.getBoundingClientRect().left))
    .toBeLessThan(-500);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBeTruthy();
});

test("private preview identifies the new downloadable revision", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator(".preview-badge")).toContainText("GVK-CINEMA-04");
  await expect(page.locator(".hero-media-credit")).toContainText(
    "authentic video pending",
  );
});

test("internal navigation and shipped media resolve without broken responses", async ({
  page,
  request,
}) => {
  const paths = new Set(),
    assets = new Set();
  for (const route of [
    "/",
    "/our-legacy",
    "/collections",
    "/projects",
    "/behind-the-craft",
    "/contact",
  ]) {
    const response = await page.goto(route);
    expect(response.status()).toBe(200);
    const found = await page.locator("a[href],img[src]").evaluateAll((nodes) =>
      nodes.map((el) => ({
        tag: el.tagName,
        url: el.getAttribute(el.tagName === "IMG" ? "src" : "href"),
      })),
    );
    for (const item of found) {
      if (item.url?.startsWith("/"))
        (item.tag === "IMG" ? assets : paths).add(item.url.split("#")[0]);
    }
  }
  for (const path of [...paths, ...assets]) {
    const response = await request.get(path || "/");
    expect(response.ok(), path).toBeTruthy();
  }
});

test("keyboard collection focus brings the chosen card into view", async ({
  page,
}) => {
  await page.goto("/#collections");
  await page.keyboard.press("Tab");
  const link = page.getByRole("link", {
    name: "Discover Bedding",
    exact: true,
  });
  await link.focus();
  await expect
    .poll(() =>
      link.evaluate((el) => {
        const b = el.getBoundingClientRect();
        return b.left >= 0 && b.right <= innerWidth;
      }),
    )
    .toBeTruthy();
  await expect(link).toBeFocused();
});

test("context cursor works on desktop and stays absent on touch", async ({
  page,
}, info) => {
  await page.goto("/");
  if (info.project.name === "mobile") {
    await expect(page.locator(".cursor-aura")).not.toBeVisible();
  } else {
    await expect(page.locator("body")).toHaveClass(/cursor-enabled/);
    await page.mouse.move(0, 0);
    await page.mouse.move(1100, 400);
    await expect(page.locator(".cursor-aura")).toHaveClass(/cursor-context/);
    await expect(page.locator(".cursor-aura b")).toHaveText("Scroll");
    await expect(page.locator(".cursor-aura span")).toHaveCSS("width", "88px");
  }
});
