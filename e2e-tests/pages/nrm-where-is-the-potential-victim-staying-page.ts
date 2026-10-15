import type { Page } from '@playwright/test';
import { basePage } from './base-page';

export class nrmWhereIsThePotentialVictimStayingPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    return "Where is the potential victim staying? – Report modern slavery";
  }

  async completeVictimCurrentLocation(city: string, region: string): Promise<void> {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.selectAutocomplete('Select city or town', city);
    await this.selectAutocomplete('Select region', region);
    await this.clickContinueButton();
  }
}
