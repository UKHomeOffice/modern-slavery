import type { Page } from '@playwright/test';
import { BasePage } from './base-page';

export class NrmTellUsAboutTheDocumentsYouUploadedPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    return "Tell us about the documents you uploaded – Report modern slavery";
  }
}
