import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { DashboardPage } from "../pages/DashboardPage";
import { TEST_USER } from "../Constants/constants";

type Fixtures = {
  dashboardPage: DashboardPage;
};

export const test = base.extend<Fixtures>({
  dashboardPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.goto();
    await loginPage.login(TEST_USER.email, TEST_USER.password);

    await use(dashboardPage);
  },
});

export { expect } from "@playwright/test";
