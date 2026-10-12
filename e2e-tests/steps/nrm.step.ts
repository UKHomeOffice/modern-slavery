import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { test, type Pages } from '../fixture/fixtures';
import { ConstantsLib } from '../utility-helper/constants-lib';

export const { Given, When, Then } = createBdd(test);

const stepLibraries = new WeakMap<object, NrmStepLib>();

type QuestionnaireAnswers = {
  location: string;
  under18: string;
  multipleExploitation: string;
  takenSomewhere: string;
  stillExploited: string;
  lastContact: string;
  firstChance: string;
  indicators: string;
  exploitationLocation: string;
  exploiterInfo: string;
  otherVictims: string;
  futureRisk: string;
  crimeReference: string;
  cooperation: string;
  refer: string;
  upload: string;
  locationCount?: number;
  currentLocation?: string;
  currentRegion?: string;
  decisionRecipient?: string;
};

class NrmStepLib {
  private scenarioDescription = '';
  private reportReference = `${ConstantsLib.REFERENCE_PREFIX}-${Date.now()}`;

  constructor(private readonly pages: Pages) {}

  selectScenarioByDescription(description: string): void {
    switch (description) {
      case "'Yes' answers - under18":
      case "'No' answers - over18, No Cooperation":
      case 'Continue report':
      case 'Delete report':
      case 'Not sure if under18':
      case 'E2E mixed':
      case 'Add max locations':
      case "'No' answers - Yes Cooperation":
      case 'Save and exit report':
        this.scenarioDescription = description;
        break;
      default:
        throw new Error(`No NRM journey is configured for description "${description}"`);
    }
    this.reportReference = `${ConstantsLib.REFERENCE_PREFIX}-${Date.now()}`;
  }

  async visitNrm(): Promise<void> {
    await this.pages.nrmHomePage.startNrm();
  }

  async createReport(email: string, checkError: string): Promise<void> {
    const emailPage = this.pages.nrmWorkEmailPage;
    if (checkError === ConstantsLib.YES) {
      await emailPage.checkBlankWorkEmailError();
    }
    await emailPage.sendSecureLink(email || ConstantsLib.WORK_EMAIL);
    const continuePage = this.pages.nrmContinueToYourReportPage;
    await continuePage.assertPageTitle(continuePage.page, await continuePage.expectedPageTitle());
    await continuePage.startReport();
    const draftReportsPage = this.pages.nrmDraftReportsPage;
    await draftReportsPage.assertPageTitle(draftReportsPage.page, await draftReportsPage.expectedPageTitle());
    await draftReportsPage.createDraftReport();
  }

