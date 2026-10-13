import type { Page } from '@playwright/test';
import { BasePage } from './base-page';

export class NrmWereThereAnyOtherPotentialVictimsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    return "Were there any other potential victims? – Report modern slavery";
  }

  async answerOtherPotentialVictims(response: string, checkError: string): Promise<void> {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.checkRequiredQuestionErrors(checkError);
    await this.selectRadioOption(response);
    await this.clickContinueButton();
  }
}
