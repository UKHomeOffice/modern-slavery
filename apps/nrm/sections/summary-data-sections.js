/* eslint-disable max-len  */
'use strict';

module.exports = {
  'your-report': {
    steps: [
      {
        step: '/reference',
        field: 'reference'
      },
      {
        step: '/organisation',
        field: 'user-organisation'
      },
      {
        step: '/pv-under-age',
        field: 'pv-under-age'
      },
      {
        step: '/pv-under-age-at-time-of-exploitation',
        field: 'pv-under-age-at-time-of-exploitation'
      },
      {
        step: '/what-happened',
        field: 'what-happened'
      },
      {
        step: '/fr-location',
        field: 'fr-location'
      },
      {
        step: '/local-authority-contacted-about-child',
        field: 'local-authority-contacted-about-child-local-authority-name'
      },
      {
        step: '/local-authority-contacted-about-child',
        field: 'local-authority-contacted-about-child-local-authority-phone'
      },
      {
        step: '/local-authority-contacted-about-child',
        field: 'local-authority-contacted-about-child-local-authority-email'
      },
      {
        step: '/local-authority-contacted-about-child',
        field: 'local-authority-contacted-about-child-local-authority-first-name',
        parse: (list, req) => {
          if (!req.sessionModel.get('local-authority-contacted-about-child-local-authority-first-name')) {
            return null;
          }
          return `${list} ${req.sessionModel.get('local-authority-contacted-about-child-local-authority-last-name')}`;
        }
      },
      {
        step: '/types-of-exploitation',
        field: 'types-of-exploitation',
        parse: (list, req) => {
          if (!req.sessionModel.get('steps').includes('/types-of-exploitation')) {
            return null;
          }
          if (req.sessionModel.get('exploitation-types')== undefined) {
            //     return `${req.sessionModel.get('types-of-exploitation-forced-to-work')}\n
            // ${req.sessionModel.get('types-of-exploitation-wages-taken')}\n,
            // ${req.sessionModel.get('types-of-exploitation-forced-to-commit-fraud')}\n,
            // ${req.sessionModel.get('types-of-exploitation-prostitution')}\n,
            // ${req.sessionModel.get('types-of-exploitation-child-exploitation')}\n,
            // ${req.sessionModel.get('types-of-exploitation-taken-somewhere')}\n,
            // ${req.sessionModel.get('types-of-exploitation-forced-to-commit-crime')}\n,
            // ${req.sessionModel.get('types-of-exploitation-organs-removed')}\n,
            // ${req.sessionModel.get('types-of-exploitation-unpaid-household-work')}\n,
            // ${req.sessionModel.get('types-of-exploitation-other')}\n,
            // ${req.sessionModel.get('other-exploitation-details')}`

            if (req.sessionModel.get('types-of-exploitation-forced-to-work')) {
              return 'Forced to work for nothing or almost nothing';
            }
            if (req.sessionModel.get('types-of-exploitation-wages-taken')) {
              return 'Wages taken by force or coercion, such as through control of a bank account';
            }
            if (req.sessionModel.get('types-of-exploitation-forced-to-commit-fraud')) {
              return 'Forced to commit fraud, such as using their identity to claim benefits';
            }
            if (req.sessionModel.get('types-of-exploitation-prostitution')) {
              return 'Forced into prostitution';
            }
            if (req.sessionModel.get('types-of-exploitation-child-exploitation')) {
              return 'Child sexual exploitation';
            }
            if (req.sessionModel.get('types-of-exploitation-taken-somewhere')) {
              return 'Taken somewhere, held against their will and sexually assaulted';
            }
            if (req.sessionModel.get('types-of-exploitation-forced-to-commit-crime')) {
              return 'Forced to commit a crime, such as growing cannabis, drug dealing or begging';
            }
            if (req.sessionModel.get('types-of-exploitation-organs-removed')) {
              return 'Organs, such as kidneys, removed against their will';
            }
            if (req.sessionModel.get('types-of-exploitation-unpaid-household-work')) {
              return 'Forced to do unpaid or low paid household work by relatives or strangers';
            }
            if (req.sessionModel.get('other-exploitation-details')) {
              return req.sessionModel.get('other-exploitation-details')
            } else {
              return req.sessionModel.get('exploitation-types').map(a => a).join('.\n\n');
            }
          }
        }
      },
      {
        step: '/where-exploitation-happened',
        field: 'where-exploitation-happened'
      },
      {
        step: '/where-exploitation-happened-uk',
        field: 'where-exploitation-happened-uk-city-1',
        parse: (list, req) => {
          if (!req.sessionModel.get('steps').includes('/where-exploitation-happened-uk')) {
            return null;
          }
          return req.sessionModel.get('uk-exploitation').map(a => a).join('\n') + '\n' + req.sessionModel.get('where-exploitation-happened-other-uk-other-location');
        }
      },
      {
        step: '/where-exploitation-happened-overseas',
        field: 'where-exploitation-happened-overseas-country-1',
        parse: (list, req) => {
          if (!req.sessionModel.get('steps').includes('/where-exploitation-happened-overseas')) {
            return null;
          }
          return req.sessionModel.get('overseas-exploitation').map(a => a).join('\n') + '\n' + req.sessionModel.get('where-exploitation-happened-other-overseas-other-location');
        }
      },
      {
        step: '/current-pv-location',
        field: 'current-pv-location-uk-city',
        parse: (list, req) => {
          if (!req.sessionModel.get('steps').includes('/current-pv-location')) {
            return null;
          }
          return `City: ${list}\nRegion: ${req.sessionModel.get('current-pv-location-uk-region')}`;
        }
      },
      {
        step: '/who-exploited-pv',
        field: 'who-exploited-pv'
      },
      {
        step: '/exploiters-location',
        field: 'exploiters-location'
      },
      {
        step: '/are-exploiters-in-the-uk',
        field: 'are-exploiters-in-the-uk'
      },
      {
        step: '/exploiters-current-location-details',
        field: 'exploiters-current-location-details'
      },
      {
        step: '/any-other-pvs',
        field: 'any-other-pvs'
      },
      {
        step: '/future-exploitation',
        field: 'future-exploitation-concerns'
      },
      {
        step: '/concerns-future-exploitation',
        field: 'future-exploitation-reasons'
      },
      {
        step: '/when-did-the-exploitation-take-place',
        field: 'when-did-the-exploitation-take-place'
      },
      {
        step: '/more-than-one-exploitation-situation',
        field: 'more-than-one-exploitation-situation'
      },
      {
        step: '/how-did-the-exploitation-start',
        field: 'how-did-the-exploitation-start'
      },
      {
        step: '/were-they-taken-somewhere-by-their-exploiter',
        field: 'were-they-taken-somewhere-by-their-exploiter'
      },
      {
        step: '/were-they-taken-somewhere-by-their-exploiter',
        field: 'were-they-taken-somewhere-by-their-exploiter-journey-details'
      },
      {
        step: '/how-they-were-treated',
        field: 'what-were-they-required-to-do'
      },
      {
        step: '/how-they-were-treated',
        field: 'how-they-were-treated'
      },
      {
        step: '/how-they-were-treated',
        field: 'why-they-stayed'
      },
      {
        step: '/how-why-did-they-leave-the-situation',
        field: 'how-why-did-they-leave-the-situation'
      },
      {
        step: '/when-last-contact',
        field: 'when-last-contact'
      },
      {
        step: '/details-last-contact',
        field: 'details-last-contact'
      },
      {
        step: '/is-this-the-first-chance-to-report',
        field: 'is-this-the-first-chance-to-report'
      },
      {
        step: '/why-report-now',
        field: 'why-report-now'
      },
      {
        step: '/why-are-you-making-the-referral',
        field: 'why-are-you-making-the-referral'
      },
      {
        step: '/where-how-interview-carried-out',
        field: 'where-how-interview-carried-out'
      },
      {
        step: '/are-others-involved',
        field: 'are-others-involved'
      },
      {
        step: '/are-others-involved',
        field: 'are-others-involved-details'
      },
      {
        step: '/evidence-of-dishonesty',
        field: 'evidence-of-dishonesty'
      },
      {
        step: '/evidence-of-dishonesty',
        field: 'evidence-of-dishonesty-details'
      },
      {
        step: '/what-evidence-you-will-submit',
        field: 'what-evidence-you-will-submit'
      },
      {
        step: '/reported-to-police',
        field: 'reported-to-police',
        parse: (list, req) => {
          if (req.sessionModel.get('reported-to-police') === 'yes') {
            return `${list}\n${req.sessionModel.get('reported-to-police-police-forces')}\nReference: ${req.sessionModel.get('reported-to-police-crime-reference')}`;
          }
          return list;
        }
      },
      {
        step: '/authorities-cooperation',
        field: 'authorities-cooperation'
      },
      {
        step: '/authorities-cooperation',
        field: 'authorities-cooperation-details'
      }
    ]
  },
  'potential-victim': {
    steps: [
      {
        step: '/pv-want-to-submit-nrm',
        field: 'pv-want-to-submit-nrm',
        parse: (list, req) => {
          if (!req.sessionModel.get('steps').includes('/pv-want-to-submit-nrm')) {
            return null;
          }
          return req.sessionModel.get('pv-want-to-submit-nrm') === 'no' ? 'No' : 'Yes';
        }
      },
      {
        step: '/does-pv-need-support',
        field: 'does-pv-need-support'
      },
      {
        step: '/refuse-nrm',
        field: 'refuse-nrm'
      },
      {
        step: '/pv-name-referral',
        field: 'pv-name-first-name',
        parse: (list, req) => {
          if (!req.sessionModel.get('steps').includes('/pv-name-referral')) {
            return null;
          }
          return `${list} ${req.sessionModel.get('pv-name-last-name')}`;
        }
      },
      {
        step: '/pv-name-dtn',
        field: 'pv-name-first-name',
        parse: (list, req) => {
          if (!req.sessionModel.get('steps').includes('/pv-name-dtn') || req.sessionModel.get('authorities-cooperation') === 'no') {
            return null;
          }
          return `${list} ${req.sessionModel.get('pv-name-last-name')}`;
        }
      },
      {
        step: '/pv-name-referral',
        field: 'pv-name-nickname',
        parse: (list, req) => {
          if (!req.sessionModel.get('steps').includes('/pv-name-referral')) {
            return null;
          }
          return list;
        }
      },
      {
        step: '/pv-name-dtn',
        field: 'pv-name-nickname',
        parse: (list, req) => {
          if (!req.sessionModel.get('steps').includes('/pv-name-dtn') || req.sessionModel.get('authorities-cooperation') === 'no') {
            return null;
          }
          return list;
        }
      },
      {
        step: '/pv-dob',
        field: 'pv-dob'
      },
      {
        step: '/pv-gender-referral',
        field: 'pv-gender',
        parse: (list, req) => {
          if (!req.sessionModel.get('steps').includes('/pv-gender-referral')) {
            return null;
          }
          return list;
        }
      },
      {
        step: '/pv-gender-dtn',
        field: 'pv-gender',
        parse: (list, req) => {
          if (!req.sessionModel.get('steps').includes('/pv-gender-dtn')) {
            return null;
          }
          return list;
        }
      },
      {
        step: '/what-is-their-background',
        field: 'birthplace'
      },
      {
        step: '/what-is-their-background',
        field: 'family'
      },
      {
        step: '/what-is-their-background',
        field: 'education'
      },
      {
        step: '/what-is-their-background',
        field: 'employment-history'
      },
      {
        step: '/does-pv-have-children',
        field: 'does-pv-have-children',
        parse: (list, req) => {
          if (req.sessionModel.get('does-pv-have-children') === 'yes') {
            return `Yes: ${req.sessionModel.get('does-pv-have-children-yes-amount')}`;
          }
          return list;
        }
      },
      {
        step: '/pv-nationality-referral',
        field: 'pv-nationality',
        parse: (list, req) => {
          if (!req.sessionModel.get('steps').includes('/pv-nationality-referral')) {
            return null;
          } else if (req.sessionModel.get('pv-nationality-second')) {
            return `${list}\n${req.sessionModel.get('pv-nationality-second')}`;
          }
          return list;
        }
      },
      {
        step: '/pv-nationality-dtn',
        field: 'pv-nationality',
        parse: (list, req) => {
          if (!req.sessionModel.get('steps').includes('/pv-nationality-dtn')) {
            return null;
          } else if (req.sessionModel.get('pv-nationality-second')) {
            return `${list}\n${req.sessionModel.get('pv-nationality-second')}`;
          }
          return list;
        }
      },
      {
        step: '/pv-interpreter-requirements',
        field: 'pv-interpreter-requirements',
        parse: (list, req) => {
          if (req.sessionModel.get('pv-interpreter-requirements') === 'yes') {
            return `Yes: Language: ${req.sessionModel.get('pv-interpreter-requirements-language')}`;
          }
          return list;
        }
      },
      {
        step: '/pv-other-help-with-communication',
        field: 'pv-other-help-with-communication',
        parse: (list, req) => {
          if (req.sessionModel.get('pv-other-help-with-communication') === 'yes') {
            return `Yes: ${req.sessionModel.get('pv-other-help-with-communication-aid')}`;
          }
          return list;
        }
      },
      {
        step: '/pv-contact-details-referral',
        field: 'pv-contact-details-email-check',
        parse: (list, req) => {
          if (!req.sessionModel.get('steps').includes('/pv-contact-details-referral') || !req.sessionModel.get('pv-contact-details-email-check')) {
            return null;
          }
          return `${req.sessionModel.get('pv-contact-details-email-input')}\nSafe to use`;
        }
      },
      {
        step: '/pv-contact-details-dtn',
        field: 'pv-contact-details-email-check',
        parse: (list, req) => {
          if (!req.sessionModel.get('steps').includes('/pv-contact-details-dtn') || !req.sessionModel.get('pv-contact-details-email-check') || req.sessionModel.get('authorities-cooperation') === 'no') {
            return null;
          }
          return `${req.sessionModel.get('pv-contact-details-email-input')}\nSafe to use`;
        }
      },
      {
        step: '/pv-contact-details-referral',
        field: 'pv-contact-details-post-check',
        parse: (list, req) => {
          if (!req.sessionModel.get('steps').includes('/pv-contact-details-referral') || !req.sessionModel.get('pv-contact-details-post-check')) {
            return null;
          }
          return `${req.sessionModel.get('pv-contact-details-street')}\n${req.sessionModel.get('pv-contact-details-town')}\n${req.sessionModel.get('pv-contact-details-county')}\n${req.sessionModel.get('pv-contact-details-postcode')}\nSafe to use`;
        }
      },
      {
        step: '/pv-contact-details-dtn',
        field: 'pv-contact-details-post-check',
        parse: (list, req) => {
          if (!req.sessionModel.get('steps').includes('/pv-contact-details-dtn') || !req.sessionModel.get('pv-contact-details-post-check') || req.sessionModel.get('authorities-cooperation') === 'no') {
            return null;
          }
          return `${req.sessionModel.get('pv-contact-details-street')}\n${req.sessionModel.get('pv-contact-details-town')}\n${req.sessionModel.get('pv-contact-details-county')}\n${req.sessionModel.get('pv-contact-details-postcode')}\nSafe to use`;
        }
      },
      {
        step: '/pv-phone-number',
        field: 'pv-phone-number'
      },
      {
        step: '/pv-phone-number',
        field: 'pv-phone-number-yes',
        parse: (list, req) => {
          if (!req.sessionModel.get('steps').includes('/pv-phone-number')) {
            return null;
          } else if (req.sessionModel.get('pv-phone-number') === 'yes') {
            return req.sessionModel.get('pv-phone-number-yes');
          }
          return 'No';
        }
      },
      {
        step: '/pv-ho-reference',
        field: 'pv-ho-reference',
        parse: (list, req) => {
          if (!req.sessionModel.get('steps').includes('/pv-ho-reference')) {
            return null;
          } else if (req.sessionModel.get('pv-ho-reference') === 'yes') {
            return req.sessionModel.get('pv-ho-reference-type');
          }
          return 'No information';
        }
      }
    ]
  },
  'someone-else': {
    steps: [
      {
        step: '/someone-else',
        field: 'someone-else-first-name',
        parse: (list, req) => {
          if (!req.sessionModel.get('someone-else-first-name')) {
            return null;
          }
          return `${list} ${req.sessionModel.get('someone-else-last-name')}`;
        }
      },
      {
        step: '/someone-else',
        field: 'someone-else-email-input',
        parse: (list, req) => {
          if (!req.sessionModel.get('someone-else-email-input')) {
            return null;
          }
          return `${list}\nPermission to use granted`;
        }
      },
      {
        step: '/someone-else',
        field: 'someone-else-street',
        parse: (list, req) => {
          if (!req.sessionModel.get('someone-else-street')) {
            return null;
          }
          return `${req.sessionModel.get('someone-else-street')}\n${req.sessionModel.get('someone-else-town')}\n${req.sessionModel.get('someone-else-county')}\n${req.sessionModel.get('someone-else-postcode')}\nPermission to use granted`;
        }
      }
    ]
  },
  'your-details': {
    steps: [
      {
        step: '/fr-details',
        field: 'fr-details-first-name',
        parse: (list, req) => {
          if (!req.sessionModel.get('fr-details-first-name')) {
            return null;
          }
          return `${list} ${req.sessionModel.get('fr-details-last-name')}`;
        }
      },
      {
        step: '/organisation',
        field: 'user-organisation',
        parse: (list, req) => {
          if (!req.sessionModel.get('steps').includes('/fr-details')) {
            return null;
          }
          return list;
        }
      },
      {
        step: '/fr-details',
        field: 'fr-details-role'
      },
      {
        step: '/fr-details',
        field: 'user-email',
        omitChangeLink: true,
        parse: (list, req) => {
          if (!req.sessionModel.get('steps').includes('/fr-details')) {
            return null;
          }
          return list;
        }
      },
      {
        step: '/fr-details',
        field: 'fr-details-phone'
      },
      {
        step: '/fr-alternative-contact',
        field: 'fr-alternative-contact'
      }
    ]
  }
};