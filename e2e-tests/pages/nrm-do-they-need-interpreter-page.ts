import type { Page } from '@playwright/test';
import { basePage } from './base-page';

export class nrmDoTheyNeedInterpreterPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    return "Do they need an interpreter? – Report modern slavery";
  }

  async answerInterpreter(response: string): Promise<void> {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.selectRadioOption(response);
    await this.clickContinueButton();
  }
}
