import type { Page } from '@playwright/test';
import { basePage } from './base-page';

export class nrmWereThereAnyOtherPotentialVictimsPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    return "Were there any other potential victims? – Report modern slavery";
  }

  async answerOtherPotentialVictims(response: string): Promise<void> {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.selectRadioOption(response);
    await this.clickContinueButton();
  }
}
