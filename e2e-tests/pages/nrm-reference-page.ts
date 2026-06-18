import { BasePage } from './base-page';

export class NrmReferencePage extends BasePage {
  async enterYourReference(scenarioId: string): Promise<boolean> {
    const referenceField = this.page.locator('input#reference, [name="reference"]').first();
    const visible = await referenceField.isVisible().catch(() => false);
    if (!visible) {
      return false;
    }

    await referenceField.fill(`NRM-${scenarioId}-${Date.now()}`);
    await this.clickIfVisible(this.page.getByRole('button', { name: /save and continue|continue/i }));
    return true;
  }
}
