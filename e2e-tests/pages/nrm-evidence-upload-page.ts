import type { Page } from '@playwright/test';
import { basePage } from './base-page';

export class nrmEvidenceUploadPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    return "Upload supporting evidence and documents (Optional) – Report modern slavery";
  }

  async continueWithoutEvidence(): Promise<void> {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.clickContinueButton();
  }
}
