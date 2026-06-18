import { BasePage } from './base-page';

export class NrmTreatmentPage extends BasePage {
  async answerTreatment(text: string): Promise<boolean> {
    const firstField = this.page.getByLabel(/what they had to do/i).first();
    const visible = await firstField.isVisible().catch(() => false);
    if (!visible) {
      return false;
    }

    await firstField.fill(text);
    await this.fillIfVisible(/their living conditions/i, text);
    await this.fillIfVisible(/their treatment|how they were treated/i, text);
    await this.clickIfVisible(this.page.getByRole('button', { name: /save and continue|continue/i }));
    return true;
  }

  private async fillIfVisible(labelPattern: RegExp, value: string): Promise<void> {
    const field = this.page.getByLabel(labelPattern).first();
    if (await field.isVisible().catch(() => false)) {
      await field.fill(value);
    }
  }
}
