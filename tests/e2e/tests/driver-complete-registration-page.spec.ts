import { test } from '@playwright/test';

import { DriverCompleteRegistrationPage } from '@/page-models/authentication/driver-complete-registration-page';

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

      test('Should show error about required fields when form inputs are not filled', async () => {
        await driverCompleteRegistrationPage.clickFormSubmitButton();
        await driverCompleteRegistrationPage.assertRequiredFieldsErrorMessages();
      });

      test('Should show errors about wrong input value format', async () => {
        await driverCompleteRegistrationPage.fillInputsWithInvalidValues();
        await driverCompleteRegistrationPage.clickFormSubmitButton();
        await driverCompleteRegistrationPage.assertInvalidFormatErrorMessages();

        await driverCompleteRegistrationPage.assertRemainingPasswordInputErrors();
        await driverCompleteRegistrationPage.assertRemainingVehicleRegistrationNumberInputError();

        await driverCompleteRegistrationPage.fillInputsWithValidValues();
        await driverCompleteRegistrationPage.assertInputErrorsAreNotVisible();
      });
    });

    test.describe('Driver registration with adding facial recognition', async () => {
      test.describe.configure({ mode: 'serial' });

      let driverCompleteRegistrationPage: DriverCompleteRegistrationPage;

      test.beforeEach(async ({ page }) => {
        driverCompleteRegistrationPage = new DriverCompleteRegistrationPage(page);

        await driverCompleteRegistrationPage.visitPageWithValidToken();
      });

      test('Should display an error message about required camera when camera is disabled', async () => {
        await driverCompleteRegistrationPage.mockDisabledUserCamera();
        await driverCompleteRegistrationPage.openAddFacialRecognitionModal();
        await driverCompleteRegistrationPage.assertAddFacialRecognitionButtonIsDisabled();
        await driverCompleteRegistrationPage.assertModalSubmitButtonIsDisabled();
        await driverCompleteRegistrationPage.assertRequiredCameraErrorToastMessage();
      });

      test('Should display an error message about not detected face', async ({ page }) => {
        await driverCompleteRegistrationPage.mockUserCameraWithoutFace();
        await driverCompleteRegistrationPage.openAddFacialRecognitionModal();

        // Necessary to draw marks on detected face
        await page.waitForTimeout(1000);

        await driverCompleteRegistrationPage.clickAddFacialRecognitionButton();
        await driverCompleteRegistrationPage.clickModalSubmitButton();
        await driverCompleteRegistrationPage.assertFaceNotDetectedErrorToastMessage();
      });

      test('Should display an error message about not added photo for facial recognition', async ({
        page,
      }) => {
        await driverCompleteRegistrationPage.mockUserCameraWithFace();
        await driverCompleteRegistrationPage.openAddFacialRecognitionModal();

        // Necessary to draw marks on detected face
        await page.waitForTimeout(1000);

        await driverCompleteRegistrationPage.clickModalSubmitButton();
        await driverCompleteRegistrationPage.assertPhotoNotAddedErrorToastMessage();
      });

      test('Should register driver successfully', async () => {
        await driverCompleteRegistrationPage.mockUserCameraWithFace();
        await driverCompleteRegistrationPage.fillInputsWithValidValues();
        await driverCompleteRegistrationPage.openAddFacialRecognitionModal();
        await driverCompleteRegistrationPage.addFacialRecognition();
        await driverCompleteRegistrationPage.clickFormSubmitButton();
        await driverCompleteRegistrationPage.assertRegistrationSuccessMessage();
      });
    });
  },
);
