import { BasePage } from './base-page';

export class NrmLastContactDetailsPage extends BasePage {
  async answerLastContactDetails(text: string): Promise<boolean> {
    const field = this.page.locator('textarea#details-last-contact, #details-last-contact').first();
    const visible = await field.isVisible().catch(() => false);
    if (!visible) {
      return false;
    }

    await field.fill(text);
    await this.clickIfVisible(this.page.getByRole('button', { name: /save and continue|continue/i }));
    return true;
  }
}
