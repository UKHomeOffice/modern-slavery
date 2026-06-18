import { BasePage } from './base-page';

export class NrmStartPage extends BasePage {
  async startReportWithEmail(email: string): Promise<void> {
    await this.gotoHome();

    const emailField = this.page.locator('#email, input[type="email"], [name="email"]').first();
    if (await emailField.isVisible().catch(() => false)) {
      await emailField.fill(email);
      await this.clickIfVisible(this.page.getByRole('button', { name: /continue|start|sign in/i }));
    }

    await this.gotoNrmStart();
    await this.clickIfVisible(this.page.getByRole('button', { name: /start|start now|start report/i }));
  }
}
