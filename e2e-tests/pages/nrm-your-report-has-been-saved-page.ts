import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { basePage } from './base-page';

export class nrmYourReportHasBeenSavedPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    return "Your report has been saved – Report modern slavery";
  }

  async assertReportSaved(): Promise<void> {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await expect(this.page.getByText(/return to your report/i)).toBeVisible();
  }
}
