import { BasePage } from './base-page';

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`);
}

export class NrmAgePage extends BasePage {
  async answerVictimUnder18(answer: string): Promise<boolean> {
    const option = this.page.getByLabel(new RegExp(`^${escapeRegExp(answer)}$`, 'i')).first();
    const visible = await option.isVisible().catch(() => false);
    if (!visible) {
      return false;
    }

    await option.check().catch(async () => option.click());
    await this.clickIfVisible(this.page.getByRole('button', { name: /save and continue|continue/i }));
    return true;
  }
}
