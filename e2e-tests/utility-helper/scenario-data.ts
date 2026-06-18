export type NrmScenarioData = {
  journeyKey: string;
  scenarioId: string;
  description: string;
  email: string;
  checkError: 'Yes' | 'No';
  reportLocation: 'England' | 'Wales' | 'Scotland' | 'Northern Ireland';
  victimUnder18: 'Yes' | 'No' | 'Not sure';
  under18DuringExploitation?: 'Yes' | 'No' | 'Not sure';
  backgroundText: string;
  multipleExploitativeSituations: 'Yes' | 'No' | "Don't know";
  exploitationWhenText: string;
  exploitationStartText: string;
  takenSomewhereByExploiters: 'Yes' | 'No';
  takenSomewhereJourneyText?: string;
  treatmentText: string;
  stillInExploitativeSituation: 'Yes' | 'No';
  keepingInSituationText?: string;
  howTheyLeftText?: string;
  firstTimeReporting: 'Yes' | 'No' | 'Not sure';
  firstTimeReportingDetail?: string;
  whyReportingNowText?: string;
  lastContactWithExploiters: 'Yes' | 'No' | 'Not sure';
  lastContactDetailsText?: string;
  identifiedIndicators?: 'Yes' | 'No';
  indicatorsDetailsText?: string;
  interviewDetailsText?: string;
  professionalInsightText?: string;
  credibilityConcern?: 'Yes' | 'No';
  credibilityDetailsText?: string;
  otherProfessionalsInvolved?: 'Yes' | 'No';
  otherProfessionalsDetailsText?: string;
  exploitationLocation?: 'UK' | 'Overseas' | 'UK and Overseas';
  exploitationUkCity?: string;
  exploitationUkAddressText?: string;
  exploitationOverseasCountry?: string;
  exploitationOverseasAddressText?: string;
};

const DEFAULT_EMAIL = 'sas-hof-test@digital.homeoffice.gov.uk';
const DEFAULT_LOCATION = 'England';