  async fillQuestionnaire(partial: boolean, checkError: string): Promise<void> {
    switch (this.scenarioDescription) {
      case "'Yes' answers - under18":
        await this.completeQuestionnaire({ location: 'England', under18: 'Yes', multipleExploitation: 'Yes', takenSomewhere: 'Yes', stillExploited: 'No', lastContact: 'Not sure', firstChance: 'No', indicators: 'Yes', exploitationLocation: 'UK', exploiterInfo: 'Yes', otherVictims: 'Yes', futureRisk: 'Yes', crimeReference: 'Yes', cooperation: 'Yes', refer: 'N/A', upload: 'Yes' }, false, checkError);
        break;
      case "'No' answers - over18, No Cooperation":
        await this.completeQuestionnaire({ location: 'Wales', under18: 'No', multipleExploitation: 'No', takenSomewhere: 'No', stillExploited: 'No', lastContact: 'Within the last week', firstChance: 'No', indicators: 'No', exploitationLocation: 'Overseas', exploiterInfo: 'Yes', otherVictims: 'No', futureRisk: 'No', crimeReference: 'No', cooperation: 'No', refer: 'No', upload: 'No' }, false, checkError);
        break;
      case 'Continue report':
        await this.completeQuestionnaire({ location: 'England', under18: 'Yes', multipleExploitation: 'No', takenSomewhere: 'Yes', stillExploited: 'No', lastContact: 'N/A', firstChance: 'N/A', indicators: 'No', exploitationLocation: 'N/A', exploiterInfo: 'N/A', otherVictims: 'N/A', futureRisk: 'N/A', crimeReference: 'N/A', cooperation: 'N/A', refer: 'N/A', upload: 'No' }, true, checkError);
        break;
      case 'Delete report':
        await this.completeQuestionnaire({ location: 'Scotland', under18: 'Yes', multipleExploitation: "I don't know", takenSomewhere: 'Yes', stillExploited: 'No', lastContact: 'N/A', firstChance: 'N/A', indicators: 'No', exploitationLocation: 'N/A', exploiterInfo: 'N/A', otherVictims: 'N/A', futureRisk: 'N/A', crimeReference: 'N/A', cooperation: 'N/A', refer: 'N/A', upload: 'No' }, true, checkError);
        break;
      case 'Not sure if under18':
        await this.completeQuestionnaire({ location: 'Scotland', under18: 'Not Sure', multipleExploitation: 'Yes', takenSomewhere: 'No', stillExploited: 'No', lastContact: 'Within the last month', firstChance: 'Not sure', indicators: 'No', exploitationLocation: 'UK and Overseas', exploiterInfo: 'No', otherVictims: 'Not sure', futureRisk: 'Yes', crimeReference: 'Yes', cooperation: 'Yes', refer: 'N/A', upload: 'Yes' }, false, checkError);
        break;
      case 'E2E mixed':
        await this.completeQuestionnaire({ location: 'Northern Ireland', under18: 'No', multipleExploitation: 'Yes', takenSomewhere: 'Yes', stillExploited: 'No', lastContact: 'Within the last 3 months', firstChance: 'Yes', indicators: 'Yes', exploitationLocation: 'UK and Overseas', exploiterInfo: 'No', otherVictims: 'Yes', futureRisk: 'No', crimeReference: 'Yes', cooperation: 'Yes', refer: 'Yes', upload: 'Yes', currentLocation: ConstantsLib.UNKNOWN, currentRegion: ConstantsLib.UNKNOWN, decisionRecipient: ConstantsLib.ALTERNATE_DECISION_RECIPIENT }, false, checkError);
        break;
      case 'Add max locations':
        await this.completeQuestionnaire({ location: 'Wales', under18: 'Yes', multipleExploitation: 'No', takenSomewhere: 'No', stillExploited: 'No', lastContact: 'Over a year ago', firstChance: 'No', indicators: 'No', exploitationLocation: 'UK and Overseas', exploiterInfo: 'No', otherVictims: 'No', futureRisk: 'Yes', crimeReference: 'Yes', cooperation: 'Yes', refer: 'N/A', upload: 'Yes', locationCount: 9 }, false, checkError);
        break;
      case "'No' answers - Yes Cooperation":
        await this.completeQuestionnaire({ location: 'England', under18: 'No', multipleExploitation: 'No', takenSomewhere: 'Yes', stillExploited: 'No', lastContact: 'Not sure', firstChance: 'Yes', indicators: 'Yes', exploitationLocation: 'UK', exploiterInfo: 'Yes', otherVictims: 'Yes', futureRisk: 'Yes', crimeReference: 'Yes', cooperation: 'Yes', refer: 'No', upload: 'No' }, false, checkError);
        break;
      case 'Save and exit report':
        await this.completeQuestionnaire({ location: 'England', under18: 'Yes', multipleExploitation: 'No', takenSomewhere: 'Yes', stillExploited: 'N/A', lastContact: 'N/A', firstChance: 'N/A', indicators: 'N/A', exploitationLocation: 'N/A', exploiterInfo: 'N/A', otherVictims: 'N/A', futureRisk: 'N/A', crimeReference: 'N/A', cooperation: 'N/A', refer: 'N/A', upload: 'N/A' }, true, checkError);
        await this.pages.nrmHowWasThePotentialVictimTreatedDuringTheirExploitationPage.fillTreatmentAnswers(ConstantsLib.TEXT_ANSWER);
        break;
      default:
        throw new Error(`No NRM journey is configured for description "${this.scenarioDescription}"`);
    }

    if (partial && this.scenarioDescription !== 'Save and exit report') return;
  }






