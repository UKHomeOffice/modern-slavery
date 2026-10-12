import type { Page } from '@playwright/test';
import { BasePage } from './base-page';

export class NrmDoYouHaveAnyConcernsAboutThePotentialVictimsCredibilityPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    return "Do you have any concerns about the potential victim's credibility? – Report modern slavery";
  }
}
