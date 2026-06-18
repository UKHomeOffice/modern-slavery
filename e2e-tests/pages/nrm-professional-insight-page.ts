import { BasePage } from './base-page';

export class NrmProfessionalInsightPage extends BasePage {
  async answerProfessionalInsight(text: string): Promise<boolean> {
    const details = this.page.locator('#professional-insight').first();
    const visible = await details.isVisible().catch(() => false);
    if (!visible) {
      return false;
    }

    await details.fill(text);
    await this.clickIfVisible(this.page.getByRole('button', { name: /save and continue|continue/i }));
    return true;
  }
}
