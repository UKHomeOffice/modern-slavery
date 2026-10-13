import type { Locator, Page } from '@playwright/test';
import { BasePage } from './base-page';

export class NrmWhyAreTheyReportingThisNowPage extends BasePage {
  private readonly reportNowReason: Locator;

  constructor(page: Page) {
    super(page);
    this.reportNowReason = page.locator('#why-report-now');
  }

  async expectedPageTitle(): Promise<string> {
    return "Is there anything that prevented the potential victim from reporting this sooner? – Report modern slavery";
  }

  async enterWhyReportNow(text: string, checkError: string): Promise<void> {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.checkRequiredQuestionErrors(checkError);
    await this.clearAndEnterTextInElement(this.reportNowReason, text);
    await this.clickContinueButton();
  }
}
