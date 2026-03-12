const swaggerJsdoc = require("swagger-jsdoc");
const appConfig = require('../config/appConfig')

const options = {
  definition: {
    openapi: appConfig.SWAGGER.OPENAPI,
    info: {
      title: appConfig.SWAGGER.TITLE,
      version: appConfig.SWAGGER.VERSION,
      description: appConfig.SWAGGER.DESCRIPTION
    },
    servers: [
      {
        url: appConfig.SWAGGER.URL
      }
    ]
  },

  apis: ["./routes/*.js"] // files where swagger comments exist
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;