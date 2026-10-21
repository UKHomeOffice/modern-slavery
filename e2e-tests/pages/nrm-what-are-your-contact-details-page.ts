import type { Locator, Page } from '@playwright/test';
import { ConstantsLib } from '../utility-helper/constants-lib';
import { basePage } from './base-page';

export class nrmWhatAreYourContactDetailsPage extends basePage {
  private readonly firstName: Locator;
  private readonly lastName: Locator;
  private readonly role: Locator;
  private readonly phone: Locator;

  constructor(page: Page) {
    super(page);
    this.firstName = page.locator('#fr-details-first-name');
    this.lastName = page.locator('#fr-details-last-name');
    this.role = page.locator('#fr-details-role');
    this.phone = page.locator('#fr-details-phone');
  }

  async expectedPageTitle(): Promise<string> {
    return "What are your contact details? – Report modern slavery";
  }

  async completeReporterContactDetails(): Promise<void> {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.clearAndEnterTextInElement(this.firstName, ConstantsLib.CONTACT_DETAILS_TEXT);
    await this.clearAndEnterTextInElement(this.lastName, ConstantsLib.CONTACT_DETAILS_TEXT);
    await this.clearAndEnterTextInElement(this.role, ConstantsLib.CONTACT_DETAILS_TEXT);
    await this.clearAndEnterTextInElement(this.phone, ConstantsLib.CONTACT_DETAILS_PHONE);
    await this.clickContinueButton();
  }
}
