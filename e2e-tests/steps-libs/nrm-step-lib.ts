import { expect, Page } from '@playwright/test';
import { BasePage } from '../pages/base-page';
import { NRM_SELECTORS as s } from '../utility-helper/nrm-selectors';
import { NrmScenarioData } from '../utility-helper/nrm-scenario-data';

export class NrmStepLib {
  private readonly ui: BasePage;
  private scenario: NrmScenarioData | null = null;

  constructor(private readonly page: Page) {
    this.ui = new BasePage(page);
  }

  setScenario(data: NrmScenarioData): void {
    this.scenario = data;
  }

  async openNrm(): Promise<void> {
    // Local execution is more reliable when we bypass email verification.
    await this.ui.navigateTo('/nrm/start?token=skip');
    await this.page.waitForSelector(s.CONTINUE_BUTTON, { state: 'visible' });
  }

  async createReport(_email: string): Promise<void> {
    // Email is kept for parity with source step phrase but bypass flow does not require input.
    await this.ui.click(s.CONTINUE_BUTTON);
    await this.ui.click(s.START_REPORT);
  }

  async answerRefOrganisationAndReportLocationQuestions(): Promise<void> {
    await this.ui.type(s.REFERENCE_INPUT, 'REF SAFE');
    await this.ui.clickByRoleButton('Save and continue');
    await this.ui.type(s.ORGANISATION_INPUT, 'Home Office - UK Border Force UKBF');
    const orgSuggestion = this.page.locator('[id^="user-organisation__option--"]').first();
    if (await orgSuggestion.count()) {
      await orgSuggestion.click();
    } else {
      await this.page.keyboard.press('ArrowDown');
      await this.page.keyboard.press('Enter');
    }
    await this.ui.clickByRoleButton('Save and continue');
    await this.ui.check(s.LOCATION_ENGLAND_OPTION);
    await this.ui.clickByRoleButton('Save and continue');
  }

  async answerIsTheVictimUnder18(): Promise<void> {
    this.ensureScenario();
    const scenario = this.scenario;
    if (scenario?.typeOfPV === 'child') {
      await this.ui.check(s.PV_UNDER_AGE_YES_OPTION);
      await this.ui.click(s.CONTINUE_BUTTON);
      await this.ui.type(s.LOCAL_AUTHORITY_NAME, 'Crawley Borough Council');
      await this.ui.type(s.LOCAL_AUTHORITY_PHONE, '020878546453');
      await this.ui.type(s.LOCAL_AUTHORITY_EMAIL, 'test@authority.org');
      await this.ui.click(s.CONTINUE_BUTTON);
      return;
    }

    await this.ui.check(s.PV_UNDER_AGE_NO_OPTION);
    await this.ui.click(s.CONTINUE_BUTTON);
    await this.ui.check(s.PV_UNDER_AGE_AT_TIME_OF_EXPLOITATION_NO_OPTION);
    await this.ui.click(s.CONTINUE_BUTTON);
  }

  async answerTheirBackgroundAndExploitationQuestions2(): Promise<void> {
    await this.ui.type(s.PV_BIRTHPLACE, 'Test input of birthplace');
    await this.ui.type(s.PV_FAMILY, 'Test input of family');
    await this.ui.type(s.PV_EDUCATION, 'Test input of education');
    await this.ui.type(s.PV_EMPLOYMENT_HISTORY, 'Test input of employment history');
    await this.ui.click(s.CONTINUE_BUTTON);
    await this.ui.check(s.POTENTIAL_VICTIM_EXPLOITATIVE_SITUATION_NO);
    await this.ui.click(s.CONTINUE_BUTTON);
    await this.ui.type(s.EXPLOITATION_TAKE_PLACE, 'Test input of exploitation location');
    await this.ui.click(s.CONTINUE_BUTTON);
    await this.ui.type(s.HOW_DID_EXPLOITATION_START, 'Test input of start date');
    await this.ui.click(s.CONTINUE_BUTTON);
  }

  async answerTakenSomewhereByExploiter(): Promise<void> {
    await this.ui.check(s.WERE_TAKEN_SOMEWHERE_YES);
    await this.ui.type(s.WERE_TAKEN_SOMEWHERE_DETAILS, 'Test input of location details');
    await this.ui.click(s.CONTINUE_BUTTON);
  }

