import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { BasePage } from './base-page';

export class NrmYourReportHasBeenSavedPage extends BasePage {
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
