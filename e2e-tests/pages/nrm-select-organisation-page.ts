import type { Locator, Page } from '@playwright/test';
import { BasePage } from './base-page';

export class NrmSelectOrganisationPage extends BasePage {
  private readonly organisationField: Locator;

  constructor(page: Page) {
    super(page);
    this.organisationField = page.locator('#user-organisation');
  }

  async expectedPageTitle(): Promise<string> {
    return "What organisation do you work for? – Report modern slavery";
  }

  async completeOrganisation(organisation: string): Promise<void> {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.clearAndEnterTextInElement(this.organisationField, organisation);
    await this.clickContinueButton();
  }
}
