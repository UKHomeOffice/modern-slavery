import { BasePage } from './base-page';

export class NrmInterviewsPage extends BasePage {
  async answerInterviewDetails(text: string): Promise<boolean> {
    const details = this.page.locator('#where-how-interview-carried-out').first();
    const visible = await details.isVisible().catch(() => false);
    if (!visible) {
      return false;
    }

    await details.fill(text);
    await this.clickIfVisible(this.page.getByRole('button', { name: /save and continue|continue/i }));
    return true;
  }
}
