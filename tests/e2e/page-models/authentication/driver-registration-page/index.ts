import { Page } from '@playwright/test';

import { BaseForm } from '@/classes/base-form';

import { baseURL } from '@/config/playwright.config';

import {
  DRIVER_REGISTRATION_PAGE_DESCRIPTION,
  DRIVER_REGISTRATION_PAGE_FORM,
  DRIVER_REGISTRATION_PAGE_FORM_SUBMIT_BUTTON,
  REGISTRATION_FAILURE_MESSAGE,
  REGISTRATION_SUCCESS_MESSAGE,
} from '@/test-ids/driver-registration-page';

import { EDriverRegistrationFormKeys } from '@/enums/driver-registration-form-keys';
import { ELanguage } from '@/enums/language';

import { TTestObject } from '@/types/test-object';

export class DriverRegistrationPage extends BaseForm {
  readonly inputKeys: string[] = Object.values(EDriverRegistrationFormKeys);
  readonly submitButtonTestId: string = DRIVER_REGISTRATION_PAGE_FORM_SUBMIT_BUTTON;

  constructor(page: Page, language: ELanguage = ELanguage.EN) {
    super(page, `${baseURL}/${language}/driver`);
  }

  async assertPageLayoutVisible() {
    const pageElementIds: string[] = [
      DRIVER_REGISTRATION_PAGE_DESCRIPTION,
      DRIVER_REGISTRATION_PAGE_FORM,
    ];

    return this.assertPageElementsVisibility(pageElementIds);
  }

  async assertInputPlaceholders() {
    const inputPlaceholders: TTestObject = {
      [EDriverRegistrationFormKeys.EMAIL]: 'Enter email address',
      [EDriverRegistrationFormKeys.PHONE_NUMBER]: 'Mobile number',
      [EDriverRegistrationFormKeys.CITY]: 'City where you will drive',
    };

    const inputKeys = Object.keys(inputPlaceholders);

    for (const inputKey of inputKeys) {
      if (inputKey === EDriverRegistrationFormKeys.CITY) {
        return await this.checkReactSelectPlaceholder(inputPlaceholders[inputKey]);
      }

      await this.checkInputPlaceholder(inputKey, inputPlaceholders[inputKey]);
    }
  }

  async assertAllFormErrorsAreNotVisible() {
    await this.assertFormErrorsAreNotVisible(this.inputKeys);
  }

  async assertRequiredFieldsErrorMessages() {
    const requiredFieldErrorMessages: TTestObject = {
      [EDriverRegistrationFormKeys.EMAIL]: 'Providing the email is required',
      [EDriverRegistrationFormKeys.PHONE_NUMBER]: 'Providing the phone number is required',
      [EDriverRegistrationFormKeys.CITY]: 'Providing the city is required',
      [EDriverRegistrationFormKeys.RULES]: 'You must agree to continue',
    };

    await this.checkErrorMessages(requiredFieldErrorMessages);
  }

  async fillInputsWithInvalidValues() {
    const invalidInputFormat: TTestObject = {
      [EDriverRegistrationFormKeys.EMAIL]: 'test@pl',
      [EDriverRegistrationFormKeys.PHONE_NUMBER]: '99999999',
    };

    await this.changeInputsValue(invalidInputFormat);
  }

  async assertInvalidFormatErrorMessages() {
    const invalidFormatErrorMessages: TTestObject = {
      [EDriverRegistrationFormKeys.EMAIL]: 'Please enter a valid email',
      [EDriverRegistrationFormKeys.PHONE_NUMBER]: 'Invalid phone format',
    };

    await this.checkErrorMessages(invalidFormatErrorMessages);
  }

  async fillInputsWithValidValues() {
    const wrongFormatErrorMessages: TTestObject = {
      [EDriverRegistrationFormKeys.EMAIL]: 'test@test.pl',
      [EDriverRegistrationFormKeys.PHONE_NUMBER]: '999999999',
    };

    await this.changeInputsValue(wrongFormatErrorMessages);
  }

  async fillForm() {
    await this.fillInputsWithValidValues();
    await this.selectReactSelectOption('Warsaw');
    await this.checkCheckbox(EDriverRegistrationFormKeys.RULES);
  }

  async assertFormInputErrorsAreNotVisible() {
    const inputKeys: Readonly<string[]> = [
      EDriverRegistrationFormKeys.EMAIL,
      EDriverRegistrationFormKeys.PHONE_NUMBER,
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

  async clickFormSubmitButton() {
    await this.clickButton(this.submitButtonTestId);
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
