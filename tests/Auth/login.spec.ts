import test, { expect } from "@playwright/test";

test.describe("Log In ", () => {
  test("User logs in with valid credentials", async ({ page }) => {
    const email = "test@mail.com";
    const password = "123456";

    await page.goto("/login");

    await page.getByTestId("email-input").fill(email);
    await page.getByTestId("password-input").fill(password);

    await page.getByTestId("login-button").click();
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
    await page.goto("/login");

    await page.getByTestId("email-input").fill(email);
    await page.getByTestId("password-input").fill(password);

    await page.getByTestId("login-button").click();

    await expect(page.getByText("Incorrect email or password.")).toBeVisible();
  });

  test("Rejects wrong passwords", async ({ page }) => {
    const email = "test@mail.com";
    const password = "wrongPassword";

    await page.goto("/login");

    await page.getByTestId("email-input").fill(email);
    await page.getByTestId("password-input").fill(password);

    await page.getByTestId("login-button").click();

    await expect(page.getByText("Incorrect email or password.")).toBeVisible();
  });
});
