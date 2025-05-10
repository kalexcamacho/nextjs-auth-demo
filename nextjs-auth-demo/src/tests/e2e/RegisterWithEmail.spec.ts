import { test, expect } from '@playwright/test';

test('registers a new user with email and password', async ({ page }) => {
  const email = `testuser+${Date.now()}@example.com`;
  const password = 'password123';

  await page.goto('http://localhost:3000');

  const emailInput = page.locator('[data-testid="register-email-input"]');
  const passwordInput = page.locator('[data-testid="register-password-input"]');
  const registerButton = page.locator('[data-testid="register-button"]');

  await emailInput.fill(email);
  await passwordInput.fill(password);
  await registerButton.click();

  const successMessage = page.locator('text="Registration successful"');
  await expect(successMessage).toBeVisible();
});
