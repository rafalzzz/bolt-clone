import { test } from '@playwright/test';

import { AddFacialRecognitionModal } from '@/page-models/authentication/add-facial-recognition-modal';
import { DriverCompleteRegistrationPage } from '@/page-models/authentication/driver-complete-registration-page';

test.describe(
  'DriverCompleteRegistrationPage JWT token error tests',
  { tag: ['@driverCompleteRegistrationPage', '@critical'] },
  async () => {
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
  },
);

test.describe(
  'DriverCompleteRegistrationPage tests',
  { tag: ['@driverCompleteRegistrationPage', '@critical'] },
  async () => {
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

      await driverCompleteRegistrationPage.assertSubmitButtonEnabled(
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
      await driverCompleteRegistrationPage.assertInputErorrsAreNotVisible();
    });
  },
);

test.describe(
  'DriverCompleteRegistrationPage - Add facial recognition tests',
  { tag: ['@driverCompleteRegistrationPage', '@critical'] },
  async () => {
    let driverCompleteRegistrationPage: DriverCompleteRegistrationPage;
    let addFacialRecognitionModal: AddFacialRecognitionModal;

    test.beforeEach('Visit driver registration page', async ({ page }) => {
      driverCompleteRegistrationPage = new DriverCompleteRegistrationPage(page);
      addFacialRecognitionModal = new AddFacialRecognitionModal(page);

      await driverCompleteRegistrationPage.visitPageWithValidToken();
    });

    test('Should display an error message about not added photo for facial recognition', async () => {
      await driverCompleteRegistrationPage.openAddFacialRecognitionModal();

      await addFacialRecognitionModal.mockUserCamera();
      await addFacialRecognitionModal.assertAddFacialRecognitionModal();
      await addFacialRecognitionModal.clickModalSubmitButton();
      await addFacialRecognitionModal.assertErrorToastMessage();
    });
  },
);
