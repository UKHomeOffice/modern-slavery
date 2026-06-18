import { BasePage } from './base-page';

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`);
}

export class NrmOtherProfessionalsPage extends BasePage {
  async answerOtherProfessionalsInvolved(answer: 'Yes' | 'No', detailsText: string): Promise<boolean> {
    const option = this.page.getByLabel(new RegExp(`^${escapeRegExp(answer)}$`, 'i')).first();
    const visible = await option.isVisible().catch(() => false);
    if (!visible) {
      return false;
    }

    await option.check().catch(async () => option.click());
    if (answer === 'Yes') {
      const details = this.page.locator('#are-others-involved-details').first();
      if (await details.isVisible().catch(() => false)) {
        await details.fill(detailsText);
      }
    }

    await this.clickIfVisible(this.page.getByRole('button', { name: /save and continue|continue/i }));
    return true;
  }
}
