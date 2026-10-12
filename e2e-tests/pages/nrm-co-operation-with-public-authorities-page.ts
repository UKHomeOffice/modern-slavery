import type { Page } from '@playwright/test';
import { BasePage } from './base-page';

export class NrmCoOperationWithPublicAuthoritiesPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    return "Co-operation with public authorities – Report modern slavery";
  }
}
