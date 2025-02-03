import { expect, type Locator, type Page } from '@playwright/test';

import { BasePage } from './base-page';

export class BaseForm extends BasePage {
  constructor(page: Page, url: string) {
    super(page, url);
  }

  private getErrorElement(inputKey: string) {
    return this.getElementByTestId(`${inputKey}Error`);
  }

  async checkInputPlaceholder(inputKey: string, placeholder: string) {
    await expect(this.getElementByTestId(`${inputKey}Input`)).toHaveAttribute(
      'placeholder',
      placeholder,
    );
  }

  private async checkElementText(element: Locator, text: string) {
    await expect(element).toHaveText(text);
  }

  async checkReactSelectPlaceholder(placeholder: string) {
    const reactSelectPlaceholderElement = this.page.locator('.correct-react-select__placeholder');

    await this.checkElementText(reactSelectPlaceholderElement, placeholder);
  }

  async assertFormErrorsAreNotVisible(inputKeys: string[]) {
    for (const inputKey of inputKeys) {
      const errorElement = this.getErrorElement(inputKey);

      await expect(errorElement).not.toBeVisible();
    }
  }

  async assertFormErrorsAreVisible(inputKeys: string[]) {
    for (const inputKey of inputKeys) {
      const errorElement = this.getErrorElement(inputKey);

      await expect(errorElement).toBeVisible();
    }
  }

  private getSubmitButton(testId: string) {
    return this.page.getByTestId(testId);
  }

  async assertSubmitButtonEnabled(testId: string) {
    const button = this.getSubmitButton(testId);

    return await button.isEnabled();
  }

  async clickSubmitButton(testId: string) {
    await this.getSubmitButton(testId).click();
  }

  async checkErrorMessage(inputKey: string, message: string) {
    const errorElement = this.getErrorElement(inputKey);

    await this.checkElementText(errorElement, message);
  }
}
