const { Given } = require('./shared/bdd');

Given('Test data has been created for {string} scenarios', async ({ nrmTestDataRepository }, serviceName) => {
  nrmTestDataRepository.initialiseServiceData(serviceName);
});

Given('I selected the data for scenario {string} - {string}', async ({ nrmTestDataRepository, nrmJourneyContext }, scenarioId, scenarioDescription) => {
  nrmJourneyContext.selectedScenarioData = nrmTestDataRepository.selectScenario(scenarioId, scenarioDescription);
});