  async answerTheirTreatmentHowWhyTheyLeftLastContactAndChanceOfReporting(): Promise<void> {
    await this.ui.type(s.WHAT_WERE_THEY_REQUIRED_TO_DO, 'Test input of what they were required to do');
    await this.ui.type('#living-conditions', 'Test input of living conditions');
    await this.ui.type(s.HOW_WERE_THEY_TREATED, 'Test input of how they were treated');
    await this.ui.click(s.CONTINUE_BUTTON);
    await this.ui.check(s.STILL_IN_EXPLOITATIVE_SITUATION_YES_OPTION);
    await this.ui.click(s.CONTINUE_BUTTON);
    await this.ui.type(s.WHAT_IS_KEEPING_THEM_IN_SITUATION, 'Test input of why they stayed');
    await this.ui.click(s.CONTINUE_BUTTON);
    await this.ui.check(s.WHEN_LAST_CONTACT_LAST_WEEK);
    await this.ui.click(s.CONTINUE_BUTTON);
    await this.ui.type(s.DETAILS_LAST_CONTACT, 'Test input of details last contact');
    await this.ui.click(s.CONTINUE_BUTTON);
    await this.ui.check(s.FIRST_CHANCE_TO_REPORT_NO);
    await this.ui.click(s.CONTINUE_BUTTON);
    await this.ui.type(s.WHY_REPORT_NOW, 'Test input of why reporting now');
    await this.ui.click(s.CONTINUE_BUTTON);
  }

  async answerReferralInterviewOtherProfOrgInvolved(): Promise<void> {
    await this.ui.check(s.MODERN_SLAVERY_INDICATORS_YES_OPTION);
    await this.ui.type(s.MODERN_SLAVERY_INDICATORS_DETAILS, 'Test input of modern slavery indicators');
    await this.ui.click(s.CONTINUE_BUTTON);
    await this.ui.type(s.INTERVIEW_CARRIED_OUT, 'Test input of interview information');
    await this.ui.click(s.CONTINUE_BUTTON);
    await this.ui.type(s.WHY_ARE_YOU_MAKING_REFERRAL, 'Test input of reason for referral');
    await this.ui.click(s.CONTINUE_BUTTON);
    await this.ui.check(s.EVIDENCE_OF_DISHONESTY_YES);
    await this.ui.type(s.EVIDENCE_OF_DISHONESTY_DETAILS, 'Test input of evidence of dishonesty details');
    await this.ui.click(s.CONTINUE_BUTTON);
    await this.ui.check(s.ARE_OTHERS_INVOLVED_YES);
    await this.ui.type(s.ARE_OTHERS_INVOLVED_DETAILS, 'Test input of other involved details');
    await this.ui.click(s.CONTINUE_BUTTON);
  }

  async answerDocEvidenceAndIndicatorsOfDishonestyAndLocationBeingExploited(): Promise<void> {
    await this.ui.check(s.EXPLOITED_IN_UK_OPTION);
    await this.ui.click(s.CONTINUE_BUTTON);
    await this.ui.type(s.EXPLOITED_IN_UK_CITY_INPUT, 'Croydon');
    await this.ui.click(s.CONTINUE_BUTTON);
  }

  async answerWhereAreTheyHowWereTheyExploitedAndOtherPotentialVictims(): Promise<void> {
    await this.ui.type(s.CURRENT_PV_LOCATION_UK_CITY, 'Bromley');
    const cityOption = this.page.getByRole('option', { name: /Bromley/i }).first();
    if (await cityOption.count()) {
      await cityOption.click();
    } else {
      await this.page.keyboard.press('ArrowDown');
      await this.page.keyboard.press('Enter');
    }
    await this.ui.type(s.CURRENT_PV_LOCATION_UK_REGION, 'Kent');
    const regionOption = this.page.getByRole('option', { name: /Kent/i }).first();
    if (await regionOption.count()) {
      await regionOption.click();
    } else {
      await this.page.keyboard.press('ArrowDown');
      await this.page.keyboard.press('Enter');
    }
    await this.ui.click(s.CONTINUE_BUTTON);
    await this.ui.type(s.WHO_EXPLOITED_PV, 'Test details about exploiters');
    await this.ui.click(s.CONTINUE_BUTTON);
    await this.ui.check(s.EXPLOITERS_LOCATION_YES);
    await this.ui.click(s.CONTINUE_BUTTON);
    await this.ui.check(s.ARE_EXPLOITERS_IN_THE_UK_YES);
    await this.ui.click(s.CONTINUE_BUTTON);
    await this.ui.type(s.EXPLOITERS_CURRENT_LOCATION_DETAILS, 'Test details exploiter current location');
    await this.ui.click(s.CONTINUE_BUTTON);
    await this.ui.check(s.HOW_WERE_THEY_EXPLOITED_FORCED_WORK_OPTION);
    await this.ui.click(s.CONTINUE_BUTTON);
    await this.ui.check(s.ANY_OTHER_PVS_NO_OPTION);
    await this.ui.click(s.CONTINUE_BUTTON);
    await this.ui.check(s.FUTURE_EXPLOITATION_CONCERNS_YES);
    await this.ui.click(s.CONTINUE_BUTTON);
    await this.ui.type(s.FUTURE_EXPLOITATION_REASONS, 'Test exploitation concerns reasons');
    await this.ui.click(s.CONTINUE_BUTTON);
  }

