import type { Page } from '@playwright/test';

import { baseURL } from '@/config/playwright.config';

import { AddFacialRecognitionModal } from '@/page-models/authentication/add-facial-recognition-modal';

import { ADD_CAR_PAGE_DESCRIPTION, ADD_CAR_PAGE_FORM } from '@/test-ids/add-car-page';
import {
  DRIVER_LOGIN_PAGE_DESCRIPTION,
  DRIVER_LOGIN_PAGE_FORM,
  DRIVER_LOGIN_FAILURE_MESSAGE,
  DRIVER_LOGIN_PAGE_FORM_SUBMIT_BUTTON,
} from '@/test-ids/driver-login-page';

import { EMAIL_INPUT_ERRORS, PASSWORD_INPUT_ERRORS } from '@/consts/input-errors';

import { EDriverLoginFormKeys } from '@/enums/driver-login-form-keys';
import { ELanguage } from '@/enums/language';

import { TTestObject } from '@/types/test-object';

export class DriverLoginPage extends AddFacialRecognitionModal {
  readonly inputKeys: string[] = Object.values(EDriverLoginFormKeys);
  readonly submitButtonTestId: string = DRIVER_LOGIN_PAGE_FORM_SUBMIT_BUTTON;

  constructor(page: Page, language: ELanguage = ELanguage.EN) {
    super(page, `${baseURL}/${language}/driver/login/`);
  }

  // Check general layout methods
  async assertPageLayoutVisible() {
    const pageElementIds: string[] = [DRIVER_LOGIN_PAGE_DESCRIPTION, DRIVER_LOGIN_PAGE_FORM];

    return this.assertPageElementsVisibility(pageElementIds);
  }

  async assertErrorToastMessage() {
    await this.checkToastMessage(DRIVER_LOGIN_FAILURE_MESSAGE, 'Unknown error');
  }

  // Change form elements methods
  async fillInputsWithValidValues() {
    const inputValues: TTestObject = {
      [EDriverLoginFormKeys.EMAIL]: 'test@test.pl',
      [EDriverLoginFormKeys.PASSWORD]: 'TestTest1!',
    };

    await this.changeInputsValues(inputValues);
  }

  // Form methods
  async assertInputPlaceholders() {
    const inputPlaceholders: TTestObject = {
      [EDriverLoginFormKeys.EMAIL]: 'Enter email address',
      [EDriverLoginFormKeys.PASSWORD]: 'Password',
    };

    const inputKeys = Object.keys(inputPlaceholders);

    for (const inputKey of inputKeys) {
      await this.checkInputPlaceholder(inputKey, inputPlaceholders[inputKey]);
    }
  }

  async assertAllFormErrorsAreNotVisible() {
    await this.assertFormErrorsAreNotVisible(this.inputKeys);
  }

  async assertRequiredFieldsErrorMessages() {
    const requiredFieldErrorMessages: TTestObject = this.inputKeys.reduce(
      (acc, key) => ({
        ...acc,
        [key]: 'This field is required',
      }),
      {},
    );

    await this.checkErrorsMessages(requiredFieldErrorMessages);
  }

  async assertEmailInputErrors() {
    await this.checkInputErrors(EDriverLoginFormKeys.EMAIL, EMAIL_INPUT_ERRORS);
  }

  async assertPasswordInputErrors() {
    await this.checkInputErrors(EDriverLoginFormKeys.PASSWORD, PASSWORD_INPUT_ERRORS);
  }

  async assertInputErrorsAreNotVisible() {
    await this.assertFormErrorsAreNotVisible([
      EDriverLoginFormKeys.EMAIL,
      EDriverLoginFormKeys.PASSWORD,
    ]);
  }

  async clickFormSubmitButton() {
    await this.clickButton(this.submitButtonTestId);
  }

  async assertAddCarPageVisible() {
    const pageElementIds: string[] = [ADD_CAR_PAGE_DESCRIPTION, ADD_CAR_PAGE_FORM];

    return this.assertPageElementsVisibility(pageElementIds);
  }
}
