# Test info

- Name: logs in a user with Google using emulator
- Location: C:\Users\USUARIO\Documents\PHOENIX\nextjs-auth-demo\src\tests\e2e\LoginWithGoogle.spec.ts:3:5

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toBeVisible()

Locator: locator('text=Logged in user (Google):')
Expected: visible
Received: <element(s) not found>
Call log:
  - expect.toBeVisible with timeout 5000ms
  - waiting for locator('text=Logged in user (Google):')

    at C:\Users\USUARIO\Documents\PHOENIX\nextjs-auth-demo\src\tests\e2e\LoginWithGoogle.spec.ts:11:32
```

# Page snapshot

```yaml
- main:
  - heading "Next.js + Firebase Auth" [level=1]
  - button "Sign in with Google"
  - textbox "Email"
  - textbox "Password"
  - button "Register with Email"
  - textbox "Email"
  - textbox "Password"
  - button "Sign in with Email"
  - textbox "+1234567890"
  - button "Send OTP"
- paragraph: Running in emulator mode. Do not use with production credentials.
- paragraph: Running in emulator mode. Do not use with production credentials.
- alert
- button "Open Next.js Dev Tools":
  - img
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 |
   3 | test('logs in a user with Google using emulator', async ({ page }) => {
   4 |   process.env.NEXT_PUBLIC_TEST_MODE = "true";
   5 |   await page.goto('http://localhost:3000');
   6 |
   7 |   const googleButton = page.locator('button:has-text("Sign in with Google")');
   8 |   await googleButton.click();
   9 |
  10 |   const successMessage = page.locator('text=Logged in user (Google):');
> 11 |   await expect(successMessage).toBeVisible();
     |                                ^ Error: Timed out 5000ms waiting for expect(locator).toBeVisible()
  12 | });
  13 |
  14 |
```