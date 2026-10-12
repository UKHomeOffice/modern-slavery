import type { Page } from '@playwright/test';
import { ConstantsLib } from '../utility-helper/constants-lib';
import { BasePage } from './base-page';

export class NrmHowCanTheSupportProviderContactThePotentialVictimPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    return "How can the support provider contact the potential victim? – Report modern slavery";
  }

  async completeSupportProviderContactDetails(): Promise<void> {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.page.getByRole('radio', { name: 'Cannot provide contact details' }).check();
    await this.page.locator('#no-contact-details').fill(ConstantsLib.TEXT_ANSWER);
    await this.clickContinueButton();
  }
}
