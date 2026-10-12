import type { Page } from '@playwright/test';
import { ConstantsLib } from '../utility-helper/constants-lib';
import { BasePage } from './base-page';

export class NrmWhatAreYourContactDetailsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    return "What are your contact details? – Report modern slavery";
  }

  async completeReporterContactDetails(): Promise<void> {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.page.locator('#fr-details-first-name').fill(ConstantsLib.CONTACT_DETAILS_TEXT);
    await this.page.locator('#fr-details-last-name').fill(ConstantsLib.CONTACT_DETAILS_TEXT);
    await this.page.locator('#fr-details-role').fill(ConstantsLib.CONTACT_DETAILS_TEXT);
    await this.page.locator('#fr-details-phone').fill(ConstantsLib.CONTACT_DETAILS_PHONE);
    await this.clickContinueButton();
  }
}
