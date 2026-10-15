import { test as base } from 'playwright-bdd';
import type { Page } from '@playwright/test';
import { basePage } from '../pages/base-page';
import { nrmAddReferencePage } from '../pages/nrm-add-reference-page';
import { nrmAreTheExploitersInTheUKPage } from '../pages/nrm-are-the-exploiters-in-the-uk-page';
import { nrmAreThereConcernsThatThePotentialVictimCouldBeExploitedAgainInTheFuturePage } from '../pages/nrm-are-there-concerns-that-the-potential-victim-could-be-exploited-again-in-the-future-page';
import { nrmAreThereOtherProfessionalsOrOrganisationsInvolvedWithThisCasePage } from '../pages/nrm-are-there-other-professionals-or-organisations-involved-with-this-case-page';
import { nrmBackgroundPage } from '../pages/nrm-background-page';
import { nrmCanSupportProviderContactThemByPhonePage } from '../pages/nrm-can-support-provider-contact-them-by-phone-page';
import { nrmCheckYourAnswersPage } from '../pages/nrm-check-your-answers-page';
import { nrmContinueToYourReportPage } from '../pages/nrm-continue-to-your-report-page';
import { nrmCoOperationWithPublicAuthoritiesPage } from '../pages/nrm-co-operation-with-public-authorities-page';
import { nrmCurrentProgressPage } from '../pages/nrm-current-progress-page';
import { nrmDeleteReportPage } from '../pages/nrm-delete-report-page';
import { nrmDidYouIdentifyAnyModernSlaveryIndicatorsPage } from '../pages/nrm-did-you-identify-any-modern-slavery-indicators-page';
import { nrmDoesThePotentialVictimConsentToHavingTheirCaseReferredToTheNrmPage } from '../pages/nrm-does-the-potential-victim-consent-to-having-their-case-referred-to-the-nrm-page';
import { nrmDoTheyHaveACrimeReferenceNumberRelatedToAnyReportedModernSlaveryCrimeInWhichTheyAreAVictimPage } from '../pages/nrm-do-they-have-a-crime-reference-number-related-to-any-reported-modern-slavery-crime-in-which-they-are-a-victim-page';
import { nrmDoTheyHaveAnyChildrenPage } from '../pages/nrm-do-they-have-any-children-page';
import { nrmDoTheyHaveAnyHomeOfficeRefPage } from '../pages/nrm-do-they-have-any-home-office-ref-page';
import { nrmDoTheyNeedHelpWithCommunicationPage } from '../pages/nrm-do-they-need-help-with-communication-page';
import { nrmDoTheyNeedInterpreterPage } from '../pages/nrm-do-they-need-interpreter-page';
import { nrmDoTheyNeedSupportPage } from '../pages/nrm-do-they-need-support-page';
import { nrmDoYouHaveAnyConcernsAboutThePotentialVictimsCredibilityPage } from '../pages/nrm-do-you-have-any-concerns-about-the-potential-victims-credibility-page';
import { nrmDoYouHaveInformationAboutWhereTheExploitersArePage } from '../pages/nrm-do-you-have-information-about-where-the-exploiters-are-page';
import { nrmDraftReportsPage } from '../pages/nrm-draft-reports-page';
import { nrmEvidenceUploadPage } from '../pages/nrm-evidence-upload-page';
import { nrmFirstTimeOfReportingThisPage } from '../pages/nrm-first-time-of-reporting-this-page';
import { nrmHasThePotentialVictimBeenInMoreThanOneExploitativeSituationPage } from '../pages/nrm-has-the-potential-victim-been-in-more-than-one-exploitative-situation-page';
import { nrmHomePage } from '../pages/nrm-home-page';
import { nrmHowAndWhyTheyLeftPage } from '../pages/nrm-how-and-why-they-left-page';
import { nrmHowCanTheSupportProviderContactThePotentialVictimPage } from '../pages/nrm-how-can-the-support-provider-contact-the-potential-victim-page';
import { nrmHowExploitationStartPage } from '../pages/nrm-how-exploitation-start-page';
import { nrmHowShouldTheyBeContactedPage } from '../pages/nrm-how-should-they-be-contacted-page';
import { nrmHowWasThePotentialVictimTreatedDuringTheirExploitationPage } from '../pages/nrm-how-was-the-potential-victim-treated-during-their-exploitation-page';
import { nrmHowWereTheyExploitedPage } from '../pages/nrm-how-were-they-exploited-page';
import { nrmIsThePotentialVictimStillInAnExploitativeSituationPage } from '../pages/nrm-is-the-potential-victim-still-in-an-exploitative-situation-page';
import { nrmIsVictimUnder18Page } from '../pages/nrm-is-victim-under18-page';
import { nrmLocalAuthContactedPage } from '../pages/nrm-local-auth-contacted-page';
import { nrmOtherProfessionalOrgInvolvedPage } from '../pages/nrm-other-professional-org-involved-page';
import { nrmSelectNationalityPage } from '../pages/nrm-select-nationality-page';
import { nrmSelectOrganisationPage } from '../pages/nrm-select-organisation-page';
import { nrmSentConfirmationPage } from '../pages/nrm-sent-confirmation-page';
import { nrmTellUsAboutTheDocumentsYouUploadedPage } from '../pages/nrm-tell-us-about-the-documents-you-uploaded-page';
import { nrmTellUsAboutTheInterviewsPage } from '../pages/nrm-tell-us-about-the-interviews-page';
import { nrmTellUsAboutTheLastContactBetweenThePotentialVictimAndTheirExploitersPage } from '../pages/nrm-tell-us-about-the-last-contact-between-the-potential-victim-and-their-exploiters-page';
import { nrmUnder18AnytimeDuringExploitationPage } from '../pages/nrm-under18-anytime-during-exploitation-page';
import { nrmWasThePotentialVictimTakenSomewhereByTheirExploitersPage } from '../pages/nrm-was-the-potential-victim-taken-somewhere-by-their-exploiters-page';
import { nrmWereThereAnyOtherPotentialVictimsPage } from '../pages/nrm-were-there-any-other-potential-victims-page';
import { nrmWhatAreYourContactDetailsPage } from '../pages/nrm-what-are-your-contact-details-page';
import { nrmWhatInfoDoYouHaveAbtExploiterWhereAbtPage } from '../pages/nrm-what-info-do-you-have-abt-exploiter-where-abt-page';
import { nrmWhatIsKeepingThePotentialVictimInTheSituationPage } from '../pages/nrm-what-is-keeping-the-potential-victim-in-the-situation-page';
import { nrmWhatIsTheirDateOfBirthPage } from '../pages/nrm-what-is-their-date-of-birth-page';
import { nrmWhatIsTheirGenderPage } from '../pages/nrm-what-is-their-gender-page';
import { nrmWhatIsTheNameOfThePotentialVictimPage } from '../pages/nrm-what-is-the-name-of-the-potential-victim-page';
import { nrmWhenDidExploitationHappenMultiplePage } from '../pages/nrm-when-did-exploitation-happen-multiple-page';
import { nrmWhenDidExploitationHappenPage } from '../pages/nrm-when-did-exploitation-happen-page';
import { nrmWhenWasPotentialVictimAndExploiterLastInContactPage } from '../pages/nrm-when-was-potential-victim-and-exploiter-last-in-contact-page';
import { nrmWhereAreYouMakingThisReportPage } from '../pages/nrm-where-are-you-making-this-report-page';
import { nrmWhereIsThePotentialVictimStayingPage } from '../pages/nrm-where-is-the-potential-victim-staying-page';
import { nrmWhereWereTheyExploitedInTheUKPage } from '../pages/nrm-where-were-they-exploited-in-the-uk-page';
import { nrmWhereWereTheyExploitedOverseasPage } from '../pages/nrm-where-were-they-exploited-overseas-page';
import { nrmWhereWereTheyExploitedPage } from '../pages/nrm-where-were-they-exploited-page';
import { nrmWhoExploitedThePotentialVictimPage } from '../pages/nrm-who-exploited-the-potential-victim-page';
import { nrmWhoShouldWeContactInYourAbsencePage } from '../pages/nrm-who-should-we-contact-in-your-absence-page';
import { nrmWhoShouldWeSendDecisionToPage } from '../pages/nrm-who-should-we-send-decision-to-page';
import { nrmWhyAreThereConcernsAboutExploitationInTheFuturePage } from '../pages/nrm-why-are-there-concerns-about-exploitation-in-the-future-page';
import { nrmWhyAreTheyReportingThisNowPage } from '../pages/nrm-why-are-they-reporting-this-now-page';
import { nrmWhyDontTheyWantTheirCaseReferredPage } from '../pages/nrm-why-dont-they-want-their-case-referred-page';
import { nrmWorkEmailPage } from '../pages/nrm-work-email-page';
import { nrmYourReportHasBeenSavedPage } from '../pages/nrm-your-report-has-been-saved-page';

