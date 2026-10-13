import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { test, type Pages } from '../fixture/fixtures';
import { ConstantsLib } from '../utility-helper/constants-lib';

export const { Given, When, Then } = createBdd(test);

const stepLibraries = new WeakMap<object, NrmStepLib>();

class NrmStepLib {
  scenarioDescription = '';
  reportReference = `${ConstantsLib.REFERENCE_PREFIX}-${Date.now()}`;

  constructor(private readonly pages: Pages) {}

  async visitNrm(): Promise<void> {
    await this.pages.nrmHomePage.startNrm();
  }

  async createReport(email: string, checkError: string): Promise<void> {
    const emailPage = this.pages.nrmWorkEmailPage;
    if (checkError === ConstantsLib.YES) {
      await emailPage.checkBlankWorkEmailError();
    }
    await emailPage.sendSecureLink(email || ConstantsLib.SAS_HOF_EMAIL);
    const continuePage = this.pages.nrmContinueToYourReportPage;
    await continuePage.assertPageTitle(continuePage.page, await continuePage.expectedPageTitle());
    await continuePage.startReport();
    const draftReportsPage = this.pages.nrmDraftReportsPage;
    await draftReportsPage.assertPageTitle(draftReportsPage.page, await draftReportsPage.expectedPageTitle());
    await draftReportsPage.createDraftReport();
  }