 private async completeQuestionnaire(scenario: QuestionnaireAnswers, partial: boolean, checkError: string): Promise<void> {
    await this.pages.nrmAddReferencePage.completeReference(this.reportReference, checkError);
    await this.pages.nrmSelectOrganisationPage.completeOrganisation(ConstantsLib.ORGANISATION, checkError);
    await this.answer('nrmWhereAreYouMakingThisReportPage', scenario.location, undefined, checkError);
    await this.answer('nrmIsVictimUnder18Page', scenario.under18, undefined, checkError);

    if (scenario.under18 === ConstantsLib.YES || scenario.under18.toLowerCase() === ConstantsLib.NOT_SURE.toLowerCase()) {
      await this.pages.nrmLocalAuthContactedPage.completeLocalAuthorityDetails();
    } else {
      await this.answer('nrmUnder18AnytimeDuringExploitationPage', ConstantsLib.NO, undefined, checkError);
    }

    await this.answer('nrmBackgroundPage', undefined, ConstantsLib.TEXT_ANSWER, checkError);
    await this.answer('nrmHasThePotentialVictimBeenInMoreThanOneExploitativeSituationPage', scenario.multipleExploitation, undefined, checkError);
    await this.answer(scenario.multipleExploitation === ConstantsLib.YES ? 'nrmWhenDidExploitationHappenMultiplePage' : 'nrmWhenDidExploitationHappenPage', undefined, ConstantsLib.TEXT_ANSWER, checkError);
    await this.answer('nrmHowExploitationStartPage', undefined, ConstantsLib.TEXT_ANSWER, checkError);
    await this.answer('nrmWasThePotentialVictimTakenSomewhereByTheirExploitersPage', scenario.takenSomewhere, ConstantsLib.TEXT_ANSWER, checkError);
    if (partial) {
      return;
    }

    await this.answer('nrmHowWasThePotentialVictimTreatedDuringTheirExploitationPage', undefined, ConstantsLib.TEXT_ANSWER, checkError);
    await this.answer('nrmIsThePotentialVictimStillInAnExploitativeSituationPage', scenario.stillExploited, undefined, checkError);
    await this.answer('nrmHowAndWhyTheyLeftPage', undefined, ConstantsLib.TEXT_ANSWER, checkError);
    await this.answer('nrmWhenWasPotentialVictimAndExploiterLastInContactPage', scenario.lastContact, undefined, checkError);
    if (scenario.lastContact !== 'N/A') {
      await this.answer('nrmTellUsAboutTheLastContactBetweenThePotentialVictimAndTheirExploitersPage', undefined, ConstantsLib.TEXT_ANSWER, checkError);
    }
    await this.answer('nrmFirstTimeOfReportingThisPage', scenario.firstChance, undefined, checkError);
    if (scenario.firstChance === ConstantsLib.NO) {
      await this.answer('nrmWhyAreTheyReportingThisNowPage', undefined, ConstantsLib.TEXT_ANSWER, checkError);
    }
    await this.answer('nrmDidYouIdentifyAnyModernSlaveryIndicatorsPage', scenario.indicators, scenario.indicators === ConstantsLib.YES ? ConstantsLib.TEXT_ANSWER : undefined, checkError);
    await this.answer('nrmTellUsAboutTheInterviewsPage', undefined, ConstantsLib.TEXT_ANSWER, checkError);
    await this.answer('nrmOtherProfessionalOrgInvolvedPage', undefined, ConstantsLib.TEXT_ANSWER, checkError);
    await this.answer('nrmDoYouHaveAnyConcernsAboutThePotentialVictimsCredibilityPage', ConstantsLib.NO, undefined, checkError);
    await this.answer('nrmAreThereOtherProfessionalsOrOrganisationsInvolvedWithThisCasePage', scenario.indicators, scenario.indicators === ConstantsLib.YES ? ConstantsLib.TEXT_ANSWER : undefined, checkError);
    await this.answer('nrmWhereWereTheyExploitedPage', scenario.exploitationLocation, undefined, checkError);
    if (scenario.exploitationLocation.includes('UK')) {
      await this.pages.nrmWhereWereTheyExploitedInTheUKPage.completeUkExploitationLocations(
        ConstantsLib.UK_CITY,
        ConstantsLib.LOCATION_DETAILS,
        scenario.locationCount ?? 1,
      );
    }
    if (scenario.exploitationLocation.includes('Overseas')) {
      await this.pages.nrmWhereWereTheyExploitedOverseasPage.completeOverseasExploitationLocations(
        ConstantsLib.OVERSEAS_COUNTRY,
        ConstantsLib.OVERSEAS_LOCATION_DETAILS,
        scenario.locationCount ?? 1,
      );
    }
    const currentLocation = scenario.currentLocation ?? ConstantsLib.UK_CITY;
    const currentRegion = scenario.currentRegion ?? ConstantsLib.UK_REGION;
    await this.pages.nrmWhereIsThePotentialVictimStayingPage.completeVictimCurrentLocation(currentLocation, currentRegion);
    await this.answer('nrmWhoExploitedThePotentialVictimPage', undefined, ConstantsLib.TEXT_ANSWER, checkError);
    await this.answer('nrmDoYouHaveInformationAboutWhereTheExploitersArePage', scenario.exploiterInfo, undefined, checkError);
    if (scenario.exploiterInfo === ConstantsLib.YES) {
      await this.answer('nrmAreTheExploitersInTheUKPage', ConstantsLib.YES, undefined, checkError);
      await this.answer('nrmWhatInfoDoYouHaveAbtExploiterWhereAbtPage', undefined, ConstantsLib.TEXT_ANSWER, checkError);
    }
    await this.pages.nrmHowWereTheyExploitedPage.completeExploitationTypes();
    await this.answer('nrmWereThereAnyOtherPotentialVictimsPage', scenario.otherVictims, undefined, checkError);
    await this.answer('nrmAreThereConcernsThatThePotentialVictimCouldBeExploitedAgainInTheFuturePage', scenario.futureRisk, undefined, checkError);
    if (scenario.futureRisk === ConstantsLib.YES) {
      await this.answer('nrmWhyAreThereConcernsAboutExploitationInTheFuturePage', undefined, ConstantsLib.TEXT_ANSWER, checkError);
    }
    await this.answer('nrmDoTheyHaveACrimeReferenceNumberRelatedToAnyReportedModernSlaveryCrimeInWhichTheyAreAVictimPage', scenario.crimeReference, undefined, checkError);
    await this.answer('nrmCoOperationWithPublicAuthoritiesPage', scenario.cooperation, undefined, checkError);
    if (scenario.under18 === ConstantsLib.YES || scenario.under18.toLowerCase() === ConstantsLib.NOT_SURE.toLowerCase()) {
      await this.pages.nrmDoesThePotentialVictimConsentToHavingTheirCaseReferredToTheNrmPage.continueWithoutResponse();
      await this.completePotentialVictimQuestionnaire(checkError);
      await this.pages.nrmWhatAreYourContactDetailsPage.completeReporterContactDetails();
      await this.pages.nrmWhoShouldWeContactInYourAbsencePage.completeAbsenceContact(ConstantsLib.EMAIL_ANSWER);
    } else if (scenario.refer === ConstantsLib.NO) {
      await this.answer('nrmDoesThePotentialVictimConsentToHavingTheirCaseReferredToTheNrmPage', scenario.refer, undefined, checkError);
      await this.answer('nrmWhyDontTheyWantTheirCaseReferredPage', undefined, ConstantsLib.WHY_NOT_REFER_DETAILS, checkError);
      await this.answer('nrmWhatIsTheirGenderPage', ConstantsLib.GENDER, undefined, checkError);
      await this.answer('nrmSelectNationalityPage', undefined, '', checkError);
      if (scenario.cooperation === ConstantsLib.YES) {
        await this.pages.nrmWhatIsTheNameOfThePotentialVictimPage.completePotentialVictimName();
        await this.pages.nrmHowShouldTheyBeContactedPage.completeDecisionContactDetails(ConstantsLib.DECISION_RECIPIENT);
      }
    } else {
      await this.answer('nrmDoesThePotentialVictimConsentToHavingTheirCaseReferredToTheNrmPage', scenario.refer, undefined, checkError);
      await this.answer('nrmDoTheyNeedSupportPage', scenario.cooperation === ConstantsLib.YES ? ConstantsLib.YES : ConstantsLib.NO, undefined, checkError);
      if (scenario.cooperation === ConstantsLib.YES) {
        await this.pages.nrmHowCanTheSupportProviderContactThePotentialVictimPage.completeSupportProviderContactDetails();
      }
      await this.completePotentialVictimQuestionnaire(checkError);
      const decisionRecipient = scenario.decisionRecipient ?? ConstantsLib.DECISION_RECIPIENT;
      await this.answer('nrmWhoShouldWeSendDecisionToPage', decisionRecipient, undefined, checkError);
      await this.pages.nrmHowShouldTheyBeContactedPage.completeDecisionContactDetails(decisionRecipient);
      await this.pages.nrmWhatAreYourContactDetailsPage.completeReporterContactDetails();
      await this.pages.nrmWhoShouldWeContactInYourAbsencePage.completeAbsenceContact(ConstantsLib.EMAIL_ANSWER);
    }
    if (scenario.upload === ConstantsLib.YES) {
      await this.answer('nrmEvidenceUploadPage', ConstantsLib.NO, undefined, checkError);
    }
    await this.pages.nrmCheckYourAnswersPage.assertPageTitle(this.pages.nrmCheckYourAnswersPage.page, await this.pages.nrmCheckYourAnswersPage.expectedPageTitle());
  }










