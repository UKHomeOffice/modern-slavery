import type { Page } from '@playwright/test';
import { BasePage } from './base-page';

export class NrmWhatIsTheirGenderPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    return "What is their gender? – Report modern slavery";
  }

  async answerGender(response: string, checkError: string): Promise<void> {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.checkRequiredQuestionErrors(checkError);
    await this.selectRadioOption(response);
    await this.clickContinueButton();
  }
}
