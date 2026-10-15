import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { basePage } from './base-page';

export class nrmSentConfirmationPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    return "Confirmation";
  }

  async assertConfirmationPageAndHeader(header: string): Promise<void> {
    await expect(this.heading).toHaveText(header);
  }

  async assertSubmissionConfirmationPageTitle(): Promise<void> {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
  }


}
