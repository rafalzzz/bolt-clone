import { expect, Page } from '@playwright/test';

import { BasePage } from '@/classes/base-page';

import { baseURL } from '@/config/playwright.config';

import { DRIVER_PAGE_DESCRIPTION, DRIVER_PAGE_FORM } from '@/test-ids/driver-page';

import { ELanguage } from '@/enums/language';

export class DriverPage extends BasePage {
  constructor(page: Page, language: ELanguage = ELanguage.EN) {
    super(page, `${baseURL}/${language}/driver`);
  }

  private getElementByTestId(testId: string) {
    return this.page.getByTestId(testId);
  }

  async assertAuthPageVisible() {
    const pageElements = [DRIVER_PAGE_DESCRIPTION, DRIVER_PAGE_FORM];

    for (const testId of pageElements) {
      await expect(this.getElementByTestId(testId)).toBeVisible();
    }

    return this;
  }
}
