import type { Page } from '@playwright/test';

import { BaseForm } from '@/classes/base-form';

import { baseURL } from '@/config/playwright.config';

import {
  ADD_CAR_PAGE_DESCRIPTION,
  ADD_CAR_PAGE_FORM,
  ADD_CAR_FAILURE_MESSAGE,
  ADD_CAR_PAGE_FORM_SUBMIT_BUTTON,
  ADD_CAR_SUCCESS_MESSAGE,
} from '@/test-ids/add-car-page';
import {
  ADD_FACE_AUTH_DESCRIPTION,
  ENABLE_FACE_AUTH_MODAL_BUTTON,
} from '@/test-ids/add-face-auth-page';

import { EAddCarFormKeys } from '@/enums/add-car-form-keys';
import { ELanguage } from '@/enums/language';

import { TTestObject } from '@/types/test-object';

export class AddCarPage extends BaseForm {
  readonly inputKeys: string[] = Object.values(EAddCarFormKeys);
  readonly submitButtonTestId: string = ADD_CAR_PAGE_FORM_SUBMIT_BUTTON;

  constructor(page: Page, language: ELanguage = ELanguage.EN) {
    super(page, `${baseURL}/${language}/driver/auth/add-car`);
  }

  // Check general layout methods
  async assertPageLayoutVisible() {
    const pageElementIds: string[] = [ADD_CAR_PAGE_DESCRIPTION, ADD_CAR_PAGE_FORM];

    return this.assertPageElementsVisibility(pageElementIds);
  }

  async assertErrorToastMessage() {
    await this.checkToastMessage(ADD_CAR_FAILURE_MESSAGE, 'Unknown error');
  }

  async assertSuccessToastMessage() {
    await this.checkToastMessage(ADD_CAR_SUCCESS_MESSAGE, 'The car has been added successfully');
  }

  // Change form elements methods
  async fillInputsWithValidValues() {
    const inputValues: TTestObject = {
      [EAddCarFormKeys.CAR_REGISTRATION_NUMBER]: 'TEST1',
      [EAddCarFormKeys.CAR_BRAND]: 'Test',
      [EAddCarFormKeys.CAR_MODEL]: 'Test',
    };

    await this.changeInputsValues(inputValues);
  }

  async fillForm() {
    await this.fillInputsWithValidValues();
    await this.selectReactSelectOption(EAddCarFormKeys.CAR_COLOR, 'black');
  }

  // Form methods
  async assertInputPlaceholders() {
    const inputPlaceholders: TTestObject = {
      [EAddCarFormKeys.CAR_REGISTRATION_NUMBER]: 'Enter the car registration number',
      [EAddCarFormKeys.CAR_BRAND]: 'Enter the car brand',
      [EAddCarFormKeys.CAR_MODEL]: 'Enter the car model',
      [EAddCarFormKeys.CAR_COLOR]: 'Select the car color',
    };

    const inputKeys = Object.keys(inputPlaceholders);

    for (const inputKey of inputKeys) {
      if (inputKey === EAddCarFormKeys.CAR_COLOR) {
        return await this.checkReactSelectPlaceholder(
          EAddCarFormKeys.CAR_COLOR,
          inputPlaceholders[inputKey],
        );
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
        [key]: 'This field is required',
      }),
      {},
    );

    await this.checkErrorsMessages(requiredFieldErrorMessages);
  }

  async assertCarRegistrationNumberInputErrors() {
    const inputErrors = [
      {
        value: 'TST',
        errorMessage: 'This field requires at least 4 characters',
      },
      {
        value: 'test!',
        errorMessage: 'The car registration number can contain only uppercase letters and digits',
      },
      {
        value: 'test1',
        errorMessage: 'The car registration number can contain only uppercase letters and digits',
      },
      {
        value: 'TEST!',
        errorMessage: 'The car registration number can contain only uppercase letters and digits',
      },
      {
        value: '123!',
        errorMessage: 'The car registration number can contain only uppercase letters and digits',
      },
    ];

    await this.checkInputErrors(EAddCarFormKeys.CAR_REGISTRATION_NUMBER, inputErrors);
  }

  async assertCarBrandErrors() {
    const inputErrors = [
      {
        value: 't',
        errorMessage: 'This field requires at least 2 characters',
      },
      {
        value: 'test!',
        errorMessage: 'This field accepts only letters',
      },
      {
        value: 'test1',
        errorMessage: 'This field accepts only letters',
      },
    ];

    await this.checkInputErrors(EAddCarFormKeys.CAR_BRAND, inputErrors);
  }

  async assertCarModelErrors() {
    const inputErrors = [
      {
        value: 't',
        errorMessage: 'This field requires at least 2 characters',
      },
      {
        value: 'test!',
        errorMessage: 'This field accepts only letters and digits',
      },
      {
        value: 'TEST!',
        errorMessage: 'This field accepts only letters and digits',
      },
      {
        value: '123!',
        errorMessage: 'This field accepts only letters and digits',
      },
    ];

    await this.checkInputErrors(EAddCarFormKeys.CAR_MODEL, inputErrors);
  }

  async assertInputErrorsAreNotVisible() {
    await this.assertFormErrorsAreNotVisible(this.inputKeys);
  }

  async clickFormSubmitButton() {
    await this.clickButton(this.submitButtonTestId);
  }

  async assertAddFaceAuthPageVisible() {
    const pageElementIds: string[] = [ADD_FACE_AUTH_DESCRIPTION, ENABLE_FACE_AUTH_MODAL_BUTTON];

    return this.assertPageElementsVisibility(pageElementIds);
  }
}
