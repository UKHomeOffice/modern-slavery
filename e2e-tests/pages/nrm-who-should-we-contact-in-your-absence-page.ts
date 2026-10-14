import type { Locator, Page } from '@playwright/test';
import { basePage } from './base-page';

export class nrmWhoShouldWeContactInYourAbsencePage extends basePage {
  private readonly alternativeContact: Locator;

  constructor(page: Page) {
    super(page);
    this.alternativeContact = page.locator('#fr-alternative-contact');
  }

  async expectedPageTitle(): Promise<string> {
    return "Who should we contact in your absence? – Report modern slavery";
  }

  async completeAbsenceContact(email: string): Promise<void> {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.clearAndEnterTextInElement(this.alternativeContact, email);
    await this.clickContinueButton();
  }
}
