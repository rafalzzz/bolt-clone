import { expect, type Locator, type Page } from '@playwright/test';

import { TTestObject } from '@/types/test-object';

import { BasePage } from './base-page';

export class BaseForm extends BasePage {
  readonly reactSelectSelector = '.correct-react-select';

  constructor(page: Page, url: string) {
    super(page, url);
  }

  private getErrorElement(inputKey: string) {
    return this.getElementByTestId(`${inputKey}Error`);
  }

  private getInputElement(inputKey: string) {
    return this.getElementByTestId(`${inputKey}Input`);
  }

  private getCheckboxElement(inputKey: string) {
    return this.getElementByTestId(`${inputKey}Checkbox`);
  }

  private async changeSingleInputValue(inputKey: string, value: string) {
    const inputElement = this.getInputElement(inputKey);
    await inputElement.fill(value);
  }

  async changeInputsValue(inputsObject: TTestObject) {
    const inputKeys = Object.keys(inputsObject);

    for (const inputKey of inputKeys) {
      await this.changeSingleInputValue(inputKey, inputsObject[inputKey]);
    }
  }

  async checkCheckbox(inputKey: string) {
    const checkboxElement = this.getCheckboxElement(inputKey);
    checkboxElement.click();
  }

  private async checkElementText(element: Locator, text: string) {
    await expect(element).toHaveText(text);
  }

  // React-select methods
  async checkReactSelectPlaceholder(placeholder: string) {
    const reactSelectPlaceholderElement = this.page.locator(
      `${this.reactSelectSelector}__placeholder`,
    );

    await this.checkElementText(reactSelectPlaceholderElement, placeholder);
  }

  async selectReactSelectOption(optionText: string) {
    await this.page.click(`${this.reactSelectSelector}__control`);
    await this.page.click(`text=${optionText}`);
  }

  // Placeholder methods
  async checkInputPlaceholder(inputKey: string, placeholder: string) {
    await expect(this.getInputElement(inputKey)).toHaveAttribute('placeholder', placeholder);
  }

  // Error methods
  private async checkSingleErrorMessage(inputKey: string, message: string) {
    const errorElement = this.getErrorElement(inputKey);

    await this.checkElementText(errorElement, message);
  }

  async checkErrorMessages(inputsObject: TTestObject) {
    const inputKeys = Object.keys(inputsObject);

    for (const inputKey of inputKeys) {
      await this.checkSingleErrorMessage(inputKey, inputsObject[inputKey]);
    }
  }

  async assertFormErrorsAreNotVisible(inputKeys: Readonly<string[]>) {
    for (const inputKey of inputKeys) {
      const errorElement = this.getErrorElement(inputKey);

      await expect(errorElement).not.toBeVisible();
    }
  }

  async assertFormErrorsAreVisible(inputKeys: Readonly<string[]>) {
    for (const inputKey of inputKeys) {
      const errorElement = this.getErrorElement(inputKey);

      await expect(errorElement).toBeVisible();
    }
  }

  // Submit button methods
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

  async assertSubmitButtonLoaderWhenProcessing(testId: string) {
    const submitButton = this.getSubmitButton(testId);
    const submitButtonLoader = this.getElementByTestId(`${testId}Loader`);

    await submitButton.click();
    await submitButtonLoader.waitFor({ state: 'visible' });

    const isSubmitButtonLoaderVisible = await submitButtonLoader.isVisible();
    expect(isSubmitButtonLoaderVisible).toBeTruthy();
  }
}
