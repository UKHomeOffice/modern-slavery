import type { Page } from '@playwright/test';
import { BasePage } from './base-page';

export class NrmDidYouIdentifyAnyModernSlaveryIndicatorsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    return "Did you identify any modern slavery indicators? – Report modern slavery";
  }
}
