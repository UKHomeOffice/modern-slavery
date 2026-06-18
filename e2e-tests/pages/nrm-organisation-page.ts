import { BasePage } from './base-page';

const DEFAULT_ORGANISATION = 'Furness Borough Council';

export class NrmOrganisationPage extends BasePage {
  async selectOrganisation(organisation = DEFAULT_ORGANISATION): Promise<boolean> {
    const organisationField = this.page.locator('input#user-organisation, [name="user-organisation"]').first();
    const visible = await organisationField.isVisible().catch(() => false);
    if (!visible) {
      return false;
    }

    await organisationField.fill(organisation);
    await organisationField.press('Tab').catch(() => undefined);
    await this.clickIfVisible(this.page.getByRole('button', { name: /save and continue|continue/i }));
    return true;
  }
}
