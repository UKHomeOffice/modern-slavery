import { expect, type Locator, type Page } from '@playwright/test';
import { ConstantsLib  } from '../utility-helper/constants-lib';

export abstract class BasePage {
    readonly page: Page;
    readonly heading: Locator;
    readonly continueButton: Locator;
    readonly saveAndExitButton: Locator;
    readonly radioOptions: Locator;
    readonly checkboxOptions: Locator;
    readonly textboxes: Locator;
    readonly autocompleteFields: Locator;

    constructor(page: Page) {
        this.page = page;
        this.heading = page.locator('h1');
        this.continueButton = page.getByRole('button', { name: /save and continue|continue/i });
        this.saveAndExitButton = page.getByRole('button', { name: 'Save and exit' });
        this.radioOptions = page.getByRole('radio');
        this.checkboxOptions = page.getByRole('checkbox');
        this.textboxes = page.getByRole('textbox');
        this.autocompleteFields = page.getByRole('combobox');
    }

    async assertPageTitle(page: Page, title: string): Promise<void> {
        await expect(page).toHaveTitle(title+ ' – GOV.UK');
    }

    async click(locator: Locator): Promise<void> {
        await locator.click();
    }

    async fill(locator: Locator, value: string): Promise<void> {
        await locator.fill(value);
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

    async selectCheckboxOption(optionText: string): Promise<void> {
        await this.page.getByRole('checkbox', { name: optionText, exact: true }).check();
    }

    async fillTextboxes(value: string): Promise<void> {
        const count = await this.textboxes.count();
        for (let index = 0; index < count; index += 1) {
            const textbox = this.textboxes.nth(index);
            if (await textbox.isVisible() && !(await textbox.inputValue())) {
                await textbox.fill(value);
            }
        }
    }

    async completeQuestion(text = '', response?: string, checkError: string = ConstantsLib.NO): Promise<void> {
        if (checkError === ConstantsLib.YES) {
            await this.clickContinueButton();
            await expect(this.page.locator('.govuk-error-summary, #error-summary-title')).toBeVisible();
        }
        if (response) {
            const radio = this.page.getByRole('radio', { name: new RegExp(`^${response}$`, 'i') });
            if (await radio.count()) {
                await radio.check();
            }
        }
        if (text) {
            await this.fillTextboxes(text);
        }
        await this.clickContinueButton();
    }

    protected async selectAutocomplete(label: string, value: string): Promise<void> {
        const input = this.page.getByRole('combobox', { name: label });
        await input.fill(value);
        await this.page.getByRole('option').filter({ hasText: value }).first().click();
    }

    protected async checkIfPresent(selector: string): Promise<void> {
        const checkbox = this.page.locator(selector);
        if (await checkbox.count() && await checkbox.isVisible()) {
            await checkbox.check();
        }
    }
}
