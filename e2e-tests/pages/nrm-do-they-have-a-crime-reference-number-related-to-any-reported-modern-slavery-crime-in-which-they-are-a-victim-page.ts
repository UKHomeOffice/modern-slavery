import type { Locator, Page } from '@playwright/test';
import { ConstantsLib } from '../utility-helper/constants-lib';
import { BasePage } from './base-page';

export class NrmDoTheyHaveACrimeReferenceNumberRelatedToAnyReportedModernSlaveryCrimeInWhichTheyAreAVictimPage extends BasePage {
  private readonly crimeReferenceTextbox: Locator;

  constructor(page: Page) {
    super(page);
    this.crimeReferenceTextbox = page.getByRole('textbox', { name: 'Enter crime or CAD reference' });
  }

  async expectedPageTitle(): Promise<string> {
    return "Do they have a crime reference number related to any reported Modern Slavery crime, in which they are a victim? – Report modern slavery";
  }

  async selectCrimeReferenceAnswer(response: string): Promise<void> {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.selectRadioOption(response);
  }

  async enterCrimeReferenceDetails(): Promise<void> {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.selectAutocomplete('Select police force', ConstantsLib.POLICE_FORCE);
    await this.clearAndEnterTextInElement(this.crimeReferenceTextbox, ConstantsLib.CRIME_REFERENCE);
  }

  async checkBlankCrimeReferenceError(): Promise<void> {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.clickContinueButton();
    await this.page.getByText('You must select an option').waitFor();
  }

  async completeCrimeReference(response: string, checkError: string): Promise<void> {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    if (checkError === ConstantsLib.YES) {
      await this.checkBlankCrimeReferenceError();
    }
    await this.selectCrimeReferenceAnswer(response);
    if (response.toLowerCase() === ConstantsLib.YES.toLowerCase()) {
      await this.enterCrimeReferenceDetails();
    }
    await this.clickContinueButton();
  }
}
