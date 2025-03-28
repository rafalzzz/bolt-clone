import type { Page } from '@playwright/test';

import { baseURL } from '@/config/playwright.config';

import { AddFacialRecognitionModal } from '@/page-models/authentication/add-facial-recognition-modal';

import {
  DRIVER_EGISTRATION_COMPLETE_SUCCESS_MESSAGE,
  DRIVER_REGISTRATION_COMPLETE_FAILURE_MESSAGE,
  DRIVER_REGISTRATION_COMPLETE_PAGE_DESCRIPTION,
  DRIVER_REGISTRATION_COMPLETE_PAGE_FORM,
  DRIVER_REGISTRATION_COMPLETE_PAGE_FORM_SUBMIT_BUTTON,
  JWT_TOKEN_ERROR,
} from '@/test-ids/driver-registration-complete-page';

import { PASSWORD_INPUT_ERRORS } from '@/consts/input-errors';

import { EDriverCompleteRegistrationFormKeys } from '@/enums/driver-complete-registration-form-keys';
import { ELanguage } from '@/enums/language';

import { TTestObject } from '@/types/test-object';

export class DriverCompleteRegistrationPage extends AddFacialRecognitionModal {
  readonly inputKeys: string[] = Object.values(EDriverCompleteRegistrationFormKeys);
  readonly submitButtonTestId: string = DRIVER_REGISTRATION_COMPLETE_PAGE_FORM_SUBMIT_BUTTON;

  constructor(page: Page, language: ELanguage = ELanguage.EN) {
    super(page, `${baseURL}/${language}/driver/complete/`);
  }

  // JWT token methods
  async visitPageWithWrongToken() {
    const wrongToken: string = 'test';

    return await this.visit(wrongToken);
  }

  async visitPageWithInvalidToken() {
    const invalidToken: string =
      'eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5wbCIsInBob25lTnVtYmVyIjoiOTk5OTk5OTk5IiwiY2l0eSI6IndhcnNhdyIsImlhdCI6MTczOTM3OTEyN30.0BA5WnhIDjeo-4pq1t6qdx0VhmznaFRaQnuQg';

    return await this.visit(invalidToken);
  }

  async visitPageWithExpiredToken() {
    const expiredToken: string =
      'eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5wbCIsInBob25lTnVtYmVyIjoiOTk5OTk5OTk5IiwiY2l0eSI6IndhcnNhdyIsImlhdCI6MTczOTM3OTQzMiwiZXhwIjoxNzM5Mzc5NDkyfQ.rEv6Y9XS9NXnqyrTv8lyRPsskCVdo0pkcKoovOA7Osk';

    return await this.visit(expiredToken);
  }

  async visitPageWithValidToken() {
    const validToken: string =
      'eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJwaG9uZU51bWJlciI6IjJmOGU3ZDA4NWQwY2MyYWZhZWQzODgwNmVlZTkyZWUwOmIxMTY2Y2VkZDIzMWFlMjIzYzEwZmYxYTEwMzM4MTAwIiwiY2l0eSI6IndhcnNhdyIsInBob25lTnVtYmVySGFzaCI6ImFiYTM3MDQ0MzBmMjM5MjkzZDI3Njg1MGFhNWRkNjQxOGI1ZTU3MTVmYTQ1OGZhYmU2NDI2YTQzNTU1NDEzNzEiLCJpYXQiOjE3NDEyMDY2NzJ9.Oa5I_v1omimsFtUa2OLLMwfKn6cM6OUep0tdVpas3Vc';

    return await this.visit(validToken);
  }

  private async checkJwtTokenErrorMessage(message: string) {
    const jwtTokenError = this.getElementByTestId(JWT_TOKEN_ERROR);
    await this.checkElementText(jwtTokenError, message);
  }

  async assertUknownJwtTokenErrorMessage() {
    await this.checkJwtTokenErrorMessage('An unknown error occurred during decrypting token');
  }

  async assertInvalidJwtTokenErrorMessage() {
    await this.checkJwtTokenErrorMessage('Token is invalid');
  }

  async asserteExpiredJwtTokenErrorMessage() {
    await this.checkJwtTokenErrorMessage('Token has expired');
  }

  // Check general layout methods
  async assertPageLayoutVisible() {
    const pageElementIds: string[] = [
      DRIVER_REGISTRATION_COMPLETE_PAGE_DESCRIPTION,
      DRIVER_REGISTRATION_COMPLETE_PAGE_FORM,
    ];

    return this.assertPageElementsVisibility(pageElementIds);
  }

  async assertRegistrationSuccessMessage() {
    await this.checkToastMessage(
      DRIVER_EGISTRATION_COMPLETE_SUCCESS_MESSAGE,
      'You have been registered! You can start using our application',
    );
  }

  async assertErrorToastMessage() {
    await this.checkToastMessage(DRIVER_REGISTRATION_COMPLETE_FAILURE_MESSAGE, 'Unknown error');
  }

  // Change form elements methods
  async fillInputsWithValidValues() {
    const wrongFormatErrorMessages: TTestObject = {
      [EDriverCompleteRegistrationFormKeys.FIRST_NAME]: 'Test',
      [EDriverCompleteRegistrationFormKeys.LAST_NAME]: 'Test',
      [EDriverCompleteRegistrationFormKeys.PASSWORD]: 'TestTest1!',
      [EDriverCompleteRegistrationFormKeys.REPEAT_PASSWORD]: 'TestTest1!',
    };

    await this.changeInputsValues(wrongFormatErrorMessages);
  }

  // Form methods
  async assertInputPlaceholders() {
    const inputPlaceholders: TTestObject = {
      [EDriverCompleteRegistrationFormKeys.FIRST_NAME]: 'Enter your first name',
      [EDriverCompleteRegistrationFormKeys.LAST_NAME]: 'Enter your last name',
      [EDriverCompleteRegistrationFormKeys.PASSWORD]: 'Password',
      [EDriverCompleteRegistrationFormKeys.REPEAT_PASSWORD]: 'Repeat password',
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

  async assertFirstNameInputErrors() {
    const inputErrors = [
      { value: 'ts', errorMessage: 'This field requires at least 3 characters' },
      { value: 'test1', errorMessage: 'This field accepts only letters' },
      { value: 'test!', errorMessage: 'This field accepts only letters' },
    ];

    await this.checkInputErrors(EDriverCompleteRegistrationFormKeys.FIRST_NAME, inputErrors);
  }

  async assertLastNameInputErrors() {
    const inputErrors = [
      { value: 'ts', errorMessage: 'This field requires at least 3 characters' },
      { value: 'test1', errorMessage: 'This field accepts only letters' },
      { value: 'test!', errorMessage: 'This field accepts only letters' },
    ];

    await this.checkInputErrors(EDriverCompleteRegistrationFormKeys.LAST_NAME, inputErrors);
  }

  async assertPasswordInputErrors() {
    await this.checkInputErrors(
      EDriverCompleteRegistrationFormKeys.PASSWORD,
      PASSWORD_INPUT_ERRORS,
    );
  }

  async assertInputErrorsAreNotVisible() {
    await this.assertFormErrorsAreNotVisible([
      EDriverCompleteRegistrationFormKeys.FIRST_NAME,
      EDriverCompleteRegistrationFormKeys.LAST_NAME,
      EDriverCompleteRegistrationFormKeys.PASSWORD,
      EDriverCompleteRegistrationFormKeys.REPEAT_PASSWORD,
    ]);
  }

  async clickFormSubmitButton() {
    await this.clickButton(this.submitButtonTestId);
  }
}
