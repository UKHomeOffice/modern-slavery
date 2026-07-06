const { When } = require('./shared/bdd');

When('I fill out my answers to the NRM questionnaire - check error {string}', async ({ nrmPages, nrmJourneyContext }) => {
  await nrmPages.nrmReportWorkflow.completeFullJourney(nrmJourneyContext.selectedScenarioData || {});
});

When('I fill out my answers to some of the NRM questionnaire - check error {string}', async ({ nrmPages, nrmJourneyContext }) => {
  await nrmPages.nrmReportWorkflow.completePartialJourney(nrmJourneyContext.selectedScenarioData || {});
});

When('I navigate back to the reports dashboard', async ({ nrmPages }) => {
  await nrmPages.nrmReportWorkflow.navigateBackToReportsDashboard();
});
