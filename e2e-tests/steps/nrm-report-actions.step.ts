import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { test } from '../fixture/fixtures';

const { When, Then } = createBdd(test);

When('I navigate back to the reports dashboard', async ({ pages }) => {
  await pages.nrmReportActionsPage.goToReportsDashboard();
});

Then("I am able to click 'Go to report' button and continue the report", async ({ pages }) => {
  await pages.nrmReportActionsPage.continueExistingReport();
  await expect(pages.nrmReportActionsPage.reportActionResultLocator()).toBeVisible();
});

Then('I am able to delete my report', async ({ pages }) => {
  await pages.nrmReportActionsPage.deleteExistingReport();
  await expect(pages.nrmReportActionsPage.reportActionResultLocator()).toBeVisible();
});

Then("I click 'Save and exit' button and confirm my report is saved", async ({ pages }) => {
  await pages.nrmReportActionsPage.saveAndExit();
  await expect(pages.nrmReportActionsPage.reportActionResultLocator()).toBeVisible();
});
