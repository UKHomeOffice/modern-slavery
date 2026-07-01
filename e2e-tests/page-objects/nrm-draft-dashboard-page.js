const { expect } = require('@playwright/test');

class NrmDraftDashboardPage {
  constructor(page) {
    this.page = page;
  }

  async navigateBackToReportsDashboard() {
    const backToDashboardLink = this.page.getByRole('link', { name: /back to the reports dashboard/i }).first();
    if (await backToDashboardLink.isVisible().catch(() => false)) {
      await backToDashboardLink.click();
    }
  }

  async continueReportByReference(reportReference) {
    const reportRow = this.page.getByRole('row', { name: new RegExp(reportReference, 'i') }).first();
    if (await reportRow.isVisible().catch(() => false)) {
      await reportRow.getByRole('link', { name: /go to report/i }).click();
      return;
    }

    await this.page.getByRole('link', { name: /go to report/i }).first().click();
  }

  async deleteReportByReference(reportReference) {
    const reportRow = this.page.getByRole('row', { name: new RegExp(reportReference, 'i') }).first();
    if (await reportRow.isVisible().catch(() => false)) {
      await reportRow.getByRole('link', { name: /delete report/i }).click();
    } else {
      await this.page.getByRole('link', { name: /delete report/i }).first().click();
    }

    await this.page.getByRole('button', { name: /delete this report/i }).first().click();
  }

  async expectReportDeleted(reportReference) {
    await expect(this.page.getByRole('row', { name: new RegExp(reportReference, 'i') })).toHaveCount(0);
  }
}

module.exports = {
  NrmDraftDashboardPage
};
