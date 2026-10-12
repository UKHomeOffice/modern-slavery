import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { BasePage } from './base-page';

export class NrmSentConfirmationPage extends BasePage {
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
