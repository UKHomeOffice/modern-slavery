import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { ConstantsLib } from '../utility-helper/constants-lib';
import { BasePage } from './base-page';

export class NrmLocalAuthContactedPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    return "Which local authority have you contacted about the child? – Report modern slavery";
  }

  async completeLocalAuthorityDetails(): Promise<void> {
    const localAuthority = this.page.locator('#local-authority-contacted-about-child-local-authority-name');
    await localAuthority.fill(ConstantsLib.LOCAL_AUTHORITY);
    await localAuthority.press('Tab');
    await this.page.locator('#local-authority-contacted-about-child-local-authority-phone').fill(ConstantsLib.LOCAL_AUTHORITY_PHONE);
    await this.page.locator('#local-authority-contacted-about-child-local-authority-email').fill(ConstantsLib.LOCAL_AUTHORITY_EMAIL);
    await this.page.locator('#local-authority-contacted-about-child-local-authority-first-name').fill(ConstantsLib.LOCAL_AUTHORITY_FIRST_NAME);
    await this.page.locator('#local-authority-contacted-about-child-local-authority-last-name').fill(ConstantsLib.LOCAL_AUTHORITY_LAST_NAME);
    await this.clickContinueButton();
  }

  override async completeQuestion(text = '', response?: string, checkError: string = ConstantsLib.NO): Promise<void> {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    if (checkError === ConstantsLib.YES) {
      await this.clickContinueButton();
      await expect(this.page.locator('.govuk-error-summary, #error-summary-title')).toBeVisible();
    }
    await this.completeLocalAuthorityDetails();
  }
}
