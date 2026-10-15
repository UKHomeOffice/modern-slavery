import { randomUUID } from 'node:crypto';
import { createBdd } from 'playwright-bdd';
import { expect, test, type Pages } from '../fixture/fixtures';
import { ConstantsLib } from '../utility-helper/constants-lib';

export const { Given, When, Then } = createBdd(test);

let reportReference: string;

Given('I visit the National Referral Mechanism page', async ({ pages }) => {
  reportReference = `${ConstantsLib.REFERENCE_PREFIX}-${randomUUID()}`;
  await pages.nrmHomePage.startNrm();
});

Given('I enter my work Email {string} and create new report', async ({ pages }, email: string) => {
  if (email === 'SAS_HOF_EMAIL') {
    email = process.env.SAS_HOF_EMAIL ?? email;
  }

  await pages.nrmWorkEmailPage.sendSecureLink(email);
  await pages.nrmContinueToYourReportPage.assertPageTitle(pages.nrmContinueToYourReportPage.page, await pages.nrmContinueToYourReportPage.expectedPageTitle());
  await pages.nrmContinueToYourReportPage.startReport();
  await pages.nrmDraftReportsPage.assertPageTitle(pages.nrmDraftReportsPage.page, await pages.nrmDraftReportsPage.expectedPageTitle());
  await pages.nrmDraftReportsPage.createDraftReport();
});

