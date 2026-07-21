import test, { expect } from "@playwright/test";

test.describe("Log Out", () => {
  test("User logs out", async ({ page }) => {
    const email = "test@mail.com";
    const password = "123456";

    await page.goto("/login");

    await page.getByTestId("email-input").fill(email);
    await page.getByTestId("password-input").fill(password);

    await page.getByTestId("login-button").click();

    //expect(page).toHaveURL("/");

    await page.getByTestId("logout-button").click();

    await expect(page).toHaveURL("/login");
  });
});
