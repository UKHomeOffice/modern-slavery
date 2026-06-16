import { type Locator, type Page } from '@playwright/test';

export class BasePage {
  constructor(protected readonly page: Page) {}

  async gotoHome(): Promise<void> {
    await this.page.goto('/');
  }

  async gotoNrmStart(): Promise<void> {
    await this.page.goto('/nrm/start?token=skip');
  }

  async clickIfVisible(locator: Locator): Promise<boolean> {
    if ((await locator.count()) === 0) {
      return false;
    }

    const first = locator.first();
    const visible = await first.isVisible().catch(() => false);
    if (!visible) {
      return false;
    }

    await first.click();
    return true;
  }
}
