import type { Page } from '@playwright/test';
import { BasePage } from './base-page';

export class NrmWhereAreYouMakingThisReportPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    return "Where are you making this report? – Report modern slavery";
  }

  async answerReportLocation(location: string, checkError: string): Promise<void> {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.checkRequiredQuestionErrors(checkError);
    await this.selectRadioOption(location);
    await this.clickContinueButton();
  }
}
