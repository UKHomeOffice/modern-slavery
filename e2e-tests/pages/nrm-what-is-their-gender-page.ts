import type { Page } from '@playwright/test';
import { basePage } from './base-page';

export class nrmWhatIsTheirGenderPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    return "What is their gender? – Report modern slavery";
  }

  async answerGender(response: string): Promise<void> {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.selectRadioOption(response);
    await this.clickContinueButton();
  }
}
