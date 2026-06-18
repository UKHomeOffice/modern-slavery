import { BasePage } from './base-page';

export class NrmHowTheyLeftPage extends BasePage {
  async answerHowTheyLeft(text: string): Promise<boolean> {
    const field = this.page.getByLabel(/how did the potential victim leave the exploitative situation/i).first();
    const visible = await field.isVisible().catch(() => false);
    if (!visible) {
      return false;
    }

    await field.fill(text);
    await this.clickIfVisible(this.page.getByRole('button', { name: /save and continue|continue/i }));
    return true;
  }
}
