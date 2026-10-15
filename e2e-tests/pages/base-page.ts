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
        const escapedTitle = title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        await expect(page).toHaveTitle(new RegExp(`^(?:Error: )?${escapedTitle} – GOV\\.UK$`));
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
        const field = this.page.getByRole('combobox', { name: label });
        const tagName = await field.evaluate(element => element.tagName);
        if (tagName === 'SELECT') {
            await field.selectOption({ label: value });
            return;
        }
        if (tagName !== 'INPUT') {
            throw new Error(`Expected an input or select for autocomplete "${label}", received ${tagName}`);
        }
        await field.fill(value);
        await this.page.getByRole('option').filter({ hasText: value }).first().click();
    }

    async getThereIsAProblemTextErrorText(): Promise<string | null> {
        return await this.thereIsAProblemText.textContent();
    }

    async getErrorSummaryListText(): Promise<string | null> {
        return await this.errorSummaryList.textContent();
    }
}