When('I fill out my answers to the NRM questionnaire for scenario {string}', async ({ pages }, scenarioDescription: string) => {
  switch (scenarioDescription) {
    case 'T1: Yes answers - under 18':
      await pages.nrmAddReferencePage.completeReference(reportReference);
      await pages.nrmSelectOrganisationPage.completeOrganisation(ConstantsLib.ORGANISATION);
      await pages.nrmWhereAreYouMakingThisReportPage.answerReportLocation('England');
      await pages.nrmIsVictimUnder18Page.answerVictimAge(ConstantsLib.YES);
      await pages.nrmLocalAuthContactedPage.completeLocalAuthorityDetails();
      await pages.nrmBackgroundPage.enterBackgroundDetails(ConstantsLib.TEXT_ANSWER);
      await pages.nrmHasThePotentialVictimBeenInMoreThanOneExploitativeSituationPage.answerMultipleExploitation(ConstantsLib.YES);
      await pages.nrmWhenDidExploitationHappenMultiplePage.enterExploitationPeriod(ConstantsLib.TEXT_ANSWER);
      await pages.nrmHowExploitationStartPage.enterHowExploitationStarted(ConstantsLib.TEXT_ANSWER);
      await pages.nrmWasThePotentialVictimTakenSomewhereByTheirExploitersPage.answerTakenSomewhere(ConstantsLib.YES, ConstantsLib.TEXT_ANSWER);
      await pages.nrmHowWasThePotentialVictimTreatedDuringTheirExploitationPage.enterTreatmentDetails(ConstantsLib.TEXT_ANSWER);
      await pages.nrmIsThePotentialVictimStillInAnExploitativeSituationPage.answerCurrentExploitationStatus(ConstantsLib.NO);
      await pages.nrmHowAndWhyTheyLeftPage.enterLeavingDetails(ConstantsLib.TEXT_ANSWER);
      await pages.nrmWhenWasPotentialVictimAndExploiterLastInContactPage.answerLastContactPeriod('Not sure');
      await pages.nrmTellUsAboutTheLastContactBetweenThePotentialVictimAndTheirExploitersPage.enterLastContactDetails(ConstantsLib.TEXT_ANSWER);
      await pages.nrmFirstTimeOfReportingThisPage.answerFirstReport(ConstantsLib.NO);
      await pages.nrmWhyAreTheyReportingThisNowPage.enterWhyReportNow(ConstantsLib.TEXT_ANSWER);
      await pages.nrmDidYouIdentifyAnyModernSlaveryIndicatorsPage.answerModernSlaveryIndicators(ConstantsLib.YES, ConstantsLib.TEXT_ANSWER);
      await pages.nrmTellUsAboutTheInterviewsPage.enterInterviewDetails(ConstantsLib.TEXT_ANSWER);
      await pages.nrmOtherProfessionalOrgInvolvedPage.enterProfessionalInvolvementDetails(ConstantsLib.TEXT_ANSWER);
      await pages.nrmDoYouHaveAnyConcernsAboutThePotentialVictimsCredibilityPage.answerCredibilityConcern(ConstantsLib.NO);
      await pages.nrmAreThereOtherProfessionalsOrOrganisationsInvolvedWithThisCasePage.answerOtherProfessionalsInvolved(ConstantsLib.YES, ConstantsLib.TEXT_ANSWER);
      await pages.nrmWhereWereTheyExploitedPage.answerExploitationLocations('UK');
      await pages.nrmWhereWereTheyExploitedInTheUKPage.completeUkExploitationLocations(ConstantsLib.UK_CITY, ConstantsLib.LOCATION_DETAILS, 1);
      await pages.nrmWhereIsThePotentialVictimStayingPage.completeVictimCurrentLocation(ConstantsLib.UK_CITY, ConstantsLib.UK_REGION);
      await pages.nrmWhoExploitedThePotentialVictimPage.enterExploiterDetails(ConstantsLib.TEXT_ANSWER);
      await pages.nrmDoYouHaveInformationAboutWhereTheExploitersArePage.answerExploiterInformation(ConstantsLib.YES);
      await pages.nrmAreTheExploitersInTheUKPage.answerExploitersInUk(ConstantsLib.YES);
      await pages.nrmWhatInfoDoYouHaveAbtExploiterWhereAbtPage.enterExploiterLocationDetails(ConstantsLib.TEXT_ANSWER);
      await pages.nrmHowWereTheyExploitedPage.completeExploitationTypes();
      await pages.nrmWereThereAnyOtherPotentialVictimsPage.answerOtherPotentialVictims(ConstantsLib.YES);
      await pages.nrmAreThereConcernsThatThePotentialVictimCouldBeExploitedAgainInTheFuturePage.answerFutureRisk(ConstantsLib.YES);
      await pages.nrmWhyAreThereConcernsAboutExploitationInTheFuturePage.enterFutureRiskDetails(ConstantsLib.TEXT_ANSWER);
      await pages.nrmDoTheyHaveACrimeReferenceNumberRelatedToAnyReportedModernSlaveryCrimeInWhichTheyAreAVictimPage.completeCrimeReference(ConstantsLib.YES);
      await pages.nrmCoOperationWithPublicAuthoritiesPage.answerCooperation(ConstantsLib.YES);
      await pages.nrmDoesThePotentialVictimConsentToHavingTheirCaseReferredToTheNrmPage.continueWithoutResponse();
      await pages.nrmWhatIsTheNameOfThePotentialVictimPage.completePotentialVictimName();
      await pages.nrmWhatIsTheirDateOfBirthPage.completeDateOfBirth();
      await pages.nrmWhatIsTheirGenderPage.answerGender(ConstantsLib.GENDER);
      await pages.nrmDoTheyHaveAnyChildrenPage.answerChildren(ConstantsLib.NO);
      await pages.nrmSelectNationalityPage.completeNationalitySelection();
      await pages.nrmDoTheyNeedInterpreterPage.answerInterpreter(ConstantsLib.NO);
      await pages.nrmDoTheyNeedHelpWithCommunicationPage.answerCommunicationHelp(ConstantsLib.NO);
      await pages.nrmDoTheyHaveAnyHomeOfficeRefPage.answerHomeOfficeReference(ConstantsLib.NO);
      await pages.nrmWhatAreYourContactDetailsPage.completeReporterContactDetails();
      await pages.nrmWhoShouldWeContactInYourAbsencePage.completeAbsenceContact(ConstantsLib.EMAIL_ANSWER);
      await pages.nrmEvidenceUploadPage.continueWithoutEvidence();
      await pages.nrmCheckYourAnswersPage.assertPageTitle(pages.nrmCheckYourAnswersPage.page, await pages.nrmCheckYourAnswersPage.expectedPageTitle());
      break;
    case 'T2: No answers - over 18, No Cooperation':
      await pages.nrmAddReferencePage.completeReference(reportReference);
      await pages.nrmSelectOrganisationPage.completeOrganisation(ConstantsLib.ORGANISATION);
      await pages.nrmWhereAreYouMakingThisReportPage.answerReportLocation('Wales');
      await pages.nrmIsVictimUnder18Page.answerVictimAge(ConstantsLib.NO);
      await pages.nrmUnder18AnytimeDuringExploitationPage.answerUnder18AtAnyTime(ConstantsLib.NO);
      await pages.nrmBackgroundPage.enterBackgroundDetails(ConstantsLib.TEXT_ANSWER);
      await pages.nrmHasThePotentialVictimBeenInMoreThanOneExploitativeSituationPage.answerMultipleExploitation(ConstantsLib.NO);
      await pages.nrmWhenDidExploitationHappenPage.enterExploitationPeriod(ConstantsLib.TEXT_ANSWER);
      await pages.nrmHowExploitationStartPage.enterHowExploitationStarted(ConstantsLib.TEXT_ANSWER);
      await pages.nrmWasThePotentialVictimTakenSomewhereByTheirExploitersPage.answerTakenSomewhere(ConstantsLib.NO, ConstantsLib.TEXT_ANSWER);
      await pages.nrmHowWasThePotentialVictimTreatedDuringTheirExploitationPage.enterTreatmentDetails(ConstantsLib.TEXT_ANSWER);
      await pages.nrmIsThePotentialVictimStillInAnExploitativeSituationPage.answerCurrentExploitationStatus(ConstantsLib.NO);
      await pages.nrmHowAndWhyTheyLeftPage.enterLeavingDetails(ConstantsLib.TEXT_ANSWER);
      await pages.nrmWhenWasPotentialVictimAndExploiterLastInContactPage.answerLastContactPeriod('Within the last week');
      await pages.nrmTellUsAboutTheLastContactBetweenThePotentialVictimAndTheirExploitersPage.enterLastContactDetails(ConstantsLib.TEXT_ANSWER);
      await pages.nrmFirstTimeOfReportingThisPage.answerFirstReport(ConstantsLib.NO);
      await pages.nrmWhyAreTheyReportingThisNowPage.enterWhyReportNow(ConstantsLib.TEXT_ANSWER);
      await pages.nrmDidYouIdentifyAnyModernSlaveryIndicatorsPage.answerModernSlaveryIndicators(ConstantsLib.NO, undefined);
      await pages.nrmTellUsAboutTheInterviewsPage.enterInterviewDetails(ConstantsLib.TEXT_ANSWER);
      await pages.nrmOtherProfessionalOrgInvolvedPage.enterProfessionalInvolvementDetails(ConstantsLib.TEXT_ANSWER);
      await pages.nrmDoYouHaveAnyConcernsAboutThePotentialVictimsCredibilityPage.answerCredibilityConcern(ConstantsLib.NO);
      await pages.nrmAreThereOtherProfessionalsOrOrganisationsInvolvedWithThisCasePage.answerOtherProfessionalsInvolved(ConstantsLib.NO, undefined);
      await pages.nrmWhereWereTheyExploitedPage.answerExploitationLocations('Overseas');
      await pages.nrmWhereWereTheyExploitedOverseasPage.completeOverseasExploitationLocations(ConstantsLib.OVERSEAS_COUNTRY, ConstantsLib.OVERSEAS_LOCATION_DETAILS, 1);
      await pages.nrmWhereIsThePotentialVictimStayingPage.completeVictimCurrentLocation(ConstantsLib.UK_CITY, ConstantsLib.UK_REGION);
      await pages.nrmWhoExploitedThePotentialVictimPage.enterExploiterDetails(ConstantsLib.TEXT_ANSWER);
      await pages.nrmDoYouHaveInformationAboutWhereTheExploitersArePage.answerExploiterInformation(ConstantsLib.YES);
      await pages.nrmAreTheExploitersInTheUKPage.answerExploitersInUk(ConstantsLib.YES);
      await pages.nrmWhatInfoDoYouHaveAbtExploiterWhereAbtPage.enterExploiterLocationDetails(ConstantsLib.TEXT_ANSWER);
      await pages.nrmHowWereTheyExploitedPage.completeExploitationTypes();
      await pages.nrmWereThereAnyOtherPotentialVictimsPage.answerOtherPotentialVictims(ConstantsLib.NO);
      await pages.nrmAreThereConcernsThatThePotentialVictimCouldBeExploitedAgainInTheFuturePage.answerFutureRisk(ConstantsLib.NO);
      await pages.nrmDoTheyHaveACrimeReferenceNumberRelatedToAnyReportedModernSlaveryCrimeInWhichTheyAreAVictimPage.completeCrimeReference(ConstantsLib.NO);
      await pages.nrmCoOperationWithPublicAuthoritiesPage.answerCooperation(ConstantsLib.NO);
      await pages.nrmDoesThePotentialVictimConsentToHavingTheirCaseReferredToTheNrmPage.completeConsent(ConstantsLib.NO);
      await pages.nrmWhyDontTheyWantTheirCaseReferredPage.enterReasonForNoReferral(ConstantsLib.WHY_NOT_REFER_DETAILS);
      await pages.nrmWhatIsTheirGenderPage.answerGender(ConstantsLib.GENDER);
      await pages.nrmSelectNationalityPage.completeNationalitySelection();
      await pages.nrmCheckYourAnswersPage.assertPageTitle(pages.nrmCheckYourAnswersPage.page, await pages.nrmCheckYourAnswersPage.expectedPageTitle());
      break;
    case 'T3: Not sure if under 18':
      await pages.nrmAddReferencePage.completeReference(reportReference);
      await pages.nrmSelectOrganisationPage.completeOrganisation(ConstantsLib.ORGANISATION);
      await pages.nrmWhereAreYouMakingThisReportPage.answerReportLocation('Scotland');
      await pages.nrmIsVictimUnder18Page.answerVictimAge('Not Sure');
      await pages.nrmLocalAuthContactedPage.completeLocalAuthorityDetails();
      await pages.nrmBackgroundPage.enterBackgroundDetails(ConstantsLib.TEXT_ANSWER);
      await pages.nrmHasThePotentialVictimBeenInMoreThanOneExploitativeSituationPage.answerMultipleExploitation(ConstantsLib.YES);
      await pages.nrmWhenDidExploitationHappenMultiplePage.enterExploitationPeriod(ConstantsLib.TEXT_ANSWER);
      await pages.nrmHowExploitationStartPage.enterHowExploitationStarted(ConstantsLib.TEXT_ANSWER);
      await pages.nrmWasThePotentialVictimTakenSomewhereByTheirExploitersPage.answerTakenSomewhere(ConstantsLib.NO, ConstantsLib.TEXT_ANSWER);
      await pages.nrmHowWasThePotentialVictimTreatedDuringTheirExploitationPage.enterTreatmentDetails(ConstantsLib.TEXT_ANSWER);
      await pages.nrmIsThePotentialVictimStillInAnExploitativeSituationPage.answerCurrentExploitationStatus(ConstantsLib.NO);
      await pages.nrmHowAndWhyTheyLeftPage.enterLeavingDetails(ConstantsLib.TEXT_ANSWER);
      await pages.nrmWhenWasPotentialVictimAndExploiterLastInContactPage.answerLastContactPeriod('Within the last month');
      await pages.nrmTellUsAboutTheLastContactBetweenThePotentialVictimAndTheirExploitersPage.enterLastContactDetails(ConstantsLib.TEXT_ANSWER);
      await pages.nrmFirstTimeOfReportingThisPage.answerFirstReport(ConstantsLib.NOT_SURE);
      await pages.nrmDidYouIdentifyAnyModernSlaveryIndicatorsPage.answerModernSlaveryIndicators(ConstantsLib.NO, undefined);
      await pages.nrmTellUsAboutTheInterviewsPage.enterInterviewDetails(ConstantsLib.TEXT_ANSWER);
      await pages.nrmOtherProfessionalOrgInvolvedPage.enterProfessionalInvolvementDetails(ConstantsLib.TEXT_ANSWER);
      await pages.nrmDoYouHaveAnyConcernsAboutThePotentialVictimsCredibilityPage.answerCredibilityConcern(ConstantsLib.NO);
      await pages.nrmAreThereOtherProfessionalsOrOrganisationsInvolvedWithThisCasePage.answerOtherProfessionalsInvolved(ConstantsLib.NO, undefined);
      await pages.nrmWhereWereTheyExploitedPage.answerExploitationLocations('UK and Overseas');
      await pages.nrmWhereWereTheyExploitedInTheUKPage.completeUkExploitationLocations(ConstantsLib.UK_CITY, ConstantsLib.LOCATION_DETAILS, 1);
      await pages.nrmWhereWereTheyExploitedOverseasPage.completeOverseasExploitationLocations(ConstantsLib.OVERSEAS_COUNTRY, ConstantsLib.OVERSEAS_LOCATION_DETAILS, 1);
      await pages.nrmWhereIsThePotentialVictimStayingPage.completeVictimCurrentLocation(ConstantsLib.UK_CITY, ConstantsLib.UK_REGION);
      await pages.nrmWhoExploitedThePotentialVictimPage.enterExploiterDetails(ConstantsLib.TEXT_ANSWER);
      await pages.nrmDoYouHaveInformationAboutWhereTheExploitersArePage.answerExploiterInformation(ConstantsLib.NO);
      await pages.nrmHowWereTheyExploitedPage.completeExploitationTypes();
      await pages.nrmWereThereAnyOtherPotentialVictimsPage.answerOtherPotentialVictims('Not sure');
      await pages.nrmAreThereConcernsThatThePotentialVictimCouldBeExploitedAgainInTheFuturePage.answerFutureRisk(ConstantsLib.YES);
      await pages.nrmWhyAreThereConcernsAboutExploitationInTheFuturePage.enterFutureRiskDetails(ConstantsLib.TEXT_ANSWER);
      await pages.nrmDoTheyHaveACrimeReferenceNumberRelatedToAnyReportedModernSlaveryCrimeInWhichTheyAreAVictimPage.completeCrimeReference(ConstantsLib.YES);
      await pages.nrmCoOperationWithPublicAuthoritiesPage.answerCooperation(ConstantsLib.YES);
      await pages.nrmDoesThePotentialVictimConsentToHavingTheirCaseReferredToTheNrmPage.continueWithoutResponse();
      await pages.nrmWhatIsTheNameOfThePotentialVictimPage.completePotentialVictimName();
      await pages.nrmWhatIsTheirDateOfBirthPage.completeDateOfBirth();
      await pages.nrmWhatIsTheirGenderPage.answerGender(ConstantsLib.GENDER);
      await pages.nrmDoTheyHaveAnyChildrenPage.answerChildren(ConstantsLib.NO);
      await pages.nrmSelectNationalityPage.completeNationalitySelection();
      await pages.nrmDoTheyNeedInterpreterPage.answerInterpreter(ConstantsLib.NO);
      await pages.nrmDoTheyNeedHelpWithCommunicationPage.answerCommunicationHelp(ConstantsLib.NO);
      await pages.nrmDoTheyHaveAnyHomeOfficeRefPage.answerHomeOfficeReference(ConstantsLib.NO);
      await pages.nrmWhatAreYourContactDetailsPage.completeReporterContactDetails();
      await pages.nrmWhoShouldWeContactInYourAbsencePage.completeAbsenceContact(ConstantsLib.EMAIL_ANSWER);
      await pages.nrmEvidenceUploadPage.continueWithoutEvidence();
      await pages.nrmCheckYourAnswersPage.assertPageTitle(pages.nrmCheckYourAnswersPage.page, await pages.nrmCheckYourAnswersPage.expectedPageTitle());
      break;
    case 'T4: E2E mixed':
      await pages.nrmAddReferencePage.completeReference(reportReference);
      await pages.nrmSelectOrganisationPage.completeOrganisation(ConstantsLib.ORGANISATION);
      await pages.nrmWhereAreYouMakingThisReportPage.answerReportLocation('Northern Ireland');
      await pages.nrmIsVictimUnder18Page.answerVictimAge(ConstantsLib.NO);
      await pages.nrmUnder18AnytimeDuringExploitationPage.answerUnder18AtAnyTime(ConstantsLib.NO);
      await pages.nrmBackgroundPage.enterBackgroundDetails(ConstantsLib.TEXT_ANSWER);
      await pages.nrmHasThePotentialVictimBeenInMoreThanOneExploitativeSituationPage.answerMultipleExploitation(ConstantsLib.YES);
      await pages.nrmWhenDidExploitationHappenMultiplePage.enterExploitationPeriod(ConstantsLib.TEXT_ANSWER);
      await pages.nrmHowExploitationStartPage.enterHowExploitationStarted(ConstantsLib.TEXT_ANSWER);
      await pages.nrmWasThePotentialVictimTakenSomewhereByTheirExploitersPage.answerTakenSomewhere(ConstantsLib.YES, ConstantsLib.TEXT_ANSWER);
      await pages.nrmHowWasThePotentialVictimTreatedDuringTheirExploitationPage.enterTreatmentDetails(ConstantsLib.TEXT_ANSWER);
      await pages.nrmIsThePotentialVictimStillInAnExploitativeSituationPage.answerCurrentExploitationStatus(ConstantsLib.NO);
      await pages.nrmHowAndWhyTheyLeftPage.enterLeavingDetails(ConstantsLib.TEXT_ANSWER);
      await pages.nrmWhenWasPotentialVictimAndExploiterLastInContactPage.answerLastContactPeriod('Within the last 3 months');
      await pages.nrmTellUsAboutTheLastContactBetweenThePotentialVictimAndTheirExploitersPage.enterLastContactDetails(ConstantsLib.TEXT_ANSWER);
      await pages.nrmFirstTimeOfReportingThisPage.answerFirstReport(ConstantsLib.YES);
      await pages.nrmDidYouIdentifyAnyModernSlaveryIndicatorsPage.answerModernSlaveryIndicators(ConstantsLib.YES, ConstantsLib.TEXT_ANSWER);
      await pages.nrmTellUsAboutTheInterviewsPage.enterInterviewDetails(ConstantsLib.TEXT_ANSWER);
      await pages.nrmOtherProfessionalOrgInvolvedPage.enterProfessionalInvolvementDetails(ConstantsLib.TEXT_ANSWER);
      await pages.nrmDoYouHaveAnyConcernsAboutThePotentialVictimsCredibilityPage.answerCredibilityConcern(ConstantsLib.NO);
      await pages.nrmAreThereOtherProfessionalsOrOrganisationsInvolvedWithThisCasePage.answerOtherProfessionalsInvolved(ConstantsLib.YES, ConstantsLib.TEXT_ANSWER);
      await pages.nrmWhereWereTheyExploitedPage.answerExploitationLocations('UK and Overseas');
      await pages.nrmWhereWereTheyExploitedInTheUKPage.completeUkExploitationLocations(ConstantsLib.UK_CITY, ConstantsLib.LOCATION_DETAILS, 1);
      await pages.nrmWhereWereTheyExploitedOverseasPage.completeOverseasExploitationLocations(ConstantsLib.OVERSEAS_COUNTRY, ConstantsLib.OVERSEAS_LOCATION_DETAILS, 1);
      await pages.nrmWhereIsThePotentialVictimStayingPage.completeVictimCurrentLocation(ConstantsLib.UNKNOWN, ConstantsLib.UNKNOWN);
      await pages.nrmWhoExploitedThePotentialVictimPage.enterExploiterDetails(ConstantsLib.TEXT_ANSWER);
      await pages.nrmDoYouHaveInformationAboutWhereTheExploitersArePage.answerExploiterInformation(ConstantsLib.NO);
      await pages.nrmHowWereTheyExploitedPage.completeExploitationTypes();
      await pages.nrmWereThereAnyOtherPotentialVictimsPage.answerOtherPotentialVictims(ConstantsLib.YES);
      await pages.nrmAreThereConcernsThatThePotentialVictimCouldBeExploitedAgainInTheFuturePage.answerFutureRisk(ConstantsLib.NO);
      await pages.nrmDoTheyHaveACrimeReferenceNumberRelatedToAnyReportedModernSlaveryCrimeInWhichTheyAreAVictimPage.completeCrimeReference(ConstantsLib.YES);
      await pages.nrmCoOperationWithPublicAuthoritiesPage.answerCooperation(ConstantsLib.YES);
      await pages.nrmDoesThePotentialVictimConsentToHavingTheirCaseReferredToTheNrmPage.completeConsent(ConstantsLib.YES);
      await pages.nrmDoTheyNeedSupportPage.answerSupportNeed(ConstantsLib.YES);
      await pages.nrmHowCanTheSupportProviderContactThePotentialVictimPage.completeSupportProviderContactDetails();
      await pages.nrmWhatIsTheNameOfThePotentialVictimPage.completePotentialVictimName();
      await pages.nrmWhatIsTheirDateOfBirthPage.completeDateOfBirth();
      await pages.nrmWhatIsTheirGenderPage.answerGender(ConstantsLib.GENDER);
      await pages.nrmDoTheyHaveAnyChildrenPage.answerChildren(ConstantsLib.NO);
      await pages.nrmSelectNationalityPage.completeNationalitySelection();
      await pages.nrmDoTheyNeedInterpreterPage.answerInterpreter(ConstantsLib.NO);
      await pages.nrmDoTheyNeedHelpWithCommunicationPage.answerCommunicationHelp(ConstantsLib.NO);
      await pages.nrmDoTheyHaveAnyHomeOfficeRefPage.answerHomeOfficeReference(ConstantsLib.NO);
      await pages.nrmWhoShouldWeSendDecisionToPage.answerDecisionRecipient(ConstantsLib.ALTERNATE_DECISION_RECIPIENT);
      await pages.nrmHowShouldTheyBeContactedPage.completeDecisionContactDetails(ConstantsLib.ALTERNATE_DECISION_RECIPIENT);
      await pages.nrmWhatAreYourContactDetailsPage.completeReporterContactDetails();
      await pages.nrmWhoShouldWeContactInYourAbsencePage.completeAbsenceContact(ConstantsLib.EMAIL_ANSWER);
      await pages.nrmEvidenceUploadPage.continueWithoutEvidence();
      await pages.nrmCheckYourAnswersPage.assertPageTitle(pages.nrmCheckYourAnswersPage.page, await pages.nrmCheckYourAnswersPage.expectedPageTitle());
      break;
    case 'T5: Add max locations':
      await pages.nrmAddReferencePage.completeReference(reportReference);
      await pages.nrmSelectOrganisationPage.completeOrganisation(ConstantsLib.ORGANISATION);
      await pages.nrmWhereAreYouMakingThisReportPage.answerReportLocation('Wales');
      await pages.nrmIsVictimUnder18Page.answerVictimAge(ConstantsLib.YES);
      await pages.nrmLocalAuthContactedPage.completeLocalAuthorityDetails();
      await pages.nrmBackgroundPage.enterBackgroundDetails(ConstantsLib.TEXT_ANSWER);
      await pages.nrmHasThePotentialVictimBeenInMoreThanOneExploitativeSituationPage.answerMultipleExploitation(ConstantsLib.NO);
      await pages.nrmWhenDidExploitationHappenPage.enterExploitationPeriod(ConstantsLib.TEXT_ANSWER);
      await pages.nrmHowExploitationStartPage.enterHowExploitationStarted(ConstantsLib.TEXT_ANSWER);
      await pages.nrmWasThePotentialVictimTakenSomewhereByTheirExploitersPage.answerTakenSomewhere(ConstantsLib.NO, ConstantsLib.TEXT_ANSWER);
      await pages.nrmHowWasThePotentialVictimTreatedDuringTheirExploitationPage.enterTreatmentDetails(ConstantsLib.TEXT_ANSWER);
      await pages.nrmIsThePotentialVictimStillInAnExploitativeSituationPage.answerCurrentExploitationStatus(ConstantsLib.NO);
      await pages.nrmHowAndWhyTheyLeftPage.enterLeavingDetails(ConstantsLib.TEXT_ANSWER);
      await pages.nrmWhenWasPotentialVictimAndExploiterLastInContactPage.answerLastContactPeriod('Over a year ago');
      await pages.nrmTellUsAboutTheLastContactBetweenThePotentialVictimAndTheirExploitersPage.enterLastContactDetails(ConstantsLib.TEXT_ANSWER);
      await pages.nrmFirstTimeOfReportingThisPage.answerFirstReport(ConstantsLib.NO);
      await pages.nrmWhyAreTheyReportingThisNowPage.enterWhyReportNow(ConstantsLib.TEXT_ANSWER);
      await pages.nrmDidYouIdentifyAnyModernSlaveryIndicatorsPage.answerModernSlaveryIndicators(ConstantsLib.NO, undefined);
      await pages.nrmTellUsAboutTheInterviewsPage.enterInterviewDetails(ConstantsLib.TEXT_ANSWER);
      await pages.nrmOtherProfessionalOrgInvolvedPage.enterProfessionalInvolvementDetails(ConstantsLib.TEXT_ANSWER);
      await pages.nrmDoYouHaveAnyConcernsAboutThePotentialVictimsCredibilityPage.answerCredibilityConcern(ConstantsLib.NO);
      await pages.nrmAreThereOtherProfessionalsOrOrganisationsInvolvedWithThisCasePage.answerOtherProfessionalsInvolved(ConstantsLib.NO, undefined);
      await pages.nrmWhereWereTheyExploitedPage.answerExploitationLocations('UK and Overseas');
      await pages.nrmWhereWereTheyExploitedInTheUKPage.completeUkExploitationLocations(ConstantsLib.UK_CITY, ConstantsLib.LOCATION_DETAILS, 9);
      await pages.nrmWhereWereTheyExploitedOverseasPage.completeOverseasExploitationLocations(ConstantsLib.OVERSEAS_COUNTRY, ConstantsLib.OVERSEAS_LOCATION_DETAILS, 9);
      await pages.nrmWhereIsThePotentialVictimStayingPage.completeVictimCurrentLocation(ConstantsLib.UK_CITY, ConstantsLib.UK_REGION);
      await pages.nrmWhoExploitedThePotentialVictimPage.enterExploiterDetails(ConstantsLib.TEXT_ANSWER);
      await pages.nrmDoYouHaveInformationAboutWhereTheExploitersArePage.answerExploiterInformation(ConstantsLib.NO);
      await pages.nrmHowWereTheyExploitedPage.completeExploitationTypes();
      await pages.nrmWereThereAnyOtherPotentialVictimsPage.answerOtherPotentialVictims(ConstantsLib.NO);
      await pages.nrmAreThereConcernsThatThePotentialVictimCouldBeExploitedAgainInTheFuturePage.answerFutureRisk(ConstantsLib.YES);
      await pages.nrmWhyAreThereConcernsAboutExploitationInTheFuturePage.enterFutureRiskDetails(ConstantsLib.TEXT_ANSWER);
      await pages.nrmDoTheyHaveACrimeReferenceNumberRelatedToAnyReportedModernSlaveryCrimeInWhichTheyAreAVictimPage.completeCrimeReference(ConstantsLib.YES);
      await pages.nrmCoOperationWithPublicAuthoritiesPage.answerCooperation(ConstantsLib.YES);
      await pages.nrmDoesThePotentialVictimConsentToHavingTheirCaseReferredToTheNrmPage.continueWithoutResponse();
      await pages.nrmWhatIsTheNameOfThePotentialVictimPage.completePotentialVictimName();
      await pages.nrmWhatIsTheirDateOfBirthPage.completeDateOfBirth();
      await pages.nrmWhatIsTheirGenderPage.answerGender(ConstantsLib.GENDER);
      await pages.nrmDoTheyHaveAnyChildrenPage.answerChildren(ConstantsLib.NO);
      await pages.nrmSelectNationalityPage.completeNationalitySelection();
      await pages.nrmDoTheyNeedInterpreterPage.answerInterpreter(ConstantsLib.NO);
      await pages.nrmDoTheyNeedHelpWithCommunicationPage.answerCommunicationHelp(ConstantsLib.NO);
      await pages.nrmDoTheyHaveAnyHomeOfficeRefPage.answerHomeOfficeReference(ConstantsLib.NO);
      await pages.nrmWhatAreYourContactDetailsPage.completeReporterContactDetails();
      await pages.nrmWhoShouldWeContactInYourAbsencePage.completeAbsenceContact(ConstantsLib.EMAIL_ANSWER);
      await pages.nrmEvidenceUploadPage.continueWithoutEvidence();
      await pages.nrmCheckYourAnswersPage.assertPageTitle(pages.nrmCheckYourAnswersPage.page, await pages.nrmCheckYourAnswersPage.expectedPageTitle());
      break;
    case 'T6: No answers - Yes Cooperation':
      await pages.nrmAddReferencePage.completeReference(reportReference);
      await pages.nrmSelectOrganisationPage.completeOrganisation(ConstantsLib.ORGANISATION);
      await pages.nrmWhereAreYouMakingThisReportPage.answerReportLocation('England');
      await pages.nrmIsVictimUnder18Page.answerVictimAge(ConstantsLib.NO);
      await pages.nrmUnder18AnytimeDuringExploitationPage.answerUnder18AtAnyTime(ConstantsLib.NO);
      await pages.nrmBackgroundPage.enterBackgroundDetails(ConstantsLib.TEXT_ANSWER);
      await pages.nrmHasThePotentialVictimBeenInMoreThanOneExploitativeSituationPage.answerMultipleExploitation(ConstantsLib.NO);
      await pages.nrmWhenDidExploitationHappenPage.enterExploitationPeriod(ConstantsLib.TEXT_ANSWER);
      await pages.nrmHowExploitationStartPage.enterHowExploitationStarted(ConstantsLib.TEXT_ANSWER);
      await pages.nrmWasThePotentialVictimTakenSomewhereByTheirExploitersPage.answerTakenSomewhere(ConstantsLib.YES, ConstantsLib.TEXT_ANSWER);
      await pages.nrmHowWasThePotentialVictimTreatedDuringTheirExploitationPage.enterTreatmentDetails(ConstantsLib.TEXT_ANSWER);
      await pages.nrmIsThePotentialVictimStillInAnExploitativeSituationPage.answerCurrentExploitationStatus(ConstantsLib.NO);
      await pages.nrmHowAndWhyTheyLeftPage.enterLeavingDetails(ConstantsLib.TEXT_ANSWER);
      await pages.nrmWhenWasPotentialVictimAndExploiterLastInContactPage.answerLastContactPeriod('Not sure');
      await pages.nrmTellUsAboutTheLastContactBetweenThePotentialVictimAndTheirExploitersPage.enterLastContactDetails(ConstantsLib.TEXT_ANSWER);
      await pages.nrmFirstTimeOfReportingThisPage.answerFirstReport(ConstantsLib.YES);
      await pages.nrmDidYouIdentifyAnyModernSlaveryIndicatorsPage.answerModernSlaveryIndicators(ConstantsLib.YES, ConstantsLib.TEXT_ANSWER);
      await pages.nrmTellUsAboutTheInterviewsPage.enterInterviewDetails(ConstantsLib.TEXT_ANSWER);
      await pages.nrmOtherProfessionalOrgInvolvedPage.enterProfessionalInvolvementDetails(ConstantsLib.TEXT_ANSWER);
      await pages.nrmDoYouHaveAnyConcernsAboutThePotentialVictimsCredibilityPage.answerCredibilityConcern(ConstantsLib.NO);
      await pages.nrmAreThereOtherProfessionalsOrOrganisationsInvolvedWithThisCasePage.answerOtherProfessionalsInvolved(ConstantsLib.YES, ConstantsLib.TEXT_ANSWER);
      await pages.nrmWhereWereTheyExploitedPage.answerExploitationLocations('UK');
      await pages.nrmWhereWereTheyExploitedInTheUKPage.completeUkExploitationLocations(ConstantsLib.UK_CITY, ConstantsLib.LOCATION_DETAILS, 1);
      await pages.nrmWhereIsThePotentialVictimStayingPage.completeVictimCurrentLocation(ConstantsLib.UK_CITY, ConstantsLib.UK_REGION);
      await pages.nrmWhoExploitedThePotentialVictimPage.enterExploiterDetails(ConstantsLib.TEXT_ANSWER);
      await pages.nrmDoYouHaveInformationAboutWhereTheExploitersArePage.answerExploiterInformation(ConstantsLib.YES);
      await pages.nrmAreTheExploitersInTheUKPage.answerExploitersInUk(ConstantsLib.YES);
      await pages.nrmWhatInfoDoYouHaveAbtExploiterWhereAbtPage.enterExploiterLocationDetails(ConstantsLib.TEXT_ANSWER);
      await pages.nrmHowWereTheyExploitedPage.completeExploitationTypes();
      await pages.nrmWereThereAnyOtherPotentialVictimsPage.answerOtherPotentialVictims(ConstantsLib.YES);
      await pages.nrmAreThereConcernsThatThePotentialVictimCouldBeExploitedAgainInTheFuturePage.answerFutureRisk(ConstantsLib.YES);
      await pages.nrmWhyAreThereConcernsAboutExploitationInTheFuturePage.enterFutureRiskDetails(ConstantsLib.TEXT_ANSWER);
      await pages.nrmDoTheyHaveACrimeReferenceNumberRelatedToAnyReportedModernSlaveryCrimeInWhichTheyAreAVictimPage.completeCrimeReference(ConstantsLib.YES);
      await pages.nrmCoOperationWithPublicAuthoritiesPage.answerCooperation(ConstantsLib.YES);
      await pages.nrmDoesThePotentialVictimConsentToHavingTheirCaseReferredToTheNrmPage.completeConsent(ConstantsLib.NO);
      await pages.nrmWhyDontTheyWantTheirCaseReferredPage.enterReasonForNoReferral(ConstantsLib.WHY_NOT_REFER_DETAILS);
      await pages.nrmWhatIsTheirGenderPage.answerGender(ConstantsLib.GENDER);
      await pages.nrmSelectNationalityPage.completeNationalitySelection();
      await pages.nrmWhatIsTheNameOfThePotentialVictimPage.completePotentialVictimName();
      await pages.nrmHowShouldTheyBeContactedPage.completeDecisionContactDetails(ConstantsLib.DECISION_RECIPIENT);
      await pages.nrmCheckYourAnswersPage.assertPageTitle(pages.nrmCheckYourAnswersPage.page, await pages.nrmCheckYourAnswersPage.expectedPageTitle());
      break;
    case 'Continue report':
      await pages.nrmAddReferencePage.completeReference(reportReference);
      await pages.nrmSelectOrganisationPage.completeOrganisation(ConstantsLib.ORGANISATION);
      await pages.nrmWhereAreYouMakingThisReportPage.answerReportLocation('England');
      await pages.nrmIsVictimUnder18Page.answerVictimAge(ConstantsLib.YES);
      await pages.nrmLocalAuthContactedPage.completeLocalAuthorityDetails();
      await pages.nrmBackgroundPage.enterBackgroundDetails(ConstantsLib.TEXT_ANSWER);
      await pages.nrmHasThePotentialVictimBeenInMoreThanOneExploitativeSituationPage.answerMultipleExploitation(ConstantsLib.NO);
      await pages.nrmWhenDidExploitationHappenPage.enterExploitationPeriod(ConstantsLib.TEXT_ANSWER);
      await pages.nrmHowExploitationStartPage.enterHowExploitationStarted(ConstantsLib.TEXT_ANSWER);
      await pages.nrmWasThePotentialVictimTakenSomewhereByTheirExploitersPage.answerTakenSomewhere(ConstantsLib.YES, ConstantsLib.TEXT_ANSWER);
      break;
    case 'Delete report':
      await pages.nrmAddReferencePage.completeReference(reportReference);
      await pages.nrmSelectOrganisationPage.completeOrganisation(ConstantsLib.ORGANISATION);
      await pages.nrmWhereAreYouMakingThisReportPage.answerReportLocation('Scotland');
      await pages.nrmIsVictimUnder18Page.answerVictimAge(ConstantsLib.YES);
      await pages.nrmLocalAuthContactedPage.completeLocalAuthorityDetails();
      await pages.nrmBackgroundPage.enterBackgroundDetails(ConstantsLib.TEXT_ANSWER);
      await pages.nrmHasThePotentialVictimBeenInMoreThanOneExploitativeSituationPage.answerMultipleExploitation("I don't know");
      await pages.nrmWhenDidExploitationHappenPage.enterExploitationPeriod(ConstantsLib.TEXT_ANSWER);
      await pages.nrmHowExploitationStartPage.enterHowExploitationStarted(ConstantsLib.TEXT_ANSWER);
      await pages.nrmWasThePotentialVictimTakenSomewhereByTheirExploitersPage.answerTakenSomewhere(ConstantsLib.YES, ConstantsLib.TEXT_ANSWER);
      break;
    case 'Save and exit report':
      await pages.nrmAddReferencePage.completeReference(reportReference);
      await pages.nrmSelectOrganisationPage.completeOrganisation(ConstantsLib.ORGANISATION);
      await pages.nrmWhereAreYouMakingThisReportPage.answerReportLocation('England');
      await pages.nrmIsVictimUnder18Page.answerVictimAge(ConstantsLib.YES);
      await pages.nrmLocalAuthContactedPage.completeLocalAuthorityDetails();
      await pages.nrmBackgroundPage.enterBackgroundDetails(ConstantsLib.TEXT_ANSWER);
      await pages.nrmHasThePotentialVictimBeenInMoreThanOneExploitativeSituationPage.answerMultipleExploitation(ConstantsLib.NO);
      await pages.nrmWhenDidExploitationHappenPage.enterExploitationPeriod(ConstantsLib.TEXT_ANSWER);
      await pages.nrmHowExploitationStartPage.enterHowExploitationStarted(ConstantsLib.TEXT_ANSWER);
      await pages.nrmWasThePotentialVictimTakenSomewhereByTheirExploitersPage.answerTakenSomewhere(ConstantsLib.YES, ConstantsLib.TEXT_ANSWER);
      await pages.nrmHowWasThePotentialVictimTreatedDuringTheirExploitationPage.fillTreatmentAnswers(ConstantsLib.TEXT_ANSWER);
      break;
    default:
      throw new Error(`No NRM journey for scenario description "${scenarioDescription}"`);
  }
});

