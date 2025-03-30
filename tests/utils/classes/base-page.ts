import { type Locator, expect, type Page } from '@playwright/test';

import { MOCK_ACTION_COOKIE } from '@/consts/cookies';

import { EMockedResponseType } from '@/enums/mocked-response-type';

type TMockResponseArgs<Options> = {
  endpoint: string;
  method: string;
  options: Options;
};

export class BasePage {
  readonly page: Page;
  readonly url: string;

  constructor(page: Page, url?: string) {
    this.page = page;
    this.url = url;
  }

  async visit(additionalParams = '') {
    await this.page.goto(this.url + additionalParams);
  }

  async assertUrl(): Promise<void> {
    await this.waitForUrl(this.url);
    const currentURL = this.page.url();

    if (currentURL !== this.url) {
      throw new Error(`Expected URL to be "${this.url}", but got "${currentURL}"`);
    }
  }

  async waitForUrl(url: string) {
    await this.page.waitForURL(url);
  }

  getElementByTestId(testId: string, text?: string) {
    return this.page.getByTestId(testId).filter({ hasText: text });
  }

  async checkElementText(element: Locator, text: string) {
    await expect(element).toHaveText(text);
  }

  async assertPageElementsVisibility(pageElementsIds: string[]) {
    for (const testId of pageElementsIds) {
      await expect(this.getElementByTestId(testId)).toBeVisible();
    }
  }

  async assertElementsText(elements: Record<string, string>) {
    for (const [testId, text] of Object.entries(elements)) {
      const button = this.getElementByTestId(testId);

      await expect(button).toBeVisible();
      await this.checkElementText(button, text);
    }
  }

  async mockRequestResponse<T extends Record<string, unknown>>({
    endpoint,
    method,
    options,
  }: TMockResponseArgs<T>) {
    await this.page.route(endpoint, async (route, request) => {
      if (request.method() === method) {
        await route.fulfill(options);
      } else {
        await route.continue();
      }
    });
  }

  async addServerActionCookie(value: EMockedResponseType) {
    await this.page.context().addCookies([
      {
        name: MOCK_ACTION_COOKIE,
        value,
        domain: 'localhost',
        path: '/',
        httpOnly: false,
        secure: false,
      },
    ]);
  }

  async clearMockCookie() {
    await this.page.context().clearCookies();
  }

  async getRequestPromise(endpoint: string) {
    return this.page.waitForRequest(endpoint);
  }

  assertRequestBody(
    expectedRequestBody: Record<string, unknown>,
    requestBody: Record<string, unknown>,
  ) {
    expect(requestBody).toEqual(expectedRequestBody);
  }

  async waitForElementWithTestId(testId: string) {
    return this.page.locator(`data-testid=${testId}`).first();
  }

  async checkElementTextContent(element: Locator, exptectedText: string) {
    await expect(element).toHaveText(exptectedText);
  }

  async clickButton(testId: string, text?: string) {
    await this.getElementByTestId(testId, text).click();
  }

  async assertButtonIsEnabled(testId: string) {
    const button = this.getElementByTestId(testId);

    return await button.isEnabled();
  }

  async assertButtonIsDisabled(testId: string) {
    const button = this.getElementByTestId(testId);

    return await button.isDisabled();
  }

  async checkToastMessage(toastTestId: string, text: string) {
    const errorMessage = await this.waitForElementWithTestId(toastTestId);
    await this.checkElementTextContent(errorMessage, text);
  }
}
