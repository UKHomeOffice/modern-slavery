import type { Locator, Page } from '@playwright/test';
import { basePage } from './base-page';

export class nrmBackgroundPage extends basePage {
  private readonly birthPlace: Locator;
  private readonly familyDetails: Locator;
  private readonly educationHistory: Locator;
  private readonly employmentHistory: Locator;

  constructor(page: Page) {
    super(page);
    this.birthPlace = page.locator('#birthplace');
    this.familyDetails = page.locator('#family');
    this.educationHistory = page.locator('#education');
    this.employmentHistory = page.locator('#employment-history');
  }

  async expectedPageTitle(): Promise<string> {
    return "Tell us about the potential victim's background – Report modern slavery";
  }

  async enterBackgroundDetails(text: string): Promise<void> {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.clearAndEnterTextInElement(this.birthPlace, text);
    await this.clearAndEnterTextInElement(this.familyDetails, text);
    await this.clearAndEnterTextInElement(this.educationHistory, text);
    await this.clearAndEnterTextInElement(this.employmentHistory, text);
    await this.clickContinueButton();
  }

}
