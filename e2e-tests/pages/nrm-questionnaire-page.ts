import { expect } from '@playwright/test';
import { BasePage } from './base-page';
import { NrmAgePage } from './nrm-age-page';
import { NrmBackgroundPage } from './nrm-background-page';
import { NrmExploitationStartPage } from './nrm-exploitation-start-page';
import { NrmExploitationTypePage } from './nrm-exploitation-type-page';
import { NrmExploitationLocationPage } from './nrm-exploitation-location-page';
import { NrmExploitationOverseasPage } from './nrm-exploitation-overseas-page';
import { NrmExploitationUkPage } from './nrm-exploitation-uk-page';
import { NrmExploitationWhenMultiplePage } from './nrm-exploitation-when-multiple-page';
import { NrmExploitationWhenPage } from './nrm-exploitation-when-page';
import { NrmCredibilityConcernsPage } from './nrm-credibility-concerns-page';
import { NrmFirstTimeReportingPage } from './nrm-first-time-reporting-page';
import { NrmHowTheyLeftPage } from './nrm-how-they-left-page';
import { NrmIndicatorsPage } from './nrm-indicators-page';
import { NrmInterviewsPage } from './nrm-interviews-page';
import { NrmKeepingInSituationPage } from './nrm-keeping-in-situation-page';
import { NrmLastContactDetailsPage } from './nrm-last-contact-details-page';
import { NrmLastContactPage } from './nrm-last-contact-page';
import { NrmLocalAuthorityPage } from './nrm-local-authority-page';
import { NrmOrganisationPage } from './nrm-organisation-page';
import { NrmReferencePage } from './nrm-reference-page';
import { NrmReportLocationPage } from './nrm-report-location-page';
import { NrmTakenSomewherePage } from './nrm-taken-somewhere-page';
import { NrmTreatmentPage } from './nrm-treatment-page';
import { NrmUnder18DuringExploitationPage } from './nrm-under18-during-exploitation-page';
import { NrmOtherProfessionalsPage } from './nrm-other-professionals-page';
import { NrmProfessionalInsightPage } from './nrm-professional-insight-page';
import { NrmWhyReportingNowPage } from './nrm-why-reporting-now-page';
import type { NrmScenarioData } from '../utility-helper/scenario-data';

export class NrmQuestionnairePage extends BasePage {
  async completeQuestionnaire(checkError: string, partial = false, scenarioData?: NrmScenarioData): Promise<void> {
    if (String(checkError).toLowerCase() === 'yes') {
      const problemSummary = this.page.locator('.govuk-error-summary, [data-testid="error-summary"]').first();
      if (await problemSummary.isVisible().catch(() => false)) {
        await expect(problemSummary).toBeVisible();
      }
      return;
    }

    if (scenarioData) {
      await this.completeStructuredSetupPages(scenarioData);
    }

    const continueButton = this.page.getByRole('button', { name: /^continue$/i });
    await this.clickIfVisible(continueButton);
    if (!partial) {
      await this.clickIfVisible(continueButton);
    }
  }

  async submitReport(): Promise<void> {
    await this.clickIfVisible(this.page.getByRole('button', { name: /submit/i }));
  }

