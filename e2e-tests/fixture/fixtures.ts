import { test as base } from 'playwright-bdd';
import type { Page } from '@playwright/test';
import type { NrmPageId } from '../utility-helper/constants-lib';
import { BasePage } from '../pages/base-page';
import { NrmAddReferencePage } from '../pages/nrm-add-reference-page';
import { NrmAreTheExploitersInTheUKPage } from '../pages/nrm-are-the-exploiters-in-the-uk-page';
import { NrmAreThereConcernsThatThePotentialVictimCouldBeExploitedAgainInTheFuturePage } from '../pages/nrm-are-there-concerns-that-the-potential-victim-could-be-exploited-again-in-the-future-page';
import { NrmAreThereOtherProfessionalsOrOrganisationsInvolvedWithThisCasePage } from '../pages/nrm-are-there-other-professionals-or-organisations-involved-with-this-case-page';
import { NrmBackgroundPage } from '../pages/nrm-background-page';
import { NrmCanSupportProviderContactThemByPhonePage } from '../pages/nrm-can-support-provider-contact-them-by-phone-page';
import { NrmCheckYourAnswersPage } from '../pages/nrm-check-your-answers-page';
import { NrmContinueToYourReportPage } from '../pages/nrm-continue-to-your-report-page';
import { NrmCoOperationWithPublicAuthoritiesPage } from '../pages/nrm-co-operation-with-public-authorities-page';
import { NrmCurrentProgressPage } from '../pages/nrm-current-progress-page';
import { NrmDeleteReportPage } from '../pages/nrm-delete-report-page';
import { NrmDidYouIdentifyAnyModernSlaveryIndicatorsPage } from '../pages/nrm-did-you-identify-any-modern-slavery-indicators-page';
import { NrmDoesThePotentialVictimConsentToHavingTheirCaseReferredToTheNrmPage } from '../pages/nrm-does-the-potential-victim-consent-to-having-their-case-referred-to-the-nrm-page';
import { NrmDoTheyHaveACrimeReferenceNumberRelatedToAnyReportedModernSlaveryCrimeInWhichTheyAreAVictimPage } from '../pages/nrm-do-they-have-a-crime-reference-number-related-to-any-reported-modern-slavery-crime-in-which-they-are-a-victim-page';
import { NrmDoTheyHaveAnyChildrenPage } from '../pages/nrm-do-they-have-any-children-page';
import { NrmDoTheyHaveAnyHomeOfficeRefPage } from '../pages/nrm-do-they-have-any-home-office-ref-page';
import { NrmDoTheyNeedHelpWithCommunicationPage } from '../pages/nrm-do-they-need-help-with-communication-page';
import { NrmDoTheyNeedInterpreterPage } from '../pages/nrm-do-they-need-interpreter-page';
import { NrmDoTheyNeedSupportPage } from '../pages/nrm-do-they-need-support-page';
import { NrmDoYouHaveAnyConcernsAboutThePotentialVictimsCredibilityPage } from '../pages/nrm-do-you-have-any-concerns-about-the-potential-victims-credibility-page';
import { NrmDoYouHaveInformationAboutWhereTheExploitersArePage } from '../pages/nrm-do-you-have-information-about-where-the-exploiters-are-page';
import { NrmDraftReportsPage } from '../pages/nrm-draft-reports-page';
import { NrmEvidenceUploadPage } from '../pages/nrm-evidence-upload-page';
import { NrmFirstTimeOfReportingThisPage } from '../pages/nrm-first-time-of-reporting-this-page';
import { NrmHasThePotentialVictimBeenInMoreThanOneExploitativeSituationPage } from '../pages/nrm-has-the-potential-victim-been-in-more-than-one-exploitative-situation-page';
import { NrmHomePage } from '../pages/nrm-home-page';
import { NrmHowAndWhyTheyLeftPage } from '../pages/nrm-how-and-why-they-left-page';
import { NrmHowCanTheSupportProviderContactThePotentialVictimPage } from '../pages/nrm-how-can-the-support-provider-contact-the-potential-victim-page';
import { NrmHowExploitationStartPage } from '../pages/nrm-how-exploitation-start-page';
import { NrmHowShouldTheyBeContactedPage } from '../pages/nrm-how-should-they-be-contacted-page';
import { NrmHowWasThePotentialVictimTreatedDuringTheirExploitationPage } from '../pages/nrm-how-was-the-potential-victim-treated-during-their-exploitation-page';
import { NrmHowWereTheyExploitedPage } from '../pages/nrm-how-were-they-exploited-page';
import { NrmIsThePotentialVictimStillInAnExploitativeSituationPage } from '../pages/nrm-is-the-potential-victim-still-in-an-exploitative-situation-page';
import { NrmIsVictimUnder18Page } from '../pages/nrm-is-victim-under18-page';
import { NrmLocalAuthContactedPage } from '../pages/nrm-local-auth-contacted-page';
import { NrmOtherProfessionalOrgInvolvedPage } from '../pages/nrm-other-professional-org-involved-page';
import { NrmSelectNationalityPage } from '../pages/nrm-select-nationality-page';
import { NrmSelectOrganisationPage } from '../pages/nrm-select-organisation-page';
import { NrmSentConfirmationPage } from '../pages/nrm-sent-confirmation-page';
import { NrmTellUsAboutTheDocumentsYouUploadedPage } from '../pages/nrm-tell-us-about-the-documents-you-uploaded-page';
import { NrmTellUsAboutTheInterviewsPage } from '../pages/nrm-tell-us-about-the-interviews-page';
import { NrmTellUsAboutTheLastContactBetweenThePotentialVictimAndTheirExploitersPage } from '../pages/nrm-tell-us-about-the-last-contact-between-the-potential-victim-and-their-exploiters-page';
import { NrmUnder18AnytimeDuringExploitationPage } from '../pages/nrm-under18-anytime-during-exploitation-page';
import { NrmWasThePotentialVictimTakenSomewhereByTheirExploitersPage } from '../pages/nrm-was-the-potential-victim-taken-somewhere-by-their-exploiters-page';
import { NrmWereThereAnyOtherPotentialVictimsPage } from '../pages/nrm-were-there-any-other-potential-victims-page';
import { NrmWhatAreYourContactDetailsPage } from '../pages/nrm-what-are-your-contact-details-page';
import { NrmWhatInfoDoYouHaveAbtExploiterWhereAbtPage } from '../pages/nrm-what-info-do-you-have-abt-exploiter-where-abt-page';
import { NrmWhatIsKeepingThePotentialVictimInTheSituationPage } from '../pages/nrm-what-is-keeping-the-potential-victim-in-the-situation-page';
import { NrmWhatIsTheirDateOfBirthPage } from '../pages/nrm-what-is-their-date-of-birth-page';
import { NrmWhatIsTheirGenderPage } from '../pages/nrm-what-is-their-gender-page';
import { NrmWhatIsTheNameOfThePotentialVictimPage } from '../pages/nrm-what-is-the-name-of-the-potential-victim-page';
import { NrmWhenDidExploitationHappenMultiplePage } from '../pages/nrm-when-did-exploitation-happen-multiple-page';
import { NrmWhenDidExploitationHappenPage } from '../pages/nrm-when-did-exploitation-happen-page';
import { NrmWhenWasPotentialVictimAndExploiterLastInContactPage } from '../pages/nrm-when-was-potential-victim-and-exploiter-last-in-contact-page';
import { NrmWhereAreYouMakingThisReportPage } from '../pages/nrm-where-are-you-making-this-report-page';
import { NrmWhereIsThePotentialVictimStayingPage } from '../pages/nrm-where-is-the-potential-victim-staying-page';
import { NrmWhereWereTheyExploitedInTheUKPage } from '../pages/nrm-where-were-they-exploited-in-the-uk-page';
import { NrmWhereWereTheyExploitedOverseasPage } from '../pages/nrm-where-were-they-exploited-overseas-page';
import { NrmWhereWereTheyExploitedPage } from '../pages/nrm-where-were-they-exploited-page';
import { NrmWhoExploitedThePotentialVictimPage } from '../pages/nrm-who-exploited-the-potential-victim-page';
import { NrmWhoShouldWeContactInYourAbsencePage } from '../pages/nrm-who-should-we-contact-in-your-absence-page';
import { NrmWhoShouldWeSendDecisionToPage } from '../pages/nrm-who-should-we-send-decision-to-page';
import { NrmWhyAreThereConcernsAboutExploitationInTheFuturePage } from '../pages/nrm-why-are-there-concerns-about-exploitation-in-the-future-page';
import { NrmWhyAreTheyReportingThisNowPage } from '../pages/nrm-why-are-they-reporting-this-now-page';
import { NrmWhyDontTheyWantTheirCaseReferredPage } from '../pages/nrm-why-dont-they-want-their-case-referred-page';
import { NrmWorkEmailPage } from '../pages/nrm-work-email-page';
import { NrmYourReportHasBeenSavedPage } from '../pages/nrm-your-report-has-been-saved-page';

