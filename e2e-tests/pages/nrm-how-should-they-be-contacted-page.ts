import type { Page } from '@playwright/test';
import { ConstantsLib } from '../utility-helper/constants-lib';
import { BasePage } from './base-page';

export class NrmHowShouldTheyBeContactedPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    return "How should they be contacted? – Report modern slavery";
  }

  async completeDecisionContactDetails(recipient: string): Promise<void> {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    if (recipient === ConstantsLib.ALTERNATE_DECISION_RECIPIENT) {
      await this.page.locator('#someone-else-first-name').fill(ConstantsLib.CONTACT_NAME_TEXT);
      await this.page.locator('#someone-else-last-name').fill(ConstantsLib.CONTACT_NAME_TEXT);
    }
    await this.page.getByRole('checkbox', { name: /^Email/ }).check();
    await this.page.locator('input[id$="email-input"]').fill(ConstantsLib.DECISION_CONTACT_EMAIL);
    await this.checkIfPresent('#pv-contact-details-email-input-fieldset input.govuk-checkboxes__input');
    await this.page.getByRole('checkbox', { name: 'Post', exact: true }).check();
    await this.page.locator('input[id$="street"]').fill(ConstantsLib.CONTACT_ADDRESS_TEXT);
    await this.page.locator('input[id$="town"]').fill(ConstantsLib.CONTACT_ADDRESS_TEXT);
    await this.page.locator('input[id$="county"]').fill(ConstantsLib.CONTACT_ADDRESS_TEXT);
    await this.page.locator('input[id$="postcode"]').fill(ConstantsLib.CONTACT_ADDRESS_TEXT);
    await this.checkIfPresent('#pv-contact-details-post-check-group input.govuk-checkboxes__input');
    if (recipient === ConstantsLib.ALTERNATE_DECISION_RECIPIENT) {
      await this.page.getByRole('checkbox', { name: /potential victim/i }).check();
    }
    await this.clickContinueButton();
  }
}
