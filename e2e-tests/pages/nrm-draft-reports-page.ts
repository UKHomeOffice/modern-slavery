import type { Locator, Page } from '@playwright/test';
import { basePage } from './base-page';
import { expect } from '@playwright/test';

export class nrmDraftReportsPage extends basePage {
  private readonly createReportButton: Locator;

  constructor(page: Page) {
    super(page);
    this.createReportButton = page.locator('input[value="Create report"], button:has-text("Create report")');
  }

  async expectedPageTitle(): Promise<string> {
    return "Draft reports – Report modern slavery";
  }

  async createDraftReport(): Promise<void> {
    await this.createReportButton.click();
  }

  async navigateToReportsDashboard(): Promise<void> {
    await this.page.getByRole('link', { name: 'Back to the Reports Dashboard' }).click();
  }

  async openDraftReport(reference: string, action: 'Go to report' | 'Delete report'): Promise<void> {
    await this.page.getByRole('row').filter({ hasText: reference }).getByRole('link', { name: action }).click();
  }

  async assertDraftReportDeleted(reference: string): Promise<void> {
    await expect(this.page.getByRole('row').filter({ hasText: reference })).toHaveCount(0);
  }
}
