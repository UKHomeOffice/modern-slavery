const encodeEmail = email => Buffer.from(email).toString('hex');

module.exports = {
  encodeEmail
};
