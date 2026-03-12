const appConfig = {
  REDIS_CACHE_TTL: 3600, // 3600 seconds (1 hour),
  RATE_LIMIT: {
    MAX_REQUESTS: 100, //Max requests allowed in the window.
    WINDOW: 15, //Time window.
    UNIT: "minutes" // seconds | minutes | hours | days,
  },
  SWAGGER: {
    OPENAPI : "3.0.0",
    TITLE : "URL Shortener API",
    VERSION : "1.0.0",
    DESCRIPTION : "API documentation for the URL Shortener service",
    URL : "http://localhost:5000"

  }

};

module.exports = appConfig;
