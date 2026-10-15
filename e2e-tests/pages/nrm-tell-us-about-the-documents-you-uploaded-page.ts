import type { Page } from '@playwright/test';
import { basePage } from './base-page';

export class nrmTellUsAboutTheDocumentsYouUploadedPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    return "Tell us about the documents you uploaded – Report modern slavery";
  }
}
