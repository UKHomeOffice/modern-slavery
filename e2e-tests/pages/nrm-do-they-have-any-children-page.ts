import type { Page } from '@playwright/test';
import { BasePage } from './base-page';

export class NrmDoTheyHaveAnyChildrenPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    return "Do they have any children? – Report modern slavery";
  }
}
