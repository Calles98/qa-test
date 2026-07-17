import test, { expect } from "@playwright/test";

test.describe("Sign Up", () => {
  test("creates a new account", async ({ page }) => {
    const email = `user-${Date.now()}@example.com`;

    await page.goto("/signup");

    await page.getByTestId("email-input").fill(email);
    await page.getByTestId("password-input").fill("Password123!");
    await page.getByTestId("signup-button").click();

    await expect(page).toHaveURL("/login");
  });

  test("shows validation errors", async ({ page }) => {
    await page.goto("/signup");

    await page.getByTestId("signup-button").click();

    await expect(page.getByTestId("email-input")).toHaveAttribute("required");
    await expect(page.getByTestId("password-input")).toHaveAttribute(
      "required",
    );
  });

  test("rejects an existing email", async ({ page }) => {
    const email = `user-${crypto.randomUUID()}@example.com`;
    const password = "Password123!";

    // First signup
    await page.goto("/signup");

    await page.getByTestId("email-input").fill(email);
    await page.getByTestId("password-input").fill(password);

    await page.getByTestId("signup-button").click();

    // Return to signup
    await page.goto("/signup");

    await page.getByTestId("email-input").fill(email);
    await page.getByTestId("password-input").fill(password);

    await page.getByTestId("signup-button").click();

    await expect(
      page.getByText("That email is already registered."),
    ).toBeVisible();
  });

  test("rejects an invalid password", async ({ page }) => {
    const email = `user-${crypto.randomUUID()}@example.com`;
    const password = "123";

    // First signup
    await page.goto("/signup");

    await page.getByTestId("email-input").fill(email);
    await page.getByTestId("password-input").fill(password);

    await page.getByTestId("signup-button").click();

    await expect(
      page.getByText("Password should be at least 6 characters."),
    ).toBeVisible();
  });
});
