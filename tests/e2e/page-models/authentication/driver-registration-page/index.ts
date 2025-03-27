import type { Page } from '@playwright/test';

import { BaseForm } from '@/classes/base-form';

import { baseURL } from '@/config/playwright.config';

import {
  DRIVER_REGISTRATION_PAGE_DESCRIPTION,
  DRIVER_REGISTRATION_PAGE_FORM,
  DRIVER_REGISTRATION_PAGE_FORM_SUBMIT_BUTTON,
  REGISTRATION_FAILURE_MESSAGE,
  REGISTRATION_SUCCESS_MESSAGE,
} from '@/test-ids/driver-registration-page';

import { SEND_EMAIL_TO_DRIVER } from '@/consts/endpoints';

import { EDriverRegistrationFormKeys } from '@/enums/driver-registration-form-keys';
import { ELanguage } from '@/enums/language';

import { TTestObject } from '@/types/test-object';

export class DriverRegistrationPage extends BaseForm {
  readonly inputKeys: string[] = Object.values(EDriverRegistrationFormKeys);
  readonly submitButtonTestId: string = DRIVER_REGISTRATION_PAGE_FORM_SUBMIT_BUTTON;
  readonly sendEmailEndpointUrl: string = baseURL + SEND_EMAIL_TO_DRIVER;

  readonly correctRequestBody = {
    [EDriverRegistrationFormKeys.EMAIL]: 'test@test.pl',
    [EDriverRegistrationFormKeys.PHONE_NUMBER]: '999999999',
    [EDriverRegistrationFormKeys.CITY]: 'warsaw',
    [EDriverRegistrationFormKeys.RULES]: true,
  };

  constructor(page: Page, language: ELanguage = ELanguage.EN) {
    super(page, `${baseURL}/${language}/driver`);
  }

  // Check general layout methods
  async assertPageLayoutVisible() {
    const pageElementIds: string[] = [
      DRIVER_REGISTRATION_PAGE_DESCRIPTION,
      DRIVER_REGISTRATION_PAGE_FORM,
    ];

    return this.assertPageElementsVisibility(pageElementIds);
  }

  // Requests methods
  async mockFailureRegistrationResponse() {
    await this.mockRequestResponse({
      endpoint: `**${SEND_EMAIL_TO_DRIVER}`,
      method: 'POST',
      options: {
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'An unexpected response was received from the server.' }),
      },
    });
  }

  async mockSuccessRegistrationResponse() {
    await this.mockRequestResponse({
      endpoint: `**${SEND_EMAIL_TO_DRIVER}`,
      method: 'POST',
      options: {
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Success' }),
      },
    });
  }

  async waitForRegistrationRequest() {
    const requestPromise = this.getRequestPromise(this.sendEmailEndpointUrl);

    await this.clickFormSubmitButton();
    await this.assertAllFormErrorsAreNotVisible();

    await requestPromise;
    return requestPromise;
  }

  assertRequestBodyCorrectness(requestBody: Record<string, unknown>) {
    this.assertRequestBody(requestBody, this.correctRequestBody);
  }

  // Check request result methods
  async assertErrorToastMessage() {
    await this.checkToastMessage(
      REGISTRATION_FAILURE_MESSAGE,
      'An unexpected response was received from the server.',
    );
  }

  async assertSuccessToastMessage() {
    await this.checkToastMessage(
      REGISTRATION_SUCCESS_MESSAGE,
      'Registration was successful! Check your email.',
    );
  }

  // Change form elements methods
  async fillInputsWithValidValues() {
    const wrongFormatErrorMessages: TTestObject = {
      [EDriverRegistrationFormKeys.EMAIL]:
        this.correctRequestBody[EDriverRegistrationFormKeys.EMAIL],
      [EDriverRegistrationFormKeys.PHONE_NUMBER]:
        this.correctRequestBody[EDriverRegistrationFormKeys.PHONE_NUMBER],
    };

    await this.changeInputsValues(wrongFormatErrorMessages);
  }

  async fillForm() {
    await this.fillInputsWithValidValues();
    await this.selectReactSelectOption('Warsaw');
    await this.checkCheckbox(EDriverRegistrationFormKeys.RULES);
  }

  // Form methods
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

  async assertEmailInputErrors() {
    const values = ['!#', 'test@pl'];

    const inputErrors = values.map((value) => ({
      value,
      errorMessage: 'Please enter a valid email',
    }));

    await this.checkInputErrors(EDriverRegistrationFormKeys.EMAIL, inputErrors);
  }

  async assertPhoneNumberInputErrors() {
    const values = ['99999999!', '99999999A', '9999999999'];
    const inputErrors = values.map((value) => ({ value, errorMessage: 'Invalid phone format' }));

    await this.checkInputErrors(EDriverRegistrationFormKeys.PHONE_NUMBER, inputErrors);
  }

  async assertAllFormErrorsAreNotVisible() {
    await this.assertFormErrorsAreNotVisible(this.inputKeys);
  }

  async assertRequiredFieldsErrorMessages() {
    const requiredFieldErrorMessages: TTestObject = {
      [EDriverRegistrationFormKeys.EMAIL]: 'This field is required',
      [EDriverRegistrationFormKeys.PHONE_NUMBER]: 'This field is required',
      [EDriverRegistrationFormKeys.CITY]: 'This field is required',
      [EDriverRegistrationFormKeys.RULES]: 'This field is required',
    };

    await this.checkErrorsMessages(requiredFieldErrorMessages);
  }

  async assertFormInputErrorsAreNotVisible() {
    const inputKeys: Readonly<string[]> = [
      EDriverRegistrationFormKeys.EMAIL,
      EDriverRegistrationFormKeys.PHONE_NUMBER,
    ];

    await this.assertFormErrorsAreNotVisible(inputKeys);
  }

  async clickFormSubmitButton() {
    await this.clickButton(this.submitButtonTestId);
  }
}
