import type { Locator, Page } from '@playwright/test';
import { BasePage } from './base-page';

export class NrmContinueToYourReportPage extends BasePage {
  private readonly startButton: Locator;

  constructor(page: Page) {
    super(page);
    this.startButton = page.locator('input[value="Start"], button:has-text("Start")');
  }

  async expectedPageTitle(): Promise<string> {
    return "Continue to your report – Report modern slavery";
  }

  async startReport(): Promise<void> {
    await this.startButton.click();
  }
}
