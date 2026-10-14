import type { Locator, Page } from '@playwright/test';
import { ConstantsLib } from '../utility-helper/constants-lib';
import { basePage } from './base-page';

export class nrmLocalAuthContactedPage extends basePage {
  private readonly localAuthorityName: Locator;
  private readonly localAuthorityPhone: Locator;
  private readonly localAuthorityEmail: Locator;
  private readonly contactFirstName: Locator;
  private readonly contactLastName: Locator;

  constructor(page: Page) {
    super(page);
    this.localAuthorityName = page.locator('#local-authority-contacted-about-child-local-authority-name');
    this.localAuthorityPhone = page.locator('#local-authority-contacted-about-child-local-authority-phone');
    this.localAuthorityEmail = page.locator('#local-authority-contacted-about-child-local-authority-email');
    this.contactFirstName = page.locator('#local-authority-contacted-about-child-local-authority-first-name');
    this.contactLastName = page.locator('#local-authority-contacted-about-child-local-authority-last-name');
  }

  async expectedPageTitle(): Promise<string> {
    return "Which local authority have you contacted about the child? – Report modern slavery";
  }

  async completeLocalAuthorityDetails(): Promise<void> {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.clearAndEnterTextInElement(this.localAuthorityName, ConstantsLib.LOCAL_AUTHORITY);
    await this.clearAndEnterTextInElement(this.localAuthorityPhone, ConstantsLib.LOCAL_AUTHORITY_PHONE);
    await this.clearAndEnterTextInElement(this.localAuthorityEmail, ConstantsLib.LOCAL_AUTHORITY_EMAIL);
    await this.clearAndEnterTextInElement(this.contactFirstName, ConstantsLib.LOCAL_AUTHORITY_FIRST_NAME);
    await this.clearAndEnterTextInElement(this.contactLastName, ConstantsLib.LOCAL_AUTHORITY_LAST_NAME);
    await this.clickContinueButton();
  }

}
