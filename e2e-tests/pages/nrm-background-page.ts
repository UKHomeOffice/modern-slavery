import { BasePage } from './base-page';

export class NrmBackgroundPage extends BasePage {
  async completeBackground(backgroundText: string): Promise<boolean> {
    const birthplaceField = this.page.locator('input#birthplace, [name="birthplace"]').first();
    const visible = await birthplaceField.isVisible().catch(() => false);
    if (!visible) {
      return false;
    }

    await birthplaceField.fill('Birthplace');
    await this.fillTextareaByHint(/family/i, backgroundText);
    await this.fillTextareaByHint(/education/i, backgroundText);
    await this.fillTextareaByHint(/employment history/i, backgroundText);
    await this.clickIfVisible(this.page.getByRole('button', { name: /save and continue|continue/i }));
    return true;
  }

  private async fillTextareaByHint(labelPattern: RegExp, value: string): Promise<void> {
    const field = this.page.getByLabel(labelPattern).first();
    const visible = await field.isVisible().catch(() => false);
    if (visible) {
      await field.fill(value);
      return;
    }

    const fallback = this.page.locator('textarea').filter({ hasText: labelPattern }).first();
    if (await fallback.isVisible().catch(() => false)) {
      await fallback.fill(value);
    }
  }
}