  async navigateToDashboard(): Promise<void> {
    await this.pages.nrmDraftReportsPage.navigateToReportsDashboard();
  }

  async continueReport(): Promise<void> {
    const draftReportsPage = this.pages.nrmDraftReportsPage;
    await draftReportsPage.assertPageTitle(draftReportsPage.page, await draftReportsPage.expectedPageTitle());
    await draftReportsPage.openDraftReport(this.reportReference, 'Go to report');
    const progressPage = this.pages.nrmCurrentProgressPage;
    await progressPage.assertPageTitle(progressPage.page, await progressPage.expectedPageTitle());
    await progressPage.continueToNextQuestion();
    await this.pages.nrmWasThePotentialVictimTakenSomewhereByTheirExploitersPage.assertPageTitle(this.pages.nrmWasThePotentialVictimTakenSomewhereByTheirExploitersPage.page, await this.pages.nrmWasThePotentialVictimTakenSomewhereByTheirExploitersPage.expectedPageTitle());
  }

  async deleteReport(): Promise<void> {
    const draftReportsPage = this.pages.nrmDraftReportsPage;
    await draftReportsPage.assertPageTitle(draftReportsPage.page, await draftReportsPage.expectedPageTitle());
    await draftReportsPage.openDraftReport(this.reportReference, 'Delete report');
    await this.pages.nrmDeleteReportPage.assertPageTitle(this.pages.nrmDeleteReportPage.page, await this.pages.nrmDeleteReportPage.expectedPageTitle());
    await this.pages.nrmDeleteReportPage.confirmDeleteReport();
    await draftReportsPage.assertDraftReportDeleted(this.reportReference);
  }

