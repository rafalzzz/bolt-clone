import { test, expect } from '@playwright/test';

import { DriverPage } from '@/page-models/authentication/driver-page';

test.describe('DriverPage tests', { tag: ['@driverPage', '@critical'] }, async () => {
  let driverPage: DriverPage;

  test.beforeEach('Visit driver page', async ({ page }) => {
    driverPage = new DriverPage(page);

    await driverPage.visit();
  });

  test('Check the general initial UI of the register as driver form', async () => {
    await driverPage.assertPageLayoutVisible();
    await driverPage.assertInputPlaceholders();
    await driverPage.assertFormErrorsAreNotVisible(driverPage.inputKeys);
    await driverPage.assertSubmitButtonEnabled(driverPage.submitButtonTestId);
  });

  test('Should show error about required fields when form inputs are not filled', async () => {
    await driverPage.clickFormSubmitButton();
    await driverPage.assertRequiredFieldsErrorMessages();
  });

  test('Should show errors about wrong input value format', async () => {
    await driverPage.fillInputsWithInvalidValues();
    await driverPage.clickFormSubmitButton();
    await driverPage.assertInvalidFormatErrorMessages();
    await driverPage.fillInputsWithValidValues();
    await driverPage.assertErrorsAreNotVisible();
  });

  test('Should display an error message when an error occurs while sending an email', async () => {
    await driverPage.fillForm();
    await driverPage.mockFailureRegistrationResponse();

    const requestPromise = driverPage.getRegistrationResponse();

    await driverPage.clickFormSubmitButton();
    await driverPage.assertErrorsAreNotVisible();

    await requestPromise;

    await driverPage.assertErrorToastMessage();
  });

  test('Should display a success message when the email has been sent.', async () => {
    await driverPage.fillForm();
    await driverPage.mockSuccessRegistrationResponse();

    const requestPromise = driverPage.getRegistrationResponse();

    await driverPage.clickFormSubmitButton();
    await driverPage.assertErrorsAreNotVisible();

    await requestPromise;

    await driverPage.assertSuccessToastMessage();
  });
});
