import { expect, type Page } from '@playwright/test';

import { baseURL } from '@/config/playwright.config';

import { AddFacialRecognitionModal } from '@/page-models/authentication/add-facial-recognition-modal';

import {
  DRIVER_EGISTRATION_COMPLETE_SUCCESS_MESSAGE,
  DRIVER_REGISTRATION_COMPLETE_PAGE_DESCRIPTION,
  DRIVER_REGISTRATION_COMPLETE_PAGE_FORM,
  DRIVER_REGISTRATION_COMPLETE_PAGE_FORM_SUBMIT_BUTTON,
  JWT_TOKEN_ERROR,
} from '@/test-ids/driver-registration-complete-page';

import { REGISTER_DRIVER } from '@/consts/endpoints';

import { EDriverCompleteRegistrationFormKeys } from '@/enums/driver-complete-registration-form-keys';
import { ELanguage } from '@/enums/language';

import { TTestObject } from '@/types/test-object';

export class DriverCompleteRegistrationPage extends AddFacialRecognitionModal {
  readonly inputKeys: string[] = Object.values(EDriverCompleteRegistrationFormKeys);
  readonly submitButtonTestId: string = DRIVER_REGISTRATION_COMPLETE_PAGE_FORM_SUBMIT_BUTTON;
  readonly registerDriverEndpointUrl: string = baseURL + REGISTER_DRIVER;

  readonly correctRequestBody = {
    [EDriverCompleteRegistrationFormKeys.FIRST_NAME]: 'Test',
    [EDriverCompleteRegistrationFormKeys.LAST_NAME]: 'Test',
    [EDriverCompleteRegistrationFormKeys.PASSWORD]: 'TestTest1!',
    [EDriverCompleteRegistrationFormKeys.REPEAT_PASSWORD]: 'TestTest1!',
  };

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

  // Check request result methods
  asserRequestBodyCorrectness(requestBody: Record<string, unknown>) {
    expect(requestBody).toEqual(this.correctRequestBody);
  }

  async assertRegistrationSuccessMessage() {
    await this.checkToastMessage(
      DRIVER_EGISTRATION_COMPLETE_SUCCESS_MESSAGE,
      'You have been registered! You can start using our application',
    );
  }

  // Change form elements methods
  async fillInputsWithValidValues() {
    const wrongFormatErrorMessages: TTestObject = {
      [EDriverCompleteRegistrationFormKeys.FIRST_NAME]:
        this.correctRequestBody[EDriverCompleteRegistrationFormKeys.FIRST_NAME],
      [EDriverCompleteRegistrationFormKeys.LAST_NAME]:
        this.correctRequestBody[EDriverCompleteRegistrationFormKeys.LAST_NAME],
      [EDriverCompleteRegistrationFormKeys.PASSWORD]:
        this.correctRequestBody[EDriverCompleteRegistrationFormKeys.PASSWORD],
      [EDriverCompleteRegistrationFormKeys.REPEAT_PASSWORD]:
        this.correctRequestBody[EDriverCompleteRegistrationFormKeys.REPEAT_PASSWORD],
    };

    await this.changeInputsValues(wrongFormatErrorMessages);
  }

  // Requests methods
  async mockSuccessRegistrationCompleteResponse() {
    await this.mockRequestResponse({
      endpoint: `**${REGISTER_DRIVER}`,
      method: 'POST',
      options: {
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          message: 'You have been registered! You can start using our application',
        }),
      },
    });
  }

  async waitForRegistrationSuccessRequest() {
    const requestPromise = this.getRequestPromise(this.registerDriverEndpointUrl);

    await this.clickFormSubmitButton();
    await this.assertAllFormErrorsAreNotVisible();

    await requestPromise;
    return requestPromise;
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

  async assertInvalidFormatErrorMessages() {
    const invalidFormatErrorMessages: TTestObject = {
      [EDriverCompleteRegistrationFormKeys.FIRST_NAME]: 'This field requires at least 3 characters',
      [EDriverCompleteRegistrationFormKeys.LAST_NAME]: 'This field requires at least 3 characters',
      [EDriverCompleteRegistrationFormKeys.PASSWORD]: 'Password must contain at least 8 characters',
      [EDriverCompleteRegistrationFormKeys.REPEAT_PASSWORD]: 'The entered passwords do not match',
    };

    await this.checkErrorsMessages(invalidFormatErrorMessages);
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

  async assertRemainingFirstNameInputErrors() {
    const inputErrors = [
      { value: 'ts', errorMessage: 'This field requires at least 3 characters' },
      { value: 'test1', errorMessage: 'This field accepts only letters' },
      { value: 'test!', errorMessage: 'This field accepts only letters' },
    ];

    await this.checkInputErrors(EDriverCompleteRegistrationFormKeys.FIRST_NAME, inputErrors);
  }

  async assertRemainingLastNameInputErrors() {
    const inputErrors = [
      { value: 'ts', errorMessage: 'This field requires at least 3 characters' },
      { value: 'test1', errorMessage: 'This field accepts only letters' },
      { value: 'test!', errorMessage: 'This field accepts only letters' },
    ];

    await this.checkInputErrors(EDriverCompleteRegistrationFormKeys.LAST_NAME, inputErrors);
  }

  async assertRemainingPasswordInputErrors() {
    const inputErrors = [
      { value: 'tst', errorMessage: 'Password must contain at least 8 characters' },
      { value: 'testtest1', errorMessage: 'Password must contain at least one uppercase letter' },
      { value: 'TESTTEST1', errorMessage: 'Password must contain at least one lowercase letter' },
      { value: 'TestTest', errorMessage: 'Password must contain at least one digit' },
      { value: 'TestTest1', errorMessage: 'Password must contain at least one special character' },
    ];

    await this.checkInputErrors(EDriverCompleteRegistrationFormKeys.PASSWORD, inputErrors);
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
