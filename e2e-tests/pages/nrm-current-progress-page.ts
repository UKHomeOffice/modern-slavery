import type { Page } from '@playwright/test';
import { BasePage } from './base-page';

export class NrmCurrentProgressPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    return "Current progress – Report modern slavery";
  }

  async continueToNextQuestion(): Promise<void> {
    await this.page.locator('input[value="Continue to next question"]').click();
  }
}