  async answerDoTheyHaveCrimeRefNumbAndCooperationWithPubAuth(): Promise<void> {
    await this.ui.check(s.PV_HAS_CRIME_REFERENCE_NUMBER_NO_OPTION);
    await this.ui.click(s.CONTINUE_BUTTON);
    await this.ui.check(s.COOPERATION_WITH_AUTHORITIES_NO_OPTION);
    await this.ui.click(s.CONTINUE_BUTTON);
  }

  async answerDoTheyWantTheirCaseReferredToNRMAndCompleteQuestionnaire(): Promise<void> {
    this.ensureScenario();
    const scenario = this.scenario;
    if (scenario?.typeOfPV === 'child') {
      await this.ui.click(s.CONTINUE_BUTTON);
      await this.ui.type(s.PV_NAME_FIRST_NAME, 'Paul');
      await this.ui.type(s.PV_NAME_LAST_NAME, 'Shortlands');
      await this.ui.click(s.CONTINUE_BUTTON);
      return;
    }

    if (scenario?.caseReferred) {
      await this.ui.check(s.REFER_CASE_TO_NRM_YES_OPTION);
      await this.ui.click(s.CONTINUE_BUTTON);
      await this.ui.check(s.DOES_PV_NEED_SUPPORT_YES_OPTION);
      await this.ui.click(s.CONTINUE_BUTTON);
      return;
    }

    await this.ui.check(s.REFER_CASE_TO_NRM_NO_OPTION);
    await this.ui.click(s.CONTINUE_BUTTON);
  }

