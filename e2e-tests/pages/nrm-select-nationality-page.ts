import type { Page } from '@playwright/test';
import { ConstantsLib } from '../utility-helper/constants-lib';
import { BasePage } from './base-page';

export class NrmSelectNationalityPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    return "Select nationality – Report modern slavery";
  }

  override async completeQuestion(text = '', response?: string, checkError: string = ConstantsLib.NO): Promise<void> {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    if (checkError === ConstantsLib.YES) {
      await this.clickContinueButton();
      await this.page.getByText("You must select the potential victim's nationality from the list").waitFor();
    }
    await this.selectAutocomplete('Select nationality', ConstantsLib.NATIONALITY);
    await this.selectAutocomplete('Select second nationality (Optional)', ConstantsLib.SECOND_NATIONALITY);
    await this.clickContinueButton();
  }
}
