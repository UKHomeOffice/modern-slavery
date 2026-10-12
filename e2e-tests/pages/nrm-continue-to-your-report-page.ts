import type { Page } from '@playwright/test';
import { BasePage } from './base-page';

export class NrmContinueToYourReportPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    return "Continue to your report – Report modern slavery";
  }

  async startReport(): Promise<void> {
    await this.page.locator('input[value="Start"], button:has-text("Start")').click();
  }
}
