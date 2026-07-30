import test, { expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { TEST_USER } from "../Constants/constants";
("@/app/login/page");
test.describe("Log In ", () => {
  test("User logs in with valid credentials", async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(TEST_USER.email, TEST_USER.password);

    await expect(page).toHaveURL("/");
  });

  test("Shows validation errors", async ({ page }) => {
    await page.goto("/login");

    await page.getByTestId("login-button").click();

    await expect(page.getByTestId("email-input")).toHaveAttribute("required");
    await expect(page.getByTestId("password-input")).toHaveAttribute(
      "required",
    );
  });

  test("Rejects an unknown email", async ({ page }) => {
    const email = "fakemail@mail.com";
    const password = "123456";

    const login = new LoginPage(page);
    await login.goto();
    await login.login(email, password);

    await expect(page.getByText("Incorrect email or password.")).toBeVisible();
  });

  test("Rejects wrong passwords", async ({ page }) => {
    const password = "wrongPassword";

    const login = new LoginPage(page);
    await login.goto();
    await login.login(TEST_USER.email, password);

    await expect(page.getByText("Incorrect email or password.")).toBeVisible();
  });
});
