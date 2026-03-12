const express = require("express")

const app = express()

/* Body parser */
app.use(express.json())

const urlRoutes = require("./routes/urlRoutes")
const analyticsRoutes = require("./routes/analyticsRoutes");

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