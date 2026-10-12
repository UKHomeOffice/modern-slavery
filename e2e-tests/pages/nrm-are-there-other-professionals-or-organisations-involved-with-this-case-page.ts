import type { Page } from '@playwright/test';
import { BasePage } from './base-page';

export class NrmAreThereOtherProfessionalsOrOrganisationsInvolvedWithThisCasePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    return "Are there other professionals or organisations involved with this case? – Report modern slavery";
  }
}
