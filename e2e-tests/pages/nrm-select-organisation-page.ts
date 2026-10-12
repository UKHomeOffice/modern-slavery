import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { ConstantsLib } from '../utility-helper/constants-lib';
import { BasePage } from './base-page';

export class NrmSelectOrganisationPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    return "What organisation do you work for? – Report modern slavery";
  }

  async completeOrganisation(organisation: string, checkError: string): Promise<void> {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    if (checkError === ConstantsLib.YES) {
      await this.clickContinueButton();
      await expect(this.page.getByText('You must select the organisation')).toBeVisible();
    }
    const field = this.page.locator('#user-organisation');
    await field.fill(organisation);
    await field.press('Tab');
    await this.clickContinueButton();
  }
}
