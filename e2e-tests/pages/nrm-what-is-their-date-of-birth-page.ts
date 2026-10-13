import type { Locator, Page } from '@playwright/test';
import { ConstantsLib } from '../utility-helper/constants-lib';
import { BasePage } from './base-page';

export class NrmWhatIsTheirDateOfBirthPage extends BasePage {
  private readonly day: Locator;
  private readonly month: Locator;
  private readonly year: Locator;

  constructor(page: Page) {
    super(page);
    this.day = page.locator('#pv-dob-day');
    this.month = page.locator('#pv-dob-month');
    this.year = page.locator('#pv-dob-year');
  }

  async expectedPageTitle(): Promise<string> {
    return "What is their date of birth? – Report modern slavery";
  }

  async completeDateOfBirth(): Promise<void> {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.clearAndEnterTextInElement(this.day, ConstantsLib.DOB_DAY);
    await this.clearAndEnterTextInElement(this.month, ConstantsLib.DOB_MONTH);
    await this.clearAndEnterTextInElement(this.year, ConstantsLib.DOB_YEAR);
    await this.clickContinueButton();
  }
}
