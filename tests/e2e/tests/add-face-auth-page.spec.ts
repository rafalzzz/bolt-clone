import { test } from '@playwright/test';

import { AddFaceAuthPage } from '@/page-models/authentication/add-face-auth-page';

test.describe('AddFaceAuthPage tests', { tag: ['@AddFaceAuthPage', '@critical'] }, () => {
  let addFaceAuthPage: AddFaceAuthPage;

  test.describe.configure({ mode: 'serial' });

  test.beforeEach('Visit add car page', async ({ page }) => {
    addFaceAuthPage = new AddFaceAuthPage(page);

    await addFaceAuthPage.visit();
  });

  test('Check the general initial UI of the add car form', async () => {
    await addFaceAuthPage.assertPageLayoutVisible();
    await addFaceAuthPage.assertButtonIsEnabled(addFaceAuthPage.openAddFaceAuthModalButtonTestId);
  });

  test('Check if error is visible when user camera is disabled', async () => {
    await addFaceAuthPage.mockDisabledUserCamera();
    await addFaceAuthPage.openAddFacialRecognitionModal();
    await addFaceAuthPage.assertModalSubmitButtonIsDisabled();
    await addFaceAuthPage.assertRequiredCameraErrorToastMessage();
  });

  test('Check if error is visible when face is not detected', async ({ page }) => {
    await addFaceAuthPage.mockUserCameraWithoutFace();
    await addFaceAuthPage.openAddFacialRecognitionModal();

    // Necessary to draw marks on detected face
    await page.waitForTimeout(1000);

    await addFaceAuthPage.clickAddFaceAuthButton();
    await addFaceAuthPage.assertFaceNotDetectedErrorToastMessage();
  });

  test('Check if error is visible when photo is not added', async ({ page }) => {
    await addFaceAuthPage.mockUserCameraWithFace();
    await addFaceAuthPage.openAddFacialRecognitionModal();

    // Necessary to draw marks on detected face
    await page.waitForTimeout(1000);

    await addFaceAuthPage.clickModalSubmitButton();
    await addFaceAuthPage.assertPhotoNotAddedErrorToastMessage();
  });

  test('Should display an error message when an error occurs during adding face auth', async ({
    page,
  }) => {
    await addFaceAuthPage.mockUserCameraWithFace();
    await addFaceAuthPage.openAddFacialRecognitionModal();

    // Necessary to draw marks on detected face
    await page.waitForTimeout(1000);

    await addFaceAuthPage.clickModalSubmitButton();
    await addFaceAuthPage.assertPhotoNotAddedErrorToastMessage();
  });
});
