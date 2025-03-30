import { test } from '@playwright/test';

import { baseURL } from '@/config/playwright.config';

import { DriverLoginPage } from '@/page-models/authentication/driver-login-page';

import { ELanguage } from '@/enums/language';
import { EMockedResponseType } from '@/enums/mocked-response-type';

test.describe('DriverLoginPage tests', { tag: ['@driverLoginPage', '@critical'] }, () => {
  let driverLoginPage: DriverLoginPage;

  test.beforeEach('Visit driver registration page', async ({ page }) => {
    driverLoginPage = new DriverLoginPage(page);

    await driverLoginPage.visit();
  });

  test.afterEach(async ({ context }) => {
    await context.clearCookies();
  });

  test('Check the general initial UI of the login as driver form', async () => {
    await driverLoginPage.assertPageLayoutVisible();
    await driverLoginPage.assertInputPlaceholders();

    await driverLoginPage.assertFormErrorsAreNotVisible(driverLoginPage.inputKeys);

    await driverLoginPage.assertButtonIsEnabled(driverLoginPage.submitButtonTestId);
  });

  test('Check input errors', async () => {
    await driverLoginPage.clickFormSubmitButton();
    await driverLoginPage.assertRequiredFieldsErrorMessages();
    await driverLoginPage.assertEmailInputErrors();
    await driverLoginPage.assertPasswordInputErrors();
  });

  test('Check if errors are not visible when form is filled correctly', async () => {
    await driverLoginPage.clickFormSubmitButton();
    await driverLoginPage.fillInputsWithValidValues();
    await driverLoginPage.assertInputErrorsAreNotVisible();
  });

  test('Should display an error message when an error occurs during driver login', async () => {
    await driverLoginPage.mockServerActionResponse(EMockedResponseType.ERROR);
    await driverLoginPage.fillInputsWithValidValues();
    await driverLoginPage.clickFormSubmitButton();
    await driverLoginPage.assertErrorToastMessage();
  });

  test('Should redirect user to add-car page when login successfully', async () => {
    const addCarUrl = `${baseURL}/${ELanguage.EN}/driver/auth/add-car`;

    await driverLoginPage.mockServerActionResponse(EMockedResponseType.SUCCESS);
    await driverLoginPage.fillInputsWithValidValues();
    await driverLoginPage.clickFormSubmitButton();
    await driverLoginPage.assertAddCarPageVisible();
    await driverLoginPage.assertUrlCorrectness(addCarUrl);
  });
});
