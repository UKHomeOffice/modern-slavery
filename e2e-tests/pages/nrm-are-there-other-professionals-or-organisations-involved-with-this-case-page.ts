import type { Locator, Page } from '@playwright/test';
import { BasePage } from './base-page';

export class NrmAreThereOtherProfessionalsOrOrganisationsInvolvedWithThisCasePage extends BasePage {
  private readonly details: Locator;

  constructor(page: Page) {
    super(page);
    this.details = page.locator('#are-others-involved-details');
  }

  async expectedPageTitle(): Promise<string> {
    return "Are there other professionals or organisations involved with this case? – Report modern slavery";
  }

  async answerOtherProfessionalsInvolved(response: string, text: string | undefined, checkError: string): Promise<void> {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.checkRequiredQuestionErrors(checkError);
    await this.selectRadioOption(response);
    if (text) {
      if (await this.details.isVisible()) {
        await this.clearAndEnterTextInElement(this.details, text);
      }
    }
    await this.clickContinueButton();
  }

}
