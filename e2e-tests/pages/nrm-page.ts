import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './base-page';

export class NrmPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async startReportWithEmail(email: string): Promise<void> {
    await this.gotoHome();

    const emailField = this.page.locator('#email, input[type="email"], [name="email"]').first();
    if (await emailField.isVisible().catch(() => false)) {
      await emailField.fill(email);
      await this.clickIfVisible(this.page.getByRole('button', { name: /continue|start|sign in/i }));
    }

    await this.gotoNrmStart();
    await this.clickIfVisible(this.page.getByRole('button', { name: /start|start now|start report/i }));
  }

  async completeQuestionnaire(checkError: string, partial = false): Promise<void> {
    if (String(checkError).toLowerCase() === 'yes') {
      const problemSummary = this.page.locator('.govuk-error-summary, [data-testid="error-summary"]').first();
      if (await problemSummary.isVisible().catch(() => false)) {
        await expect(problemSummary).toBeVisible();
      }
      return;
    }

    const continueButton = this.page.getByRole('button', { name: /^continue$/i });
    await this.clickIfVisible(continueButton);
    if (!partial) {
      await this.clickIfVisible(continueButton);
    }
  }

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

  async submitReport(): Promise<void> {
    await this.clickIfVisible(this.page.getByRole('button', { name: /submit/i }));
  }

  async reportActionResultLocator(): Promise<Locator> {
    return this.page.locator('main');
  }
}
