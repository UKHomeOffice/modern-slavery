import type { Locator, Page } from '@playwright/test';
import { BasePage } from './base-page';

export class NrmHowAndWhyTheyLeftPage extends BasePage {
  private readonly leavingDetails: Locator;

  constructor(page: Page) {
    super(page);
    this.leavingDetails = page.locator('#how-why-did-they-leave-the-situation');
  }

  async expectedPageTitle(): Promise<string> {
    return "How did the potential victim leave the exploitative situation? – Report modern slavery";
  }

  async enterLeavingDetails(text: string): Promise<void> {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.clearAndEnterTextInElement(this.leavingDetails, text);
    await this.clickContinueButton();
  }
}
