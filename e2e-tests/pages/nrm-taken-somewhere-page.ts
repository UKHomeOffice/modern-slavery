import { BasePage } from './base-page';

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`);
}

export class NrmTakenSomewherePage extends BasePage {
  async answerTakenSomewhere(answer: 'Yes' | 'No', journeyText?: string): Promise<boolean> {
    const option = this.page.getByLabel(new RegExp(`^${escapeRegExp(answer)}$`, 'i')).first();
    const visible = await option.isVisible().catch(() => false);
    if (!visible) {
      return false;
    }

    await option.check().catch(async () => option.click());
    if (answer === 'Yes') {
      await this.fillJourneyDetails(journeyText || 'Journey details provided by the victim.');
    }
    await this.clickIfVisible(this.page.getByRole('button', { name: /save and continue|continue/i }));
    return true;
  }

  private async fillJourneyDetails(text: string): Promise<void> {
    const journeyField = this.page.getByLabel(/journey/i).first();
    if (await journeyField.isVisible().catch(() => false)) {
      await journeyField.fill(text);
      return;
    }

    const fallbackField = this.page.locator('textarea').first();
    if (await fallbackField.isVisible().catch(() => false)) {
      await fallbackField.fill(text);
    }
  }
}
