import type { Page } from '@playwright/test';
import { BasePage } from './base-page';

export class NrmDoTheyNeedHelpWithCommunicationPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    return "Do they need help with communication? – Report modern slavery";
  }

  async answerCommunicationHelp(response: string): Promise<void> {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.selectRadioOption(response);
    await this.clickContinueButton();
  }
}
