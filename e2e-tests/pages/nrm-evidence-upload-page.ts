import type { Page } from '@playwright/test';
import { BasePage } from './base-page';

export class NrmEvidenceUploadPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    return "Upload supporting evidence and documents (Optional) – Report modern slavery";
  }
}
