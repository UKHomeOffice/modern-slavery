'use strict';

/* eslint complexity: 0 max-statements: 0 */
/* eslint-disable dot-notation, max-len */

const _ = require('lodash');
const uuid = require('uuid/v4');

module.exports = (data, token) => {
  const response = {};

  response.Type = data['pv-want-to-submit-nrm'] === 'no' ? '662265' : '560734';
  response['Customer.Forename1'] = data['pv-name-first-name'];
  response['Customer.Surname'] = data['pv-name-last-name'];
  response['Customer.Address'] = data['pv-contact-details-street'];
  response['Customer.Town'] = data['pv-contact-details-town'];
  response['Customer.County'] = data['pv-contact-details-county'];
  response['Customer.Postcode'] = data['pv-contact-details-postcode'];
  response['Customer.ContactMethod'] = _.isArray(data['pv-contact-details']) ?
    'Email, Post' : _.upperFirst(data['pv-contact-details']);
  response['Customer.Alias'] = data['pv-name-nickname'];
  if (data['fr-location']) {
    response['Case.Jurisdiction'] = data['fr-location'].toUpperCase().replace(' ', '').replace('-', '');
  }
  if (data['pv-dob']) {
    response['Customer.Custom7'] = 'Yes';
    response['Customer.DOB'] = data['pv-dob'];
  }
  const genderMap = {
    female: 'Female',
    male: 'Male',
    unknown: 'Other'
  };
  // Gender
  response['Customer.Custom17'] = genderMap[data['pv-gender']];
  response['Customer.Email'] = data['pv-contact-details-email-input'];
  response['Customer.Phone'] = data['pv-phone-number-yes'];
  // Have children?
  response['Customer.Custom9'] = _.upperFirst(data['does-pv-have-children']);
  // Number Of Children
  response['Customer.Custom10'] = data['does-pv-have-children-yes-amount'];
  response['Customer.Nationality'] = data['pv-nationality'];
  // Dual nationality
  response['Customer.Custom11'] = data['pv-nationality-second'];
  // Country field pv-address?
  // response['Customer.Custom12'];
  // Interpreter Needed
  response['Customer.Custom13'] = _.upperFirst(data['pv-interpreter-requirements']);
  // Interpreter Language
  response['Customer.Custom14'] = data['pv-interpreter-requirements-language'];
  // Help With Communication
  response['Customer.Custom15'] = _.upperFirst(data['pv-other-help-with-communication']);
  // Communication Aid
  response['Customer.Custom16'] = data['pv-other-help-with-communication-aid'];
  const underAgeMap = {
    yes: 'Child',
    no: 'Adult',
    'not-sure': 'Unknown'
  };
  response.AdultOrChild = underAgeMap[data['pv-under-age']];
  response.AdultOrChildDuringExploitation = underAgeMap[data['pv-under-age-at-time-of-exploitation']];
  response.VictimAccount = data['what-happened'];
  const locationMap = {
    uk: 'UK',
    overseas: 'OVERSEAS',
    'uk-and-overseas': 'BOTH'
  };
  response.ExploitationLocationPresented = locationMap[data['where-exploitation-happened']];
  response.City1 = data['where-exploitation-happened-uk-city-1'];
  response.City2 = data['where-exploitation-happened-uk-city-2'];
  response.City3 = data['where-exploitation-happened-uk-city-3'];
  response.City4 = data['where-exploitation-happened-uk-city-4'];
  response.City5 = data['where-exploitation-happened-uk-city-5'];
  response.City6 = data['where-exploitation-happened-uk-city-6'];
  response.City7 = data['where-exploitation-happened-uk-city-7'];
  response.City8 = data['where-exploitation-happened-uk-city-8'];
  response.City9 = data['where-exploitation-happened-uk-city-9'];
  response.City10 = data['where-exploitation-happened-uk-city-10'];
  response.ExploitationUKAddress = data['where-exploitation-happened-other-uk-other-location'];
  response.Country1 = data['where-exploitation-happened-overseas-country-1'];
  response.Country2 = data['where-exploitation-happened-overseas-country-2'];
  response.Country3 = data['where-exploitation-happened-overseas-country-3'];
  response.Country4 = data['where-exploitation-happened-overseas-country-4'];
  response.Country5 = data['where-exploitation-happened-overseas-country-5'];
  response.Country6 = data['where-exploitation-happened-overseas-country-6'];
  response.Country7 = data['where-exploitation-happened-overseas-country-7'];
  response.Country8 = data['where-exploitation-happened-overseas-country-8'];
  response.Country9 = data['where-exploitation-happened-overseas-country-9'];
  response.Country10 = data['where-exploitation-happened-overseas-country-10'];
  response.ExploitationOverseasAddress = data['where-exploitation-happened-other-overseas-other-location'];
  response.PVCurrentCityTown = data['current-pv-location-uk-city'];
  response.PVCurrentCounty = data['current-pv-location-uk-region'];
  response.ExploiterDetails = data['who-exploited-pv'];
  response.ExploitersLocationInformationPresent = _.upperFirst(data['exploiters-location']);
  response.ExploitersInUK = _.upperFirst(data['are-exploiters-in-the-uk']);
  response.InformationOnExploitersCurrentLocation = data['exploiters-current-location-details'];
  response.ConcernsOfFurtherExploitationToPV = _.upperFirst(data['future-exploitation-concerns']);
  response.ReasonForConcernsReFurtherExploitation = data['future-exploitation-reasons'];
  response.WillingToCooperate = _.upperFirst(data['authorities-cooperation']);
  response.CollaborationInfo = data['authorities-cooperation-details'];

  if (data['types-of-exploitation-forced-to-work'] === 'true') {
    response.ComponentForcedToWorkForNothing = 'Yes';
  }
  if (data['types-of-exploitation-wages-taken'] === 'true') {
    response.ComponentWagesTaken = 'Yes';
  }
  if (data['types-of-exploitation-forced-to-commit-fraud'] === 'true') {
    response.ComponentFraud = 'Yes';
  }
  if (data['types-of-exploitation-prostitution'] === 'true') {
    response.ComponentProstitution = 'Yes';
  }
  if (data['types-of-exploitation-prostitution'] === 'true') {
    response.ComponentProstitution = 'Yes';
  }
  if (data['types-of-exploitation-child-exploitation'] === 'true') {
    response.ComponentChildExploitation = 'Yes';
  }
  if (data['types-of-exploitation-taken-somewhere'] === 'true') {
    response.ComponentSexuallyassaulted = 'Yes';
  }
  if (data['types-of-exploitation-forced-to-commit-crime'] === 'true') {
    response.ComponentForcedCrime = 'Yes';
  }
  if (data['types-of-exploitation-organs-removed'] === 'true') {
    response.ComponentOrgansRemoved = 'Yes';
  }
  if (data['types-of-exploitation-unpaid-household-work'] === 'true') {
    response.ComponentDomesticServitude = 'Yes';
  }
  if (data['types-of-exploitation-other'] === 'true') {
    response.ExploitationOther = data['other-exploitation-details'];
  }

  const otherVictimsMap = {
    yes: 'Yes',
    no: 'No',
    'not-sure': 'Not sure'
  };
  response.OtherVictims = otherVictimsMap[data['any-other-pvs']];
  response.OtherVictimsFurtherInfo = data['other-potential-victims-yes-details'] ||
    data['other-potential-victims-not-sure-details'] || 'No further information provided';
  response.ReportedCase = _.upperFirst(data['reported-to-police']);
  response.PoliceForce = data['reported-to-police-police-forces'];
  response.LocalAuthority = data['local-authority-contacted-about-child-local-authority-name'];
  response.LAFirstName = data['local-authority-contacted-about-child-local-authority-first-name'];
  response.LALastName = data['local-authority-contacted-about-child-local-authority-last-name'];
  response.LAPhone = data['local-authority-contacted-about-child-local-authority-phone'];
  response.LAEmail = data['local-authority-contacted-about-child-local-authority-email'];

  if (data['pv-contact-details-email-check']) {
    response.SafeToEmail = data['pv-contact-details-email-check'] === 'true' ? 'Yes' : 'No';
  }
  if (data['pv-contact-details-post-check']) {
    response.SafeToPostal = data['pv-contact-details-post-check'] === 'true' ? 'Yes' : 'No';
  }

  const countryKey = {
    england: 'ENG',
    wales: 'WAL',
    scotland: 'SCOT',
    'northern-ireland': 'NI'
  };
  response.Country = countryKey[data['fr-location']];
  response.CountryLabel = _.upperFirst(data['fr-location']);
  response.HowToNotify = _.isArray(data['pv-contact-details']) ?
    'Email, Post' : _.upperFirst(data['pv-contact-details']);
  response.PoliceForceCRN = data['reported-to-police-crime-reference'];
  response.CIDReference = data['pv-ho-reference-type'];

  if (data['pv-want-to-submit-nrm']) {
    response.NRMOrDuty = data['pv-want-to-submit-nrm'] === 'no' ? 'DTN' : 'NRM';
  }

  response.DTNReason = data['refuse-nrm'];
  response.NeedSupport = _.upperFirst(data['does-pv-need-support']);
  response.AlternativePhoneNumber = data['pv-phone-number-alternative'];
  response.AlternativePhoneRelationshipToPV = data['alternative-number-relation-to-pv'];
  response.CannotProvideContactDetails = data['no-contact-details'];

  if (data['who-contact']) {
    response.WhoToSendDecisionTo = data['who-contact'] === 'potential-victim' ? 'PV' : 'Someone else';
  }

  response['Agent.Forename1'] = data['fr-details-first-name'];
  response['Agent.Name'] = data['fr-details-last-name'];
  response['Agent.Email'] = data['user-email'];
  response['Agent.Phone'] = data['fr-details-phone'];
  response['Agent.Jobtitle'] = data['fr-details-role'];
  response['Agent.Organisation'] = data['user-organisation'];
  response.AlternateFREmail = data['fr-alternative-contact'];
  response.AltContactFirstName = data['someone-else-first-name'];
  response.AltContactName = data['someone-else-last-name'];
  response.AltContactAddress = data['someone-else-street'];
  response.AltContactTown = data['someone-else-town'];
  response.AltContactCounty = data['someone-else-county'];
  response.AltContactPostcode = data['someone-else-postcode'];
  response.AltContactEmail = data['someone-else-email-input'];
  if (data['someone-else-permission-check']) {
    response.AltContactPermissionToSend = data['someone-else-permission-check'] === 'true' ? 'Yes' : 'No';
  }

  // will be removed in icasework
  // response.SupportProviderContactByPhone;

  // icw resolver will look for any existing case before submitting a report to prevent duplicates
  response.ExternalId = data['externalID'] ? data['externalID'] : uuid();

  response.PVBirthplace = data['birthplace'];
  response.PVFamily = data['family'];
  response.PVEducation = data['education'];
  response.PVEmploymentHistory = data['employment-history'];
  response.MultipleExploitationSituations = data['more-than-one-exploitation-situation'];

  const moreSituations = {
    yes: 'Yes',
    no: 'No',
    'i-dont-know': 'DontKnow'
  };

  response.MoreThanOneExploitationSituations = moreSituations[data['potential-victim-exploitative-situation-multiple']];

  if(data['potential-victim-exploitative-situation-multiple'] === 'yes') {
    response.ExploitationDates = data['when-did-the-exploitation-take-place-multiple'];
  } else {
    response.ExploitationDates = data['when-did-the-exploitation-take-place'];
  }
  response.HowExploitationStarted = data['how-did-the-exploitation-start'];
  response.ExploitationTakenSomewhere = _.upperFirst(data['were-they-taken-somewhere-by-their-exploiter']);
  response.ExploitationJourneyDetails = data['were-they-taken-somewhere-by-their-exploiter-journey-details'];
  response.ExploitationAverageDay = data['what-were-they-required-to-do'];
  response.ExploitationLivingConditions = data['living-conditions'];
  response.ExploitationTreatment = data['how-they-were-treated'];
  response.ExploitationWhyTheyStayed = data['why-they-stayed'];
  response.PVStillInExploitativeSituation = _.upperFirst(data['still-in-exploitative-situation']);
  response.KeepingPVInSituation = data['what-is-keeping-them-in-situation'];
  response.ExploitationReasonTheyLeft = data['how-why-did-they-leave-the-situation'];
  response.PVExploitersLastContact = data['when-last-contact'];
  response.DetailsLastContact = data['details-last-contact'];

  const firstChangeToReport = {
    yes: 'Yes',
    no: 'No',
    'not-sure': 'Not sure'
  };
  response.FirstChanceToReport = firstChangeToReport[data['is-this-the-first-chance-to-report']];

  if(data['is-this-the-first-chance-to-report'] === 'yes') {
    response.ReportedBeforeFurtherInfo = data['yes-the-first-chance-to-report'];
  } else if(data['is-this-the-first-chance-to-report'] === 'not-sure') {
    response.ReportedBeforeFurtherInfo = data['not-sure-the-first-chance-to-report'];
  }

  response.ReasonForReportingNow = data['why-report-now'];
  response.ReasonForMakingReferral = data['why-are-you-making-the-referral'];
  response.IdentifiedModernSlaveryIndicators = _.upperFirst(data['modern-slavery-indicators']);
  response.IdentifiedModernSlaveryIndicatorsDetails = data['modern-slavery-indicators-details'];
  response.ProfessionalInsight = data['professional-insight'];
  response.DetailsAboutInterview = data['where-how-interview-carried-out'];
  response.EvidenceOfDishonesty = _.upperFirst(data['evidence-of-dishonesty']);
  response.DetailsOfEvidenceOfDishonesty = data['evidence-of-dishonesty-details'];
  response.ProfessionalsInvolved = _.upperFirst(data['are-others-involved']);
  response.DetailsOfProfessionalsInvolved = data['are-others-involved-details'];
  response.EvidenceSubmitted = data['what-evidence-you-will-submit'];

  data['files'] = data['files'] || [];

  data['files'].forEach((doc, i) => {
    const index = i + 1;
    response[`Document${index}.URL`] = `${doc.url.replace('/file', '/vault')}&token=${token.bearer}`;
    response[`Document${index}.Name`] = doc.name;
    response[`Document${index}.MimeType`] = doc.mimetype;
    response[`Document${index}.URLLoadContent`] = true;
  });

  return response;
};
