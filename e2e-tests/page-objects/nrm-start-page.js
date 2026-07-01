class NrmStartPage {
  constructor(page) {
    this.page = page;
  }

  async openStartPageWithSkipToken() {
    await this.page.goto('/nrm/start?token=skip');
  }

  async acceptCookiesIfBannerIsVisible() {
    const acceptCookiesButton = this.page.getByRole('button', {
      name: /accept additional cookies|accept cookies/i
    });

    if (await acceptCookiesButton.isVisible().catch(() => false)) {
      await acceptCookiesButton.click();
    }
  }

  async expectStartOrContinueGate() {
    await this.page
      .getByRole('heading', {
        name: /continue to your report|create a new report|draft reports/i
      })
      .first()
      .waitFor({ state: 'visible', timeout: 15000 });
  }

  async startJourneyIfGated() {
    const startButton = this.page.getByRole('button', { name: /^start$/i }).first();
    if (await startButton.isVisible().catch(() => false)) {
      await startButton.click();
    }
  }
}

module.exports = {
  NrmStartPage
};
