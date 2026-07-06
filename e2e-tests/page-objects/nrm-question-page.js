class NrmQuestionPage {
  constructor(page) {
    this.page = page;
    this.defaultOrganisationName = 'Home Office - UK Border Force UKBF';
  }

  async selectFromAutocomplete(input, value) {
    if (!(await input.isVisible().catch(() => false))) {
      return;
    }

    await input.fill(value);

    const firstSuggestion = this.page.locator('.autocomplete__option:visible:not(.autocomplete__option--no-results):not([aria-disabled="true"]), [role="option"]:visible:not([aria-disabled="true"])').first();
    if (await firstSuggestion.isVisible().catch(() => false)) {
      await firstSuggestion.click();
      return;
    }

    await input.press('ArrowDown');
    await input.press('Enter');
  }

  async selectOptionByLabelIfPresent(selector, label) {
    const field = this.page.locator(selector).first();
    if (!(await field.count())) {
      return false;
    }

    const tagName = await field.evaluate((element) => element.tagName.toLowerCase());

    if (tagName === 'select') {
      await field.selectOption({ label });
      return true;
    }

    if (tagName === 'input') {
      await field.fill(label);

      const firstSuggestion = this.page.locator('.autocomplete__option:visible:not(.autocomplete__option--no-results):not([aria-disabled="true"]), [role="option"]:visible:not([aria-disabled="true"])').first();
      if (await firstSuggestion.isVisible().catch(() => false)) {
        await firstSuggestion.click();
        return true;
      }

      await field.press('ArrowDown');
      await field.press('Enter');
      return true;
    }

    return true;
  }

  async fillVisibleTextareas() {
    const textareas = this.page.locator('textarea:visible');
    const totalTextareas = await textareas.count();

    for (let index = 0; index < totalTextareas; index += 1) {
      const textarea = textareas.nth(index);
      if (!(await textarea.inputValue())) {
        await textarea.fill('Automated migration test response');
      }
    }
  }

  async fillVisibleTextInputs() {
    const textInputs = this.page.locator('input:visible:not([type="hidden"]):not([type="radio"]):not([type="checkbox"]):not([type="submit"]):not([type="file"])');
    const totalInputs = await textInputs.count();

    for (let index = 0; index < totalInputs; index += 1) {
      const input = textInputs.nth(index);
      if (await input.inputValue()) {
        continue;
      }

      const inputName = ((await input.getAttribute('name')) || '').toLowerCase();
      const inputId = ((await input.getAttribute('id')) || '').toLowerCase();
      const inputType = ((await input.getAttribute('type')) || '').toLowerCase();
      const inputMode = ((await input.getAttribute('inputmode')) || '').toLowerCase();

      if (inputType === 'date') {
        await input.fill('1990-01-15');
        continue;
      }

      const dateKey = `${inputName} ${inputId}`;
      if (dateKey.includes('day')) {
        await input.fill('15');
        continue;
      }

      if (dateKey.includes('month')) {
        await input.fill('01');
        continue;
      }

      if (dateKey.includes('year') || dateKey.includes('dob')) {
        await input.fill('1990');
        continue;
      }

      if (inputType === 'email' || inputName.includes('email') || inputId.includes('email')) {
        await input.fill('local.authority@example.org');
        continue;
      }

      if (inputName.includes('phone') || inputName.includes('mobile') || inputName.includes('telephone')) {
        await input.fill('02071234567');
        continue;
      }

      if (
        inputType === 'number'
        || inputMode === 'numeric'
        || inputName.includes('number')
        || inputId.includes('number')
        || inputName.includes('children')
        || inputId.includes('children')
      ) {
        await input.fill('1');
        continue;
      }

      await input.fill('Automated migration input');
    }
  }

  async answerVisibleRadiosWithFirstOption() {
    const radioButtons = this.page.locator('input[type="radio"]:visible');
    const radioCount = await radioButtons.count();
    if (radioCount > 0) {
      await radioButtons.first().check();
    }
  }

  async checkVisibleCheckboxIfRequired() {
    const checkboxes = this.page.locator('input[type="checkbox"]:visible');
    const checkboxCount = await checkboxes.count();
    if (checkboxCount === 0) {
      return;
    }

    for (let index = 0; index < checkboxCount; index += 1) {
      if (await checkboxes.nth(index).isChecked()) {
        return;
      }
    }

    await checkboxes.first().check();
  }

  async selectAutocompleteIfVisible() {
    const currentPath = new URL(this.page.url()).pathname;
    const combobox = this.page.locator('input[aria-autocomplete="list"]:visible').first();
    if (await combobox.isVisible().catch(() => false)) {
      if (!(await combobox.inputValue())) {
        const fallbackAutocompleteValue = currentPath === '/nrm/organisation'
          ? this.defaultOrganisationName
          : 'London';
        await this.selectFromAutocomplete(combobox, fallbackAutocompleteValue);
        return;
      }

      const firstSuggestion = this.page.locator('.autocomplete__option:visible, [role="option"]:visible').first();
      if (await firstSuggestion.isVisible().catch(() => false)) {
        await firstSuggestion.click();
        return;
      }

      await combobox.press('ArrowDown');
      await combobox.press('Enter');
    }
  }

  async fillExploitationLocationIfPresent() {
    const currentPath = new URL(this.page.url()).pathname;
    if (currentPath !== '/nrm/where-exploitation-happened-uk') {
      return;
    }

    if (await this.selectOptionByLabelIfPresent('#where-exploitation-happened-uk-city-1', 'Aberdeen')) {
      return;
    }

    const cityTownInput = this.page.getByLabel(/city|town/i).first();
    if (!(await cityTownInput.isVisible().catch(() => false))) {
      return;
    }

    await this.selectFromAutocomplete(cityTownInput, 'London');
  }

  async fillCurrentPvLocationIfPresent() {
    const currentPath = new URL(this.page.url()).pathname;
    if (currentPath !== '/nrm/current-pv-location') {
      return;
    }

    const selectedCity = await this.selectOptionByLabelIfPresent('#current-pv-location-uk-city', 'London');
    const selectedRegion = await this.selectOptionByLabelIfPresent('#current-pv-location-uk-region', 'Greater London');
    if (selectedCity || selectedRegion) {
      return;
    }

    const cityInput = this.page.getByLabel(/^city$/i).first();
    const regionInput = this.page.getByLabel(/region/i).first();

    await this.selectFromAutocomplete(cityInput, 'London');
    await this.selectFromAutocomplete(regionInput, 'England');
  }

  async fillReportedToPoliceIfPresent() {
    const currentPath = new URL(this.page.url()).pathname;
    if (currentPath !== '/nrm/reported-to-police') {
      return;
    }

    if (await this.selectOptionByLabelIfPresent('#reported-to-police-police-forces', 'City of London Police')) {
      return;
    }

    const policeForceInput = this.page.getByLabel(/police force/i).first();
    if (!(await policeForceInput.isVisible().catch(() => false))) {
      return;
    }

    await this.selectFromAutocomplete(policeForceInput, 'City of London Police');
  }

  async fillPvNationalityIfPresent() {
    const currentPath = new URL(this.page.url()).pathname;
    if (currentPath !== '/nrm/pv-nationality-referral') {
      return;
    }

    if (await this.selectOptionByLabelIfPresent('#pv-nationality', 'Afghan')) {
      return;
    }

    const nationalityInput = this.page.getByLabel(/nationality/i).first();
    if (!(await nationalityInput.isVisible().catch(() => false))) {
      return;
    }

    await this.selectFromAutocomplete(nationalityInput, 'Afghan');
  }

  async selectOrganisationIfOnOrganisationPage() {
    const currentPath = new URL(this.page.url()).pathname;
    if (currentPath !== '/nrm/organisation') {
      return;
    }

    const organisationInput = this.page.getByLabel(/organisation/i).first();
    if (!(await organisationInput.isVisible().catch(() => false))) {
      return;
    }

    await this.selectFromAutocomplete(organisationInput, 'Home Office');
  }

  async fillLocalAuthorityFieldsIfPresent() {
    const currentPath = new URL(this.page.url()).pathname;
    if (currentPath !== '/nrm/local-authority-contacted-about-child') {
      return;
    }

    const authorityInput = this.page.getByLabel(/local authority/i).first();
    if (await authorityInput.isVisible().catch(() => false)) {
      await this.selectFromAutocomplete(authorityInput, 'Crawley Borough Council');
    }
  }

  async continueIfPossible() {
    const previousPath = new URL(this.page.url()).pathname;
    const continueButton = this.page.getByRole('button', { name: /save and continue|continue/i }).first();
    if (await continueButton.isVisible().catch(() => false)) {
      await continueButton.click();

      const validationSummary = this.page.locator('.govuk-error-summary');
      if (await validationSummary.isVisible().catch(() => false)) {
        const validationSummaryText = (await validationSummary.first().innerText()).trim();
        throw new Error(`Validation blocked progression on ${previousPath}: ${validationSummaryText}`);
      }

      await this.page.waitForLoadState('domcontentloaded');
      return true;
    }

    return false;
  }

  async advanceOneStepSafely() {
    await this.selectOrganisationIfOnOrganisationPage();
    await this.fillLocalAuthorityFieldsIfPresent();
    await this.fillExploitationLocationIfPresent();
    await this.fillCurrentPvLocationIfPresent();
    await this.selectAutocompleteIfVisible();
    await this.fillVisibleTextInputs();
    await this.fillVisibleTextareas();
    await this.answerVisibleRadiosWithFirstOption();
    await this.checkVisibleCheckboxIfRequired();
    await this.fillReportedToPoliceIfPresent();
    await this.fillPvNationalityIfPresent();

    // Some pages reveal required detail fields only after selecting a radio option.
    await this.fillVisibleTextInputs();
    await this.fillVisibleTextareas();

    return this.continueIfPossible();
  }
}

module.exports = {
  NrmQuestionPage
};
