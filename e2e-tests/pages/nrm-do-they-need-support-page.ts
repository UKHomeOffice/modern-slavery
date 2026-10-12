import type { Page } from '@playwright/test';
import { BasePage } from './base-page';

export class NrmDoTheyNeedSupportPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    return "Does the potential victim want support? – Report modern slavery";
  }
}
