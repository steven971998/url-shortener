const { nanoid } = require("nanoid")

function generateShortCode(length = 6) {
  return nanoid(length)
}

// function generateShortCode(length = 6) {
//   return crypto.randomBytes(length).toString("base64").slice(0, length);
// }

module.exports = generateShortCode;