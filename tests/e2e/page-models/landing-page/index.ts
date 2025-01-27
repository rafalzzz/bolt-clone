import { Page } from '@playwright/test';

import { baseURL } from '@/config/playwright.config';

export class LandingPage {
  readonly page: Page;
  readonly url: string;

  constructor(page: Page, language: 'pl' | 'en' = 'en') {
    this.page = page;
    this.url = `${baseURL}/${language}`;
  }

  async visit() {
    await this.page.goto(baseURL);
  }
}
