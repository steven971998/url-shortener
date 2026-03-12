const appConfig = {
  REDIS_CACHE_TTL: 3600, // 3600 seconds (1 hour),
  RATE_LIMIT: {
    MAX_REQUESTS: 100, //Max requests allowed in the window.
    WINDOW: 15, //Time window.
    UNIT: "minutes" // seconds | minutes | hours | days,
  },
};

module.exports = appConfig;
