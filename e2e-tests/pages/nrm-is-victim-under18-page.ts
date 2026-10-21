import type { Page } from '@playwright/test';
import { basePage } from './base-page';

export class nrmIsVictimUnder18Page extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    return "Is the potential victim under 18? – Report modern slavery";
  }

  async answerVictimAge(under18: string): Promise<void> {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.selectRadioOption(under18);
    await this.clickContinueButton();
  }
}
