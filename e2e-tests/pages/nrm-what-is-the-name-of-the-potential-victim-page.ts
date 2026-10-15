import type { Locator, Page } from '@playwright/test';
import { ConstantsLib } from '../utility-helper/constants-lib';
import { basePage } from './base-page';

export class nrmWhatIsTheNameOfThePotentialVictimPage extends basePage {
  private readonly firstName: Locator;
  private readonly lastName: Locator;
  private readonly nickname: Locator;

  constructor(page: Page) {
    super(page);
    this.firstName = page.locator('#pv-name-first-name');
    this.lastName = page.locator('#pv-name-last-name');
    this.nickname = page.locator('#pv-name-nickname');
  }

  async expectedPageTitle(): Promise<string> {
    return "What is the name of the Potential Victim? – Report modern slavery";
  }

  async completePotentialVictimName(): Promise<void> {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.clearAndEnterTextInElement(this.firstName, ConstantsLib.VICTIM_FIRST_NAME);
    await this.clearAndEnterTextInElement(this.lastName, ConstantsLib.VICTIM_LAST_NAME);
    await this.clearAndEnterTextInElement(this.nickname, ConstantsLib.VICTIM_NICKNAME);
    await this.clickContinueButton();
  }
}
