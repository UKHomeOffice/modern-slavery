import type { Page } from '@playwright/test';
import { BasePage } from './base-page';

export class NrmWhyAreTheyReportingThisNowPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    return "Is there anything that prevented the potential victim from reporting this sooner? – Report modern slavery";
  }
}
