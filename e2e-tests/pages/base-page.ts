import { expect, Page } from '@playwright/test';

export class BasePage {
  constructor(protected readonly page: Page) {}

  async navigateTo(path: string): Promise<void> {
    await this.page.goto(path);
  }

  async click(selector: string): Promise<void> {
    await this.page.waitForSelector(selector, { state: 'visible' });
    await this.page.click(selector);
  }

  async type(selector: string, value: string): Promise<void> {
    await this.page.waitForSelector(selector, { state: 'visible' });
    await this.page.focus(selector);
    await this.page.keyboard.type(value);
  }

  async maybeClick(selector: string): Promise<void> {
    if (await this.page.locator(selector).count()) {
      await this.click(selector);
    }
  }

  async clickByRoleButton(name: string): Promise<void> {
    const button = this.page.getByRole('button', { name: new RegExp(name, 'i') }).first();
    await expect(button).toBeVisible();
    await button.click();
  }

  async clickByRoleLink(name: string): Promise<void> {
    const link = this.page.getByRole('link', { name: new RegExp(name, 'i') }).first();
    await expect(link).toBeVisible();
    await link.click();
  }

  async check(selector: string): Promise<void> {
    await this.page.waitForSelector(selector, { state: 'visible' });
    await this.page.check(selector);
  }

  async assertAnyText(pattern: RegExp): Promise<void> {
    await expect(this.page.getByText(pattern).first()).toBeVisible();
  }
}
