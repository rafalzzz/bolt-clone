import { test } from '@playwright/test';

import { DriverCompleteRegistrationPage } from '@/page-models/authentication/driver-complete-registration-page';

import { EMockedResponseType } from '@/enums/mocked-response-type';

test.describe(
  'DriverCompleteRegistrationPage tests',
  { tag: ['@driverCompleteRegistrationPage', '@critical'] },
  () => {
    test.describe('JWT token error tests', async () => {
      let driverCompleteRegistrationPage: DriverCompleteRegistrationPage;

      test.beforeEach('Create new driverCompleteRegistrationPage instance', async ({ page }) => {
        driverCompleteRegistrationPage = new DriverCompleteRegistrationPage(page);
      });

      test('Should display JWT token unknown error message', async () => {
        await driverCompleteRegistrationPage.visitPageWithWrongToken();
        await driverCompleteRegistrationPage.assertUknownJwtTokenErrorMessage();
      });

      test('Should display invalid JWT token error message', async () => {
        await driverCompleteRegistrationPage.visitPageWithInvalidToken();
        await driverCompleteRegistrationPage.assertInvalidJwtTokenErrorMessage();
      });

      test('Should display an expired JWT token error message', async () => {
        await driverCompleteRegistrationPage.visitPageWithExpiredToken();
        await driverCompleteRegistrationPage.asserteExpiredJwtTokenErrorMessage();
      });
    });

    test.describe('Form', async () => {
      let driverCompleteRegistrationPage: DriverCompleteRegistrationPage;

      test.beforeEach('Visit driver registration page', async ({ page }) => {
        driverCompleteRegistrationPage = new DriverCompleteRegistrationPage(page);

        await driverCompleteRegistrationPage.visitPageWithValidToken();
      });

      test('Check the general initial UI of the register as driver form', async () => {
        await driverCompleteRegistrationPage.assertPageLayoutVisible();
        await driverCompleteRegistrationPage.assertInputPlaceholders();

        await driverCompleteRegistrationPage.assertFormErrorsAreNotVisible(
          driverCompleteRegistrationPage.inputKeys,
        );

        await driverCompleteRegistrationPage.assertButtonIsEnabled(
          driverCompleteRegistrationPage.submitButtonTestId,
        );
      });

      test('Check input errors', async () => {
        await driverCompleteRegistrationPage.clickFormSubmitButton();
        await driverCompleteRegistrationPage.assertRequiredFieldsErrorMessages();
        await driverCompleteRegistrationPage.assertRemainingFirstNameInputErrors();
        await driverCompleteRegistrationPage.assertRemainingLastNameInputErrors();
        await driverCompleteRegistrationPage.assertRemainingPasswordInputErrors();
      });

      test('Check if errors are visible when form is filled correctly', async () => {
        await driverCompleteRegistrationPage.fillInputsWithValidValues();
        await driverCompleteRegistrationPage.assertInputErrorsAreNotVisible();
      });

      test('Should register driver successfully', async () => {
        await driverCompleteRegistrationPage.mockServerAction(EMockedResponseType.SUCCESS);
        await driverCompleteRegistrationPage.fillInputsWithValidValues();
        await driverCompleteRegistrationPage.clickFormSubmitButton();
        await driverCompleteRegistrationPage.assertRegistrationSuccessMessage();
      });
    });
  },
);
