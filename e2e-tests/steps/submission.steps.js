const { Then } = require('./shared/bdd');
const { expect } = require('../fixtures/test-fixtures');

Then('I am able to submit the NRM questionnaire', async ({ nrmPages }) => {
  await expect(nrmPages.nrmConfirmationPage.confirmationHeading).toBeVisible();
  await expect(nrmPages.nrmConfirmationPage.confirmationHeading).toContainText(/referral sent|report submitted/i);
});
