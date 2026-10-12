import type { Page } from '@playwright/test';
import { ConstantsLib } from '../utility-helper/constants-lib';
import { BasePage } from './base-page';

export class NrmWhatIsTheirDateOfBirthPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    return "What is their date of birth? – Report modern slavery";
  }

  async completeDateOfBirth(): Promise<void> {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.page.locator('#pv-dob-day').fill(ConstantsLib.DOB_DAY);
    await this.page.locator('#pv-dob-month').fill(ConstantsLib.DOB_MONTH);
    await this.page.locator('#pv-dob-year').fill(ConstantsLib.DOB_YEAR);
    await this.clickContinueButton();
  }
}
