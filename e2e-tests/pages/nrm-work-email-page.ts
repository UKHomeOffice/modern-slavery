import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { basePage } from './base-page';

export class nrmWorkEmailPage extends basePage {
  private readonly workEmailTextbox: Locator;
  private readonly sendSecureLinkButton: Locator;

  constructor(page: Page) {
    super(page);
    this.workEmailTextbox = page.locator('#user-email');
    this.sendSecureLinkButton = page.locator('input[value="Send secure link"], button:has-text("Send secure link")');
  }

  async expectedPageTitle(): Promise<string> {
    return "What is your work email address? – Report modern slavery";
  }

  async sendSecureLink(email: string): Promise<void> {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.clearAndEnterTextInElement(this.workEmailTextbox, email);
    await this.sendSecureLinkButton.click();
  }

  async checkBlankWorkEmailError(): Promise<void> {
    await this.sendSecureLinkButton.click();
    await expect(this.page.getByText('Enter a valid email address')).toBeVisible();
  }
}
