import type { Locator, Page } from '@playwright/test';
import { ConstantsLib } from '../utility-helper/constants-lib';
import { basePage } from './base-page';

export class nrmSelectNationalityPage extends basePage {
  private readonly nationalityField: Locator;
  private readonly secondNationalityField: Locator;

  constructor(page: Page) {
    super(page);
    this.nationalityField = page.getByRole('combobox', { name: 'Select nationality' });
    this.secondNationalityField = page.getByRole('combobox', { name: 'Select second nationality (Optional)' });
  }

  async expectedPageTitle(): Promise<string> {
    return "Select nationality – Report modern slavery";
  }

  async checkNationalityRequiredError(): Promise<void> {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.clickContinueButton();
    await this.page.getByText("You must select the potential victim's nationality from the list").waitFor();
  }

  async completeNationalitySelection(): Promise<void> {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.selectNationality(this.nationalityField, ConstantsLib.NATIONALITY);
    await this.selectNationality(this.secondNationalityField, ConstantsLib.SECOND_NATIONALITY);
    await this.clickContinueButton();
  }

  private async selectNationality(field: Locator, nationality: string): Promise<void> {
    await field.fill(nationality);
    await this.page.getByRole('option').filter({ hasText: nationality }).first().click();
  }
}
