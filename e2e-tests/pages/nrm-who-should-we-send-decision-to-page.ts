import type { Page } from '@playwright/test';
import { basePage } from './base-page';

export class nrmWhoShouldWeSendDecisionToPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    return "Who should we send our decision to? – Report modern slavery";
  }

  async answerDecisionRecipient(response: string): Promise<void> {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.selectRadioOption(response);
    await this.clickContinueButton();
  }
}
