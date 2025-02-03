import { Page } from '@playwright/test';

import { BaseForm } from '@/classes/base-form';

import { baseURL } from '@/config/playwright.config';

import {
  DRIVER_PAGE_DESCRIPTION,
  DRIVER_PAGE_FORM,
  DRIVER_PAGE_FORM_SUBMIT_BUTTON,
} from '@/test-ids/driver-page';

import { EDriverRegisterFormKeys } from '@/enums/driver-register-form-keys';
import { ELanguage } from '@/enums/language';

type TInputKey =
  | EDriverRegisterFormKeys.EMAIL
  | EDriverRegisterFormKeys.PHONE_NUMBER
  | EDriverRegisterFormKeys.CITY;

export class DriverPage extends BaseForm {
  readonly pageElementsIds: string[] = [DRIVER_PAGE_DESCRIPTION, DRIVER_PAGE_FORM];
  readonly inputKeys: string[] = Object.values(EDriverRegisterFormKeys);
  readonly submitButtonTestId: string = DRIVER_PAGE_FORM_SUBMIT_BUTTON;

  readonly inputPlaceholders: Record<TInputKey, string> = {
    [EDriverRegisterFormKeys.EMAIL]: 'Enter email address',
    [EDriverRegisterFormKeys.PHONE_NUMBER]: 'Mobile number',
    [EDriverRegisterFormKeys.CITY]: 'City where you will drive',
  };

  readonly requiredFieldErrorMessages: Record<EDriverRegisterFormKeys, string> = {
    [EDriverRegisterFormKeys.EMAIL]: 'Providing the email is required',
    [EDriverRegisterFormKeys.PHONE_NUMBER]: 'Providing the phone number is required',
    [EDriverRegisterFormKeys.CITY]: 'Providing the city is required',
    [EDriverRegisterFormKeys.RULES]: 'You must agree to continue',
  };

  constructor(page: Page, language: ELanguage = ELanguage.EN) {
    super(page, `${baseURL}/${language}/driver`);
  }

  async assertPageLayoutVisible() {
    return this.assertAuthPageVisible(this.pageElementsIds);
  }

  async assertInputPlaceholders() {
    for (const inputKey of this.inputKeys) {
      if (inputKey === EDriverRegisterFormKeys.CITY) {
        return await this.checkReactSelectPlaceholder(
          this.inputPlaceholders[inputKey as TInputKey],
        );
      }

      await this.checkInputPlaceholder(inputKey, this.inputPlaceholders[inputKey as TInputKey]);
    }
  }

  async assertRequiredFieldsErrorMessages() {
    for (const inputKey of this.inputKeys) {
      await this.checkErrorMessage(
        inputKey,
        this.requiredFieldErrorMessages[inputKey as TInputKey],
      );
    }
  }
}
