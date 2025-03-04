import { expect, type Page } from '@playwright/test';

import { baseURL } from '@/config/playwright.config';

import { AddFacialRecognitionModal } from '@/page-models/authentication/add-facial-recognition-modal';

import {
  DRIVER_EGISTRATION_COMPLETE_SUCCESS_MESSAGE,
  DRIVER_REGISTRATION_COMPLETE_PAGE_DESCRIPTION,
  DRIVER_REGISTRATION_COMPLETE_PAGE_FORM,
  DRIVER_REGISTRATION_COMPLETE_PAGE_FORM_SUBMIT_BUTTON,
  JWT_TOKEN_ERROR,
  OPEN_ADD_FACIAL_RECOGNITION_MODAL_BUTTON,
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
    [EDriverCompleteRegistrationFormKeys.CAR_REGISTRATION_NUMBER]: 'TEST1',
    [EDriverCompleteRegistrationFormKeys.CAR_BRAND]: 'Test',
    [EDriverCompleteRegistrationFormKeys.CAR_MODEL]: 'Test',
    [EDriverCompleteRegistrationFormKeys.CAR_COLOR]: 'black',
    [EDriverCompleteRegistrationFormKeys.FILE]: {},
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
      'eyJhbGciOiJIUzI1NiJ9.eyJjaXR5Ijoicnplc3pvdyIsImVtYWlsIjoidGVzdEB0ZXN0LnBsIiwicGhvbmVOdW1iZXIiOiJjMGFlYTU3MWY3YTE4MzRhYzY1MGNmYWVmZDA1OWU1NDpkYzFkMjhlN2M4OTQ2NDU5MjdhZWQ0ZTA0MjY3Mzk3ZSIsInBob25lTnVtYmVySGFzaCI6ImFiYTM3MDQ0MzBmMjM5MjkzZDI3Njg1MGFhNWRkNjQxOGI1ZTU3MTVmYTQ1OGZhYmU2NDI2YTQzNTU1NDEzNzEiLCJpYXQiOjE3NDEwMzgzODcsImV4cCI6MTc0MTI5NzU4N30.4REykANA7Wck1DCsEW5rpQhOk3igyl9_iq5tkR9Xq-I';

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
      [EDriverCompleteRegistrationFormKeys.CAR_REGISTRATION_NUMBER]:
        this.correctRequestBody[EDriverCompleteRegistrationFormKeys.CAR_REGISTRATION_NUMBER],
      [EDriverCompleteRegistrationFormKeys.CAR_BRAND]:
        this.correctRequestBody[EDriverCompleteRegistrationFormKeys.CAR_BRAND],
      [EDriverCompleteRegistrationFormKeys.CAR_MODEL]:
        this.correctRequestBody[EDriverCompleteRegistrationFormKeys.CAR_MODEL],
    };

    await this.changeInputsValues(wrongFormatErrorMessages);

    await this.selectReactSelectOption(
      this.correctRequestBody[EDriverCompleteRegistrationFormKeys.CAR_COLOR],
    );
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
      [EDriverCompleteRegistrationFormKeys.CAR_REGISTRATION_NUMBER]:
        'Enter the car registration number',
      [EDriverCompleteRegistrationFormKeys.CAR_BRAND]: 'Enter the car brand',
      [EDriverCompleteRegistrationFormKeys.CAR_MODEL]: 'Enter the car model',
      [EDriverCompleteRegistrationFormKeys.CAR_COLOR]: 'Select the car color',
    };

    const inputKeys = Object.keys(inputPlaceholders);

    for (const inputKey of inputKeys) {
      if (inputKey === EDriverCompleteRegistrationFormKeys.CAR_COLOR) {
        return await this.checkReactSelectPlaceholder(inputPlaceholders[inputKey]);
      }

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
        [key]:
          key === EDriverCompleteRegistrationFormKeys.FILE
            ? 'Adding face recognition is required'
            : 'This field is required',
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
      [EDriverCompleteRegistrationFormKeys.CAR_REGISTRATION_NUMBER]:
        'This field requires at least 4 characters',
      [EDriverCompleteRegistrationFormKeys.CAR_BRAND]: 'This field requires at least 2 characters',
      [EDriverCompleteRegistrationFormKeys.CAR_MODEL]: 'This field requires at least 2 characters',
    };

    await this.checkErrorsMessages(invalidFormatErrorMessages);
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

  async assertRemainingCarRegistrationNumberInputErrors() {
    const inputErrors = [
      {
        value: 'test!',
        errorMessage: 'The car registration number can contain only uppercase letters and digits',
      },
      {
        value: 'test1',
        errorMessage: 'The car registration number can contain only uppercase letters and digits',
      },
    ];

    await this.checkInputErrors(
      EDriverCompleteRegistrationFormKeys.CAR_REGISTRATION_NUMBER,
      inputErrors,
    );
  }

  async assertRemainingCarBrandErrors() {
    const inputErrors = [
      {
        value: 't',
        errorMessage: 'This field requires at least 2 characters',
      },
      {
        value: 'test!',
        errorMessage: 'This field accepts only letters',
      },
    ];

    await this.checkInputErrors(EDriverCompleteRegistrationFormKeys.CAR_BRAND, inputErrors);
  }

  async assertRemainingCarModelErrors() {
    const inputErrors = [
      {
        value: 't',
        errorMessage: 'This field requires at least 2 characters',
      },
      {
        value: 'test!',
        errorMessage: 'This field accepts only letters and numbers',
      },
    ];

    await this.checkInputErrors(EDriverCompleteRegistrationFormKeys.CAR_MODEL, inputErrors);
  }

  async assertInputErrorsAreNotVisible() {
    await this.assertFormErrorsAreNotVisible([
      EDriverCompleteRegistrationFormKeys.PASSWORD,
      EDriverCompleteRegistrationFormKeys.REPEAT_PASSWORD,
      EDriverCompleteRegistrationFormKeys.CAR_REGISTRATION_NUMBER,
    ]);
  }

  async clickFormSubmitButton() {
    await this.clickButton(this.submitButtonTestId);
  }

  async openAddFacialRecognitionModal() {
    await this.clickButton(OPEN_ADD_FACIAL_RECOGNITION_MODAL_BUTTON);
  }
}
