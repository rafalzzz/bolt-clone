import { Page } from '@playwright/test';

import { BaseForm } from '@/classes/base-form';

import { baseURL } from '@/config/playwright.config';

import {
  DRIVER_PAGE_DESCRIPTION,
  DRIVER_PAGE_FORM,
  DRIVER_PAGE_FORM_SUBMIT_BUTTON,
  REGISTRATION_FAILURE_MESSAGE,
  REGISTRATION_SUCCESS_MESSAGE,
} from '@/test-ids/driver-page';

import { EDriverRegisterFormKeys } from '@/enums/driver-register-form-keys';
import { ELanguage } from '@/enums/language';

import { TTestObject } from '@/types/test-object';

export class DriverPage extends BaseForm {
  readonly inputKeys: string[] = Object.values(EDriverRegisterFormKeys);
  readonly submitButtonTestId: string = DRIVER_PAGE_FORM_SUBMIT_BUTTON;

  constructor(page: Page, language: ELanguage = ELanguage.EN) {
    super(page, `${baseURL}/${language}/driver`);
  }

  async assertPageLayoutVisible() {
    const pageElementIds: string[] = [DRIVER_PAGE_DESCRIPTION, DRIVER_PAGE_FORM];

    return this.assertAuthPageVisible(pageElementIds);
  }

  async assertInputPlaceholders() {
    const inputPlaceholders: TTestObject = {
      [EDriverRegisterFormKeys.EMAIL]: 'Enter email address',
      [EDriverRegisterFormKeys.PHONE_NUMBER]: 'Mobile number',
      [EDriverRegisterFormKeys.CITY]: 'City where you will drive',
    };

    const inputKeys = Object.keys(inputPlaceholders);

    for (const inputKey of inputKeys) {
      if (inputKey === EDriverRegisterFormKeys.CITY) {
        return await this.checkReactSelectPlaceholder(inputPlaceholders[inputKey]);
      }

      await this.checkInputPlaceholder(inputKey, inputPlaceholders[inputKey]);
    }
  }

  async assertRequiredFieldsErrorMessages() {
    const requiredFieldErrorMessages: TTestObject = {
      [EDriverRegisterFormKeys.EMAIL]: 'Providing the email is required',
      [EDriverRegisterFormKeys.PHONE_NUMBER]: 'Providing the phone number is required',
      [EDriverRegisterFormKeys.CITY]: 'Providing the city is required',
      [EDriverRegisterFormKeys.RULES]: 'You must agree to continue',
    };

    await this.checkErrorMessages(requiredFieldErrorMessages);
  }

  async fillInputsWithInvalidValues() {
    const invalidInputFormat: TTestObject = {
      [EDriverRegisterFormKeys.EMAIL]: 'test@pl',
      [EDriverRegisterFormKeys.PHONE_NUMBER]: '99999999',
    };

    await this.changeInputsValue(invalidInputFormat);
  }

  async assertInvalidFormatErrorMessages() {
    const invalidFormatErrorMessages: TTestObject = {
      [EDriverRegisterFormKeys.EMAIL]: 'Please enter a valid email',
      [EDriverRegisterFormKeys.PHONE_NUMBER]: 'Invalid phone format',
    };

    await this.checkErrorMessages(invalidFormatErrorMessages);
  }

  async fillInputsWithValidValues() {
    const wrongFormatErrorMessages: TTestObject = {
      [EDriverRegisterFormKeys.EMAIL]: 'test@test.pl',
      [EDriverRegisterFormKeys.PHONE_NUMBER]: '999999999',
    };

    await this.changeInputsValue(wrongFormatErrorMessages);
  }

  async fillForm() {
    await this.fillInputsWithValidValues();
    await this.selectReactSelectOption('Warsaw');
    await this.checkCheckbox(EDriverRegisterFormKeys.RULES);
  }

  async assertErrorsAreNotVisible() {
    const inputKeys: Readonly<string[]> = [
      EDriverRegisterFormKeys.EMAIL,
      EDriverRegisterFormKeys.PHONE_NUMBER,
    ];

    await this.assertFormErrorsAreNotVisible(inputKeys);
  }

  async mockFailureRegistrationResponse() {
    await this.mockRequestResponse({
      endpoint: '**/en/driver',
      options: {
        status: 400,
        contentType: 'application/json',
      },
    });
  }

  async mockSuccessRegistrationResponse() {
    await this.mockRequestResponse({
      endpoint: '**/en/driver',
      options: {
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ isSuccess: true, error: false }),
      },
    });
  }

  async assertErrorToastIsVisible() {
    await this.isErrorVisible('An error occurred during registration.');
  }

  async clickFormSubmitButton() {
    await this.clickSubmitButton(this.submitButtonTestId);
  }

  async getRegistrationResponse() {
    return this.getRequestPromise(`${baseURL}/en/driver`);
  }

  async assertErrorToastMessage() {
    const errorMessage = await this.waitForElementWithTestId(REGISTRATION_FAILURE_MESSAGE);

    await this.checkElementTextContent(
      errorMessage,
      'An unexpected response was received from the server.',
    );
  }

  async assertSuccessToastMessage() {
    const successMessage = await this.waitForElementWithTestId(REGISTRATION_SUCCESS_MESSAGE);

    await this.checkElementTextContent(
      successMessage,
      'Registration was successful! Check your email.',
    );
  }
}
