import type { Page } from '@playwright/test';
import { basePage } from './base-page';

export class nrmWhatIsKeepingThePotentialVictimInTheSituationPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    return "What is keeping the potential victim in the situation? – Report modern slavery";
  }
}
