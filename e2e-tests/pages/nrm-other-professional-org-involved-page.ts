import type { Page } from '@playwright/test';
import { BasePage } from './base-page';

export class NrmOtherProfessionalOrgInvolvedPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    return "Your professional insight – Report modern slavery";
  }
}