const nrmPageConstructors = {
  basePage: basePage,
  nrmAddReferencePage: nrmAddReferencePage,
  nrmAreTheExploitersInTheUKPage: nrmAreTheExploitersInTheUKPage,
  nrmAreThereConcernsThatThePotentialVictimCouldBeExploitedAgainInTheFuturePage: nrmAreThereConcernsThatThePotentialVictimCouldBeExploitedAgainInTheFuturePage,
  nrmAreThereOtherProfessionalsOrOrganisationsInvolvedWithThisCasePage: nrmAreThereOtherProfessionalsOrOrganisationsInvolvedWithThisCasePage,
  nrmBackgroundPage: nrmBackgroundPage,
  nrmCanSupportProviderContactThemByPhonePage: nrmCanSupportProviderContactThemByPhonePage,
  nrmCheckYourAnswersPage: nrmCheckYourAnswersPage,
  nrmContinueToYourReportPage: nrmContinueToYourReportPage,
  nrmCoOperationWithPublicAuthoritiesPage: nrmCoOperationWithPublicAuthoritiesPage,
  nrmCurrentProgressPage: nrmCurrentProgressPage,
  nrmDeleteReportPage: nrmDeleteReportPage,
  nrmDidYouIdentifyAnyModernSlaveryIndicatorsPage: nrmDidYouIdentifyAnyModernSlaveryIndicatorsPage,
  nrmDoesThePotentialVictimConsentToHavingTheirCaseReferredToTheNrmPage: nrmDoesThePotentialVictimConsentToHavingTheirCaseReferredToTheNrmPage,
  nrmDoTheyHaveACrimeReferenceNumberRelatedToAnyReportedModernSlaveryCrimeInWhichTheyAreAVictimPage: nrmDoTheyHaveACrimeReferenceNumberRelatedToAnyReportedModernSlaveryCrimeInWhichTheyAreAVictimPage,
  nrmDoTheyHaveAnyChildrenPage: nrmDoTheyHaveAnyChildrenPage,
  nrmDoTheyHaveAnyHomeOfficeRefPage: nrmDoTheyHaveAnyHomeOfficeRefPage,
  nrmDoTheyNeedHelpWithCommunicationPage: nrmDoTheyNeedHelpWithCommunicationPage,
  nrmDoTheyNeedInterpreterPage: nrmDoTheyNeedInterpreterPage,
  nrmDoTheyNeedSupportPage: nrmDoTheyNeedSupportPage,
  nrmDoYouHaveAnyConcernsAboutThePotentialVictimsCredibilityPage: nrmDoYouHaveAnyConcernsAboutThePotentialVictimsCredibilityPage,
  nrmDoYouHaveInformationAboutWhereTheExploitersArePage: nrmDoYouHaveInformationAboutWhereTheExploitersArePage,
  nrmDraftReportsPage: nrmDraftReportsPage,
  nrmEvidenceUploadPage: nrmEvidenceUploadPage,
  nrmFirstTimeOfReportingThisPage: nrmFirstTimeOfReportingThisPage,
  nrmHasThePotentialVictimBeenInMoreThanOneExploitativeSituationPage: nrmHasThePotentialVictimBeenInMoreThanOneExploitativeSituationPage,
  nrmHomePage: nrmHomePage,
  nrmHowAndWhyTheyLeftPage: nrmHowAndWhyTheyLeftPage,
  nrmHowCanTheSupportProviderContactThePotentialVictimPage: nrmHowCanTheSupportProviderContactThePotentialVictimPage,
  nrmHowExploitationStartPage: nrmHowExploitationStartPage,
  nrmHowShouldTheyBeContactedPage: nrmHowShouldTheyBeContactedPage,
  nrmHowWasThePotentialVictimTreatedDuringTheirExploitationPage: nrmHowWasThePotentialVictimTreatedDuringTheirExploitationPage,
  nrmHowWereTheyExploitedPage: nrmHowWereTheyExploitedPage,
  nrmIsThePotentialVictimStillInAnExploitativeSituationPage: nrmIsThePotentialVictimStillInAnExploitativeSituationPage,
  nrmIsVictimUnder18Page: nrmIsVictimUnder18Page,
  nrmLocalAuthContactedPage: nrmLocalAuthContactedPage,
  nrmOtherProfessionalOrgInvolvedPage: nrmOtherProfessionalOrgInvolvedPage,
  nrmSelectNationalityPage: nrmSelectNationalityPage,
  nrmSelectOrganisationPage: nrmSelectOrganisationPage,
  nrmSentConfirmationPage: nrmSentConfirmationPage,
  nrmTellUsAboutTheDocumentsYouUploadedPage: nrmTellUsAboutTheDocumentsYouUploadedPage,
  nrmTellUsAboutTheInterviewsPage: nrmTellUsAboutTheInterviewsPage,
  nrmTellUsAboutTheLastContactBetweenThePotentialVictimAndTheirExploitersPage: nrmTellUsAboutTheLastContactBetweenThePotentialVictimAndTheirExploitersPage,
  nrmUnder18AnytimeDuringExploitationPage: nrmUnder18AnytimeDuringExploitationPage,
  nrmWasThePotentialVictimTakenSomewhereByTheirExploitersPage: nrmWasThePotentialVictimTakenSomewhereByTheirExploitersPage,
  nrmWereThereAnyOtherPotentialVictimsPage: nrmWereThereAnyOtherPotentialVictimsPage,
  nrmWhatAreYourContactDetailsPage: nrmWhatAreYourContactDetailsPage,
  nrmWhatInfoDoYouHaveAbtExploiterWhereAbtPage: nrmWhatInfoDoYouHaveAbtExploiterWhereAbtPage,
  nrmWhatIsKeepingThePotentialVictimInTheSituationPage: nrmWhatIsKeepingThePotentialVictimInTheSituationPage,
  nrmWhatIsTheirDateOfBirthPage: nrmWhatIsTheirDateOfBirthPage,
  nrmWhatIsTheirGenderPage: nrmWhatIsTheirGenderPage,
  nrmWhatIsTheNameOfThePotentialVictimPage: nrmWhatIsTheNameOfThePotentialVictimPage,
  nrmWhenDidExploitationHappenMultiplePage: nrmWhenDidExploitationHappenMultiplePage,
  nrmWhenDidExploitationHappenPage: nrmWhenDidExploitationHappenPage,
  nrmWhenWasPotentialVictimAndExploiterLastInContactPage: nrmWhenWasPotentialVictimAndExploiterLastInContactPage,
  nrmWhereAreYouMakingThisReportPage: nrmWhereAreYouMakingThisReportPage,
  nrmWhereIsThePotentialVictimStayingPage: nrmWhereIsThePotentialVictimStayingPage,
  nrmWhereWereTheyExploitedInTheUKPage: nrmWhereWereTheyExploitedInTheUKPage,
  nrmWhereWereTheyExploitedOverseasPage: nrmWhereWereTheyExploitedOverseasPage,
  nrmWhereWereTheyExploitedPage: nrmWhereWereTheyExploitedPage,
  nrmWhoExploitedThePotentialVictimPage: nrmWhoExploitedThePotentialVictimPage,
  nrmWhoShouldWeContactInYourAbsencePage: nrmWhoShouldWeContactInYourAbsencePage,
  nrmWhoShouldWeSendDecisionToPage: nrmWhoShouldWeSendDecisionToPage,
  nrmWhyAreThereConcernsAboutExploitationInTheFuturePage: nrmWhyAreThereConcernsAboutExploitationInTheFuturePage,
  nrmWhyAreTheyReportingThisNowPage: nrmWhyAreTheyReportingThisNowPage,
  nrmWhyDontTheyWantTheirCaseReferredPage: nrmWhyDontTheyWantTheirCaseReferredPage,
  nrmWorkEmailPage: nrmWorkEmailPage,
  nrmYourReportHasBeenSavedPage: nrmYourReportHasBeenSavedPage,
} satisfies Record<string, new (page: Page) => basePage>;

export type Pages = {
  [PageId in keyof typeof nrmPageConstructors]: InstanceType<(typeof nrmPageConstructors)[PageId]>;
};

function createNrmPages(page: Page): Pages {
  return Object.fromEntries(
    Object.entries(nrmPageConstructors).map(([pageId, PageObject]) => [pageId, new PageObject(page)]),
  ) as Pages;
}

export const test = base.extend<{ pages: Pages }>({
  pages: async ({ page }, use) => {
    await use(createNrmPages(page));
  },
});

export const expect = test.expect;