import test, { expect } from "@playwright/test";
import { DashboardPage } from "../pages/DashboardPage";
import { TEST_TODO } from "../Constants/constants";

test.describe("To Do", () => {
  test("Add a new to do", async ({ page }) => {
    const title = `Todo-${crypto.randomUUID()}`;

    const dashboard = new DashboardPage(page);
    await dashboard.goto();
    await dashboard.createTodo(title, TEST_TODO.body);

    await expect(page.getByText(title)).toBeVisible();

    await dashboard.checkTodo(title);

    await dashboard.deleteTodo();
  });

  test("deletes a completed todo.", async ({ page }) => {
    const title = `Todo-${crypto.randomUUID()}`;

    const dashboard = new DashboardPage(page);
    await dashboard.goto();
    await dashboard.createTodo(title, TEST_TODO.body);

    await expect(page.getByText(title)).toBeVisible();

    await dashboard.checkTodo(title);

    await dashboard.deleteTodo();

    await expect(page.getByText(title)).not.toBeVisible();
  });
});
