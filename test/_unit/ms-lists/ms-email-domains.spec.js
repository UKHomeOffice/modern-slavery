/* eslint-env mocha */
const extensions = require('../../../ms-lists/ms_email_extensions.json')
const assert = require('assert') // core
const isValidDomain = require('is-valid-domain')
const checkDomain = require('../../../ms-lists/ms_email_domains')
const domainFunctions = require('../../../apps/nrm/util/domain-functions')

describe('module exports', function () {
  it('should export an array', function () {
    assert.ok(Array.isArray(checkDomain))
  })
  it('should export some functions too', function () {
    assert.ok(typeof domainFunctions.isOnDomainList === 'function')
  })
})
describe('importing JSON data files', function () {
  it('should import extensions', function () {
    assert.ok(Array.isArray(extensions))
  })
  it('should import domains', function () {
    assert.ok(Array.isArray(checkDomain))
  })
})

describe('check domain', function () {
  for (const domain of checkDomain) {
    it(`${domain} is a valid domain in the email domain list`, function () {
      assert.ok(domainFunctions.isOnDomainList(domain), domain)
    })
  }
})

describe('check wrong domain', function () {
  const wrongDomains = ['.com', '.org.uk', '.co.uk']
  for (const domain of wrongDomains) {
    it(`${domain} is not a valid domain in the email domain list`, function () {
      assert.ok(domainFunctions.isOnDomainList(domain) === false)
    })
  }
})

describe('check extensions', function () {
  for (const i in extensions) {
    const ext = extensions[i]
    it(`${ext} is a valid extension from the extension list`, function () {
      assert.ok(domainFunctions.isOnExtensionsList(ext))
    })
  }
})

describe('check valid extensions', function () {
  const validExt = ['digital.gov.uk', 'x.gov.uk', 'x.police.uk', 'x.gov.scot', 'x.pnn.police.uk', 'x.gov.wales', 'a.b.c.police.uk']
  for (const i in validExt) {
    const ext = validExt[i]
    it(`${ext} is a valid extension`, function () {
      assert.ok(domainFunctions.isOnExtensionsList(ext))
    })
  }
})

describe('check wrong extensions', function () {
  const wrongExt = ['gov.uk', ' ', '.co.uk']
  for (const i in wrongExt) {
    const ext = wrongExt[i]
    it(`${ext} is not a valid extension in the extension list`, function () {
      assert.ok(domainFunctions.isOnExtensionsList(ext) === false)
    })
  }
})

describe('individual emails', function () {
  for (const domain of checkDomain) {
    it(`${domain} should be a valid domain`, function () {
      assert.ok(typeof domain === 'string' || domain instanceof String)
      assert.ok(isValidDomain(domain))
    })
  }
})
