const { When } = require('./shared/bdd');

When('I visit the National Referral Mechanism page', async ({ nrmPages }) => {
  await nrmPages.nrmStartPage.openStartPageWithSkipToken();
  await nrmPages.nrmStartPage.acceptCookiesIfBannerIsVisible();
  await nrmPages.nrmStartPage.expectStartOrContinueGate();
  await nrmPages.nrmStartPage.startJourneyIfGated();
});

When(
  'I enter my work Email {string} and create new report - check error {string}',
  async ({ nrmPages, nrmJourneyContext }, fallbackWorkEmailAddress) => {
    const scenarioData = nrmJourneyContext.selectedScenarioData || {};
    const workEmailAddress = scenarioData.workEmail || fallbackWorkEmailAddress;
    const generatedReference = await nrmPages.nrmEntryPage.enterWorkEmailAndCreateReport(workEmailAddress);
    nrmJourneyContext.generatedReportReference = generatedReference;
  }
);
