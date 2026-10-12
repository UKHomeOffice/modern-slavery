import type { Page } from '@playwright/test';
import { ConstantsLib } from '../utility-helper/constants-lib';
import { BasePage } from './base-page';

export class NrmDoTheyHaveACrimeReferenceNumberRelatedToAnyReportedModernSlaveryCrimeInWhichTheyAreAVictimPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    return "Do they have a crime reference number related to any reported Modern Slavery crime, in which they are a victim? – Report modern slavery";
  }

  override async completeQuestion(text = '', response?: string, checkError: string = ConstantsLib.NO): Promise<void> {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    if (checkError === ConstantsLib.YES) {
      await this.clickContinueButton();
      await this.page.getByText('You must select an option').waitFor();
    }
    if (response) {
      await this.selectRadioOption(response);
      if (response.toLowerCase() === ConstantsLib.YES.toLowerCase()) {
        await this.selectAutocomplete('Select police force', ConstantsLib.POLICE_FORCE);
        await this.page.getByRole('textbox', { name: 'Enter crime or CAD reference' }).fill(ConstantsLib.CRIME_REFERENCE);
      }
    }
    if (text) {
      const count = await this.textboxes.count();
      for (let index = 0; index < count; index += 1) {
        const textbox = this.textboxes.nth(index);
        if (await textbox.isVisible() && !(await textbox.inputValue())) {
          await this.clearAndEnterTextInElement(textbox, text);
        }
      }
    }
    await this.clickContinueButton();
  }
}
