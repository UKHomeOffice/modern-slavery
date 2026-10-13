import type { Page } from '@playwright/test';
import { BasePage } from './base-page';

export class NrmDoTheyNeedInterpreterPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    return "Do they need an interpreter? – Report modern slavery";
  }

  async answerInterpreter(response: string, checkError: string): Promise<void> {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.checkRequiredQuestionErrors(checkError);
    await this.selectRadioOption(response);
    await this.clickContinueButton();
  }
}
