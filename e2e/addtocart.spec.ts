import { test, expect } from "@playwright/test";

test("product added to the cart", async ({ page }) => {
  // 1. Open website
  await page.goto("https://www.saucedemo.com");

  // 2. Fill the fields
  await page.fill("#user-name", "standard_user");
  await page.fill("#password", "secret_sauce");

  // 3. Click button
  await page.click("#login-button");

  // 4. Verify successul login
  await expect(page.locator(".inventory_list")).toBeVisible();

  // 5. Add product to cart
  await page.click("#add-to-cart-sauce-labs-backpack");

  // 6. Check cart
  await expect(page.locator(".shopping_cart_badge")).toHaveText("1");
});
