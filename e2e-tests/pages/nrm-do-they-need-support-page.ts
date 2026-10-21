import type { Page } from '@playwright/test';
import { basePage } from './base-page';

export class nrmDoTheyNeedSupportPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    return "Does the potential victim want support? – Report modern slavery";
  }

  async answerSupportNeed(response: string): Promise<void> {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.selectRadioOption(response);
    await this.clickContinueButton();
  }
}
