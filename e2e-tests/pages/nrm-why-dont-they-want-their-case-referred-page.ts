import type { Page } from '@playwright/test';
import { BasePage } from './base-page';

export class NrmWhyDontTheyWantTheirCaseReferredPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    return "Why doesn't the potential victim want their case referred to the NRM? – Report modern slavery";
  }
}
