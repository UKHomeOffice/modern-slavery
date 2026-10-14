import type { Locator, Page } from '@playwright/test';
import { BasePage } from './base-page';

export class NrmWhyDontTheyWantTheirCaseReferredPage extends BasePage {
  private readonly refusalReason: Locator;

  constructor(page: Page) {
    super(page);
    this.refusalReason = page.locator('#refuse-nrm');
  }

  async expectedPageTitle(): Promise<string> {
    return "Why doesn't the potential victim want their case referred to the NRM? – Report modern slavery";
  }

  async enterReasonForNoReferral(text: string): Promise<void> {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.clearAndEnterTextInElement(this.refusalReason, text);
    await this.clickContinueButton();
  }
}
