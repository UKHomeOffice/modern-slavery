'use strict';

module.exports = data => {
  const response = {};

  response.Type = '560734';
  response['Customer.FirstName'] = data['pv-name-first-name'];
  response['Customer.Surname'] = data['pv-name-last-name'];
  response['Customer.Address'] = data['pv-contact-details-street'];
  response['Customer.Town'] = data['pv-contact-details-town'];
  response['Customer.County'] = data['pv-contact-details-county'];
  response['Customer.Postcode'] = data['pv-contact-details-postcode'];
  response['Customer.ContactMethod'] = data['pv-contact-details'];
  response['Customer.Alias'] = data['pv-name-nickname'];
  if (data['pv-dob']) {
    response['Customer.DOBKnown'] = 'Yes';
    response['Customer.DOB'] = data['pv-dob'];
  }
  // response['Customer.AgeGroup'];
  const genderMap = {
    'female': 'Female',
    'male': 'Male',
    'other': 'Other'
  };
  response['Customer.Gender'] = genderMap[data['pv-gender']];
  response['Customer.Email'] = data['pv-contact-details-email-input'];
  response['Customer.Mobile'] = data['pv-phone-number-yes'];
  response['Customer.Mobile'] = data['pv-phone-number-yes'];
  // response['Customer.ContactTime'];
  response['Customer.HaveChildren'] = data['does-pv-have-children'] === 'yes' ? 'Yes' : 'No';
  response['Customer.NumberOfChildren'] = data['does-pv-have-children-yes-amount'];
  response['Customer.Nationality'] = data['pv-nationality'];
  response['Customer.DualNationality'] = data['pv-nationality-second'];
  // response['Customer.Country'];
  // response['Customer.ReferenceNumbers'] = data['pv-ho-reference-type'];
  response['Customer.InterpreterNeeded'] = data['pv-interpreter-requirements'] === 'yes' ? 'Yes' : 'No';
  response['Customer.InterpreterLanguage'] = data['pv-interpreter-requirements-language'];
  response['Customer.HelpWithCommunication'] = data['pv-other-help-with-communication'] === 'yes' ? 'Yes' : 'No';
  response['Customer.CommunicationAid'] = data['pv-other-help-with-communication-aid'];
  // response['Customer.PassportNumber'];

  response.AdultOrChild = data['pv-under-age'] === 'yes' ? 'Child' : 'Adult';
  response.AdultOrChildDuringExploitation  = data['pv-under-age-at-time-of-exploitation'] === 'yes' ? 'Child' : 'Adult';
  response.VictimAccount = data['what-happened'];
  response.ExploitationLocationPresented = data['where-exploitation-happened'];

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

  // response.Region1;
  // response.Region2;
  // response.Region3;
  // response.Region4;
  // response.Region5;
  // response.Region6;
  // response.Region7;
  // response.Region8;
  // response.Region9;
  // response.Region10;

  response.ExploitationUKAddress = data['where-exploitation-happened-other-uk-other-location'];

  response.ExploitationOverseasRegion = data['where-exploitation-happened-overseas-country-1'];
  response.ExploitationOverseasRegion2 = data['where-exploitation-happened-overseas-country-2'];
  response.ExploitationOverseasRegion3 = data['where-exploitation-happened-overseas-country-3'];
  response.ExploitationOverseasRegion4 = data['where-exploitation-happened-overseas-country-4'];
  response.ExploitationOverseasRegion5 = data['where-exploitation-happened-overseas-country-5'];
  response.ExploitationOverseasRegion6 = data['where-exploitation-happened-overseas-country-6'];
  response.ExploitationOverseasRegion7 = data['where-exploitation-happened-overseas-country-7'];
  response.ExploitationOverseasRegion8 = data['where-exploitation-happened-overseas-country-8'];
  response.ExploitationOverseasRegion9 = data['where-exploitation-happened-overseas-country-9'];
  response.ExploitationOverseasRegion10 = data['where-exploitation-happened-overseas-country-10'];

  response.ExploitationOverseasAddress = data['where-exploitation-happened-other-overseas-other-location'];

  response.PVCurrentCityTown = data['current-pv-location-uk-city'];
  response.PVCurrentCounty = data['current-pv-location-uk-region'];

  response.ExploiterDetails = data['who-exploited-pv'];

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
    response.ComponentDomesticServitude = data['other-exploitation-details'];
  }

  response.OtherVictims = data['any-other-pvs'];

  response.ReportedCase = data['reported-to-police'];
  response['CaseContact.Police_force'] = data['reported-to-police-police-forces'];
  response['CaseContact.Alternate_contact'] = data['fr-alternative-contact'];
  response['CaseContact.Alternate_first_responder'] = data['fr-alternative-contact'];
  response['CaseContact.Local_authority'] = data['local-authority-contacted-about-child-local-authority-name'];

  response['CaseContactOrganisation.Police_force'] = data['reported-to-police-police-forces'];
  response['CaseContactOrganisation.Local_authority'] = data['local-authority-contacted-about-child-local-authority-name'];

  response['CaseContactEmail.Police_force'] = data['local-authority-contacted-about-child-local-authority-email'];
  response['CaseContactEmail.Alternate_contact'] = data['fr-alternative-contact'];
  response['CaseContactEmail.Alternate_first_responder'] = data['fr-alternative-contact'];
  response['CaseContactEmail.Local_authority'] = data['local-authority-contacted-about-child-local-authority-email'];

  // response['CaseContactCustom1.Police_force'];
  //
  // response['CaseContactFirstName.Alternate_contact'];
  // response['CaseContactFirstName.Local_authority'];
  //
  // response['CaseContactAddress.Alternate_contact'];
  //
  // response['CaseContactTown.Alternate_contact'];
  //
  // response['CaseContactCounty.Alternate_contact'];

  // response['CaseContactPostcode.Alternate_contact'];
  //
  // response['CaseContactCustom1.Alternate_contact'];

  response['CaseContactPhone.Local_authority'] = data['fr-details-phone'];

  response.SafeToEmail = data['pv-contact-details-email-check'];
  response.SafeToPostal = data['pv-contact-details-post-check'];

  // response.CountryLabel;
  response.Country = data['fr-location']; //eg 'ENG';

  // response.HowToNotfy;
  // response.CanPoliceContactPV;
  response.CIDReference = data['reported-to-police-crime-reference'];
  response.HORefType = data['pv-ho-reference-type'];
  // response.NRMOrDuty;
  // response.DTNReason;
  // response.NeedSupport;
  response.SendDecisionTo = data['pv-contact-details'];
  // response.Jurisdiction;

  response['Agent.Forename1'] = data['fr-details-first-name'];
  response['Agent.Name'] = data['fr-details-last-name'];
  response['Agent.Email'] = data['user-email'];
  response['Agent.Phone'] = data['fr-details-phone'];
  response['Agent.Jobtitle'] = data['fr-details-role'];
  response['Agent.Organisation'] = data['user-organisation'];
  // response['Agent.Address'];
  // response['Agent.Town'];
  // response['Agent.County'];
  // response['Agent.Postcode'];
  // response['Agent.Mobile'];

  return response;
};