import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { test } from '../fixture/fixtures';

const { When, Then } = createBdd(test);

When(
  'I fill out my answers to the NRM questionnaire - check error {string}',
  async ({ pages, scenarioContext }, checkError: string) => {
    const scenarioData = scenarioContext.scenarioData;
    await pages.nrmQuestionnairePage.completeQuestionnaire(scenarioData?.checkError || checkError, false, scenarioData);
  }
);

When(
  'I fill out my answers to some of the NRM questionnaire - check error {string}',
  async ({ pages, scenarioContext }, checkError: string) => {
    const scenarioData = scenarioContext.scenarioData;
    await pages.nrmQuestionnairePage.completeQuestionnaire(scenarioData?.checkError || checkError, true, scenarioData);
  }
);

Then('I am able to submit the NRM questionnaire', async ({ pages }) => {
  await pages.nrmQuestionnairePage.submitReport();
  await expect(pages.nrmReportActionsPage.reportActionResultLocator()).toBeVisible();
});

When('I complete the NRM questionnaire for the selected journey', async ({ pages, scenarioContext }) => {
  const scenarioData = scenarioContext.scenarioData;
  if (!scenarioData) {
    throw new Error('No scenario data selected. Call the journey selection step first.');
  }

  await pages.nrmQuestionnairePage.completeQuestionnaire(scenarioData.checkError, false, scenarioData);
});

When('I complete some of the NRM questionnaire for the selected journey', async ({ pages, scenarioContext }) => {
  const scenarioData = scenarioContext.scenarioData;
  if (!scenarioData) {
    throw new Error('No scenario data selected. Call the journey selection step first.');
  }

  await pages.nrmQuestionnairePage.completeQuestionnaire(scenarioData.checkError, true, scenarioData);
});
