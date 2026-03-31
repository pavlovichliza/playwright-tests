import { test, expect } from "@playwright/test";

test("Sort order correct", async ({ page }) => {
  // 1. Open website
  await page.goto("https://www.saucedemo.com");

  // 2. Fill the fields
  await page.fill("#user-name", "standard_user");
  await page.fill("#password", "secret_sauce");

  // 3. Click button
  await page.click("#login-button");

  // 4. Verify successul login
  await expect(page.locator(".inventory_list")).toBeVisible();

  // 5. Select sort option
  await page.selectOption('[data-test="product-sort-container"]', "lohi");

  // Get all prices
  const prices = page.locator(".inventory_item_price");

  // Get first and last value
  const first = await prices.first().innerText();
  const last = await prices.last().innerText();
  const firstPrice = parseFloat(first.replace("$", ""));
  const lastPrice = parseFloat(last.replace("$", ""));

  // Verify firt item, cheaper than last
  expect(firstPrice).toBeLessThanOrEqual(lastPrice);
});
