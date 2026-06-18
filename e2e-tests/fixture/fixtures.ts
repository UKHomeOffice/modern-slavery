import { test as base } from 'playwright-bdd';
import { BasePage } from '../pages/base-page';
import { NrmAgePage } from '../pages/nrm-age-page';
import { NrmBackgroundPage } from '../pages/nrm-background-page';
import { NrmExploitationStartPage } from '../pages/nrm-exploitation-start-page';
import { NrmExploitationTypePage } from '../pages/nrm-exploitation-type-page';
import { NrmExploitationLocationPage } from '../pages/nrm-exploitation-location-page';
import { NrmExploitationOverseasPage } from '../pages/nrm-exploitation-overseas-page';
import { NrmExploitationUkPage } from '../pages/nrm-exploitation-uk-page';
import { NrmExploitationWhenMultiplePage } from '../pages/nrm-exploitation-when-multiple-page';
import { NrmExploitationWhenPage } from '../pages/nrm-exploitation-when-page';
import { NrmCredibilityConcernsPage } from '../pages/nrm-credibility-concerns-page';
import { NrmFirstTimeReportingPage } from '../pages/nrm-first-time-reporting-page';
import { NrmHowTheyLeftPage } from '../pages/nrm-how-they-left-page';
import { NrmIndicatorsPage } from '../pages/nrm-indicators-page';
import { NrmInterviewsPage } from '../pages/nrm-interviews-page';
import { NrmKeepingInSituationPage } from '../pages/nrm-keeping-in-situation-page';
import { NrmLastContactDetailsPage } from '../pages/nrm-last-contact-details-page';
import { NrmLastContactPage } from '../pages/nrm-last-contact-page';
import { NrmLocalAuthorityPage } from '../pages/nrm-local-authority-page';
import { NrmStartPage } from '../pages/nrm-start-page';
import { NrmOrganisationPage } from '../pages/nrm-organisation-page';
import { NrmQuestionnairePage } from '../pages/nrm-questionnaire-page';
import { NrmReferencePage } from '../pages/nrm-reference-page';
import { NrmReportActionsPage } from '../pages/nrm-report-actions-page';
import { NrmReportLocationPage } from '../pages/nrm-report-location-page';
import { NrmTakenSomewherePage } from '../pages/nrm-taken-somewhere-page';
import { NrmTreatmentPage } from '../pages/nrm-treatment-page';
import { NrmUnder18DuringExploitationPage } from '../pages/nrm-under18-during-exploitation-page';
import { NrmOtherProfessionalsPage } from '../pages/nrm-other-professionals-page';
import { NrmProfessionalInsightPage } from '../pages/nrm-professional-insight-page';
import { NrmWhyReportingNowPage } from '../pages/nrm-why-reporting-now-page';
import type { NrmScenarioData } from '../utility-helper/scenario-data';

type ScenarioContext = {
  service?: string;
  scenarioId?: string;
  description?: string;
  scenarioData?: NrmScenarioData;
};

type Pages = {
  basePage: BasePage;
  nrmAgePage: NrmAgePage;
  nrmBackgroundPage: NrmBackgroundPage;
  nrmExploitationStartPage: NrmExploitationStartPage;
  nrmExploitationTypePage: NrmExploitationTypePage;
  nrmExploitationLocationPage: NrmExploitationLocationPage;
  nrmExploitationOverseasPage: NrmExploitationOverseasPage;
  nrmExploitationUkPage: NrmExploitationUkPage;
  nrmExploitationWhenMultiplePage: NrmExploitationWhenMultiplePage;
  nrmExploitationWhenPage: NrmExploitationWhenPage;
  nrmCredibilityConcernsPage: NrmCredibilityConcernsPage;
  nrmFirstTimeReportingPage: NrmFirstTimeReportingPage;
  nrmHowTheyLeftPage: NrmHowTheyLeftPage;
  nrmIndicatorsPage: NrmIndicatorsPage;
  nrmInterviewsPage: NrmInterviewsPage;
  nrmKeepingInSituationPage: NrmKeepingInSituationPage;
  nrmLastContactDetailsPage: NrmLastContactDetailsPage;
  nrmLastContactPage: NrmLastContactPage;
  nrmLocalAuthorityPage: NrmLocalAuthorityPage;
  nrmOrganisationPage: NrmOrganisationPage;
  nrmStartPage: NrmStartPage;
  nrmQuestionnairePage: NrmQuestionnairePage;
  nrmReferencePage: NrmReferencePage;
  nrmReportActionsPage: NrmReportActionsPage;
  nrmReportLocationPage: NrmReportLocationPage;
  nrmTakenSomewherePage: NrmTakenSomewherePage;
  nrmTreatmentPage: NrmTreatmentPage;
  nrmUnder18DuringExploitationPage: NrmUnder18DuringExploitationPage;
  nrmOtherProfessionalsPage: NrmOtherProfessionalsPage;
  nrmProfessionalInsightPage: NrmProfessionalInsightPage;
  nrmWhyReportingNowPage: NrmWhyReportingNowPage;
};

export const test = base.extend<{ pages: Pages; scenarioContext: ScenarioContext }>({
  pages: async ({ page }, use) => {
    await use({
      basePage: new BasePage(page),
      nrmAgePage: new NrmAgePage(page),
      nrmBackgroundPage: new NrmBackgroundPage(page),
      nrmExploitationStartPage: new NrmExploitationStartPage(page),
      nrmExploitationTypePage: new NrmExploitationTypePage(page),
      nrmExploitationLocationPage: new NrmExploitationLocationPage(page),
      nrmExploitationOverseasPage: new NrmExploitationOverseasPage(page),
      nrmExploitationUkPage: new NrmExploitationUkPage(page),
      nrmExploitationWhenMultiplePage: new NrmExploitationWhenMultiplePage(page),
      nrmExploitationWhenPage: new NrmExploitationWhenPage(page),
      nrmCredibilityConcernsPage: new NrmCredibilityConcernsPage(page),
      nrmFirstTimeReportingPage: new NrmFirstTimeReportingPage(page),
      nrmHowTheyLeftPage: new NrmHowTheyLeftPage(page),
      nrmIndicatorsPage: new NrmIndicatorsPage(page),
      nrmInterviewsPage: new NrmInterviewsPage(page),
      nrmKeepingInSituationPage: new NrmKeepingInSituationPage(page),
      nrmLastContactDetailsPage: new NrmLastContactDetailsPage(page),
      nrmLastContactPage: new NrmLastContactPage(page),
      nrmLocalAuthorityPage: new NrmLocalAuthorityPage(page),
      nrmOrganisationPage: new NrmOrganisationPage(page),
      nrmStartPage: new NrmStartPage(page),
      nrmQuestionnairePage: new NrmQuestionnairePage(page),
      nrmReferencePage: new NrmReferencePage(page),
      nrmReportActionsPage: new NrmReportActionsPage(page),
      nrmReportLocationPage: new NrmReportLocationPage(page),
      nrmTakenSomewherePage: new NrmTakenSomewherePage(page),
      nrmTreatmentPage: new NrmTreatmentPage(page),
      nrmUnder18DuringExploitationPage: new NrmUnder18DuringExploitationPage(page),
      nrmOtherProfessionalsPage: new NrmOtherProfessionalsPage(page),
      nrmProfessionalInsightPage: new NrmProfessionalInsightPage(page),
      nrmWhyReportingNowPage: new NrmWhyReportingNowPage(page),
    });
  },
  scenarioContext: async ({}, use) => {
    await use({});
  },
});

export const expect = test.expect;
