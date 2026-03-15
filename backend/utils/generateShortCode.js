const { nanoid } = require("nanoid")
const appConfig = require('../config/appConfig');

//To generate the unique shortCode.
function generateShortCode(length = appConfig.SHORT_CODE_LENGTH) {
  return nanoid(length)
}

module.exports = generateShortCode;