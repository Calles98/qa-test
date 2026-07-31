import { Page } from "@playwright/test";

export class SignUpPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto("/signup");
  }

  async signup(email: string, password: string) {
    await this.page.getByTestId("email-input").fill(email);
    await this.page.getByTestId("password-input").fill(password);
    await this.page.getByTestId("signup-button").click();
  }
}
