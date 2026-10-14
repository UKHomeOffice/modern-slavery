import type { Locator, Page } from '@playwright/test';
import { BasePage } from './base-page';

export class NrmTellUsAboutTheInterviewsPage extends BasePage {
  private readonly interviewDetails: Locator;

  constructor(page: Page) {
    super(page);
    this.interviewDetails = page.locator('#where-how-interview-carried-out');
  }

  async expectedPageTitle(): Promise<string> {
    return "Tell us about the interviews – Report modern slavery";
  }

  async enterInterviewDetails(text: string): Promise<void> {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.clearAndEnterTextInElement(this.interviewDetails, text);
    await this.clickContinueButton();
  }
}
