import { BasePage } from './base-page';

export class NrmKeepingInSituationPage extends BasePage {
  async answerKeepingInSituation(text: string): Promise<boolean> {
    const field = this.page.getByLabel(/what is keeping|keeping the potential victim in the situation/i).first();
    const visible = await field.isVisible().catch(() => false);
    if (!visible) {
      return false;
    }

    await field.fill(text);
    await this.clickIfVisible(this.page.getByRole('button', { name: /save and continue|continue/i }));
    return true;
  }
}
