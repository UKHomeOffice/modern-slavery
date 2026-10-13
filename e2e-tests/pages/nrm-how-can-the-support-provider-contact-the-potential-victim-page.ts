import type { Locator, Page } from '@playwright/test';
import { ConstantsLib } from '../utility-helper/constants-lib';
import { BasePage } from './base-page';

export class NrmHowCanTheSupportProviderContactThePotentialVictimPage extends BasePage {
  private readonly cannotProvideContactDetailsRadio: Locator;
  private readonly noContactDetailsTextbox: Locator;

  constructor(page: Page) {
    super(page);
    this.cannotProvideContactDetailsRadio = page.getByRole('radio', { name: 'Cannot provide contact details' });
    this.noContactDetailsTextbox = page.locator('#no-contact-details');
  }

  async expectedPageTitle(): Promise<string> {
    return "How can the support provider contact the potential victim? – Report modern slavery";
  }

  async completeSupportProviderContactDetails(): Promise<void> {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.cannotProvideContactDetailsRadio.check();
    await this.clearAndEnterTextInElement(this.noContactDetailsTextbox, ConstantsLib.TEXT_ANSWER);
    await this.clickContinueButton();
  }
}
