export type NrmScenarioData = {
  scenarioId: string;
  description: string;
  checkError: 'Yes' | 'No';
  typeOfPV: 'adult' | 'child';
  caseReferred: boolean;
  under18AtTime: 'yes' | 'no' | 'not-sure';
  cooperation: 'yes' | 'no';
};

const DATA: Record<string, NrmScenarioData> = {
  '1': { scenarioId: '1', description: "'Yes' answers - under18", checkError: 'No', typeOfPV: 'child', caseReferred: true, under18AtTime: 'yes', cooperation: 'yes' },
  '2': { scenarioId: '2', description: "'No' answers - over18, No Cooperation", checkError: 'No', typeOfPV: 'adult', caseReferred: true, under18AtTime: 'no', cooperation: 'no' },
  '3': { scenarioId: '3', description: 'Continue report', checkError: 'No', typeOfPV: 'adult', caseReferred: true, under18AtTime: 'no', cooperation: 'yes' },
  '4': { scenarioId: '4', description: 'Delete report', checkError: 'No', typeOfPV: 'adult', caseReferred: true, under18AtTime: 'no', cooperation: 'yes' },
  '5': { scenarioId: '5', description: 'Not sure if under18', checkError: 'No', typeOfPV: 'adult', caseReferred: true, under18AtTime: 'not-sure', cooperation: 'yes' },
  '6': { scenarioId: '6', description: 'E2E mixed', checkError: 'No', typeOfPV: 'adult', caseReferred: true, under18AtTime: 'no', cooperation: 'yes' },
  '8': { scenarioId: '8', description: 'Add max locations', checkError: 'No', typeOfPV: 'adult', caseReferred: true, under18AtTime: 'no', cooperation: 'yes' },
  '9': { scenarioId: '9', description: "'No' answers - Yes Cooperation", checkError: 'No', typeOfPV: 'adult', caseReferred: true, under18AtTime: 'no', cooperation: 'yes' },
  '11': { scenarioId: '11', description: 'Save and exit report', checkError: 'No', typeOfPV: 'adult', caseReferred: true, under18AtTime: 'no', cooperation: 'yes' }
};

export function getScenarioData(id: string, description?: string): NrmScenarioData {
  const value = DATA[id];
  if (!value) {
    throw new Error(`No source-aligned NRM scenario data for id ${id}`);
  }

  if (description && description !== value.description) {
    return { ...value, description };
  }

  return value;
}
