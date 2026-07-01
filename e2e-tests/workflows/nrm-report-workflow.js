class NrmReportWorkflow {
  constructor({ questionPage, draftDashboardPage, confirmationPage }) {
    this.questionPage = questionPage;
    this.draftDashboardPage = draftDashboardPage;
    this.confirmationPage = confirmationPage;
  }

  async completePartialJourney() {
    for (let stepIndex = 0; stepIndex < 8; stepIndex += 1) {
      const didContinue = await this.questionPage.advanceOneStepSafely();
      if (!didContinue) {
        break;
      }
    }
  }

  async completeFullJourney() {
    for (let stepIndex = 0; stepIndex < 60; stepIndex += 1) {
      if (await this.confirmationPage.isSubmissionConfirmed()) {
        return;
      }

      if (await this.confirmationPage.isOnCheckAnswersPage()) {
        await this.confirmationPage.submitFromCheckAnswersIfPresent();
        if (await this.confirmationPage.isSubmissionConfirmed()) {
          return;
        }
      }

      const didContinue = await this.questionPage.advanceOneStepSafely();
      if (!didContinue) {
        break;
      }
    }

    await this.confirmationPage.submitFromCheckAnswersIfPresent();
  }

  async navigateBackToReportsDashboard() {
    await this.draftDashboardPage.navigateBackToReportsDashboard();
  }

  async continueExistingReport(reportReference) {
    await this.draftDashboardPage.continueReportByReference(reportReference || 'REF-');
  }

  async deleteExistingReport(reportReference) {
    await this.draftDashboardPage.deleteReportByReference(reportReference || 'REF-');
    await this.draftDashboardPage.expectReportDeleted(reportReference || 'REF-');
  }

  async saveAndExit() {
    await this.confirmationPage.saveAndExitIfPresent();
  }
}

module.exports = {
  NrmReportWorkflow
};
