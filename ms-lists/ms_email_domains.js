const emailDomainList = require('./ms_email_domain_list.json');
const domainFunctions = require('../apps/nrm/util/domain-functions');

module.exports = emailDomainList;

module.exports.isValidDomain = (domain) => (domainFunctions.isOnDomainList(domain.toLowerCase()) || domainFunctions.isOnExtensionsList(domain.toLowerCase()));
