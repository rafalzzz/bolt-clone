import { test } from '@playwright/test';

import { ClientPage } from '@/page-models/authentication/client-page';
import { DriverPage } from '@/page-models/authentication/driver-page';
import { LandingPage } from '@/page-models/landing-page';
import { Navbar } from '@/page-models/navbar';

import { DRIVER_PAGE_DESCRIPTION, DRIVER_PAGE_FORM } from '@/test-ids/driver-page';
import { ABOUT_BUTTON, CONTACT_BUTTON, LANGUAGE_BUTTON, REGISTER_BUTTON } from '@/test-ids/navbar';

import { ETheme } from '@/enums/theme';

let landingPage: LandingPage;
let navbar: Navbar;

test.beforeEach('Visit app', async ({ page }) => {
  navbar = new Navbar(page);
  landingPage = new LandingPage(page);

  await landingPage.visit();
});

test('Should change language', async () => {
  await navbar.assertHeaderButtons({
    [ABOUT_BUTTON]: 'About',
    [CONTACT_BUTTON]: 'Contact',
    [LANGUAGE_BUTTON]: 'EN',
    [REGISTER_BUTTON]: 'Register',
  });

  await navbar.changeLanguage('PL');

  await navbar.assertHeaderButtons({
    [ABOUT_BUTTON]: 'O Nas',
    [CONTACT_BUTTON]: 'Kontakt',
    [LANGUAGE_BUTTON]: 'PL',
    [REGISTER_BUTTON]: 'Zarejestruj się',
  });
});

test('Should change theme', async () => {
  await navbar.assertNavbarBackgroundColor(ETheme.LIGHT);
  await navbar.toggleTheme(ETheme.DARK);
  await navbar.assertNavbarBackgroundColor(ETheme.DARK);
});

test('Should verify sign up redirect', async ({ page }) => {
  const driverAuth = new DriverPage(page);
  const clientAuth = new ClientPage(page);

  const driverPageElements = [DRIVER_PAGE_DESCRIPTION, DRIVER_PAGE_FORM];

  await navbar.clickSignButton('Become a driver');
  await driverAuth.assertUrl();
  await driverAuth.assertAuthPageVisible(driverPageElements);

  await navbar.clickSignButton('Become a client');
  await clientAuth.assertUrl();
});
