const { test: base } = require('playwright-bdd');
const { NrmStartPage } = require('../page-objects/nrm-start-page');
const { NrmEntryPage } = require('../page-objects/nrm-entry-page');
const { NrmQuestionPage } = require('../page-objects/nrm-question-page');
const { NrmDraftDashboardPage } = require('../page-objects/nrm-draft-dashboard-page');
const { NrmConfirmationPage } = require('../page-objects/nrm-confirmation-page');
const { NrmReportWorkflow } = require('../workflows/nrm-report-workflow');
const { NrmTestDataRepository } = require('../helpers/nrm-test-data-repository');

const test = base.extend({
  nrmJourneyContext: async ({}, use) => {
    await use({
      selectedScenarioData: null,
      generatedReportReference: null
    });
  },
  nrmPages: async ({ page }, use) => {
    const startPage = new NrmStartPage(page);
    const entryPage = new NrmEntryPage(page);
    const questionPage = new NrmQuestionPage(page);
    const draftDashboardPage = new NrmDraftDashboardPage(page);
    const confirmationPage = new NrmConfirmationPage(page);
    const reportWorkflow = new NrmReportWorkflow({
      questionPage,
      draftDashboardPage,
      confirmationPage
    });

    await use({
      nrmStartPage: startPage,
      nrmEntryPage: entryPage,
      nrmQuestionPage: questionPage,
      nrmDraftDashboardPage: draftDashboardPage,
      nrmConfirmationPage: confirmationPage,
      nrmReportWorkflow: reportWorkflow
    });
  },
  nrmTestDataRepository: async ({}, use) => {
    await use(new NrmTestDataRepository());
  }
});

module.exports = {
  test,
  expect: test.expect
};
