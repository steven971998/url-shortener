const express = require("express")

// const urlRoutes = require("./routes/urlRoutes")
// const analyticsRoutes = require("./routes/analyticsRoutes")

const app = express()

/* Body parser */
app.use(express.json())

/* Health check route */
app.get("/", (req, res) => {
    res.send("URL Shortener API running")
})

/* Routes */
// app.use("/api/url", urlRoutes)
// app.use("/api/analytics", analyticsRoutes)

/* 404 Handler */
app.use((req, res, next) => {
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