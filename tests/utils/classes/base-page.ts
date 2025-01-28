import { Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  readonly url: string;

  constructor(page: Page, url: string) {
    this.page = page;
    this.url = url;
  }

  async assertUrl(): Promise<void> {
    await this.page.waitForURL(this.url);
    const currentURL = this.page.url();

    if (currentURL !== this.url) {
      throw new Error(`Expected URL to be "${this.url}", but got "${currentURL}"`);
    }
  }
}
