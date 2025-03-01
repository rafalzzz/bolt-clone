import { expect, type Page } from '@playwright/test';

import { BasePage } from '@/classes/base-page';

import {
  NAVBAR,
  LANGUAGE_BUTTON,
  LANGUAGE_BUTTON_ITEM,
  THEME_BUTTON,
  REGISTER_BUTTON,
  REGISTER_BUTTON_ITEM,
} from '@/test-ids/navbar';

import { ETheme } from '@/enums/theme';

export class Navbar extends BasePage {
  page: Page;
  themeColors = {
    light: '255, 255, 255',
    dark: '17, 24, 39',
  };

  constructor(page: Page) {
    super(page);

    this.page = page;
  }

  async changeLanguage(language: string) {
    await this.clickButton(LANGUAGE_BUTTON);
    await this.clickButton(LANGUAGE_BUTTON_ITEM, language.toUpperCase());
  }

  async assertHeaderButtons(buttons: Record<string, string>) {
    await this.assertElementsText(buttons);
  }

  async toggleTheme(theme: ETheme) {
    const htmlElement = this.page.locator('html').first();

    await this.clickButton(THEME_BUTTON);
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
  }

  async assertNavbarBackgroundColor(theme: ETheme) {
    const navbar = this.getElementByTestId(NAVBAR);
    const expectedColor = `rgb(${this.themeColors[theme]})`;

    await expect(navbar).toHaveCSS('background-color', expectedColor);
  }

  async clickSignButton(buttonText: 'Become a driver' | 'Become a client') {
    await this.clickButton(REGISTER_BUTTON);
    await this.clickButton(REGISTER_BUTTON_ITEM, buttonText);
  }
}
