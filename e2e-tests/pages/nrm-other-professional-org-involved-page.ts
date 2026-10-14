import type { Locator, Page } from '@playwright/test';
import { BasePage } from './base-page';

export class NrmOtherProfessionalOrgInvolvedPage extends BasePage {
  private readonly professionalInsight: Locator;

  constructor(page: Page) {
    super(page);
    this.professionalInsight = page.locator('#professional-insight');
  }

  async expectedPageTitle(): Promise<string> {
    return "Your professional insight – Report modern slavery";
  }

  async enterProfessionalInvolvementDetails(text: string): Promise<void> {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.clearAndEnterTextInElement(this.professionalInsight, text);
    await this.clickContinueButton();
  }
}
