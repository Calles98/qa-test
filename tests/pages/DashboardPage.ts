import { Page } from "@playwright/test";

export class DashboardPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto("/");
  }

  async createTodo(title: string, body: string) {
    await this.page.getByTestId("title-input").fill(title);
    await this.page.getByTestId("body-input").fill(body);
    await this.page.getByTestId("submit-button").click();
  }

  async checkTodo(title: string) {
    await this.page.getByTestId(`checkbox-${title}`).click();
  }

  async deleteTodo() {
    await this.page.getByTestId("delete-button").click();
  }
}
