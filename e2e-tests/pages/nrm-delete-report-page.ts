import type { Page } from '@playwright/test';
import { BasePage } from './base-page';

export class NrmDeleteReportPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    return "Delete report – Report modern slavery";
  }

  async confirmDeleteReport(): Promise<void> {
    await this.page.getByRole('button', { name: 'Delete this report' }).click();
  }
}
