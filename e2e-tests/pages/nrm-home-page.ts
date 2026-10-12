import type { Page } from '@playwright/test';
import { BasePage } from './base-page';

export class NrmHomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    return "Report modern slavery – Report modern slavery";
  }

  async startNrm(): Promise<void> {
    await this.page.goto('/');
    const acceptCookies = this.page.locator('#accept-cookies-button');
    if (await acceptCookies.isVisible().catch(() => false)) {
      await acceptCookies.click();
    }
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.page.getByRole('button', { name: 'Start now' }).click();
  }
}