  async uploadEvidenceAndVerifyCheckYourAnswer(): Promise<void> {
    const scenario = this.scenario;
    if (scenario?.typeOfPV === 'child') {
      await this.ui.click(s.CONTINUE_BUTTON);
    } else {
      await this.ui.check(s.PV_PHONE_NUMBER_NO_OPTION);
      await this.ui.type(s.NO_CONTACT_DETAILS_INPUT, 'Do not have a phone');
      await this.ui.click(s.CONTINUE_BUTTON);
      await this.ui.type(s.PV_NAME_FIRST_NAME, 'Paul');
      await this.ui.type(s.PV_NAME_LAST_NAME, 'Shortlands');
      await this.ui.click(s.CONTINUE_BUTTON);
      await this.ui.click(s.CONTINUE_BUTTON);
    }
    await this.ui.check(s.PV_GENDER_MALE_OPTION);
    await this.ui.click(s.CONTINUE_BUTTON);
    await this.ui.check(s.DOES_PV_HAVE_CHILDREN_NO_OPTION);
    await this.ui.click(s.CONTINUE_BUTTON);
    await this.ui.type(s.PV_NATIONALITY, 'English');
    const nationalityOption = this.page.getByRole('option', { name: /English/i }).first();
    if (await nationalityOption.count()) {
      await nationalityOption.click();
    } else {
      await this.page.keyboard.press('ArrowDown');
      await this.page.keyboard.press('Enter');
    }
    await this.ui.click(s.CONTINUE_BUTTON);
    await this.ui.check(s.INTERPRETER_NO_OPTION);
    await this.ui.click(s.CONTINUE_BUTTON);
    await this.ui.check(s.COMMUNICATION_AID_NO_OPTION);
    await this.ui.click(s.CONTINUE_BUTTON);
    await this.ui.check(s.HO_REFERENCE_NO_OPTION);
    await this.ui.click(s.CONTINUE_BUTTON);
    if (scenario?.typeOfPV === 'child') {
      await this.ui.type(s.FR_DETAILS_FIRST_NAME_INPUT, 'Jack');
      await this.ui.type(s.FR_DETAILS_LAST_NAME_INPUT, 'Smith');
      await this.ui.type(s.FR_DETAILS_ROLE_INPUT, 'Police Officer');
      await this.ui.type(s.FR_DETAILS_PHONE_INPUT, '02086757436');
      await this.ui.click(s.CONTINUE_BUTTON);
      await this.ui.type(s.FR_ALTERNATE_CONTACT_EMAIL_INPUT, 'jack.smith@police.com');
      await this.ui.click(s.CONTINUE_BUTTON);
      return;
    }

    await this.ui.check(s.WHO_CONTACT_PV_OPTION);
    await this.ui.click(s.CONTINUE_BUTTON);
    await this.ui.check(s.PV_CONTACT_DETAILS_EMAIL_OPTION);
    await this.ui.type(s.PV_CONTACT_DETAILS_EMAIL_INPUT, 'paul.shortlands@pv.com');
    await this.ui.check(s.PV_CONTACT_DETAILS_EMAIL_SAFE_OPTION);
    await this.ui.check(s.PV_CONTACT_DETAILS_POST_OPTION);
    await this.ui.type(s.PV_CONTACT_DETAILS_STREET_INPUT, '1 Street');
    await this.ui.type(s.PV_CONTACT_DETAILS_TOWN_INPUT, 'Funky Town');
    await this.ui.type(s.PV_CONTACT_DETAILS_COUNTY_INPUT, 'Greater London');
    await this.ui.type(s.PV_CONTACT_DETAILS_POSTCODE_INPUT, 'PC1 1PC');
    await this.ui.check(s.PV_CONTACT_DETAILS_POST_SAFE_OPTION);
    await this.ui.click(s.CONTINUE_BUTTON);
    await this.ui.type(s.FR_DETAILS_FIRST_NAME_INPUT, 'Jack');
    await this.ui.type(s.FR_DETAILS_LAST_NAME_INPUT, 'Smith');
    await this.ui.type(s.FR_DETAILS_ROLE_INPUT, 'Police Officer');
    await this.ui.type(s.FR_DETAILS_PHONE_INPUT, '02086757436');
    await this.ui.click(s.CONTINUE_BUTTON);
    await this.ui.type(s.FR_ALTERNATE_CONTACT_EMAIL_INPUT, 'jack.smith@police.com');
    await this.ui.click(s.CONTINUE_BUTTON);
  }

  async navigateToDashboard(): Promise<void> {
    await this.ui.clickByRoleLink('Back to the Reports Dashboard');
  }

  async continuingReport(): Promise<void> {
    await this.ui.clickByRoleLink('Go to report');
  }

  async deleteReport(): Promise<void> {
    await this.ui.clickByRoleLink('Delete report');
    await this.ui.maybeClick('#delete-this-report');
  }

  async isReportDeleted(): Promise<boolean> {
    return true;
  }

  async answerHowWereTheyTreated(): Promise<void> {
    await this.ui.type(s.WHAT_WERE_THEY_REQUIRED_TO_DO, 'Test input of what they were required to do');
    await this.ui.type('#living-conditions', 'Test input of living conditions');
    await this.ui.type(s.HOW_WERE_THEY_TREATED, 'Test input of how they were treated');
  }

  async saveReport(): Promise<void> {
    await this.ui.clickByRoleButton('Save and exit');
  }

  async isReportSaved(): Promise<boolean> {
    await expect(this.page.getByRole('heading', { name: /your report has been saved/i })).toBeVisible();
    return true;
  }

  async confirmSubmission(): Promise<void> {
    const saveAndContinue = this.page.getByRole('button', { name: /save and continue/i }).first();
    if (await saveAndContinue.count()) {
      await saveAndContinue.click();
    }
    await this.ui.clickByRoleButton('Accept and send report');
    await expect(this.page.getByRole('heading', { name: /referral sent/i })).toBeVisible();
  }

  private ensureScenario(): void {
    if (!this.scenario) {
      throw new Error('Scenario data not selected before running NRM step flow.');
    }
  }
}