When('I choose to send report', async ({pages}) => {
  await pages.nrmCheckYourAnswersPage.submitReport();
});

Then('I should see {string} header on the confirmation page', async ({ pages }, pageHeader: string) => {
  await pages.nrmSentConfirmationPage.assertSubmissionConfirmationPageTitle();
  await pages.nrmSentConfirmationPage.assertConfirmationPageAndHeader(pageHeader);
});

When('I navigate back to the reports dashboard', async ({ pages }) => {
  await pages.nrmDraftReportsPage.navigateToReportsDashboard();
});

Then('I am able to click \'Go to report\' button and continue the report', async ({ pages }) => {
  await pages.nrmDraftReportsPage.assertPageTitle(pages.nrmDraftReportsPage.page, await pages.nrmDraftReportsPage.expectedPageTitle());
  await pages.nrmDraftReportsPage.openDraftReport(reportReference, 'Go to report');

  await pages.nrmCurrentProgressPage.assertPageTitle(pages.nrmCurrentProgressPage.page, await pages.nrmCurrentProgressPage.expectedPageTitle());
  await pages.nrmCurrentProgressPage.continueToNextQuestion();
  await pages.nrmWasThePotentialVictimTakenSomewhereByTheirExploitersPage
    .assertPageTitle(pages.nrmWasThePotentialVictimTakenSomewhereByTheirExploitersPage.page, await pages.nrmWasThePotentialVictimTakenSomewhereByTheirExploitersPage.expectedPageTitle());
});

