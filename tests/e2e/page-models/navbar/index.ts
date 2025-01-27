import { expect, Page } from '@playwright/test';

import { LANGUAGE_BUTTON, LANGUAGE_ITEM } from '@/test-ids/navbar';

export class Navbar {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  private getLanguageBtn() {
    return this.page.getByTestId(LANGUAGE_BUTTON);
  }

  private getLanguageItem(language: string) {
    return this.page.getByTestId(LANGUAGE_ITEM).filter({ hasText: language.toUpperCase() });
  }

  async clickLanguageBtn() {
    await this.getLanguageBtn().click();

    return this;
  }

  async selectLanguage(language: string) {
    await this.getLanguageItem(language).click();

    return this;
  }

  async assertHeaderButtons(buttons: Record<string, string>): Promise<void> {
    for (const [testId, text] of Object.entries(buttons)) {
      const button = this.page.getByTestId(testId);

      await expect(button).toBeVisible();
      await expect(button).toHaveText(text);
    }
  }
}
