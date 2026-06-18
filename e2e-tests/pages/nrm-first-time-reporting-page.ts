import { BasePage } from './base-page';

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`);
}

export class NrmFirstTimeReportingPage extends BasePage {
  async answerFirstTimeReporting(answer: 'Yes' | 'No' | 'Not sure', detail?: string): Promise<boolean> {
    const option = this.page.getByLabel(new RegExp(`^${escapeRegExp(answer)}$`, 'i')).first();
    const visible = await option.isVisible().catch(() => false);
    if (!visible) {
      return false;
    }

    await option.check().catch(async () => option.click());

    if (answer === 'Yes') {
      await this.fillOptionalField('input#yes-the-first-chance-to-report', detail || 'First safe chance to report.');
    }

    if (answer === 'Not sure') {
      await this.fillOptionalField('input#not-sure-the-first-chance-to-report', detail || 'Unsure if this was previously reported.');
    }

    await this.clickIfVisible(this.page.getByRole('button', { name: /save and continue|continue/i }));
    return true;
  }

  private async fillOptionalField(selector: string, value: string): Promise<void> {
    const field = this.page.locator(selector).first();
    if (await field.isVisible().catch(() => false)) {
      await field.fill(value);
    }
  }
}
