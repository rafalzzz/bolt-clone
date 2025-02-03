import { test } from '@playwright/test';

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
    await driverPage.clickSubmitButton(driverPage.submitButtonTestId);
    await driverPage.assertRequiredFieldsErrorMessages();
  });
});
