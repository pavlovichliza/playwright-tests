import { test, expect } from "@playwright/test";

test("Çheckout", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  // login
  await page.fill("#user-name", "standard_user");
  await page.fill("#password", "secret_sauce");
  await page.click("#login-button");

  // add product to the cart
  await page.click('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]');

  // click cart
  await page.click('[data-test="shopping-cart-link"]');

  // verify Cart page is opened and product is in the cart
  await expect(page.locator('[data-test="title"]')).toHaveText("Your Cart");
  await expect(page.locator(".inventory_item_name")).toHaveText(
    "Sauce Labs Bolt T-Shirt",
  );

  // click Checkout
  await page.click("#checkout");

  // Fill the form
  await page.fill("#first-name", "John");
  await page.fill("#last-name", "Doe");
  await page.fill("#postal-code", "12345");

  // Continue
  await page.click("#continue");

  // Check confirmation
  await expect(page.locator('[data-test="title"]')).toHaveText(
    "Checkout: Overview",
  );

  // Submit
  await page.click("#finish");

  // Verify success
  await expect(page.locator('[data-test="complete-header"]')).toHaveText(
    "Thank you for your order!",
  );
});
