import type { Page } from '@playwright/test';
import { BasePage } from './base-page';

export class NrmDoTheyNeedHelpWithCommunicationPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    return "Do they need help with communication? – Report modern slavery";
  }
}
