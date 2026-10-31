import { test, expect } from '@playwright/test';
test('six pages render without errors or horizontal overflow', async ({ page }) => {
  const errors = []; page.on('pageerror', e => errors.push(e.message));
  for (const [path, title] of [['/', 'The art of a'], ['/our-legacy', 'A legacy'], ['/collections', 'A language'], ['/projects', 'Spaces with'], ['/behind-the-craft', 'The details'], ['/contact', 'Let’s create']]) {
    await page.goto(path); await page.evaluate(() => document.fonts.ready); await expect(page.locator('h1')).toContainText(title);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
  }
  expect(errors).toEqual([]);
});
test('navigation reaches collections on mobile and desktop', async ({ page }, info) => {
  await page.goto('/');
  if (info.project.name === 'mobile') await page.getByRole('button', { name: 'Open navigation' }).click();
  await page.locator('nav').getByRole('link', { name: 'Collections', exact: true }).click();
  await expect(page).toHaveURL(/collections/);
  await page.getByRole('link', { name: 'Upholstery', exact: true }).click();
  await expect(page).toHaveURL(/#upholstery/);
});
test('project filters stay honest, craft accordion works, appointment form prepares an email without claiming delivery', async ({ page }) => {
  await page.goto('/projects'); await page.getByRole('button', { name: 'Homes', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Homes', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByRole('heading', { name: 'Our homes journal is coming soon.' })).toBeVisible();
  await page.goto('/behind-the-craft');
  await page.getByRole('button', { name: /A material dialogue/ }).click();
  await expect(page.getByText('Explore textures, colours and finishes in relation to your interiors.')).toBeVisible();
  await page.goto('/contact');
  await expect(page.getByRole('button', { name: 'Prepare appointment email' })).toBeEnabled();
  await expect(page.getByRole('link', { name: 'Talk to us on WhatsApp' })).toHaveAttribute('href', 'https://wa.me/918977030636');
  await expect(page.getByRole('link', { name: 'gvkdecor@gmail.com' })).toHaveAttribute('href', 'mailto:gvkdecor@gmail.com');
  await page.getByLabel('Your name').fill('Test visitor');
  await expect(page.getByLabel('Your name')).toHaveValue('Test visitor');
  await page.getByLabel('Email address').fill('visitor@example.com');
  await page.getByLabel('A little about your project').fill('Curtains for our home.');
  await page.getByRole('checkbox').check();
  await page.getByRole('button', { name: 'Prepare appointment email' }).click();
  await expect(page.getByRole('status')).toContainText('Your request is prepared');
  await expect(page.getByRole('link', { name: 'Open appointment email' })).toHaveAttribute('href', /mailto:gvkdecor@gmail.com.*visitor%40example.com/);
});

test('small phones remain within the viewport after fonts load', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 740 });
  for (const path of ['/', '/contact', '/collections']) {
    await page.goto(path); await page.evaluate(() => document.fonts.ready);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
  }
});
