import type { Page } from '@playwright/test';
import { ConstantsLib } from '../utility-helper/constants-lib';
import { BasePage } from './base-page';

export class NrmWhatIsTheNameOfThePotentialVictimPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    return "What is the name of the Potential Victim? – Report modern slavery";
  }

  async completePotentialVictimName(): Promise<void> {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.page.locator('#pv-name-first-name').fill(ConstantsLib.VICTIM_FIRST_NAME);
    await this.page.locator('#pv-name-last-name').fill(ConstantsLib.VICTIM_LAST_NAME);
    await this.page.locator('#pv-name-nickname').fill(ConstantsLib.VICTIM_NICKNAME);
    await this.clickContinueButton();
  }
}
