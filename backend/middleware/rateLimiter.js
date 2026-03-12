const rateLimit = require("express-rate-limit");
const appConfig = require("../config/appConfig");
const timeToMs = require("../utils/timeToMs");

const shortenRateLimiter = rateLimit({
  windowMs: timeToMs(appConfig.RATE_LIMIT.WINDOW,appConfig.RATE_LIMIT.UNIT), //Window time in milliseconds.
  max: appConfig.RATE_LIMIT.MAX_REQUESTS, // limit each IP to max allowed requests per window.
  message: {
    error: "Too many requests, please try again later."
  },
  standardHeaders: true,
  legacyHeaders: false
});

module.exports = {
  shortenRateLimiter
};