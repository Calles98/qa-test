import { test as setup, expect } from "@playwright/test";

setup("authenticate", async ({ page }) => {
  await page.goto("/login");

  await page.getByTestId("email-input").fill("test@mail.com");
  await page.getByTestId("password-input").fill("123456");

  await page.getByTestId("login-button").click();

  await expect(page).toHaveURL("/");
  await expect(page.getByTestId("logout-button")).toBeVisible();

  await page.context().storageState({
    path: "playwright/.auth/user.json",
    indexedDB: true,
  });
});
