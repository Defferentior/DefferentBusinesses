import { expect, test } from '@playwright/test';

test('index page has expected h1 and h3', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1, name: 'Businesses' })).toBeVisible();
});
