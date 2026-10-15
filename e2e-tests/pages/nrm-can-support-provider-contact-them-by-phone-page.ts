import type { Page } from '@playwright/test';
import { basePage } from './base-page';

export class nrmCanSupportProviderContactThemByPhonePage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    return "Can the support provider contact them by phone? – Report modern slavery";
  }
}