  async saveAndExit(): Promise<void> {
    await this.pages.nrmHowWasThePotentialVictimTreatedDuringTheirExploitationPage.saveAndExitReport();
    await this.pages.nrmYourReportHasBeenSavedPage.assertReportSaved();
  }

  async submitReport(): Promise<void> {
    const checkAnswers = this.pages.nrmCheckYourAnswersPage;
    await checkAnswers.assertPageTitle(checkAnswers.page, await checkAnswers.expectedPageTitle());
    await checkAnswers.submitReport();
    await this.pages.nrmSentConfirmationPage.assertSubmissionConfirmation();
  }

 

  private async completePotentialVictimQuestionnaire(checkError: string): Promise<void> {
    await this.pages.nrmWhatIsTheNameOfThePotentialVictimPage.completePotentialVictimName();
    await this.pages.nrmWhatIsTheirDateOfBirthPage.completeDateOfBirth();
    await this.answer('nrmWhatIsTheirGenderPage', ConstantsLib.GENDER, undefined, checkError);
    await this.answer('nrmDoTheyHaveAnyChildrenPage', ConstantsLib.NO, undefined, checkError);
    await this.answer('nrmSelectNationalityPage', undefined, '', checkError);
    await this.answer('nrmDoTheyNeedInterpreterPage', ConstantsLib.NO, undefined, checkError);
    await this.answer('nrmDoTheyNeedHelpWithCommunicationPage', ConstantsLib.NO, undefined, checkError);
    await this.answer('nrmDoTheyHaveAnyHomeOfficeRefPage', ConstantsLib.NO, undefined, checkError);
  }