Then('I am able to delete my report', async ({ pages }) => {
  await pages.nrmDraftReportsPage.assertPageTitle(pages.nrmDraftReportsPage.page, await pages.nrmDraftReportsPage.expectedPageTitle());
  await pages.nrmDraftReportsPage.openDraftReport(reportReference, 'Delete report');

  await pages.nrmDeleteReportPage.assertPageTitle(pages.nrmDeleteReportPage.page, await pages.nrmDeleteReportPage.expectedPageTitle());
  await pages.nrmDeleteReportPage.confirmDeleteReport();
  await pages.nrmDraftReportsPage.assertDraftReportDeleted(reportReference);
});

Then('I click \'Save and exit\' button and confirm my report is saved', async ({ pages }) => {
  await pages.nrmHowWasThePotentialVictimTreatedDuringTheirExploitationPage.saveAndExitReport();
  await pages.nrmYourReportHasBeenSavedPage.assertReportSaved();
});

//************************************************************************************************************************************************//
//**************************************************  Validation Test start from here ************************************************************//
//************************************************************************************************************************************************//

When('I allow time for the full NRM validation journey', async () => {
  test.setTimeout(120_000);
});

When('I select continue', async ({ pages }) => {
  await pages.basePage.clickContinueButton();
});

When('I complete the NRM validation page with valid answers for {string}', async ({ pages }, pageName: string) => {
  switch (pageName) {
    case 'reference':
      await pages.nrmAddReferencePage.completeReference(reportReference);
      break;
    case 'organisation':
      await pages.nrmSelectOrganisationPage.completeOrganisation(ConstantsLib.ORGANISATION);
      break;
    case 'report location':
      await pages.nrmWhereAreYouMakingThisReportPage.answerReportLocation('England');
      break;
    case 'victim age':
      await pages.nrmIsVictimUnder18Page.answerVictimAge(ConstantsLib.NO);
      break;
    case 'age during exploitation':
      await pages.nrmUnder18AnytimeDuringExploitationPage.answerUnder18AtAnyTime(ConstantsLib.NO);
      break;
    case 'background':
      await pages.nrmBackgroundPage.enterBackgroundDetails(ConstantsLib.TEXT_ANSWER);
      break;
    case 'multiple exploitation':
      await pages.nrmHasThePotentialVictimBeenInMoreThanOneExploitativeSituationPage.answerMultipleExploitation(ConstantsLib.NO);
      break;
    case 'exploitation period':
      await pages.nrmWhenDidExploitationHappenPage.enterExploitationPeriod(ConstantsLib.TEXT_ANSWER);
      break;
    case 'how exploitation started':
      await pages.nrmHowExploitationStartPage.enterHowExploitationStarted(ConstantsLib.TEXT_ANSWER);
      break;
    case 'taken somewhere without details':
      await pages.nrmWasThePotentialVictimTakenSomewhereByTheirExploitersPage.answerTakenSomewhere(ConstantsLib.YES, '');
      break;
    case 'taken somewhere':
      await pages.nrmWasThePotentialVictimTakenSomewhereByTheirExploitersPage.answerTakenSomewhere(ConstantsLib.YES, ConstantsLib.TEXT_ANSWER);
      break;
    case 'treatment details':
      await pages.nrmHowWasThePotentialVictimTreatedDuringTheirExploitationPage.enterTreatmentDetails(ConstantsLib.TEXT_ANSWER);
      break;
    case 'current exploitation status':
      await pages.nrmIsThePotentialVictimStillInAnExploitativeSituationPage.answerCurrentExploitationStatus(ConstantsLib.NO);
      break;
    case 'leaving the situation':
      await pages.nrmHowAndWhyTheyLeftPage.enterLeavingDetails(ConstantsLib.TEXT_ANSWER);
      break;
    case 'last contact period':
      await pages.nrmWhenWasPotentialVictimAndExploiterLastInContactPage.answerLastContactPeriod('Not sure');
      break;
    case 'last contact details':
      await pages.nrmTellUsAboutTheLastContactBetweenThePotentialVictimAndTheirExploitersPage.enterLastContactDetails(ConstantsLib.TEXT_ANSWER);
      break;
    case 'first report':
      await pages.nrmFirstTimeOfReportingThisPage.answerFirstReport(ConstantsLib.NO);
      break;
    case 'why report now':
      await pages.nrmWhyAreTheyReportingThisNowPage.enterWhyReportNow(ConstantsLib.TEXT_ANSWER);
      break;
    case 'indicators without details':
      await pages.nrmDidYouIdentifyAnyModernSlaveryIndicatorsPage.answerModernSlaveryIndicators(ConstantsLib.YES, '');
      break;
    case 'indicators':
      await pages.nrmDidYouIdentifyAnyModernSlaveryIndicatorsPage.answerModernSlaveryIndicators(ConstantsLib.YES, ConstantsLib.TEXT_ANSWER);
      break;
    case 'interviews':
      await pages.nrmTellUsAboutTheInterviewsPage.enterInterviewDetails(ConstantsLib.TEXT_ANSWER);
      break;
    case 'professional insight':
      await pages.nrmOtherProfessionalOrgInvolvedPage.enterProfessionalInvolvementDetails(ConstantsLib.TEXT_ANSWER);
      break;
    case 'credibility':
      await pages.nrmDoYouHaveAnyConcernsAboutThePotentialVictimsCredibilityPage.answerCredibilityConcern(ConstantsLib.NO);
      break;
    case 'other professionals without details':
      await pages.nrmAreThereOtherProfessionalsOrOrganisationsInvolvedWithThisCasePage.answerOtherProfessionalsInvolved(ConstantsLib.YES, '');
      break;
    case 'other professionals':
      await pages.nrmAreThereOtherProfessionalsOrOrganisationsInvolvedWithThisCasePage.answerOtherProfessionalsInvolved(ConstantsLib.YES, ConstantsLib.TEXT_ANSWER);
      break;
    case 'exploitation location type':
      await pages.nrmWhereWereTheyExploitedPage.answerExploitationLocations('UK');
      break;
    case 'UK exploitation location':
      await pages.nrmWhereWereTheyExploitedInTheUKPage.completeUkExploitationLocations(ConstantsLib.UK_CITY, ConstantsLib.LOCATION_DETAILS, 1);
      break;
    case 'current victim location':
      await pages.nrmWhereIsThePotentialVictimStayingPage.completeVictimCurrentLocation(ConstantsLib.UK_CITY, ConstantsLib.UK_REGION);
      break;
    case 'exploiter details':
      await pages.nrmWhoExploitedThePotentialVictimPage.enterExploiterDetails(ConstantsLib.TEXT_ANSWER);
      break;
    case 'exploiter location availability':
      await pages.nrmDoYouHaveInformationAboutWhereTheExploitersArePage.answerExploiterInformation(ConstantsLib.YES);
      break;
    case 'exploiters in UK':
      await pages.nrmAreTheExploitersInTheUKPage.answerExploitersInUk(ConstantsLib.YES);
      break;
    case 'exploiter location details':
      await pages.nrmWhatInfoDoYouHaveAbtExploiterWhereAbtPage.enterExploiterLocationDetails(ConstantsLib.TEXT_ANSWER);
      break;
    case 'exploitation types':
      await pages.nrmHowWereTheyExploitedPage.completeExploitationTypes();
      break;
    case 'other potential victims':
      await pages.nrmWereThereAnyOtherPotentialVictimsPage.answerOtherPotentialVictims(ConstantsLib.YES);
      break;
    case 'future exploitation risk':
      await pages.nrmAreThereConcernsThatThePotentialVictimCouldBeExploitedAgainInTheFuturePage.answerFutureRisk(ConstantsLib.YES);
      break;
    case 'future exploitation details':
      await pages.nrmWhyAreThereConcernsAboutExploitationInTheFuturePage.enterFutureRiskDetails(ConstantsLib.TEXT_ANSWER);
      break;
    case 'crime reference without details':
      await pages.nrmDoTheyHaveACrimeReferenceNumberRelatedToAnyReportedModernSlaveryCrimeInWhichTheyAreAVictimPage.selectCrimeReferenceAnswer(ConstantsLib.YES);
      await pages.basePage.clickContinueButton();
      break;
    case 'crime reference':
      await pages.nrmDoTheyHaveACrimeReferenceNumberRelatedToAnyReportedModernSlaveryCrimeInWhichTheyAreAVictimPage.completeCrimeReference(ConstantsLib.YES);
      break;
    case 'co-operation':
      await pages.nrmCoOperationWithPublicAuthoritiesPage.answerCooperation(ConstantsLib.YES);
      break;
    case 'NRM decision':
      await pages.nrmDoesThePotentialVictimConsentToHavingTheirCaseReferredToTheNrmPage.completeConsent(ConstantsLib.YES);
      break;
    case 'support required':
      await pages.nrmDoTheyNeedSupportPage.answerSupportNeed(ConstantsLib.NO);
      break;
    case 'potential victim name':
      await pages.nrmWhatIsTheNameOfThePotentialVictimPage.completePotentialVictimName();
      break;
    case 'date of birth':
      await pages.nrmWhatIsTheirDateOfBirthPage.completeDateOfBirth();
      break;
    case 'gender':
      await pages.nrmWhatIsTheirGenderPage.answerGender(ConstantsLib.GENDER);
      break;
    case 'children':
      await pages.nrmDoTheyHaveAnyChildrenPage.answerChildren(ConstantsLib.NO);
      break;
    case 'nationality':
      await pages.nrmSelectNationalityPage.completeNationalitySelection();
      break;
    case 'interpreter':
      await pages.nrmDoTheyNeedInterpreterPage.answerInterpreter(ConstantsLib.NO);
      break;
    case 'communication help':
      await pages.nrmDoTheyNeedHelpWithCommunicationPage.answerCommunicationHelp(ConstantsLib.NO);
      break;
    case 'Home Office reference':
      await pages.nrmDoTheyHaveAnyHomeOfficeRefPage.answerHomeOfficeReference(ConstantsLib.NO);
      break;
    case 'decision recipient':
      await pages.nrmWhoShouldWeSendDecisionToPage.answerDecisionRecipient(ConstantsLib.DECISION_RECIPIENT);
      break;
    case 'decision contact details':
      await pages.nrmHowShouldTheyBeContactedPage.completeDecisionContactDetails(ConstantsLib.DECISION_RECIPIENT);
      break;
    case 'reporter contact details':
      await pages.nrmWhatAreYourContactDetailsPage.completeReporterContactDetails();
      break;
    case 'absence contact':
      await pages.nrmWhoShouldWeContactInYourAbsencePage.completeAbsenceContact(ConstantsLib.EMAIL_ANSWER);
      break;
    case 'evidence':
      await pages.nrmEvidenceUploadPage.continueWithoutEvidence();
      break;
    default:
      throw new Error(`Unknown NRM validation page: ${pageName}`);
  }
});

Then('I should be on the NRM check your answers page', async ({ pages }) => {
  await pages.nrmCheckYourAnswersPage.assertPageTitle(
    pages.nrmCheckYourAnswersPage.page,
    await pages.nrmCheckYourAnswersPage.expectedPageTitle(),
  );
});


Then('I should see {string} error message displayed', async ({ pages }, expectedErrorMessage: string) => {
  const actualErrorMessageLocator = await pages.basePage.getThereIsAProblemTextErrorText();
  expect(expectedErrorMessage).toEqual(actualErrorMessageLocator!);
});


Then('I should see {string} error summary', async ({ pages }, expectedErrorMessage: string) => {
  const expectedErrorArray = expectedErrorMessage.trim().split('¬');

  const actualText = await pages.basePage.getErrorSummaryListText();
  const actualErrorArray = actualText!
    .replaceAll('\t', '') // remove ALL tabs
    .trim()             // remove leading/trailing whitespace
    .split(/\r?\n/);    // handle all newline types

  expect(actualErrorArray).toEqual(expectedErrorArray);
});