import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { ConstantsLib } from '../utility-helper/constants-lib';
import { BasePage } from './base-page';

export class NrmWorkEmailPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    return "What is your work email address? – Report modern slavery";
  }

  async sendSecureLink(email: string): Promise<void> {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.page.locator('#user-email').fill(email);
    await this.page.locator('input[value="Send secure link"], button:has-text("Send secure link")').click();
  }

  async checkBlankWorkEmailError(): Promise<void> {
    await this.page.locator('input[value="Send secure link"], button:has-text("Send secure link")').click();
    await expect(this.page.getByText('Enter a valid email address')).toBeVisible();
  }

  async fillWorkEmail(email: string): Promise<void> {
    await this.page.locator('#user-email').fill(email || ConstantsLib.WORK_EMAIL);
  }
}
