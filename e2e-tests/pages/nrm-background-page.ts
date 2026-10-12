import type { Page } from '@playwright/test';
import { BasePage } from './base-page';

export class NrmBackgroundPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    return "Tell us about the potential victim's background – Report modern slavery";
  }
}
