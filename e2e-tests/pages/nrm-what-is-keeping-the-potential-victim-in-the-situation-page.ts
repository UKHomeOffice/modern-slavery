import type { Page } from '@playwright/test';
import { BasePage } from './base-page';

export class NrmWhatIsKeepingThePotentialVictimInTheSituationPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    return "What is keeping the potential victim in the situation? – Report modern slavery";
  }
}
