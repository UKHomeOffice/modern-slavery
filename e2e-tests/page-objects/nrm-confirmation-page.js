class NrmConfirmationPage {
  constructor(page) {
    this.page = page;
  }

  get confirmationHeading() {
    return this.page.locator('.govuk-panel__title, h1').first();
  }

  async submitFromCheckAnswersIfPresent() {
    const submitButton = this.page.getByRole('button', { name: /submit|send report/i }).first();
    if (await submitButton.isVisible().catch(() => false)) {
      await submitButton.click();
    }
  }

  async isOnCheckAnswersPage() {
    const checkAnswersHeading = this.page.getByRole('heading', {
      name: /check your answers|send your report/i
    }).first();
    return checkAnswersHeading.isVisible().catch(() => false);
  }

  async isSubmissionConfirmed() {
    return this.page
      .locator('.govuk-panel__title')
      .filter({ hasText: /referral sent|report submitted/i })
      .first()
      .isVisible()
      .catch(() => false);
  }

  async saveAndExitIfPresent() {
    const saveAndExitButton = this.page.getByRole('button', { name: /save and exit/i }).first();
    if (await saveAndExitButton.isVisible().catch(() => false)) {
      await saveAndExitButton.click();
    }
  }
}

module.exports = {
  NrmConfirmationPage
};
