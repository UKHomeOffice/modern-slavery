import type { Page } from '@playwright/test';
import { basePage } from './base-page';

export class nrmDoTheyHaveAnyChildrenPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    return "Do they have any children? – Report modern slavery";
  }

  async answerChildren(response: string): Promise<void> {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.selectRadioOption(response);
    await this.clickContinueButton();
  }
}
