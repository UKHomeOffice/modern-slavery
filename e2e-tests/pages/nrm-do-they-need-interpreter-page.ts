import type { Page } from '@playwright/test';
import { BasePage } from './base-page';

export class NrmDoTheyNeedInterpreterPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    return "Do they need an interpreter? – Report modern slavery";
  }
}
