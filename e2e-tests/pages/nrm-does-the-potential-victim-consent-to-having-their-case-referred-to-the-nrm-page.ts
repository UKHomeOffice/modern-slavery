import type { Page } from '@playwright/test';
import { ConstantsLib } from '../utility-helper/constants-lib';
import { BasePage } from './base-page';

export class NrmDoesThePotentialVictimConsentToHavingTheirCaseReferredToTheNrmPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    return "Does the potential victim consent to having their case referred to the NRM? – Report modern slavery";
  }

  override async completeQuestion(text = '', response?: string, checkError: string = ConstantsLib.NO): Promise<void> {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    if (checkError === ConstantsLib.YES) {
      await this.clickContinueButton();
      await this.page.getByText('You must enter the NRM decision').waitFor();
    }
    if (response) {
      await this.page.getByRole('radio', { name: new RegExp(`^${response}`) }).check();
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

  async continueWithoutResponse(): Promise<void> {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.clickContinueButton();
  }
}
