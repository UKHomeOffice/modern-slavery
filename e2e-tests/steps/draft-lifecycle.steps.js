const { Then } = require('./shared/bdd');

Then("I am able to click 'Go to report' button and continue the report", async ({ nrmPages, nrmJourneyContext }) => {
  await nrmPages.nrmReportWorkflow.continueExistingReport(nrmJourneyContext.generatedReportReference);
});

Then('I am able to delete my report', async ({ nrmPages, nrmJourneyContext }) => {
  await nrmPages.nrmReportWorkflow.deleteExistingReport(nrmJourneyContext.generatedReportReference);
});

Then("I click 'Save and exit' button and confirm my report is saved", async ({ nrmPages }) => {
  await nrmPages.nrmReportWorkflow.saveAndExit();
});
