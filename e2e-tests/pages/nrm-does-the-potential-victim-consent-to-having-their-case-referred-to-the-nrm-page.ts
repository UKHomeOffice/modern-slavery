import type { Page } from '@playwright/test';
import { basePage } from './base-page';

export class nrmDoesThePotentialVictimConsentToHavingTheirCaseReferredToTheNrmPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    return "Does the potential victim consent to having their case referred to the NRM? – Report modern slavery";
  }

  async selectConsentDecision(response: string): Promise<void> {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.page.getByRole('radio', { name: new RegExp(`^${response}`, 'i') }).check();
  }

  async checkConsentDecisionRequiredError(): Promise<void> {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.clickContinueButton();
    await this.page.getByText('You must enter the NRM decision').waitFor();
  }

  async completeConsent(response: string): Promise<void> {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.selectConsentDecision(response);
    await this.clickContinueButton();
  }

  async continueWithoutResponse(): Promise<void> {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.clickContinueButton();
  }
}
