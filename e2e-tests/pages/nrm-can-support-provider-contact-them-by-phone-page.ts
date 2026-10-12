import type { Page } from '@playwright/test';
import { BasePage } from './base-page';

export class NrmCanSupportProviderContactThemByPhonePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    return "Can the support provider contact them by phone? – Report modern slavery";
  }
}
