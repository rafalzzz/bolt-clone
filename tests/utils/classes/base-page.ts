import { ElementHandle, type Locator, expect, type Page } from '@playwright/test';

type TMockResponseParams<Options> = {
  endpoint: string;
  options: Options;
};

export class BasePage {
  readonly page: Page;
  readonly url: string;

  constructor(page: Page, url: string) {
    this.page = page;
    this.url = url;
  }

  async visit(additionalParams: string | undefined = '') {
    await this.page.goto(this.url + additionalParams);
  }

  async assertUrl(): Promise<void> {
    await this.page.waitForURL(this.url);
    const currentURL = this.page.url();

    if (currentURL !== this.url) {
      throw new Error(`Expected URL to be "${this.url}", but got "${currentURL}"`);
    }
  }

  getElementByTestId(testId: string) {
    return this.page.getByTestId(testId);
  }

  private getElementByText(text: string) {
    return this.page.locator(`text="${text}"`);
  }

  async isErrorVisible(errorText: string) {
    const errorMessage = this.getElementByText(errorText);

    const isVisible = await errorMessage.isVisible();

    expect(isVisible).toBeTruthy();
  }

  async assertPageElementsVisibility(pageElementsIds: string[]) {
    for (const testId of pageElementsIds) {
      await expect(this.getElementByTestId(testId)).toBeVisible();
    }

    return this;
  }

  async checkElementText(element: Locator, text: string) {
    await expect(element).toHaveText(text);
  }

  async mockRequestResponse<T extends Record<string, unknown>>({
    endpoint,
    options,
  }: TMockResponseParams<T>) {
    await this.page.route(endpoint, (route) => route.fulfill(options));
  }

  async getRequestPromise(endpoint: string) {
    return this.page.waitForRequest(endpoint);
  }

  async waitForElementWithTestId(testId: string) {
    return await this.page.waitForSelector(`data-testid=${testId}`);
  }

  async checkElementTextContent(
    element: ElementHandle<SVGElement | HTMLElement>,
    exptectedText: string,
  ) {
    const text = await element.textContent();
    expect(text).toBe(exptectedText);
  }

  async clickButton(testId: string) {
    await this.getElementByTestId(testId).click();
  }

  async assertButtonIsEnabled(testId: string) {
    const button = this.getElementByTestId(testId);

    return await button.isEnabled();
  }

  async assertButtonIsDisabled(testId: string) {
    const button = this.getElementByTestId(testId);

    return await button.isDisabled();
  }
}
