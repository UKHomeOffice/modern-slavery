import type { Page } from '@playwright/test';
import { BasePage } from './base-page';

export class NrmDoTheyNeedSupportPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    return "Does the potential victim want support? – Report modern slavery";
  }

  async answerSupportNeed(response: string, checkError: string): Promise<void> {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.checkRequiredQuestionErrors(checkError);
    await this.selectRadioOption(response);
    await this.clickContinueButton();
  }
}
