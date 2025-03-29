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

    test('Check the general initial UI of the registration as driver form', async () => {
      await driverRegistrationPage.assertPageLayoutVisible();
      await driverRegistrationPage.assertInputPlaceholders();
      await driverRegistrationPage.assertAllFormErrorsAreNotVisible();
      await driverRegistrationPage.assertButtonIsEnabled(driverRegistrationPage.submitButtonTestId);
    });

    test('Check input errors', async () => {
      await driverRegistrationPage.clickFormSubmitButton();
      await driverRegistrationPage.assertRequiredFieldsErrorMessages();
      await driverRegistrationPage.assertEmailInputErrors();
      await driverRegistrationPage.assertPhoneNumberInputErrors();
    });

    test('Check if errors are not visible when form is filled correctly', async () => {
      await driverRegistrationPage.clickFormSubmitButton();
      await driverRegistrationPage.fillForm();
      await driverRegistrationPage.assertFormInputErrorsAreNotVisible();
    });

    test('Should display an error message when an error occurs while sending an email', async () => {
      await driverRegistrationPage.mockFailureRegistrationResponse();
      await driverRegistrationPage.fillForm();
      await driverRegistrationPage.waitForRegistrationRequest();
      await driverRegistrationPage.assertErrorToastMessage();
    });

    test('Should display a success message when the email has been sent', async () => {
      await driverRegistrationPage.mockSuccessRegistrationResponse();
      await driverRegistrationPage.fillForm();

      const request = await driverRegistrationPage.waitForRegistrationRequest();
      const requestBody = JSON.parse(request.postData() || '{}');

      await driverRegistrationPage.assertSuccessToastMessage();
      driverRegistrationPage.assertRequestBodyCorrectness(requestBody);
    });
  },
);
