import type { Page } from '@playwright/test';
import { BasePage } from './base-page';

export class NrmHowAndWhyTheyLeftPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    return "How did the potential victim leave the exploitative situation? – Report modern slavery";
  }
}
