const emailExtensions = require('../../../ms-lists/ms_email_extensions.json');
const emailDomainList = require('../../../ms-lists/ms_email_domain_list.json');

module.exports = {
  isOnDomainList: userEmailDomain => emailDomainList.includes(userEmailDomain),

  isOnExtensionsList: userExtension => emailExtensions.some( ext => userExtension.endsWith(ext))
};
