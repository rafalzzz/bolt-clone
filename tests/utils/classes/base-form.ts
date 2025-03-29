import { expect, type Page } from '@playwright/test';

import { TTestObject } from '@/types/test-object';

import { BasePage } from './base-page';

import getCheckboxTestId from '@/helpers/get-checkbox-test-id';
import getErrorTestId from '@/helpers/get-error-test-id';
import getInputTestId from '@/helpers/get-input-test-id';

export class BaseForm extends BasePage {
  readonly reactSelectSelector = 'react-select';

  constructor(page: Page, url: string) {
    super(page, url);
  }

  // Get form element methods
  private getErrorElement(inputKey: string) {
    return this.getElementByTestId(getErrorTestId(inputKey));
  }

  private getInputElement(inputKey: string) {
    return this.getElementByTestId(getInputTestId(inputKey));
  }

  private getCheckboxElement(inputKey: string) {
    return this.getElementByTestId(getCheckboxTestId(inputKey));
  }

  // Form element event handlers
  async changeSingleInputValue(inputKey: string, value: string) {
    const inputElement = this.getInputElement(inputKey);
    await inputElement.fill(value);
  }

  async changeInputsValues(inputsObject: TTestObject) {
    const inputKeys = Object.keys(inputsObject);

    for (const inputKey of inputKeys) {
      await this.changeSingleInputValue(inputKey, inputsObject[inputKey]);
    }
  }

  async checkCheckbox(inputKey: string) {
    const checkboxElement = this.getCheckboxElement(inputKey);
    await checkboxElement.click();
  }

  // React-select methods
  async checkReactSelectPlaceholder(inputKey: string, placeholder: string) {
    const placeholderLocator = this.page.locator(
      `[data-testid="react-select-${inputKey}"] [class*="__placeholder"]`,
    );

    await this.checkElementText(placeholderLocator, placeholder);
  }

  async selectReactSelectOption(inputKey: string, optionText: string) {
    const select = this.page.locator(
      `[data-testid="react-select-${inputKey}"] [class*="__control"]`,
    );
    await select.click();

    await this.page.getByText(optionText, { exact: true }).click();
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

  async checkErrorsMessages(inputsObject: TTestObject) {
    const inputKeys = Object.keys(inputsObject);

    for (const inputKey of inputKeys) {
      await this.checkSingleErrorMessage(inputKey, inputsObject[inputKey]);
    }
  }

  async checkInputErrors(
    inputKey: string,
    inputErrors: {
      value: string;
      errorMessage: string;
    }[],
  ) {
    for (const inputError of inputErrors) {
      const { value, errorMessage } = inputError;

      await this.changeSingleInputValue(inputKey, value);

      await this.checkErrorsMessages({
        [inputKey]: errorMessage,
      });
    }
  }

  async assertFormErrorsAreNotVisible(inputKeys: Readonly<string[]>) {
    for (const inputKey of inputKeys) {
      const errorElement = this.getErrorElement(inputKey);

      await expect(errorElement).not.toBeVisible();
    }
  }
}
