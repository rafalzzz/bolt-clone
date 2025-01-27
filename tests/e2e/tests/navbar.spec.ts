import { test } from '@playwright/test';

import { LandingPage } from '@/page-models/landing-page';
import { Navbar } from '@/page-models/navbar';

import { ABOUT_BUTTON, CONTACT_BUTTON, LANGUAGE_BUTTON, REGISTER_BUTTON } from '@/test-ids/navbar';

let landingPage: LandingPage;
let navbar: Navbar;

test.beforeEach('Visit app', async ({ page }) => {
  landingPage = new LandingPage(page);
  navbar = new Navbar(page);

  await landingPage.visit();
});

test('Should change language', async () => {
  await navbar.clickLanguageBtn();
  await navbar.selectLanguage('PL');
  await navbar.assertHeaderButtons({
    [ABOUT_BUTTON]: 'O Nas',
    [CONTACT_BUTTON]: 'Kontakt',
    [LANGUAGE_BUTTON]: 'PL',
    [REGISTER_BUTTON]: 'Zarejestruj się',
  });
});
