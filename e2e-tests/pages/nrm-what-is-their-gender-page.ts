import type { Page } from '@playwright/test';
import { BasePage } from './base-page';

export class NrmWhatIsTheirGenderPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    return "What is their gender? – Report modern slavery";
  }
}
