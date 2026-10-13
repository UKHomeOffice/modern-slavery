import type { Page } from '@playwright/test';
import { BasePage } from './base-page';

export class NrmDoTheyHaveAnyHomeOfficeRefPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    return "Do they have any Home Office references? – Report modern slavery";
  }

  async answerHomeOfficeReference(response: string, checkError: string): Promise<void> {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.checkRequiredQuestionErrors(checkError);
    await this.selectRadioOption(response);
    await this.clickContinueButton();
  }
}
