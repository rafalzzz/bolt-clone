import { Page } from '@playwright/test';

import { baseURL } from '@/config/playwright.config';

import { ELanguage } from '@/enums/language';

export class LandingPage {
  readonly page: Page;
  readonly url: string;

  constructor(page: Page, language: ELanguage = ELanguage.EN) {
    this.page = page;
    this.url = `${baseURL}/${language}`;
  }

  async visit() {
    await this.page.goto(baseURL);
  }
}
