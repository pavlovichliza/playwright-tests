import { test, expect } from "@playwright/test";

test("successful login", async ({ page }) => {
  // 1. Открыть сайт
  await page.goto("https://www.saucedemo.com");

  // 2. Заполнить поля
  await page.fill("#user-name", "standard_user");
  await page.fill("#password", "secret_sauce");

  // 3. Нажать кнопку
  await page.click("#login-button");

  // 4. Проверить что залогинились успешно
  await expect(page.locator(".inventory_list")).toBeVisible();
});

test("failed login shows error message", async ({ page }) => {
  // 1. Открыть сайт
  await page.goto("https://www.saucedemo.com");

  // 2. Ввести неверные данные
  await page.fill("#user-name", "wrong_user");
  await page.fill("#password", "wrong_password");

  // 3. Нажать кнопку
  await page.click("#login-button");

  // 4. Проверить что появилось сообщение об ошибке
  await expect(page.locator('[data-test="error"]')).toBeVisible();
});
