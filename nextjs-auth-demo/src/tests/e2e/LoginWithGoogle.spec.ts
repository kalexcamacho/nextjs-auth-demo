/* import { test, expect } from '@playwright/test';

test('logs in a user with Google using emulator', async ({ page }) => {
  process.env.NEXT_PUBLIC_TEST_MODE = "true";
  await page.goto('http://localhost:3000');

  const googleButton = page.locator('button:has-text("Sign in with Google")');
  await googleButton.click();

  const successMessage = page.locator('text=Logged in user (Google):');
  await expect(successMessage).toBeVisible();
}); */

