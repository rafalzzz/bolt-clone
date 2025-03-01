import type { Page } from '@playwright/test';

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
      'eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5wbCIsInBob25lTnVtYmVyIjoiOTk5OTk5OTk5IiwiY2l0eSI6IndhcnNhdyIsImlhdCI6MTczOTM3OTEyN30.0BA5WnhIDjeo-4pq1t6qdx0VhmznaFRaQnuQgS5ivVI';

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
  async assertRegistrationSuccessMessage() {
    await this.checkToastMessage(
      DRIVER_EGISTRATION_COMPLETE_SUCCESS_MESSAGE,
      'You have been registered! You can start using our application.',
    );
  }

  // Change form elements methods
  async fillInputsWithInvalidValues() {
    const wrongFormatErrorMessages: TTestObject = {
      [EDriverCompleteRegistrationFormKeys.FIRST_NAME]: 'T',
      [EDriverCompleteRegistrationFormKeys.LAST_NAME]: 'T',
      [EDriverCompleteRegistrationFormKeys.PASSWORD]: 'Test1!',
      [EDriverCompleteRegistrationFormKeys.REPEAT_PASSWORD]: 'tst',
      [EDriverCompleteRegistrationFormKeys.CAR_REGISTRATION_NUMBER]: 'tst',
    };

    await this.changeInputsValues(wrongFormatErrorMessages);
  }

  async fillInputsWithValidValues() {
    const wrongFormatErrorMessages: TTestObject = {
      [EDriverCompleteRegistrationFormKeys.FIRST_NAME]: 'Test',
      [EDriverCompleteRegistrationFormKeys.LAST_NAME]: 'Test',
      [EDriverCompleteRegistrationFormKeys.PASSWORD]: 'TestTest1!',
      [EDriverCompleteRegistrationFormKeys.REPEAT_PASSWORD]: 'TestTest1!',
      [EDriverCompleteRegistrationFormKeys.CAR_REGISTRATION_NUMBER]: 'TEST1',
    };

    await this.changeInputsValues(wrongFormatErrorMessages);
  }

  private async changePasswordInputValue(value: string) {
    await this.changeSingleInputValue(EDriverCompleteRegistrationFormKeys.PASSWORD, value);
  }

  // Form methods
  async assertInputPlaceholders() {
    const inputPlaceholders: TTestObject = {
      [EDriverCompleteRegistrationFormKeys.PASSWORD]: 'Password',
      [EDriverCompleteRegistrationFormKeys.REPEAT_PASSWORD]: 'Repeat password',
      [EDriverCompleteRegistrationFormKeys.CAR_REGISTRATION_NUMBER]:
        'Enter the car registration number',
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
    const requiredFieldErrorMessages: TTestObject = {
      [EDriverCompleteRegistrationFormKeys.FIRST_NAME]: 'First name is required',
      [EDriverCompleteRegistrationFormKeys.LAST_NAME]: 'Last name is required',
      [EDriverCompleteRegistrationFormKeys.PASSWORD]: 'Password is required',
      [EDriverCompleteRegistrationFormKeys.REPEAT_PASSWORD]: 'Repeat password is required',
      [EDriverCompleteRegistrationFormKeys.CAR_REGISTRATION_NUMBER]:
        'Providing the car registration number is required',
      [EDriverCompleteRegistrationFormKeys.FILE]: 'Adding face recognition is required',
    };

    await this.checkErrorsMessages(requiredFieldErrorMessages);
  }

  async assertInvalidFormatErrorMessages() {
    const invalidFormatErrorMessages: TTestObject = {
      [EDriverCompleteRegistrationFormKeys.FIRST_NAME]:
        'First name must contain at least 2 characters',
      [EDriverCompleteRegistrationFormKeys.LAST_NAME]:
        'Last name must contain at least 2 characters',
      [EDriverCompleteRegistrationFormKeys.PASSWORD]: 'Password must contain at least 8 characters',
      [EDriverCompleteRegistrationFormKeys.REPEAT_PASSWORD]: 'The entered passwords do not match',
      [EDriverCompleteRegistrationFormKeys.CAR_REGISTRATION_NUMBER]:
        'The car registration number must contain at least 4 characters',
    };

    await this.checkErrorsMessages(invalidFormatErrorMessages);
  }

  private async assertPasswordInputError(errorMessage: string) {
    await this.checkErrorsMessages({
      [EDriverCompleteRegistrationFormKeys.PASSWORD]: errorMessage,
    });
  }

  async assertRemainingPasswordInputErrors() {
    const inputErrors = [
      { value: 'testtest1', errorMessage: 'Password must contain at least one uppercase letter' },
      { value: 'TESTTEST1', errorMessage: 'Password must contain at least one lowercase letter' },
      { value: 'TestTest', errorMessage: 'Password must contain at least one digit' },
      { value: 'TestTest1', errorMessage: 'Password must contain at least one special character' },
    ];

    for (const inputError of inputErrors) {
      const { value, errorMessage } = inputError;

      await this.changePasswordInputValue(value);
      await this.assertPasswordInputError(errorMessage);
    }
  }

  async assertRemainingFirstNameInputError() {
    await this.changeSingleInputValue(EDriverCompleteRegistrationFormKeys.FIRST_NAME, 'test1');

    await this.checkErrorsMessages({
      [EDriverCompleteRegistrationFormKeys.FIRST_NAME]: 'First name can contain only letters',
    });
  }

  async assertRemainingLastNameInputError() {
    await this.changeSingleInputValue(EDriverCompleteRegistrationFormKeys.LAST_NAME, 'test1');

    await this.checkErrorsMessages({
      [EDriverCompleteRegistrationFormKeys.LAST_NAME]: 'Last name can contain only letters',
    });
  }

  async assertRemainingVehicleRegistrationNumberInputError() {
    await this.changeSingleInputValue(
      EDriverCompleteRegistrationFormKeys.CAR_REGISTRATION_NUMBER,
      'test!',
    );

    await this.checkErrorsMessages({
      [EDriverCompleteRegistrationFormKeys.CAR_REGISTRATION_NUMBER]:
        'The car registration number can contain only uppercase letters and digits',
    });
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
