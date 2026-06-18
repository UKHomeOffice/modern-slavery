import { BasePage } from './base-page';

export class NrmWhyReportingNowPage extends BasePage {
  async answerWhyReportingNow(text: string): Promise<boolean> {
    const field = this.page.locator('textarea#why-report-now, #why-report-now').first();
    const visible = await field.isVisible().catch(() => false);
    if (!visible) {
      return false;
    }

    await field.fill(text);
    await this.clickIfVisible(this.page.getByRole('button', { name: /save and continue|continue/i }));
    return true;
  }
}