const nrmPageConstructors = {
  nrmAddReferencePage: NrmAddReferencePage,
  nrmAreTheExploitersInTheUKPage: NrmAreTheExploitersInTheUKPage,
  nrmAreThereConcernsThatThePotentialVictimCouldBeExploitedAgainInTheFuturePage: NrmAreThereConcernsThatThePotentialVictimCouldBeExploitedAgainInTheFuturePage,
  nrmAreThereOtherProfessionalsOrOrganisationsInvolvedWithThisCasePage: NrmAreThereOtherProfessionalsOrOrganisationsInvolvedWithThisCasePage,
  nrmBackgroundPage: NrmBackgroundPage,
  nrmCanSupportProviderContactThemByPhonePage: NrmCanSupportProviderContactThemByPhonePage,
  nrmCheckYourAnswersPage: NrmCheckYourAnswersPage,
  nrmContinueToYourReportPage: NrmContinueToYourReportPage,
  nrmCoOperationWithPublicAuthoritiesPage: NrmCoOperationWithPublicAuthoritiesPage,
  nrmCurrentProgressPage: NrmCurrentProgressPage,
  nrmDeleteReportPage: NrmDeleteReportPage,
  nrmDidYouIdentifyAnyModernSlaveryIndicatorsPage: NrmDidYouIdentifyAnyModernSlaveryIndicatorsPage,
  nrmDoesThePotentialVictimConsentToHavingTheirCaseReferredToTheNrmPage: NrmDoesThePotentialVictimConsentToHavingTheirCaseReferredToTheNrmPage,
  nrmDoTheyHaveACrimeReferenceNumberRelatedToAnyReportedModernSlaveryCrimeInWhichTheyAreAVictimPage: NrmDoTheyHaveACrimeReferenceNumberRelatedToAnyReportedModernSlaveryCrimeInWhichTheyAreAVictimPage,
  nrmDoTheyHaveAnyChildrenPage: NrmDoTheyHaveAnyChildrenPage,
  nrmDoTheyHaveAnyHomeOfficeRefPage: NrmDoTheyHaveAnyHomeOfficeRefPage,
  nrmDoTheyNeedHelpWithCommunicationPage: NrmDoTheyNeedHelpWithCommunicationPage,
  nrmDoTheyNeedInterpreterPage: NrmDoTheyNeedInterpreterPage,
  nrmDoTheyNeedSupportPage: NrmDoTheyNeedSupportPage,
  nrmDoYouHaveAnyConcernsAboutThePotentialVictimsCredibilityPage: NrmDoYouHaveAnyConcernsAboutThePotentialVictimsCredibilityPage,
  nrmDoYouHaveInformationAboutWhereTheExploitersArePage: NrmDoYouHaveInformationAboutWhereTheExploitersArePage,
  nrmDraftReportsPage: NrmDraftReportsPage,
  nrmEvidenceUploadPage: NrmEvidenceUploadPage,
  nrmFirstTimeOfReportingThisPage: NrmFirstTimeOfReportingThisPage,
  nrmHasThePotentialVictimBeenInMoreThanOneExploitativeSituationPage: NrmHasThePotentialVictimBeenInMoreThanOneExploitativeSituationPage,
  nrmHomePage: NrmHomePage,
  nrmHowAndWhyTheyLeftPage: NrmHowAndWhyTheyLeftPage,
  nrmHowCanTheSupportProviderContactThePotentialVictimPage: NrmHowCanTheSupportProviderContactThePotentialVictimPage,
  nrmHowExploitationStartPage: NrmHowExploitationStartPage,
  nrmHowShouldTheyBeContactedPage: NrmHowShouldTheyBeContactedPage,
  nrmHowWasThePotentialVictimTreatedDuringTheirExploitationPage: NrmHowWasThePotentialVictimTreatedDuringTheirExploitationPage,
  nrmHowWereTheyExploitedPage: NrmHowWereTheyExploitedPage,
  nrmIsThePotentialVictimStillInAnExploitativeSituationPage: NrmIsThePotentialVictimStillInAnExploitativeSituationPage,
  nrmIsVictimUnder18Page: NrmIsVictimUnder18Page,
  nrmLocalAuthContactedPage: NrmLocalAuthContactedPage,
  nrmOtherProfessionalOrgInvolvedPage: NrmOtherProfessionalOrgInvolvedPage,
  nrmSelectNationalityPage: NrmSelectNationalityPage,
  nrmSelectOrganisationPage: NrmSelectOrganisationPage,
  nrmSentConfirmationPage: NrmSentConfirmationPage,
  nrmTellUsAboutTheDocumentsYouUploadedPage: NrmTellUsAboutTheDocumentsYouUploadedPage,
  nrmTellUsAboutTheInterviewsPage: NrmTellUsAboutTheInterviewsPage,
  nrmTellUsAboutTheLastContactBetweenThePotentialVictimAndTheirExploitersPage: NrmTellUsAboutTheLastContactBetweenThePotentialVictimAndTheirExploitersPage,
  nrmUnder18AnytimeDuringExploitationPage: NrmUnder18AnytimeDuringExploitationPage,
  nrmWasThePotentialVictimTakenSomewhereByTheirExploitersPage: NrmWasThePotentialVictimTakenSomewhereByTheirExploitersPage,
  nrmWereThereAnyOtherPotentialVictimsPage: NrmWereThereAnyOtherPotentialVictimsPage,
  nrmWhatAreYourContactDetailsPage: NrmWhatAreYourContactDetailsPage,
  nrmWhatInfoDoYouHaveAbtExploiterWhereAbtPage: NrmWhatInfoDoYouHaveAbtExploiterWhereAbtPage,
  nrmWhatIsKeepingThePotentialVictimInTheSituationPage: NrmWhatIsKeepingThePotentialVictimInTheSituationPage,
  nrmWhatIsTheirDateOfBirthPage: NrmWhatIsTheirDateOfBirthPage,
  nrmWhatIsTheirGenderPage: NrmWhatIsTheirGenderPage,
  nrmWhatIsTheNameOfThePotentialVictimPage: NrmWhatIsTheNameOfThePotentialVictimPage,
  nrmWhenDidExploitationHappenMultiplePage: NrmWhenDidExploitationHappenMultiplePage,
  nrmWhenDidExploitationHappenPage: NrmWhenDidExploitationHappenPage,
  nrmWhenWasPotentialVictimAndExploiterLastInContactPage: NrmWhenWasPotentialVictimAndExploiterLastInContactPage,
  nrmWhereAreYouMakingThisReportPage: NrmWhereAreYouMakingThisReportPage,
  nrmWhereIsThePotentialVictimStayingPage: NrmWhereIsThePotentialVictimStayingPage,
  nrmWhereWereTheyExploitedInTheUKPage: NrmWhereWereTheyExploitedInTheUKPage,
  nrmWhereWereTheyExploitedOverseasPage: NrmWhereWereTheyExploitedOverseasPage,
  nrmWhereWereTheyExploitedPage: NrmWhereWereTheyExploitedPage,
  nrmWhoExploitedThePotentialVictimPage: NrmWhoExploitedThePotentialVictimPage,
  nrmWhoShouldWeContactInYourAbsencePage: NrmWhoShouldWeContactInYourAbsencePage,
  nrmWhoShouldWeSendDecisionToPage: NrmWhoShouldWeSendDecisionToPage,
  nrmWhyAreThereConcernsAboutExploitationInTheFuturePage: NrmWhyAreThereConcernsAboutExploitationInTheFuturePage,
  nrmWhyAreTheyReportingThisNowPage: NrmWhyAreTheyReportingThisNowPage,
  nrmWhyDontTheyWantTheirCaseReferredPage: NrmWhyDontTheyWantTheirCaseReferredPage,
  nrmWorkEmailPage: NrmWorkEmailPage,
  nrmYourReportHasBeenSavedPage: NrmYourReportHasBeenSavedPage,
} satisfies Record<NrmPageId, new (page: Page) => BasePage>;

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