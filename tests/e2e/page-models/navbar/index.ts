import { expect, Page } from '@playwright/test';

import {
  NAVBAR,
  LANGUAGE_BUTTON,
  LANGUAGE_BUTTON_ITEM,
  THEME_BUTTON,
  REGISTER_BUTTON,
  REGISTER_BUTTON_ITEM,
} from '@/test-ids/navbar';

import { ETheme } from '@/enums/theme';

type TClickButtonByTestId = {
  testId: string;
  buttonText?: string;
};

export class Navbar {
  page: Page;
  themeColors = {
    light: '255, 255, 255',
    dark: '17, 24, 39',
  };

  constructor(page: Page) {
    this.page = page;
  }

  private async clickButtonByTestId({ testId, buttonText }: TClickButtonByTestId) {
    const button = this.page.getByTestId(testId).filter({ hasText: buttonText });
    await button.click();
  }

  async changeLanguage(language: string) {
    await this.clickButtonByTestId({ testId: LANGUAGE_BUTTON });
    await this.clickButtonByTestId({
      testId: LANGUAGE_BUTTON_ITEM,
      buttonText: language.toUpperCase(),
    });

    return this;
  }

  async assertHeaderButtons(buttons: Record<string, string>) {
    for (const [testId, text] of Object.entries(buttons)) {
      const button = this.page.getByTestId(testId);

      await expect(button).toBeVisible();
      await expect(button).toHaveText(text);
    }
  }

  async toggleTheme(theme: ETheme) {
    const htmlElement = this.page.locator('html').first();

    await this.clickButtonByTestId({ testId: THEME_BUTTON });
    await this.page.waitForFunction(
      (theme) => document.documentElement.classList.contains(theme),
      theme,
      { timeout: 2000 },
    );

    const classList = await htmlElement.evaluate((element) => element.className);

    const unwantedClass = theme === ETheme.DARK ? ETheme.LIGHT : ETheme.DARK;

    if (classList.includes(unwantedClass)) {
      throw new Error(`HTML element should not contain the class ${unwantedClass}`);
    }

    await expect(htmlElement).toHaveClass(new RegExp(`\\b${theme}\\b`, 'i'));

    return this;
  }

  async assertNavbarBackgroundColor(theme: ETheme) {
    const navbar = this.page.getByTestId(NAVBAR);
    const expectedColor = `rgb(${this.themeColors[theme]})`;

    await expect(navbar).toHaveCSS('background-color', expectedColor);
  }

  async clickSignButton(buttonText: 'Become a driver' | 'Become a client') {
    await this.clickButtonByTestId({ testId: REGISTER_BUTTON });
    await this.clickButtonByTestId({ testId: REGISTER_BUTTON_ITEM, buttonText });
  }
}
