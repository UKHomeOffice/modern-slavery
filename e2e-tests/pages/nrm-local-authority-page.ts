import { BasePage } from './base-page';

const DEFAULT_LOCAL_AUTHORITY = 'Preston City Council';

export class NrmLocalAuthorityPage extends BasePage {
  async completeLocalAuthorityDetails(): Promise<boolean> {
    const localAuthorityField = this.page.locator('input#local-authority-contacted-about-child-local-authority-name').first();
    const visible = await localAuthorityField.isVisible().catch(() => false);
    if (!visible) {
      return false;
    }

    await localAuthorityField.fill(DEFAULT_LOCAL_AUTHORITY);
    await localAuthorityField.press('Tab').catch(() => undefined);
    await this.fillIfVisible('input#local-authority-contacted-about-child-local-authority-phone', '02012345678');
    await this.fillIfVisible('input#local-authority-contacted-about-child-local-authority-email', 'abc@email.com');
    await this.fillIfVisible('input#local-authority-contacted-about-child-local-authority-first-name', 'fName');
    await this.fillIfVisible('input#local-authority-contacted-about-child-local-authority-last-name', 'lName');
    await this.clickIfVisible(this.page.getByRole('button', { name: /save and continue|continue/i }));
    return true;
  }

  private async fillIfVisible(selector: string, value: string): Promise<void> {
    const field = this.page.locator(selector).first();
    const visible = await field.isVisible().catch(() => false);
    if (visible) {
      await field.fill(value);
    }
  }
}