  private async answer(pageId: keyof Pages, response?: string, text?: string, checkError: string = ConstantsLib.NO): Promise<void> {
    const nrmPage = this.pages[pageId];
    await nrmPage.assertPageTitle(nrmPage.page, await nrmPage.expectedPageTitle());
    await nrmPage.completeQuestion(text ?? '', response, checkError);
  }
}

Given('Test data has been created for {string} scenarios', async ({ pages }, product: string) => {
  expect(product).toBe('NRM');
  stepLibraries.set(pages, new NrmStepLib(pages));
});

Given('I visit the National Referral Mechanism page', async ({ pages }) => {
  await getStepLib(pages).visitNrm();
});

When('I selected the data for scenario {string}', async ({ pages }, description: string) => {
  const stepLib = stepLibraries.get(pages) ?? new NrmStepLib(pages);
  stepLib.selectScenarioByDescription(description);
  stepLibraries.set(pages, stepLib);
});

When('I enter my work Email {string} and create new report - check error {string}', async ({ pages }, email: string, checkError: string) => {
  await getStepLib(pages).createReport(email, checkError);
});

When('I fill out my answers to the NRM questionnaire - check error {string}', async ({ pages }, checkError: string) => {
  await getStepLib(pages).fillQuestionnaire(false, checkError);
});

When('I fill out my answers to some of the NRM questionnaire - check error {string}', async ({ pages }, checkError: string) => {
  await getStepLib(pages).fillQuestionnaire(true, checkError);
});

When('I navigate back to the reports dashboard', async ({ pages }) => {
  await getStepLib(pages).navigateToDashboard();
});

Then('I am able to click \'Go to report\' button and continue the report', async ({ pages }) => {
  await getStepLib(pages).continueReport();
});

Then('I am able to delete my report', async ({ pages }) => {
  await getStepLib(pages).deleteReport();
});

Then('I click \'Save and exit\' button and confirm my report is saved', async ({ pages }) => {
  await getStepLib(pages).saveAndExit();
});

Then('I am able to submit the NRM questionnaire', async ({ pages }) => {
  await getStepLib(pages).submitReport();
});

function getStepLib(pages: Pages): NrmStepLib {
  const stepLib = stepLibraries.get(pages);
  if (!stepLib) {
    throw new Error('NRM scenario data has not been selected');
  }
  return stepLib;
}