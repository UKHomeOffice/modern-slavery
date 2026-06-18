import { type Locator } from '@playwright/test';
import { BasePage } from './base-page';

export class NrmReportActionsPage extends BasePage {
  async goToReportsDashboard(): Promise<void> {
    const dashboardLink = this.page.getByRole('link', { name: /dashboard|back to reports|reports dashboard/i });
    if (!(await this.clickIfVisible(dashboardLink))) {
      await this.page.goto('/nrm/reports-dashboard');
    }
  }

  async continueExistingReport(): Promise<void> {
    const goToReport = this.page.getByRole('link', { name: /go to report|continue report/i });
    await this.clickIfVisible(goToReport);
  }

  async deleteExistingReport(): Promise<void> {
    const deleteTrigger = this.page.getByRole('button', { name: /delete/i });
    const confirmed = await this.clickIfVisible(deleteTrigger);
    if (confirmed) {
      const confirmDelete = this.page.getByRole('button', { name: /confirm|yes.*delete|delete report/i });
      await this.clickIfVisible(confirmDelete);
    }
  }

  async saveAndExit(): Promise<void> {
    await this.clickIfVisible(this.page.getByRole('button', { name: /save and exit/i }));
  }

  reportActionResultLocator(): Locator {
    return this.page.locator('main');
  }
}
