import type { Page } from '@playwright/test';
import { BasePage } from './base-page';

export class NrmFirstTimeOfReportingThisPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    return "Has the potential victim reported this before? – Report modern slavery";
  }

  async answerFirstReport(response: string): Promise<void> {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.selectRadioOption(response);
    await this.clickContinueButton();
  }
}
