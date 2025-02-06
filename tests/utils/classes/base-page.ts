import { expect, type Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  readonly url: string;

  constructor(page: Page, url: string) {
    this.page = page;
    this.url = url;
  }

  async visit() {
    await this.page.goto(this.url);
  }

  async assertUrl(): Promise<void> {
    await this.page.waitForURL(this.url);
    const currentURL = this.page.url();

    if (currentURL !== this.url) {
      throw new Error(`Expected URL to be "${this.url}", but got "${currentURL}"`);
    }
  }

  getElementByTestId(testId: string) {
    return this.page.getByTestId(testId);
  }

  private getElementByText(text: string) {
    return this.page.locator(`text="${text}"`);
  }

  async isErrorVisible(errorText: string) {
    const errorMessage = this.getElementByText(errorText);

    const isVisible = await errorMessage.isVisible();

    expect(isVisible).toBeTruthy();
  }

  async assertAuthPageVisible(pageElementsIds: string[]) {
    for (const testId of pageElementsIds) {
      await expect(this.getElementByTestId(testId)).toBeVisible();
    }

    return this;
  }
}
