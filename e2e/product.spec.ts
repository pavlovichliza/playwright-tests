import { test, expect } from "@playwright/test";

test("Add to cart button changed", async ({ page }) => {
  // 1. Open website
  await page.goto("https://www.saucedemo.com");

  // 2. Fill the fields
  await page.fill("#user-name", "standard_user");
  await page.fill("#password", "secret_sauce");

  // 3. Click button
  await page.click("#login-button");

  // 4. Verify successul login
  await expect(page.locator(".inventory_list")).toBeVisible();

  // 5. Open product page
  await page.getByText("Sauce Labs Backpack").click();

  // 6. Check price visibility
  await expect(
    page.locator('[data-test="inventory-item-price"]'),
  ).toBeVisible();

  // 7. Add product to the cart
  await page.click('[data-test="add-to-cart"]');

  // 8. Verify Add changed to Remove
  await expect(page.locator('[data-test="remove"]')).toHaveText("Remove");
});
