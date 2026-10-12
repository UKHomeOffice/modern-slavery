import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { ConstantsLib } from '../utility-helper/constants-lib';
import { BasePage } from './base-page';

export class NrmAddReferencePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    return "What’s your reference for this report? – Report modern slavery";
  }

  async completeReference(reference: string, checkError: string): Promise<void> {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    if (checkError === ConstantsLib.YES) {
      await this.clickContinueButton();
      await expect(this.page.getByText('You must enter a reference')).toBeVisible();
    }
    await this.page.locator('#reference').fill(reference);
    await this.clickContinueButton();
  }
}