  async completeQuestionnaire(checkError: string): Promise<void> {
    switch (this.scenarioDescription) {
      case "'Yes' answers - under18":
        await this.pages.nrmAddReferencePage.completeReference(this.reportReference, checkError);
        await this.pages.nrmSelectOrganisationPage.completeOrganisation(ConstantsLib.ORGANISATION, checkError);
        await this.pages.nrmWhereAreYouMakingThisReportPage.answerReportLocation('England', checkError);
        await this.pages.nrmIsVictimUnder18Page.answerVictimAge(ConstantsLib.YES, checkError);
        await this.pages.nrmLocalAuthContactedPage.completeLocalAuthorityDetails(checkError);
        await this.pages.nrmBackgroundPage.enterBackgroundDetails(ConstantsLib.TEXT_ANSWER, checkError);
        await this.pages.nrmHasThePotentialVictimBeenInMoreThanOneExploitativeSituationPage.answerMultipleExploitation(ConstantsLib.YES, checkError);
        await this.pages.nrmWhenDidExploitationHappenMultiplePage.enterExploitationPeriod(ConstantsLib.TEXT_ANSWER, checkError);
        await this.pages.nrmHowExploitationStartPage.enterHowExploitationStarted(ConstantsLib.TEXT_ANSWER, checkError);
        await this.pages.nrmWasThePotentialVictimTakenSomewhereByTheirExploitersPage.answerTakenSomewhere(ConstantsLib.YES, ConstantsLib.TEXT_ANSWER, checkError);
        await this.pages.nrmHowWasThePotentialVictimTreatedDuringTheirExploitationPage.enterTreatmentDetails(ConstantsLib.TEXT_ANSWER, checkError);
        await this.pages.nrmIsThePotentialVictimStillInAnExploitativeSituationPage.answerCurrentExploitationStatus(ConstantsLib.NO, checkError);
        await this.pages.nrmHowAndWhyTheyLeftPage.enterLeavingDetails(ConstantsLib.TEXT_ANSWER, checkError);
        await this.pages.nrmWhenWasPotentialVictimAndExploiterLastInContactPage.answerLastContactPeriod('Not sure', checkError);
        await this.pages.nrmTellUsAboutTheLastContactBetweenThePotentialVictimAndTheirExploitersPage.enterLastContactDetails(ConstantsLib.TEXT_ANSWER, checkError);
        await this.pages.nrmFirstTimeOfReportingThisPage.answerFirstReport(ConstantsLib.NO, checkError);
        await this.pages.nrmWhyAreTheyReportingThisNowPage.enterWhyReportNow(ConstantsLib.TEXT_ANSWER, checkError);
        await this.pages.nrmDidYouIdentifyAnyModernSlaveryIndicatorsPage.answerModernSlaveryIndicators(ConstantsLib.YES, ConstantsLib.TEXT_ANSWER, checkError);
        await this.pages.nrmTellUsAboutTheInterviewsPage.enterInterviewDetails(ConstantsLib.TEXT_ANSWER, checkError);
        await this.pages.nrmOtherProfessionalOrgInvolvedPage.enterProfessionalInvolvementDetails(ConstantsLib.TEXT_ANSWER, checkError);
        await this.pages.nrmDoYouHaveAnyConcernsAboutThePotentialVictimsCredibilityPage.answerCredibilityConcern(ConstantsLib.NO, checkError);
        await this.pages.nrmAreThereOtherProfessionalsOrOrganisationsInvolvedWithThisCasePage.answerOtherProfessionalsInvolved(ConstantsLib.YES, ConstantsLib.TEXT_ANSWER, checkError);
        await this.pages.nrmWhereWereTheyExploitedPage.answerExploitationLocations('UK', checkError);
        await this.pages.nrmWhereWereTheyExploitedInTheUKPage.completeUkExploitationLocations(ConstantsLib.UK_CITY, ConstantsLib.LOCATION_DETAILS, 1);
        await this.pages.nrmWhereIsThePotentialVictimStayingPage.completeVictimCurrentLocation(ConstantsLib.UK_CITY, ConstantsLib.UK_REGION);
        await this.pages.nrmWhoExploitedThePotentialVictimPage.enterExploiterDetails(ConstantsLib.TEXT_ANSWER, checkError);
        await this.pages.nrmDoYouHaveInformationAboutWhereTheExploitersArePage.answerExploiterInformation(ConstantsLib.YES, checkError);
        await this.pages.nrmAreTheExploitersInTheUKPage.answerExploitersInUk(ConstantsLib.YES, checkError);
        await this.pages.nrmWhatInfoDoYouHaveAbtExploiterWhereAbtPage.enterExploiterLocationDetails(ConstantsLib.TEXT_ANSWER, checkError);
        await this.pages.nrmHowWereTheyExploitedPage.completeExploitationTypes();
        await this.pages.nrmWereThereAnyOtherPotentialVictimsPage.answerOtherPotentialVictims(ConstantsLib.YES, checkError);
        await this.pages.nrmAreThereConcernsThatThePotentialVictimCouldBeExploitedAgainInTheFuturePage.answerFutureRisk(ConstantsLib.YES, checkError);
        await this.pages.nrmWhyAreThereConcernsAboutExploitationInTheFuturePage.enterFutureRiskDetails(ConstantsLib.TEXT_ANSWER, checkError);
        await this.pages.nrmDoTheyHaveACrimeReferenceNumberRelatedToAnyReportedModernSlaveryCrimeInWhichTheyAreAVictimPage.completeCrimeReference(ConstantsLib.YES, checkError);
        await this.pages.nrmCoOperationWithPublicAuthoritiesPage.answerCooperation(ConstantsLib.YES, checkError);
        await this.pages.nrmDoesThePotentialVictimConsentToHavingTheirCaseReferredToTheNrmPage.continueWithoutResponse();
        await this.completePotentialVictimQuestionnaire(checkError);
        await this.pages.nrmWhatAreYourContactDetailsPage.completeReporterContactDetails();
        await this.pages.nrmWhoShouldWeContactInYourAbsencePage.completeAbsenceContact(ConstantsLib.EMAIL_ANSWER);
        await this.pages.nrmEvidenceUploadPage.continueWithoutEvidence(checkError);
        await this.pages.nrmCheckYourAnswersPage.assertPageTitle(this.pages.nrmCheckYourAnswersPage.page, await this.pages.nrmCheckYourAnswersPage.expectedPageTitle());
        break;
      case "'No' answers - over18, No Cooperation":
        await this.pages.nrmAddReferencePage.completeReference(this.reportReference, checkError);
        await this.pages.nrmSelectOrganisationPage.completeOrganisation(ConstantsLib.ORGANISATION, checkError);
        await this.pages.nrmWhereAreYouMakingThisReportPage.answerReportLocation('Wales', checkError);
        await this.pages.nrmIsVictimUnder18Page.answerVictimAge(ConstantsLib.NO, checkError);
        await this.pages.nrmUnder18AnytimeDuringExploitationPage.answerUnder18AtAnyTime(ConstantsLib.NO, checkError);
        await this.pages.nrmBackgroundPage.enterBackgroundDetails(ConstantsLib.TEXT_ANSWER, checkError);
        await this.pages.nrmHasThePotentialVictimBeenInMoreThanOneExploitativeSituationPage.answerMultipleExploitation(ConstantsLib.NO, checkError);
        await this.pages.nrmWhenDidExploitationHappenPage.enterExploitationPeriod(ConstantsLib.TEXT_ANSWER, checkError);
        await this.pages.nrmHowExploitationStartPage.enterHowExploitationStarted(ConstantsLib.TEXT_ANSWER, checkError);
        await this.pages.nrmWasThePotentialVictimTakenSomewhereByTheirExploitersPage.answerTakenSomewhere(ConstantsLib.NO, ConstantsLib.TEXT_ANSWER, checkError);
        await this.pages.nrmHowWasThePotentialVictimTreatedDuringTheirExploitationPage.enterTreatmentDetails(ConstantsLib.TEXT_ANSWER, checkError);
        await this.pages.nrmIsThePotentialVictimStillInAnExploitativeSituationPage.answerCurrentExploitationStatus(ConstantsLib.NO, checkError);
        await this.pages.nrmHowAndWhyTheyLeftPage.enterLeavingDetails(ConstantsLib.TEXT_ANSWER, checkError);
        await this.pages.nrmWhenWasPotentialVictimAndExploiterLastInContactPage.answerLastContactPeriod('Within the last week', checkError);
        await this.pages.nrmTellUsAboutTheLastContactBetweenThePotentialVictimAndTheirExploitersPage.enterLastContactDetails(ConstantsLib.TEXT_ANSWER, checkError);
        await this.pages.nrmFirstTimeOfReportingThisPage.answerFirstReport(ConstantsLib.NO, checkError);
        await this.pages.nrmWhyAreTheyReportingThisNowPage.enterWhyReportNow(ConstantsLib.TEXT_ANSWER, checkError);
        await this.pages.nrmDidYouIdentifyAnyModernSlaveryIndicatorsPage.answerModernSlaveryIndicators(ConstantsLib.NO, undefined, checkError);
        await this.pages.nrmTellUsAboutTheInterviewsPage.enterInterviewDetails(ConstantsLib.TEXT_ANSWER, checkError);
        await this.pages.nrmOtherProfessionalOrgInvolvedPage.enterProfessionalInvolvementDetails(ConstantsLib.TEXT_ANSWER, checkError);
        await this.pages.nrmDoYouHaveAnyConcernsAboutThePotentialVictimsCredibilityPage.answerCredibilityConcern(ConstantsLib.NO, checkError);
        await this.pages.nrmAreThereOtherProfessionalsOrOrganisationsInvolvedWithThisCasePage.answerOtherProfessionalsInvolved(ConstantsLib.NO, undefined, checkError);
        await this.pages.nrmWhereWereTheyExploitedPage.answerExploitationLocations('Overseas', checkError);
        await this.pages.nrmWhereWereTheyExploitedOverseasPage.completeOverseasExploitationLocations(ConstantsLib.OVERSEAS_COUNTRY, ConstantsLib.OVERSEAS_LOCATION_DETAILS, 1);
        await this.pages.nrmWhereIsThePotentialVictimStayingPage.completeVictimCurrentLocation(ConstantsLib.UK_CITY, ConstantsLib.UK_REGION);
        await this.pages.nrmWhoExploitedThePotentialVictimPage.enterExploiterDetails(ConstantsLib.TEXT_ANSWER, checkError);
        await this.pages.nrmDoYouHaveInformationAboutWhereTheExploitersArePage.answerExploiterInformation(ConstantsLib.YES, checkError);
        await this.pages.nrmAreTheExploitersInTheUKPage.answerExploitersInUk(ConstantsLib.YES, checkError);
        await this.pages.nrmWhatInfoDoYouHaveAbtExploiterWhereAbtPage.enterExploiterLocationDetails(ConstantsLib.TEXT_ANSWER, checkError);
        await this.pages.nrmHowWereTheyExploitedPage.completeExploitationTypes();
        await this.pages.nrmWereThereAnyOtherPotentialVictimsPage.answerOtherPotentialVictims(ConstantsLib.NO, checkError);
        await this.pages.nrmAreThereConcernsThatThePotentialVictimCouldBeExploitedAgainInTheFuturePage.answerFutureRisk(ConstantsLib.NO, checkError);
        await this.pages.nrmDoTheyHaveACrimeReferenceNumberRelatedToAnyReportedModernSlaveryCrimeInWhichTheyAreAVictimPage.completeCrimeReference(ConstantsLib.NO, checkError);
        await this.pages.nrmCoOperationWithPublicAuthoritiesPage.answerCooperation(ConstantsLib.NO, checkError);
        await this.pages.nrmDoesThePotentialVictimConsentToHavingTheirCaseReferredToTheNrmPage.completeConsent(ConstantsLib.NO, checkError);
        await this.pages.nrmWhyDontTheyWantTheirCaseReferredPage.enterReasonForNoReferral(ConstantsLib.WHY_NOT_REFER_DETAILS, checkError);
        await this.pages.nrmWhatIsTheirGenderPage.answerGender(ConstantsLib.GENDER, checkError);
        await this.pages.nrmSelectNationalityPage.completeNationalitySelection(checkError);
        await this.pages.nrmCheckYourAnswersPage.assertPageTitle(this.pages.nrmCheckYourAnswersPage.page, await this.pages.nrmCheckYourAnswersPage.expectedPageTitle());
        break;
      case 'Continue report':
        await this.pages.nrmAddReferencePage.completeReference(this.reportReference, checkError);
        await this.pages.nrmSelectOrganisationPage.completeOrganisation(ConstantsLib.ORGANISATION, checkError);
        await this.pages.nrmWhereAreYouMakingThisReportPage.answerReportLocation('England', checkError);
        await this.pages.nrmIsVictimUnder18Page.answerVictimAge(ConstantsLib.YES, checkError);
        await this.pages.nrmLocalAuthContactedPage.completeLocalAuthorityDetails(checkError);
        await this.pages.nrmBackgroundPage.enterBackgroundDetails(ConstantsLib.TEXT_ANSWER, checkError);
        await this.pages.nrmHasThePotentialVictimBeenInMoreThanOneExploitativeSituationPage.answerMultipleExploitation(ConstantsLib.NO, checkError);
        await this.pages.nrmWhenDidExploitationHappenPage.enterExploitationPeriod(ConstantsLib.TEXT_ANSWER, checkError);
        await this.pages.nrmHowExploitationStartPage.enterHowExploitationStarted(ConstantsLib.TEXT_ANSWER, checkError);
        await this.pages.nrmWasThePotentialVictimTakenSomewhereByTheirExploitersPage.answerTakenSomewhere(ConstantsLib.YES, ConstantsLib.TEXT_ANSWER, checkError);
        break;
      case 'Delete report':
        await this.pages.nrmAddReferencePage.completeReference(this.reportReference, checkError);
        await this.pages.nrmSelectOrganisationPage.completeOrganisation(ConstantsLib.ORGANISATION, checkError);
        await this.pages.nrmWhereAreYouMakingThisReportPage.answerReportLocation('Scotland', checkError);
        await this.pages.nrmIsVictimUnder18Page.answerVictimAge(ConstantsLib.YES, checkError);
        await this.pages.nrmLocalAuthContactedPage.completeLocalAuthorityDetails(checkError);
        await this.pages.nrmBackgroundPage.enterBackgroundDetails(ConstantsLib.TEXT_ANSWER, checkError);
        await this.pages.nrmHasThePotentialVictimBeenInMoreThanOneExploitativeSituationPage.answerMultipleExploitation("I don't know", checkError);
        await this.pages.nrmWhenDidExploitationHappenPage.enterExploitationPeriod(ConstantsLib.TEXT_ANSWER, checkError);
        await this.pages.nrmHowExploitationStartPage.enterHowExploitationStarted(ConstantsLib.TEXT_ANSWER, checkError);
        await this.pages.nrmWasThePotentialVictimTakenSomewhereByTheirExploitersPage.answerTakenSomewhere(ConstantsLib.YES, ConstantsLib.TEXT_ANSWER, checkError);
        break;
      case 'Not sure if under18':
        await this.pages.nrmAddReferencePage.completeReference(this.reportReference, checkError);
        await this.pages.nrmSelectOrganisationPage.completeOrganisation(ConstantsLib.ORGANISATION, checkError);
        await this.pages.nrmWhereAreYouMakingThisReportPage.answerReportLocation('Scotland', checkError);
        await this.pages.nrmIsVictimUnder18Page.answerVictimAge('Not Sure', checkError);
        await this.pages.nrmLocalAuthContactedPage.completeLocalAuthorityDetails(checkError);
        await this.pages.nrmBackgroundPage.enterBackgroundDetails(ConstantsLib.TEXT_ANSWER, checkError);
        await this.pages.nrmHasThePotentialVictimBeenInMoreThanOneExploitativeSituationPage.answerMultipleExploitation(ConstantsLib.YES, checkError);
        await this.pages.nrmWhenDidExploitationHappenMultiplePage.enterExploitationPeriod(ConstantsLib.TEXT_ANSWER, checkError);
        await this.pages.nrmHowExploitationStartPage.enterHowExploitationStarted(ConstantsLib.TEXT_ANSWER, checkError);
        await this.pages.nrmWasThePotentialVictimTakenSomewhereByTheirExploitersPage.answerTakenSomewhere(ConstantsLib.NO, ConstantsLib.TEXT_ANSWER, checkError);
        await this.pages.nrmHowWasThePotentialVictimTreatedDuringTheirExploitationPage.enterTreatmentDetails(ConstantsLib.TEXT_ANSWER, checkError);
        await this.pages.nrmIsThePotentialVictimStillInAnExploitativeSituationPage.answerCurrentExploitationStatus(ConstantsLib.NO, checkError);
        await this.pages.nrmHowAndWhyTheyLeftPage.enterLeavingDetails(ConstantsLib.TEXT_ANSWER, checkError);
        await this.pages.nrmWhenWasPotentialVictimAndExploiterLastInContactPage.answerLastContactPeriod('Within the last month', checkError);
        await this.pages.nrmTellUsAboutTheLastContactBetweenThePotentialVictimAndTheirExploitersPage.enterLastContactDetails(ConstantsLib.TEXT_ANSWER, checkError);
        await this.pages.nrmFirstTimeOfReportingThisPage.answerFirstReport(ConstantsLib.NOT_SURE, checkError);
        await this.pages.nrmDidYouIdentifyAnyModernSlaveryIndicatorsPage.answerModernSlaveryIndicators(ConstantsLib.NO, undefined, checkError);
        await this.pages.nrmTellUsAboutTheInterviewsPage.enterInterviewDetails(ConstantsLib.TEXT_ANSWER, checkError);
        await this.pages.nrmOtherProfessionalOrgInvolvedPage.enterProfessionalInvolvementDetails(ConstantsLib.TEXT_ANSWER, checkError);
        await this.pages.nrmDoYouHaveAnyConcernsAboutThePotentialVictimsCredibilityPage.answerCredibilityConcern(ConstantsLib.NO, checkError);
        await this.pages.nrmAreThereOtherProfessionalsOrOrganisationsInvolvedWithThisCasePage.answerOtherProfessionalsInvolved(ConstantsLib.NO, undefined, checkError);
        await this.pages.nrmWhereWereTheyExploitedPage.answerExploitationLocations('UK and Overseas', checkError);
        await this.pages.nrmWhereWereTheyExploitedInTheUKPage.completeUkExploitationLocations(ConstantsLib.UK_CITY, ConstantsLib.LOCATION_DETAILS, 1);
        await this.pages.nrmWhereWereTheyExploitedOverseasPage.completeOverseasExploitationLocations(ConstantsLib.OVERSEAS_COUNTRY, ConstantsLib.OVERSEAS_LOCATION_DETAILS, 1);
        await this.pages.nrmWhereIsThePotentialVictimStayingPage.completeVictimCurrentLocation(ConstantsLib.UK_CITY, ConstantsLib.UK_REGION);
        await this.pages.nrmWhoExploitedThePotentialVictimPage.enterExploiterDetails(ConstantsLib.TEXT_ANSWER, checkError);
        await this.pages.nrmDoYouHaveInformationAboutWhereTheExploitersArePage.answerExploiterInformation(ConstantsLib.NO, checkError);
        await this.pages.nrmHowWereTheyExploitedPage.completeExploitationTypes();
        await this.pages.nrmWereThereAnyOtherPotentialVictimsPage.answerOtherPotentialVictims('Not sure', checkError);
        await this.pages.nrmAreThereConcernsThatThePotentialVictimCouldBeExploitedAgainInTheFuturePage.answerFutureRisk(ConstantsLib.YES, checkError);
        await this.pages.nrmWhyAreThereConcernsAboutExploitationInTheFuturePage.enterFutureRiskDetails(ConstantsLib.TEXT_ANSWER, checkError);
        await this.pages.nrmDoTheyHaveACrimeReferenceNumberRelatedToAnyReportedModernSlaveryCrimeInWhichTheyAreAVictimPage.completeCrimeReference(ConstantsLib.YES, checkError);
        await this.pages.nrmCoOperationWithPublicAuthoritiesPage.answerCooperation(ConstantsLib.YES, checkError);
        await this.pages.nrmDoesThePotentialVictimConsentToHavingTheirCaseReferredToTheNrmPage.continueWithoutResponse();
        await this.completePotentialVictimQuestionnaire(checkError);
        await this.pages.nrmWhatAreYourContactDetailsPage.completeReporterContactDetails();
        await this.pages.nrmWhoShouldWeContactInYourAbsencePage.completeAbsenceContact(ConstantsLib.EMAIL_ANSWER);
        await this.pages.nrmEvidenceUploadPage.continueWithoutEvidence(checkError);
        await this.pages.nrmCheckYourAnswersPage.assertPageTitle(this.pages.nrmCheckYourAnswersPage.page, await this.pages.nrmCheckYourAnswersPage.expectedPageTitle());
        break;
      case 'E2E mixed':
        await this.pages.nrmAddReferencePage.completeReference(this.reportReference, checkError);
        await this.pages.nrmSelectOrganisationPage.completeOrganisation(ConstantsLib.ORGANISATION, checkError);
        await this.pages.nrmWhereAreYouMakingThisReportPage.answerReportLocation('Northern Ireland', checkError);
        await this.pages.nrmIsVictimUnder18Page.answerVictimAge(ConstantsLib.NO, checkError);
        await this.pages.nrmUnder18AnytimeDuringExploitationPage.answerUnder18AtAnyTime(ConstantsLib.NO, checkError);
        await this.pages.nrmBackgroundPage.enterBackgroundDetails(ConstantsLib.TEXT_ANSWER, checkError);
        await this.pages.nrmHasThePotentialVictimBeenInMoreThanOneExploitativeSituationPage.answerMultipleExploitation(ConstantsLib.YES, checkError);
        await this.pages.nrmWhenDidExploitationHappenMultiplePage.enterExploitationPeriod(ConstantsLib.TEXT_ANSWER, checkError);
        await this.pages.nrmHowExploitationStartPage.enterHowExploitationStarted(ConstantsLib.TEXT_ANSWER, checkError);
        await this.pages.nrmWasThePotentialVictimTakenSomewhereByTheirExploitersPage.answerTakenSomewhere(ConstantsLib.YES, ConstantsLib.TEXT_ANSWER, checkError);
        await this.pages.nrmHowWasThePotentialVictimTreatedDuringTheirExploitationPage.enterTreatmentDetails(ConstantsLib.TEXT_ANSWER, checkError);
        await this.pages.nrmIsThePotentialVictimStillInAnExploitativeSituationPage.answerCurrentExploitationStatus(ConstantsLib.NO, checkError);
        await this.pages.nrmHowAndWhyTheyLeftPage.enterLeavingDetails(ConstantsLib.TEXT_ANSWER, checkError);
        await this.pages.nrmWhenWasPotentialVictimAndExploiterLastInContactPage.answerLastContactPeriod('Within the last 3 months', checkError);
        await this.pages.nrmTellUsAboutTheLastContactBetweenThePotentialVictimAndTheirExploitersPage.enterLastContactDetails(ConstantsLib.TEXT_ANSWER, checkError);
        await this.pages.nrmFirstTimeOfReportingThisPage.answerFirstReport(ConstantsLib.YES, checkError);
        await this.pages.nrmDidYouIdentifyAnyModernSlaveryIndicatorsPage.answerModernSlaveryIndicators(ConstantsLib.YES, ConstantsLib.TEXT_ANSWER, checkError);
        await this.pages.nrmTellUsAboutTheInterviewsPage.enterInterviewDetails(ConstantsLib.TEXT_ANSWER, checkError);
        await this.pages.nrmOtherProfessionalOrgInvolvedPage.enterProfessionalInvolvementDetails(ConstantsLib.TEXT_ANSWER, checkError);
        await this.pages.nrmDoYouHaveAnyConcernsAboutThePotentialVictimsCredibilityPage.answerCredibilityConcern(ConstantsLib.NO, checkError);
        await this.pages.nrmAreThereOtherProfessionalsOrOrganisationsInvolvedWithThisCasePage.answerOtherProfessionalsInvolved(ConstantsLib.YES, ConstantsLib.TEXT_ANSWER, checkError);
        await this.pages.nrmWhereWereTheyExploitedPage.answerExploitationLocations('UK and Overseas', checkError);
        await this.pages.nrmWhereWereTheyExploitedInTheUKPage.completeUkExploitationLocations(ConstantsLib.UK_CITY, ConstantsLib.LOCATION_DETAILS, 1);
        await this.pages.nrmWhereWereTheyExploitedOverseasPage.completeOverseasExploitationLocations(ConstantsLib.OVERSEAS_COUNTRY, ConstantsLib.OVERSEAS_LOCATION_DETAILS, 1);
        await this.pages.nrmWhereIsThePotentialVictimStayingPage.completeVictimCurrentLocation(ConstantsLib.UNKNOWN, ConstantsLib.UNKNOWN);
        await this.pages.nrmWhoExploitedThePotentialVictimPage.enterExploiterDetails(ConstantsLib.TEXT_ANSWER, checkError);
        await this.pages.nrmDoYouHaveInformationAboutWhereTheExploitersArePage.answerExploiterInformation(ConstantsLib.NO, checkError);
        await this.pages.nrmHowWereTheyExploitedPage.completeExploitationTypes();
        await this.pages.nrmWereThereAnyOtherPotentialVictimsPage.answerOtherPotentialVictims(ConstantsLib.YES, checkError);
        await this.pages.nrmAreThereConcernsThatThePotentialVictimCouldBeExploitedAgainInTheFuturePage.answerFutureRisk(ConstantsLib.NO, checkError);
        await this.pages.nrmDoTheyHaveACrimeReferenceNumberRelatedToAnyReportedModernSlaveryCrimeInWhichTheyAreAVictimPage.completeCrimeReference(ConstantsLib.YES, checkError);
        await this.pages.nrmCoOperationWithPublicAuthoritiesPage.answerCooperation(ConstantsLib.YES, checkError);
        await this.pages.nrmDoesThePotentialVictimConsentToHavingTheirCaseReferredToTheNrmPage.completeConsent(ConstantsLib.YES, checkError);
        await this.pages.nrmDoTheyNeedSupportPage.answerSupportNeed(ConstantsLib.YES, checkError);
        await this.pages.nrmHowCanTheSupportProviderContactThePotentialVictimPage.completeSupportProviderContactDetails();
        await this.completePotentialVictimQuestionnaire(checkError);
        await this.pages.nrmWhoShouldWeSendDecisionToPage.answerDecisionRecipient(ConstantsLib.ALTERNATE_DECISION_RECIPIENT, checkError);
        await this.pages.nrmHowShouldTheyBeContactedPage.completeDecisionContactDetails(ConstantsLib.ALTERNATE_DECISION_RECIPIENT);
        await this.pages.nrmWhatAreYourContactDetailsPage.completeReporterContactDetails();
        await this.pages.nrmWhoShouldWeContactInYourAbsencePage.completeAbsenceContact(ConstantsLib.EMAIL_ANSWER);
        await this.pages.nrmEvidenceUploadPage.continueWithoutEvidence(checkError);
        await this.pages.nrmCheckYourAnswersPage.assertPageTitle(this.pages.nrmCheckYourAnswersPage.page, await this.pages.nrmCheckYourAnswersPage.expectedPageTitle());
        break;
      case 'Add max locations':
        await this.pages.nrmAddReferencePage.completeReference(this.reportReference, checkError);
        await this.pages.nrmSelectOrganisationPage.completeOrganisation(ConstantsLib.ORGANISATION, checkError);
        await this.pages.nrmWhereAreYouMakingThisReportPage.answerReportLocation('Wales', checkError);
        await this.pages.nrmIsVictimUnder18Page.answerVictimAge(ConstantsLib.YES, checkError);
        await this.pages.nrmLocalAuthContactedPage.completeLocalAuthorityDetails(checkError);
        await this.pages.nrmBackgroundPage.enterBackgroundDetails(ConstantsLib.TEXT_ANSWER, checkError);
        await this.pages.nrmHasThePotentialVictimBeenInMoreThanOneExploitativeSituationPage.answerMultipleExploitation(ConstantsLib.NO, checkError);
        await this.pages.nrmWhenDidExploitationHappenPage.enterExploitationPeriod(ConstantsLib.TEXT_ANSWER, checkError);
        await this.pages.nrmHowExploitationStartPage.enterHowExploitationStarted(ConstantsLib.TEXT_ANSWER, checkError);
        await this.pages.nrmWasThePotentialVictimTakenSomewhereByTheirExploitersPage.answerTakenSomewhere(ConstantsLib.NO, ConstantsLib.TEXT_ANSWER, checkError);
        await this.pages.nrmHowWasThePotentialVictimTreatedDuringTheirExploitationPage.enterTreatmentDetails(ConstantsLib.TEXT_ANSWER, checkError);
        await this.pages.nrmIsThePotentialVictimStillInAnExploitativeSituationPage.answerCurrentExploitationStatus(ConstantsLib.NO, checkError);
        await this.pages.nrmHowAndWhyTheyLeftPage.enterLeavingDetails(ConstantsLib.TEXT_ANSWER, checkError);
        await this.pages.nrmWhenWasPotentialVictimAndExploiterLastInContactPage.answerLastContactPeriod('Over a year ago', checkError);
        await this.pages.nrmTellUsAboutTheLastContactBetweenThePotentialVictimAndTheirExploitersPage.enterLastContactDetails(ConstantsLib.TEXT_ANSWER, checkError);
        await this.pages.nrmFirstTimeOfReportingThisPage.answerFirstReport(ConstantsLib.NO, checkError);
        await this.pages.nrmWhyAreTheyReportingThisNowPage.enterWhyReportNow(ConstantsLib.TEXT_ANSWER, checkError);
        await this.pages.nrmDidYouIdentifyAnyModernSlaveryIndicatorsPage.answerModernSlaveryIndicators(ConstantsLib.NO, undefined, checkError);
        await this.pages.nrmTellUsAboutTheInterviewsPage.enterInterviewDetails(ConstantsLib.TEXT_ANSWER, checkError);
        await this.pages.nrmOtherProfessionalOrgInvolvedPage.enterProfessionalInvolvementDetails(ConstantsLib.TEXT_ANSWER, checkError);
        await this.pages.nrmDoYouHaveAnyConcernsAboutThePotentialVictimsCredibilityPage.answerCredibilityConcern(ConstantsLib.NO, checkError);
        await this.pages.nrmAreThereOtherProfessionalsOrOrganisationsInvolvedWithThisCasePage.answerOtherProfessionalsInvolved(ConstantsLib.NO, undefined, checkError);
        await this.pages.nrmWhereWereTheyExploitedPage.answerExploitationLocations('UK and Overseas', checkError);
        await this.pages.nrmWhereWereTheyExploitedInTheUKPage.completeUkExploitationLocations(ConstantsLib.UK_CITY, ConstantsLib.LOCATION_DETAILS, 9);
        await this.pages.nrmWhereWereTheyExploitedOverseasPage.completeOverseasExploitationLocations(ConstantsLib.OVERSEAS_COUNTRY, ConstantsLib.OVERSEAS_LOCATION_DETAILS, 9);
        await this.pages.nrmWhereIsThePotentialVictimStayingPage.completeVictimCurrentLocation(ConstantsLib.UK_CITY, ConstantsLib.UK_REGION);
        await this.pages.nrmWhoExploitedThePotentialVictimPage.enterExploiterDetails(ConstantsLib.TEXT_ANSWER, checkError);
        await this.pages.nrmDoYouHaveInformationAboutWhereTheExploitersArePage.answerExploiterInformation(ConstantsLib.NO, checkError);
        await this.pages.nrmHowWereTheyExploitedPage.completeExploitationTypes();
        await this.pages.nrmWereThereAnyOtherPotentialVictimsPage.answerOtherPotentialVictims(ConstantsLib.NO, checkError);
        await this.pages.nrmAreThereConcernsThatThePotentialVictimCouldBeExploitedAgainInTheFuturePage.answerFutureRisk(ConstantsLib.YES, checkError);
        await this.pages.nrmWhyAreThereConcernsAboutExploitationInTheFuturePage.enterFutureRiskDetails(ConstantsLib.TEXT_ANSWER, checkError);
        await this.pages.nrmDoTheyHaveACrimeReferenceNumberRelatedToAnyReportedModernSlaveryCrimeInWhichTheyAreAVictimPage.completeCrimeReference(ConstantsLib.YES, checkError);
        await this.pages.nrmCoOperationWithPublicAuthoritiesPage.answerCooperation(ConstantsLib.YES, checkError);
        await this.pages.nrmDoesThePotentialVictimConsentToHavingTheirCaseReferredToTheNrmPage.continueWithoutResponse();
        await this.completePotentialVictimQuestionnaire(checkError);
        await this.pages.nrmWhatAreYourContactDetailsPage.completeReporterContactDetails();
        await this.pages.nrmWhoShouldWeContactInYourAbsencePage.completeAbsenceContact(ConstantsLib.EMAIL_ANSWER);
        await this.pages.nrmEvidenceUploadPage.continueWithoutEvidence(checkError);
        await this.pages.nrmCheckYourAnswersPage.assertPageTitle(this.pages.nrmCheckYourAnswersPage.page, await this.pages.nrmCheckYourAnswersPage.expectedPageTitle());
        break;
      case "'No' answers - Yes Cooperation":
        await this.pages.nrmAddReferencePage.completeReference(this.reportReference, checkError);
        await this.pages.nrmSelectOrganisationPage.completeOrganisation(ConstantsLib.ORGANISATION, checkError);
        await this.pages.nrmWhereAreYouMakingThisReportPage.answerReportLocation('England', checkError);
        await this.pages.nrmIsVictimUnder18Page.answerVictimAge(ConstantsLib.NO, checkError);
        await this.pages.nrmUnder18AnytimeDuringExploitationPage.answerUnder18AtAnyTime(ConstantsLib.NO, checkError);
        await this.pages.nrmBackgroundPage.enterBackgroundDetails(ConstantsLib.TEXT_ANSWER, checkError);
        await this.pages.nrmHasThePotentialVictimBeenInMoreThanOneExploitativeSituationPage.answerMultipleExploitation(ConstantsLib.NO, checkError);
        await this.pages.nrmWhenDidExploitationHappenPage.enterExploitationPeriod(ConstantsLib.TEXT_ANSWER, checkError);
        await this.pages.nrmHowExploitationStartPage.enterHowExploitationStarted(ConstantsLib.TEXT_ANSWER, checkError);
        await this.pages.nrmWasThePotentialVictimTakenSomewhereByTheirExploitersPage.answerTakenSomewhere(ConstantsLib.YES, ConstantsLib.TEXT_ANSWER, checkError);
        await this.pages.nrmHowWasThePotentialVictimTreatedDuringTheirExploitationPage.enterTreatmentDetails(ConstantsLib.TEXT_ANSWER, checkError);
        await this.pages.nrmIsThePotentialVictimStillInAnExploitativeSituationPage.answerCurrentExploitationStatus(ConstantsLib.NO, checkError);
        await this.pages.nrmHowAndWhyTheyLeftPage.enterLeavingDetails(ConstantsLib.TEXT_ANSWER, checkError);
        await this.pages.nrmWhenWasPotentialVictimAndExploiterLastInContactPage.answerLastContactPeriod('Not sure', checkError);
        await this.pages.nrmTellUsAboutTheLastContactBetweenThePotentialVictimAndTheirExploitersPage.enterLastContactDetails(ConstantsLib.TEXT_ANSWER, checkError);
        await this.pages.nrmFirstTimeOfReportingThisPage.answerFirstReport(ConstantsLib.YES, checkError);
        await this.pages.nrmDidYouIdentifyAnyModernSlaveryIndicatorsPage.answerModernSlaveryIndicators(ConstantsLib.YES, ConstantsLib.TEXT_ANSWER, checkError);
        await this.pages.nrmTellUsAboutTheInterviewsPage.enterInterviewDetails(ConstantsLib.TEXT_ANSWER, checkError);
        await this.pages.nrmOtherProfessionalOrgInvolvedPage.enterProfessionalInvolvementDetails(ConstantsLib.TEXT_ANSWER, checkError);
        await this.pages.nrmDoYouHaveAnyConcernsAboutThePotentialVictimsCredibilityPage.answerCredibilityConcern(ConstantsLib.NO, checkError);
        await this.pages.nrmAreThereOtherProfessionalsOrOrganisationsInvolvedWithThisCasePage.answerOtherProfessionalsInvolved(ConstantsLib.YES, ConstantsLib.TEXT_ANSWER, checkError);
        await this.pages.nrmWhereWereTheyExploitedPage.answerExploitationLocations('UK', checkError);
        await this.pages.nrmWhereWereTheyExploitedInTheUKPage.completeUkExploitationLocations(ConstantsLib.UK_CITY, ConstantsLib.LOCATION_DETAILS, 1);
        await this.pages.nrmWhereIsThePotentialVictimStayingPage.completeVictimCurrentLocation(ConstantsLib.UK_CITY, ConstantsLib.UK_REGION);
        await this.pages.nrmWhoExploitedThePotentialVictimPage.enterExploiterDetails(ConstantsLib.TEXT_ANSWER, checkError);
        await this.pages.nrmDoYouHaveInformationAboutWhereTheExploitersArePage.answerExploiterInformation(ConstantsLib.YES, checkError);
        await this.pages.nrmAreTheExploitersInTheUKPage.answerExploitersInUk(ConstantsLib.YES, checkError);
        await this.pages.nrmWhatInfoDoYouHaveAbtExploiterWhereAbtPage.enterExploiterLocationDetails(ConstantsLib.TEXT_ANSWER, checkError);
        await this.pages.nrmHowWereTheyExploitedPage.completeExploitationTypes();
        await this.pages.nrmWereThereAnyOtherPotentialVictimsPage.answerOtherPotentialVictims(ConstantsLib.YES, checkError);
        await this.pages.nrmAreThereConcernsThatThePotentialVictimCouldBeExploitedAgainInTheFuturePage.answerFutureRisk(ConstantsLib.YES, checkError);
        await this.pages.nrmWhyAreThereConcernsAboutExploitationInTheFuturePage.enterFutureRiskDetails(ConstantsLib.TEXT_ANSWER, checkError);
        await this.pages.nrmDoTheyHaveACrimeReferenceNumberRelatedToAnyReportedModernSlaveryCrimeInWhichTheyAreAVictimPage.completeCrimeReference(ConstantsLib.YES, checkError);
        await this.pages.nrmCoOperationWithPublicAuthoritiesPage.answerCooperation(ConstantsLib.YES, checkError);
        await this.pages.nrmDoesThePotentialVictimConsentToHavingTheirCaseReferredToTheNrmPage.completeConsent(ConstantsLib.NO, checkError);
        await this.pages.nrmWhyDontTheyWantTheirCaseReferredPage.enterReasonForNoReferral(ConstantsLib.WHY_NOT_REFER_DETAILS, checkError);
        await this.pages.nrmWhatIsTheirGenderPage.answerGender(ConstantsLib.GENDER, checkError);
        await this.pages.nrmSelectNationalityPage.completeNationalitySelection(checkError);
        await this.pages.nrmWhatIsTheNameOfThePotentialVictimPage.completePotentialVictimName();
        await this.pages.nrmHowShouldTheyBeContactedPage.completeDecisionContactDetails(ConstantsLib.DECISION_RECIPIENT);
        await this.pages.nrmCheckYourAnswersPage.assertPageTitle(this.pages.nrmCheckYourAnswersPage.page, await this.pages.nrmCheckYourAnswersPage.expectedPageTitle());
        break;
      case 'Save and exit report':
        await this.pages.nrmAddReferencePage.completeReference(this.reportReference, checkError);
        await this.pages.nrmSelectOrganisationPage.completeOrganisation(ConstantsLib.ORGANISATION, checkError);
        await this.pages.nrmWhereAreYouMakingThisReportPage.answerReportLocation('England', checkError);
        await this.pages.nrmIsVictimUnder18Page.answerVictimAge(ConstantsLib.YES, checkError);
        await this.pages.nrmLocalAuthContactedPage.completeLocalAuthorityDetails(checkError);
        await this.pages.nrmBackgroundPage.enterBackgroundDetails(ConstantsLib.TEXT_ANSWER, checkError);
        await this.pages.nrmHasThePotentialVictimBeenInMoreThanOneExploitativeSituationPage.answerMultipleExploitation(ConstantsLib.NO, checkError);
        await this.pages.nrmWhenDidExploitationHappenPage.enterExploitationPeriod(ConstantsLib.TEXT_ANSWER, checkError);
        await this.pages.nrmHowExploitationStartPage.enterHowExploitationStarted(ConstantsLib.TEXT_ANSWER, checkError);
        await this.pages.nrmWasThePotentialVictimTakenSomewhereByTheirExploitersPage.answerTakenSomewhere(ConstantsLib.YES, ConstantsLib.TEXT_ANSWER, checkError);
        await this.pages.nrmHowWasThePotentialVictimTreatedDuringTheirExploitationPage.fillTreatmentAnswers(ConstantsLib.TEXT_ANSWER);
        break;
      default:
        throw new Error(`No NRM journey is configured for description "${this.scenarioDescription}"`);
    }
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
    await this.pages.nrmWhatIsTheirGenderPage.answerGender(ConstantsLib.GENDER, checkError);
    await this.pages.nrmDoTheyHaveAnyChildrenPage.answerChildren(ConstantsLib.NO, checkError);
    await this.pages.nrmSelectNationalityPage.completeNationalitySelection(checkError);
    await this.pages.nrmDoTheyNeedInterpreterPage.answerInterpreter(ConstantsLib.NO, checkError);
    await this.pages.nrmDoTheyNeedHelpWithCommunicationPage.answerCommunicationHelp(ConstantsLib.NO, checkError);
    await this.pages.nrmDoTheyHaveAnyHomeOfficeRefPage.answerHomeOfficeReference(ConstantsLib.NO, checkError);
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
  stepLib.scenarioDescription = description;
  stepLib.reportReference = `${ConstantsLib.REFERENCE_PREFIX}-${Date.now()}`;
  stepLibraries.set(pages, stepLib);
});

When('I enter my work Email {string} and create new report - check error {string}', async ({ pages }, email: string, checkError: string) => {
  await getStepLib(pages).createReport(email, checkError);
});

When('I fill out my answers to the NRM questionnaire - check error {string}', async ({ pages }, checkError: string) => {
  await getStepLib(pages).completeQuestionnaire(checkError);
});

When('I fill out my answers to some of the NRM questionnaire - check error {string}', async ({ pages }, checkError: string) => {
  await getStepLib(pages).completeQuestionnaire(checkError);
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