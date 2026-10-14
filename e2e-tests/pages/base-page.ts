import { expect, type Locator, type Page } from '@playwright/test';

export class basePage {
    readonly page: Page;
    readonly heading: Locator;
    readonly continueButton: Locator;
    readonly thereIsAProblemText: Locator;
    readonly errorSummaryList: Locator;

    constructor(page: Page) {
        this.page = page;
        this.heading = page.locator('h1');
        this.continueButton = page.getByRole('button', { name: /save and continue|continue/i });
        this.thereIsAProblemText = page.locator('#error-summary-title');
        this.errorSummaryList = page.locator("[class='govuk-list govuk-error-summary__list']");
    }

    async assertPageTitle(page: Page, title: string): Promise<void> {
        await expect(page).toHaveTitle(title + ' – GOV.UK');
    }

    async clearAndEnterTextInElement(locator: Locator, value: string): Promise<void> {
        await locator.clear();
        await locator.fill(value);
        await this.page.keyboard.press('Tab');
    }

    async clickContinueButton(): Promise<void> {
        const inputButton = this.page.locator('input[type="submit"][value="Save and continue"], input[type="submit"][value="Continue"]');
        if (await inputButton.count()) {
            await inputButton.first().click();
            return;
        }
        await this.continueButton.click();
    }

    async selectRadioOption(optionText: string): Promise<void> {
        await this.page.getByRole('radio', { name: optionText, exact: true }).check();
    }

    protected async checkIfPresent(selector: string): Promise<void> {
        const checkbox = this.page.locator(selector);
        if (await checkbox.count() && await checkbox.isVisible()) {
            await checkbox.check();
        }
    }

    protected async selectAutocomplete(label: string, value: string): Promise<void> {
        const input = this.page.getByRole('combobox', { name: label });
        await input.fill(value);
        await this.page.getByRole('option').filter({ hasText: value }).first().click();
    }

    async getThereIsAProblemTextErrorText(): Promise<string | null> {
        return await this.thereIsAProblemText.textContent();
    }

    async getErrorSummaryListText(): Promise<string | null> {
        return await this.errorSummaryList.textContent();
    }
}
