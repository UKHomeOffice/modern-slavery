import type { Page } from '@playwright/test';
import { basePage } from './base-page';

export class nrmWhereAreYouMakingThisReportPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    return "Where are you making this report? – Report modern slavery";
  }

  async answerReportLocation(location: string): Promise<void> {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.selectRadioOption(location);
    await this.clickContinueButton();
  }
}
