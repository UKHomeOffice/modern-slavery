import type { Page } from '@playwright/test';
import { basePage } from './base-page';

export class nrmCheckYourAnswersPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    return "Check your answers – Report modern slavery";
  }

  async submitReport(): Promise<void> {
    await this.page.getByRole('button', { name: 'Accept and send report' }).click();
  }
}
