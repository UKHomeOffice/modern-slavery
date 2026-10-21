import type { Locator, Page } from '@playwright/test';
import { ConstantsLib } from '../utility-helper/constants-lib';
import { basePage } from './base-page';

export class nrmHowShouldTheyBeContactedPage extends basePage {
  private readonly alternateFirstName: Locator;
  private readonly alternateLastName: Locator;
  private readonly emailAddress: Locator;
  private readonly streetAddress: Locator;
  private readonly town: Locator;
  private readonly county: Locator;
  private readonly postcode: Locator;

  constructor(page: Page) {
    super(page);
    this.alternateFirstName = page.locator('#someone-else-first-name');
    this.alternateLastName = page.locator('#someone-else-last-name');
    this.emailAddress = page.locator('input[id$="email-input"]');
    this.streetAddress = page.locator('input[id$="street"]');
    this.town = page.locator('input[id$="town"]');
    this.county = page.locator('input[id$="county"]');
    this.postcode = page.locator('input[id$="postcode"]');
  }

  async expectedPageTitle(): Promise<string> {
    return "How should they be contacted? – Report modern slavery";
  }

  async completeDecisionContactDetails(recipient: string): Promise<void> {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    if (recipient === ConstantsLib.ALTERNATE_DECISION_RECIPIENT) {
      await this.clearAndEnterTextInElement(this.alternateFirstName, ConstantsLib.CONTACT_NAME_TEXT);
      await this.clearAndEnterTextInElement(this.alternateLastName, ConstantsLib.CONTACT_NAME_TEXT);
    }
    await this.page.getByRole('checkbox', { name: /^Email/ }).check();
    await this.clearAndEnterTextInElement(this.emailAddress, ConstantsLib.DECISION_CONTACT_EMAIL);
    await this.checkIfPresent('#pv-contact-details-email-input-fieldset input.govuk-checkboxes__input');
    await this.page.getByRole('checkbox', { name: 'Post', exact: true }).check();
    await this.clearAndEnterTextInElement(this.streetAddress, ConstantsLib.CONTACT_ADDRESS_TEXT);
    await this.clearAndEnterTextInElement(this.town, ConstantsLib.CONTACT_ADDRESS_TEXT);
    await this.clearAndEnterTextInElement(this.county, ConstantsLib.CONTACT_ADDRESS_TEXT);
    await this.clearAndEnterTextInElement(this.postcode, ConstantsLib.CONTACT_ADDRESS_TEXT);
    await this.checkIfPresent('#pv-contact-details-post-check-group input.govuk-checkboxes__input');
    if (recipient === ConstantsLib.ALTERNATE_DECISION_RECIPIENT) {
      await this.page.getByRole('checkbox', { name: /potential victim/i }).check();
    }
    await this.clickContinueButton();
  }
}
