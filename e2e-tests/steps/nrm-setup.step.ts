import { createBdd } from 'playwright-bdd';
import { test } from '../fixture/fixtures';
import { getScenarioDataByJourney } from '../utility-helper/scenario-data';

const { Given, When } = createBdd(test);

Given('Test data has been created for {string} scenarios', async ({ scenarioContext }, service: string) => {
  scenarioContext.service = service;
});

Given('I selected NRM journey data {string}', async ({ scenarioContext }, journeyKey: string) => {
  const scenarioData = getScenarioDataByJourney(journeyKey);

  if (!scenarioData) {
    throw new Error(`Unknown NRM journey key: ${journeyKey}`);
  }

  scenarioContext.scenarioId = scenarioData.scenarioId;
  scenarioContext.description = scenarioData.description;
  scenarioContext.scenarioData = scenarioData;
});

When('I visit the National Referral Mechanism page', async ({ pages }) => {
  await pages.basePage.gotoNrmStart();
});

When(
  'I enter my work Email {string} and create new report - check error {string}',
  async ({ pages, scenarioContext }, email: string, _checkError: string) => {
    const scenarioData = scenarioContext.scenarioData;
    await pages.nrmStartPage.startReportWithEmail(scenarioData?.email || email);
  }
);

When('I create a new NRM report for the selected journey', async ({ pages, scenarioContext }) => {
  const scenarioData = scenarioContext.scenarioData;
  if (!scenarioData) {
    throw new Error('No scenario data selected. Call the journey selection step first.');
  }

  await pages.nrmStartPage.startReportWithEmail(scenarioData.email);
});
