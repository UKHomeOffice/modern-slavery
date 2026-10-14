import type { Locator, Page } from '@playwright/test';
import { basePage } from './base-page';

export class nrmCurrentProgressPage extends basePage {
  private readonly continueToNextQuestionButton: Locator;

  constructor(page: Page) {
    super(page);
    this.continueToNextQuestionButton = page.locator('input[value="Continue to next question"]');
  }

  async expectedPageTitle(): Promise<string> {
    return "Current progress – Report modern slavery";
  }

  async continueToNextQuestion(): Promise<void> {
    await this.continueToNextQuestionButton.click();
  }
}
