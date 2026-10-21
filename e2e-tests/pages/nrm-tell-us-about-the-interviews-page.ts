import type { Locator, Page } from '@playwright/test';
import { basePage } from './base-page';

export class nrmTellUsAboutTheInterviewsPage extends basePage {
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
