import { test as base } from 'playwright-bdd';
import { BasePage } from '../pages/base-page';
import { NrmPage } from '../pages/nrm-page';

type ScenarioContext = {
  service?: string;
  scenarioId?: string;
  description?: string;
};

type Pages = {
  basePage: BasePage;
  nrmPage: NrmPage;
};

export const test = base.extend<{ pages: Pages; scenarioContext: ScenarioContext }>({
  pages: async ({ page }, use) => {
    await use({
      basePage: new BasePage(page),
      nrmPage: new NrmPage(page),
    });
  },
  scenarioContext: async ({}, use) => {
    await use({});
  },
});

export const expect = test.expect;
