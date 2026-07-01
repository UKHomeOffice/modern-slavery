const fs = require('fs');
const path = require('path');

class NrmTestDataRepository {
  constructor() {
    this.selectedServiceName = null;
    this.selectedScenarioData = null;
    this.testDataFilePath = path.resolve(__dirname, '..', 'test-data', 'nrm', 'nrm-scenarios.json');
  }

  initialiseServiceData(serviceName) {
    const normalizedServiceName = String(serviceName || '').trim().toUpperCase();
    if (normalizedServiceName !== 'NRM') {
      throw new Error(`Unsupported service data requested: ${serviceName}`);
    }
    this.selectedServiceName = normalizedServiceName;
  }

  selectScenario(scenarioId, description) {
    if (!this.selectedServiceName) {
      throw new Error('Service data must be initialised before selecting a scenario.');
    }

    const parsedData = JSON.parse(fs.readFileSync(this.testDataFilePath, 'utf-8'));
    const normalizedScenarioId = String(scenarioId).trim();
    const normalizedDescription = String(description).trim().toLowerCase();

    const matchingScenario = parsedData.scenarios.find((scenarioEntry) => {
      return String(scenarioEntry.scenarioId) === normalizedScenarioId
        && String(scenarioEntry.description).trim().toLowerCase() === normalizedDescription;
    });

    if (!matchingScenario) {
      throw new Error(`No NRM scenario found for scenarioId=${scenarioId} description=${description}`);
    }

    this.selectedScenarioData = matchingScenario;
    return matchingScenario;
  }
}

module.exports = {
  NrmTestDataRepository
};
