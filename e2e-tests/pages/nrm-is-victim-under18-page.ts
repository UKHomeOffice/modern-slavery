import type { Page } from '@playwright/test';
import { BasePage } from './base-page';

export class NrmIsVictimUnder18Page extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    return "Is the potential victim under 18? – Report modern slavery";
  }

  async answerVictimAge(under18: string, checkError: string): Promise<void> {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.checkRequiredQuestionErrors(checkError);
    await this.selectRadioOption(under18);
    await this.clickContinueButton();
  }
}
