import { type Locator, expect, type Page } from '@playwright/test';

type TMockResponseParams<Options> = {
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
    await this.page.waitForURL(this.url);
    const currentURL = this.page.url();

    if (currentURL !== this.url) {
      throw new Error(`Expected URL to be "${this.url}", but got "${currentURL}"`);
    }
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
  }: TMockResponseParams<T>) {
    await this.page.route(endpoint, async (route, request) => {
      if (request.method() === method) {
        await route.fulfill(options);
      } else {
        await route.continue();
      }
    });
  }

  async getRequestPromise(endpoint: string) {
    return this.page.waitForRequest(endpoint);
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
