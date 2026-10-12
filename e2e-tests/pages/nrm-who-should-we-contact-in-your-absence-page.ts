import type { Page } from '@playwright/test';
import { BasePage } from './base-page';

export class NrmWhoShouldWeContactInYourAbsencePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    return "Who should we contact in your absence? – Report modern slavery";
  }

  async completeAbsenceContact(email: string): Promise<void> {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.page.locator('#fr-alternative-contact').fill(email);
    await this.clickContinueButton();
  }
}
