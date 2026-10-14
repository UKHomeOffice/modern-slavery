import type { Locator, Page } from '@playwright/test';
import { BasePage } from './base-page';

export class NrmDidYouIdentifyAnyModernSlaveryIndicatorsPage extends BasePage {
  private readonly details: Locator;

  constructor(page: Page) {
    super(page);
    this.details = page.locator('#modern-slavery-indicators-details');
  }

  async expectedPageTitle(): Promise<string> {
    return "Did you identify any modern slavery indicators? – Report modern slavery";
  }

  async answerModernSlaveryIndicators(response: string, text: string | undefined): Promise<void> {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.selectRadioOption(response);
    if (text) {
      if (await this.details.isVisible()) {
        await this.clearAndEnterTextInElement(this.details, text);
      }
    }
    await this.clickContinueButton();
  }
}
