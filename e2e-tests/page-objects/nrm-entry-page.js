class NrmEntryPage {
  constructor(page) {
    this.page = page;
  }

  async enterWorkEmailAndCreateReport(workEmailAddress) {
    const emailField = this.page.getByLabel(/work email|email address|email/i).first();
    if (await emailField.isVisible().catch(() => false)) {
      await emailField.fill(workEmailAddress);
      await this.page.getByRole('button', { name: /continue|start now|save and continue/i }).first().click();
    }

    const createReportButton = this.page.getByRole('button', { name: /create report|create a new report|start report/i }).first();
    if (await createReportButton.isVisible().catch(() => false)) {
      await createReportButton.click();
    }

    const reportReference = `REF-${Date.now()}`;
    const referenceField = this.page.getByLabel(/reference|your reference/i).first();
    if (await referenceField.isVisible().catch(() => false)) {
      await referenceField.fill(reportReference);
      await this.page.getByRole('button', { name: /save and continue|continue/i }).first().click();
    }

    return reportReference;
  }
}

module.exports = {
  NrmEntryPage
};
