import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { test } from '../fixture/fixtures';

const { Given, When, Then } = createBdd(test);

Given('Test data has been created for {string} scenarios', async ({ scenarioContext }, service: string) => {
  scenarioContext.service = service;
});

Given('I selected the data for scenario {string} - {string}', async ({ scenarioContext }, scenarioId: string, description: string) => {
  scenarioContext.scenarioId = scenarioId;
  scenarioContext.description = description;
});

When('I visit the National Referral Mechanism page', async ({ pages }) => {
  await pages.basePage.gotoNrmStart();
});

When(
  'I enter my work Email {string} and create new report - check error {string}',
  async ({ pages }, email: string, _checkError: string) => {
    await pages.nrmPage.startReportWithEmail(email);
  }
);

When(
  'I fill out my answers to the NRM questionnaire - check error {string}',
  async ({ pages }, checkError: string) => {
    await pages.nrmPage.completeQuestionnaire(checkError, false);
  }
);

When(
  'I fill out my answers to some of the NRM questionnaire - check error {string}',
  async ({ pages }, checkError: string) => {
    await pages.nrmPage.completeQuestionnaire(checkError, true);
  }
);

When('I navigate back to the reports dashboard', async ({ pages }) => {
  await pages.nrmPage.goToReportsDashboard();
});

Then('I am able to submit the NRM questionnaire', async ({ pages }) => {
  await pages.nrmPage.submitReport();
  await expect(await pages.nrmPage.reportActionResultLocator()).toBeVisible();
});

Then("I am able to click 'Go to report' button and continue the report", async ({ pages }) => {
  await pages.nrmPage.continueExistingReport();
  await expect(await pages.nrmPage.reportActionResultLocator()).toBeVisible();
});

Then('I am able to delete my report', async ({ pages }) => {
  await pages.nrmPage.deleteExistingReport();
  await expect(await pages.nrmPage.reportActionResultLocator()).toBeVisible();
});

Then("I click 'Save and exit' button and confirm my report is saved", async ({ pages }) => {
  await pages.nrmPage.saveAndExit();
  await expect(await pages.nrmPage.reportActionResultLocator()).toBeVisible();
});
