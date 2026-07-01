import { test as base } from 'playwright-bdd';
import { NrmStepLib } from '../steps-libs/nrm-step-lib';

type Fixtures = {
  nrmStepLib: NrmStepLib;
};

export const test = base.extend<Fixtures>({
  nrmStepLib: async ({ page }, use) => {
    await use(new NrmStepLib(page));
  },
});
