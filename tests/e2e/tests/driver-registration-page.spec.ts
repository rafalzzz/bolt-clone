import { test } from '@playwright/test';

import { DriverRegistrationPage } from '@/page-models/authentication/driver-registration-page';

test.describe(
  'DriverRegistrationPage tests',
  { tag: ['@driverRegistrationPage', '@critical'] },
  async () => {
    let driverRegistrationPage: DriverRegistrationPage;

    test.beforeEach('Visit driver registration page', async ({ page }) => {
      driverRegistrationPage = new DriverRegistrationPage(page);

      await driverRegistrationPage.visit();
    });

    test('Check the general initial UI of the register as driver form', async () => {
      await driverRegistrationPage.assertPageLayoutVisible();
      await driverRegistrationPage.assertInputPlaceholders();
      await driverRegistrationPage.assertAllFormErrorsAreNotVisible();
      await driverRegistrationPage.assertButtonIsEnabled(driverRegistrationPage.submitButtonTestId);
    });

    test('Should show error about required fields when form inputs are not filled', async () => {
      await driverRegistrationPage.clickFormSubmitButton();
      await driverRegistrationPage.assertRequiredFieldsErrorMessages();
    });

    test('Should show errors about wrong input value format', async () => {
      await driverRegistrationPage.fillInputsWithInvalidValues();
      await driverRegistrationPage.clickFormSubmitButton();
      await driverRegistrationPage.assertInvalidFormatErrorMessages();
      await driverRegistrationPage.fillInputsWithValidValues();
      await driverRegistrationPage.assertFormInputErrorsAreNotVisible();
    });

    test('Should display an error message when an error occurs while sending an email', async () => {
      await driverRegistrationPage.fillForm();
      await driverRegistrationPage.mockFailureRegistrationResponse();

      const requestPromise = driverRegistrationPage.getRegistrationResponse();

      await driverRegistrationPage.clickFormSubmitButton();
      await driverRegistrationPage.assertAllFormErrorsAreNotVisible();

      await requestPromise;

      await driverRegistrationPage.assertErrorToastMessage();
    });

    test('Should display a success message when the email has been sent.', async () => {
      await driverRegistrationPage.fillForm();
      await driverRegistrationPage.mockSuccessRegistrationResponse();

      const requestPromise = driverRegistrationPage.getRegistrationResponse();

      await driverRegistrationPage.clickFormSubmitButton();
      await driverRegistrationPage.assertAllFormErrorsAreNotVisible();

      await requestPromise;

      await driverRegistrationPage.assertSuccessToastMessage();
    });
  },
);
