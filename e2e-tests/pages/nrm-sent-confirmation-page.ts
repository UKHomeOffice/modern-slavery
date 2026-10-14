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

  async assertSubmissionConfirmation(): Promise<void> {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await expect(this.heading).toBeVisible();
  }
}
