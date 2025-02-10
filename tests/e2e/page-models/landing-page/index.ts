import { Page } from '@playwright/test';

import { BasePage } from '@/classes/base-page';

import { baseURL } from '@/config/playwright.config';

import { ELanguage } from '@/enums/language';

export class LandingPage extends BasePage {
  constructor(page: Page, language: ELanguage = ELanguage.EN) {
    super(page, `${baseURL}/${language}`);
  }
}
