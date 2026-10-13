import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { ConstantsLib } from '../utility-helper/constants-lib';
import { BasePage } from './base-page';

export class NrmAddReferencePage extends BasePage {
  private readonly referenceTextbox: Locator;

  constructor(page: Page) {
    super(page);
    this.referenceTextbox = page.locator('#reference');
  }

  async expectedPageTitle(): Promise<string> {
    return "What’s your reference for this report? – Report modern slavery";
  }

  async completeReference(reference: string, checkError: string): Promise<void> {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    if (checkError === ConstantsLib.YES) {
      await this.checkBlankReferenceError();
    }
    await this.enterYourReference(reference);
    await this.clickContinueButton();
  }

  async checkBlankReferenceError(): Promise<void> {
    await this.clickContinueButton();
    await expect(this.page.getByText('You must enter a reference')).toBeVisible();
  }

  async enterYourReference(reference: string): Promise<void> {
    await this.clearAndEnterTextInElement(this.referenceTextbox, reference);
  }
}
