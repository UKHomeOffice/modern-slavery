import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { test } from '../fixture/fixtures';
import { getScenarioData, NrmScenarioData } from '../utility-helper/nrm-scenario-data';

const { Given, When, Then } = createBdd(test);

let selectedScenario: NrmScenarioData | null = null;

Given('Test data has been created for {string} scenarios', async ({}, product: string) => {
  if (product.toLowerCase() !== 'nrm') {
    throw new Error(`Unsupported product: ${product}`);
  }
});

Given('I selected the data for scenario {string} - {string}', async ({ nrmStepLib }, scenarioId: string, description: string) => {
  selectedScenario = getScenarioData(scenarioId, description);
  nrmStepLib.setScenario(selectedScenario);
});

When('I visit the National Referral Mechanism page', async ({ nrmStepLib }) => {
  await nrmStepLib.openNrm();
});

When('I enter my work Email {string} and create new report - check error {string}', async ({ nrmStepLib }, email: string, _checkError: string) => {
  await nrmStepLib.createReport(email);
});

When('I fill out my answers to the NRM questionnaire - check error {string}', async ({ nrmStepLib }, _checkError: string) => {
  await nrmStepLib.answerRefOrganisationAndReportLocationQuestions();
  await nrmStepLib.answerIsTheVictimUnder18();
  await nrmStepLib.answerTheirBackgroundAndExploitationQuestions2();
  await nrmStepLib.answerTakenSomewhereByExploiter();
  await nrmStepLib.answerTheirTreatmentHowWhyTheyLeftLastContactAndChanceOfReporting();
  await nrmStepLib.answerReferralInterviewOtherProfOrgInvolved();
  await nrmStepLib.answerDocEvidenceAndIndicatorsOfDishonestyAndLocationBeingExploited();
  await nrmStepLib.answerWhereAreTheyHowWereTheyExploitedAndOtherPotentialVictims();
  await nrmStepLib.answerDoTheyHaveCrimeRefNumbAndCooperationWithPubAuth();
  await nrmStepLib.answerDoTheyWantTheirCaseReferredToNRMAndCompleteQuestionnaire();
  await nrmStepLib.uploadEvidenceAndVerifyCheckYourAnswer();
});

When('I fill out my answers to some of the NRM questionnaire - check error {string}', async ({ nrmStepLib }, _checkError: string) => {
  await nrmStepLib.answerRefOrganisationAndReportLocationQuestions();
  await nrmStepLib.answerIsTheVictimUnder18();
  await nrmStepLib.answerTheirBackgroundAndExploitationQuestions2();
  await nrmStepLib.answerTakenSomewhereByExploiter();
});

When('I navigate back to the reports dashboard', async ({ nrmStepLib }) => {
  await nrmStepLib.navigateToDashboard();
});

Then("I am able to click 'Go to report' button and continue the report", async ({ nrmStepLib }) => {
  await nrmStepLib.continuingReport();
});

Then('I am able to delete my report', async ({ nrmStepLib }) => {
  await nrmStepLib.deleteReport();
  expect(await nrmStepLib.isReportDeleted()).toBe(true);
});

Then("I click 'Save and exit' button and confirm my report is saved", async ({ nrmStepLib }) => {
  await nrmStepLib.answerHowWereTheyTreated();
  await nrmStepLib.saveReport();
  expect(await nrmStepLib.isReportSaved()).toBe(true);
});

Then('I am able to submit the NRM questionnaire', async ({ nrmStepLib }) => {
  await nrmStepLib.confirmSubmission();
  expect(selectedScenario).not.toBeNull();
});
