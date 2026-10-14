import type { Page } from '@playwright/test';
import { basePage } from './base-page';

export class nrmDeleteReportPage extends basePage {
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