  private async completeStructuredSetupPages(scenarioData: NrmScenarioData): Promise<void> {
    await new NrmReferencePage(this.page).enterYourReference(scenarioData.scenarioId);
    await new NrmOrganisationPage(this.page).selectOrganisation();
    await new NrmReportLocationPage(this.page).selectReportLocation(scenarioData.reportLocation);
    await new NrmAgePage(this.page).answerVictimUnder18(scenarioData.victimUnder18);

    if (scenarioData.victimUnder18 === 'No' && scenarioData.under18DuringExploitation) {
      await new NrmUnder18DuringExploitationPage(this.page).answerUnder18DuringExploitation(scenarioData.under18DuringExploitation);
    }

    if (scenarioData.victimUnder18 === 'Yes' || scenarioData.victimUnder18 === 'Not sure') {
      await new NrmLocalAuthorityPage(this.page).completeLocalAuthorityDetails();
    }

    await new NrmBackgroundPage(this.page).completeBackground(scenarioData.backgroundText);
    await new NrmExploitationTypePage(this.page).answerMultipleExploitativeSituations(scenarioData.multipleExploitativeSituations);

    if (scenarioData.multipleExploitativeSituations === 'Yes') {
      await new NrmExploitationWhenMultiplePage(this.page).answerExploitationPeriod(scenarioData.exploitationWhenText);
    } else {
      await new NrmExploitationWhenPage(this.page).answerExploitationPeriod(scenarioData.exploitationWhenText);
    }

    await new NrmExploitationStartPage(this.page).answerHowExploitationStarted(scenarioData.exploitationStartText);

    await new NrmTakenSomewherePage(this.page).answerTakenSomewhere(
      scenarioData.takenSomewhereByExploiters,
      scenarioData.takenSomewhereJourneyText
    );

    await new NrmTreatmentPage(this.page).answerTreatment(scenarioData.treatmentText);

    if (scenarioData.stillInExploitativeSituation === 'Yes') {
      await new NrmKeepingInSituationPage(this.page).answerKeepingInSituation(
        scenarioData.keepingInSituationText || scenarioData.treatmentText
      );
    } else {
      await new NrmHowTheyLeftPage(this.page).answerHowTheyLeft(
        scenarioData.howTheyLeftText || scenarioData.treatmentText
      );
    }

    await new NrmFirstTimeReportingPage(this.page).answerFirstTimeReporting(
      scenarioData.firstTimeReporting,
      scenarioData.firstTimeReportingDetail
    );

    if (scenarioData.firstTimeReporting === 'No') {
      await new NrmWhyReportingNowPage(this.page).answerWhyReportingNow(
        scenarioData.whyReportingNowText || scenarioData.treatmentText
      );
    }

    await new NrmIndicatorsPage(this.page).answerIndicators(
      scenarioData.identifiedIndicators || 'No',
      scenarioData.indicatorsDetailsText || scenarioData.treatmentText
    );
    await new NrmInterviewsPage(this.page).answerInterviewDetails(
      scenarioData.interviewDetailsText || scenarioData.treatmentText
    );
    await new NrmProfessionalInsightPage(this.page).answerProfessionalInsight(
      scenarioData.professionalInsightText || scenarioData.treatmentText
    );

    await new NrmCredibilityConcernsPage(this.page).answerCredibilityConcerns(
      scenarioData.credibilityConcern || 'No',
      scenarioData.credibilityDetailsText || scenarioData.treatmentText
    );
    await new NrmOtherProfessionalsPage(this.page).answerOtherProfessionalsInvolved(
      scenarioData.otherProfessionalsInvolved || 'No',
      scenarioData.otherProfessionalsDetailsText || scenarioData.treatmentText
    );

    const exploitationLocation = scenarioData.exploitationLocation || 'UK';
    await new NrmExploitationLocationPage(this.page).answerExploitationLocation(exploitationLocation);
    if (exploitationLocation === 'UK' || exploitationLocation === 'UK and Overseas') {
      await new NrmExploitationUkPage(this.page).answerUkExploitationDetails(
        scenarioData.exploitationUkCity || 'Bath',
        scenarioData.exploitationUkAddressText || scenarioData.treatmentText
      );
    }
    if (exploitationLocation === 'Overseas' || exploitationLocation === 'UK and Overseas') {
      await new NrmExploitationOverseasPage(this.page).answerOverseasExploitationDetails(
        scenarioData.exploitationOverseasCountry || 'Cuba',
        scenarioData.exploitationOverseasAddressText || scenarioData.treatmentText
      );
    }

    await new NrmLastContactPage(this.page).answerLastContact(scenarioData.lastContactWithExploiters);
    await new NrmLastContactDetailsPage(this.page).answerLastContactDetails(
      scenarioData.lastContactDetailsText || scenarioData.treatmentText
    );
  }
}
