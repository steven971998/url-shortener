const express = require("express")
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const morgan = require("morgan");
const logger = require("./config/logger");
const cors = require('cors');
const app = express()

/* Body parser */
app.use(express.json())
app.use(cors())

/* Send HTTP logs to Winston. */
app.use(
  morgan("dev", {
    stream: {
      write: (message) => logger.info(message.trim())
    }
  })
);


const urlRoutes = require("./routes/urlRoutes")
const analyticsRoutes = require("./routes/analyticsRoutes");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


/* Health check route */
app.get("/", (req, res) => {
    res.send("URL Shortener API running")
})

/* Routes */
app.use(urlRoutes)
app.use(analyticsRoutes)


/* 404 Handler */
app.use((req, res, next) => {
    console.log('Route not found')
    res.status(404).json({
        success: false,
        message: "Route not found"
    })
})

/* Global Error Handler */
app.use((err, req, res, next) => {
    console.error(err)

    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal Server Error"
    })
})

module.exports = app