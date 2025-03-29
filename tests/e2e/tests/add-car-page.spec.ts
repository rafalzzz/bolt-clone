import { test } from '@playwright/test';

import { baseURL } from '@/config/playwright.config';

import { AddCarPage } from '@/page-models/authentication/add-car-page';

import { ELanguage } from '@/enums/language';
import { EMockedResponseType } from '@/enums/mocked-response-type';

test.describe('AddCarPage tests', { tag: ['@AddCarPage', '@critical'] }, () => {
  let addCarPage: AddCarPage;

  test.beforeEach('Visit add car page', async ({ page }) => {
    addCarPage = new AddCarPage(page);

    await addCarPage.mockServerActionBeforeVisit();
  });

  test('Check the general initial UI of the add car form', async () => {
    await addCarPage.assertPageLayoutVisible();
    await addCarPage.assertInputPlaceholders();
    await addCarPage.assertFormErrorsAreNotVisible(addCarPage.inputKeys);
    await addCarPage.assertButtonIsEnabled(addCarPage.submitButtonTestId);
  });

  test('Check input errors', async () => {
    await addCarPage.clickFormSubmitButton();
    await addCarPage.assertRequiredFieldsErrorMessages();
    await addCarPage.assertCarRegistrationNumberInputErrors();
    await addCarPage.assertCarBrandErrors();
    await addCarPage.assertCarModelErrors();
  });

  test('Check if errors are not visible when form is filled correctly', async () => {
    await addCarPage.clickFormSubmitButton();
    await addCarPage.fillForm();
    await addCarPage.assertInputErrorsAreNotVisible();
  });

  test('Should display an error message when an error occurs during adding car', async () => {
    await addCarPage.mockServerActionResponse(EMockedResponseType.ERROR);
    await addCarPage.fillForm();
    await addCarPage.clickFormSubmitButton();
    await addCarPage.assertErrorToastMessage();
  });

  test('Should redirect user to add-face-auth page when login successfully', async () => {
    const addCarUrl = `${baseURL}/${ELanguage.EN}/driver/auth/add-face-auth`;

    await addCarPage.fillForm();
    await addCarPage.clickFormSubmitButton();
    await addCarPage.assertAddFaceAuthPageVisible();
    await addCarPage.assertUrlCorrectness(addCarUrl);
  });
});
