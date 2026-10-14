import type { Locator, Page } from '@playwright/test';
import { basePage } from './base-page';

export class nrmHomePage extends basePage {
  private readonly acceptCookiesButton: Locator;
  private readonly startNowButton: Locator;

  constructor(page: Page) {
    super(page);
    this.acceptCookiesButton = page.locator('#accept-cookies-button');
    this.startNowButton = page.getByRole('button', { name: 'Start now' });
  }

  async expectedPageTitle(): Promise<string> {
    return "Report modern slavery – Report modern slavery";
  }

  async startNrm(): Promise<void> {
    await this.page.goto('/');
    if (await this.acceptCookiesButton.isVisible().catch(() => false)) {
      await this.acceptCookiesButton.click();
    }
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.startNowButton.click();
  }
}
