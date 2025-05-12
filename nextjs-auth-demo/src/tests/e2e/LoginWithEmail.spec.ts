import { test, expect } from '@playwright/test';

test('registers and logs in a user with email and password', async ({ page }) => {
  const email = `testuser+${Date.now()}@example.com`; // Generamos un correo único
  const password = 'password123';

  // Paso 1: Registro de usuario
  await page.goto('http://localhost:3000'); // Asegúrate de que la URL principal esté correcta

  const emailInputRegister = page.locator('[data-testid="register-email-input"]');
  const passwordInputRegister = page.locator('[data-testid="register-password-input"]');
  const registerButton = page.locator('[data-testid="register-button"]');

  // Asegúrate de que los elementos estén disponibles
  await expect(emailInputRegister).toBeVisible();
  await expect(passwordInputRegister).toBeVisible();
  await expect(registerButton).toBeVisible();

  await emailInputRegister.fill(email);
  await passwordInputRegister.fill(password);
  await registerButton.click();

  const registrationSuccessMessage = page.locator('text="Registration successful"');
  await expect(registrationSuccessMessage).toBeVisible();

  // Paso 2: Login con el mismo usuario registrado
  const emailInputLogin = page.locator('[data-testid="login-email-input"]');
  const passwordInputLogin = page.locator('[data-testid="login-password-input"]');
  const loginButton = page.locator('[data-testid="login-button"]');

  // Asegúrate de que los elementos de login estén disponibles
  await expect(emailInputLogin).toBeVisible();
  await expect(passwordInputLogin).toBeVisible();
  await expect(loginButton).toBeVisible();

  await emailInputLogin.fill(email);
  await passwordInputLogin.fill(password);
  await loginButton.click();

  const loginSuccessMessage = page.locator('[data-testid="login-success-message"]');
  await expect(loginSuccessMessage).toBeVisible();
});