export const NRM_SCENARIO_DATA: Record<string, NrmScenarioData> = {
  '1': {
    journeyKey: 'T1: Yes answers - under18',
    scenarioId: '1',
    description: "'Yes' answers - under18",
    email: DEFAULT_EMAIL,
    checkError: 'No',
    reportLocation: DEFAULT_LOCATION,
    victimUnder18: 'Yes',
    backgroundText: 'Background for under18 scenario',
    multipleExploitativeSituations: 'Yes',
    exploitationWhenText: 'January to March, multiple exploitations',
    exploitationStartText: 'The exploitation started after grooming and transport.',
    takenSomewhereByExploiters: 'Yes',
    takenSomewhereJourneyText: 'The victim was moved between locations by exploiters.',
    treatmentText: 'They were controlled and forced to work in poor conditions.',
    stillInExploitativeSituation: 'Yes',
    keepingInSituationText: 'Threats and fear are still keeping the victim in the situation.',
    firstTimeReporting: 'Yes',
    firstTimeReportingDetail: 'This is the first safe opportunity to report.',
    lastContactWithExploiters: 'Yes',
    lastContactDetailsText: 'There was recent contact by phone this week.',
  },
  '2': {
    journeyKey: 'T2: No answers - over18, no cooperation',
    scenarioId: '2',
    description: "'No' answers - over18, No Cooperation",
    email: DEFAULT_EMAIL,
    checkError: 'No',
    reportLocation: DEFAULT_LOCATION,
    victimUnder18: 'No',
    under18DuringExploitation: 'No',
    backgroundText: 'Background for over18 scenario',
    multipleExploitativeSituations: 'No',
    exploitationWhenText: 'A single exploitation period in spring',
    exploitationStartText: 'The exploitation started through a job offer.',
    takenSomewhereByExploiters: 'No',
    treatmentText: 'The victim was isolated and controlled by debt.',
    stillInExploitativeSituation: 'No',
    howTheyLeftText: 'The victim escaped with help from a support worker.',
    firstTimeReporting: 'No',
    whyReportingNowText: 'Previous fear and lack of trust prevented earlier reporting.',
    lastContactWithExploiters: 'No',
    lastContactDetailsText: 'No contact has occurred for several months.',
  },
  '3': {
    journeyKey: 'T3: Continue report',
    scenarioId: '3',
    description: 'Continue report',
    email: DEFAULT_EMAIL,
    checkError: 'No',
    reportLocation: DEFAULT_LOCATION,
    victimUnder18: 'Yes',
    backgroundText: 'Background for continue report scenario',
    multipleExploitativeSituations: 'No',
    exploitationWhenText: 'A short exploitation period',
    exploitationStartText: 'The exploitation started during travel.',
    takenSomewhereByExploiters: 'Yes',
    takenSomewhereJourneyText: 'The victim was taken to multiple properties.',
    treatmentText: 'The victim experienced intimidation and unsafe living conditions.',
    stillInExploitativeSituation: 'No',
    howTheyLeftText: 'The victim left with police assistance.',
    firstTimeReporting: 'Not sure',
    firstTimeReportingDetail: 'The victim is unsure if previous reports were made.',
    lastContactWithExploiters: 'Not sure',
    lastContactDetailsText: 'The timeline of last contact is unclear.',
  },
  '4': {
    journeyKey: 'T4: Delete report',
    scenarioId: '4',
    description: 'Delete report',
    email: DEFAULT_EMAIL,
    checkError: 'No',
    reportLocation: DEFAULT_LOCATION,
    victimUnder18: 'Yes',
    backgroundText: 'Background for delete report scenario',
    multipleExploitativeSituations: 'No',
    exploitationWhenText: 'A short exploitation period',
    exploitationStartText: 'The exploitation started during travel.',
    takenSomewhereByExploiters: 'No',
    treatmentText: 'The victim was made to work long hours with no pay.',
    stillInExploitativeSituation: 'No',
    howTheyLeftText: 'The victim left after intervention from friends.',
    firstTimeReporting: 'No',
    whyReportingNowText: 'The victim only recently felt safe enough to disclose.',
    lastContactWithExploiters: 'No',
    lastContactDetailsText: 'No recent contact with exploiters.',
  },
  '5': {
    journeyKey: 'T5: Not sure if under18',
    scenarioId: '5',
    description: 'Not sure if under18',
    email: DEFAULT_EMAIL,
    checkError: 'No',
    reportLocation: DEFAULT_LOCATION,
    victimUnder18: 'Not sure',
    backgroundText: 'Background for unsure age scenario',
    multipleExploitativeSituations: "Don't know",
    exploitationWhenText: 'Unclear exploitation timeline',
    exploitationStartText: 'The exploitation started in unclear circumstances.',
    takenSomewhereByExploiters: 'Yes',
    takenSomewhereJourneyText: 'They were moved but cannot describe every location.',
    treatmentText: 'The victim reports coercion but details are fragmented.',
    stillInExploitativeSituation: 'Yes',
    keepingInSituationText: 'Fear of reprisals is preventing departure.',
    firstTimeReporting: 'Not sure',
    firstTimeReportingDetail: 'Uncertain about prior engagement with services.',
    lastContactWithExploiters: 'Yes',
    lastContactDetailsText: 'Contact was made through a third party recently.',
  },
  '6': {
    journeyKey: 'T6: E2E mixed',
    scenarioId: '6',
    description: 'E2E mixed',
    email: DEFAULT_EMAIL,
    checkError: 'No',
    reportLocation: DEFAULT_LOCATION,
    victimUnder18: 'No',
    under18DuringExploitation: 'Yes',
    backgroundText: 'Background for mixed journey scenario',
    multipleExploitativeSituations: 'Yes',
    exploitationWhenText: 'Several exploitations across locations',
    exploitationStartText: 'The exploitation started via coercion and movement.',
    takenSomewhereByExploiters: 'Yes',
    takenSomewhereJourneyText: 'The victim was trafficked between towns.',
    treatmentText: 'They were threatened and denied freedom of movement.',
    stillInExploitativeSituation: 'No',
    howTheyLeftText: 'They left after emergency support was arranged.',
    firstTimeReporting: 'Yes',
    firstTimeReportingDetail: 'Immediate disclosure after rescue.',
    lastContactWithExploiters: 'No',
    lastContactDetailsText: 'No contact since rescue.',
  },
  '8': {
    journeyKey: 'T8: Add max locations',
    scenarioId: '8',
    description: 'Add max locations',
    email: DEFAULT_EMAIL,
    checkError: 'No',
    reportLocation: DEFAULT_LOCATION,
    victimUnder18: 'No',
    under18DuringExploitation: 'No',
    backgroundText: 'Background for max locations scenario',
    multipleExploitativeSituations: 'Yes',
    exploitationWhenText: 'Many exploitation dates and places',
    exploitationStartText: 'The exploitation started through repeated recruitment.',
    takenSomewhereByExploiters: 'Yes',
    takenSomewhereJourneyText: 'The victim was moved repeatedly across regions.',
    treatmentText: 'The victim was controlled through violence and debt.',
    stillInExploitativeSituation: 'Yes',
    keepingInSituationText: 'Ongoing coercion and debt bondage continue.',
    firstTimeReporting: 'No',
    whyReportingNowText: 'New safeguarding support made reporting possible now.',
    lastContactWithExploiters: 'Yes',
    lastContactDetailsText: 'Contact occurred in person last week.',
  },
  '9': {
    journeyKey: 'T9: No answers - yes cooperation',
    scenarioId: '9',
    description: "'No' answers - Yes Cooperation",
    email: DEFAULT_EMAIL,
    checkError: 'No',
    reportLocation: DEFAULT_LOCATION,
    victimUnder18: 'No',
    under18DuringExploitation: 'No',
    backgroundText: 'Background for cooperation scenario',
    multipleExploitativeSituations: 'No',
    exploitationWhenText: 'A single exploitation period in summer',
    exploitationStartText: 'The exploitation started after a false promise of work.',
    takenSomewhereByExploiters: 'No',
    treatmentText: 'The victim was economically exploited and monitored.',
    stillInExploitativeSituation: 'No',
    howTheyLeftText: 'The victim left after obtaining safe accommodation.',
    firstTimeReporting: 'Yes',
    firstTimeReportingDetail: 'The victim is reporting at first opportunity.',
    lastContactWithExploiters: 'No',
    lastContactDetailsText: 'No known contact since departure.',
  },
  '11': {
    journeyKey: 'T11: Save and exit report',
    scenarioId: '11',
    description: 'Save and exit report',
    email: DEFAULT_EMAIL,
    checkError: 'No',
    reportLocation: DEFAULT_LOCATION,
    victimUnder18: 'Yes',
    backgroundText: 'Background for save and exit scenario',
    multipleExploitativeSituations: 'No',
    exploitationWhenText: 'A short exploitation period',
    exploitationStartText: 'The exploitation started after contact with exploiters.',
    takenSomewhereByExploiters: 'Yes',
    takenSomewhereJourneyText: 'The victim was transported and housed by exploiters.',
    treatmentText: 'They were threatened and deprived of basic needs.',
    stillInExploitativeSituation: 'Yes',
    keepingInSituationText: 'The victim remains under psychological control.',
    firstTimeReporting: 'No',
    whyReportingNowText: 'Recent safeguarding intervention enabled reporting.',
    lastContactWithExploiters: 'Yes',
    lastContactDetailsText: 'Last contact occurred by phone two days ago.',
  },
};

export function getScenarioData(scenarioId: string): NrmScenarioData | undefined {
  return NRM_SCENARIO_DATA[scenarioId];
}

export function getScenarioDataByJourney(journeyKey: string): NrmScenarioData | undefined {
  const normalizedJourney = journeyKey.trim().toLowerCase();
  return Object.values(NRM_SCENARIO_DATA).find(item => item.journeyKey.toLowerCase() === normalizedJourney);
}
