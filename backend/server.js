require("dotenv").config()
const app = require("./app")
const PORT = process.env.PORT || 5000

const connectDB = require("./config/db")
const { connectRedis } = require("./config/redis")

let server

const startServer = async () => {
  try {
    await connectDB()
    await connectRedis()

    // server = app.listen(PORT, () => {
    server = app.listen(PORT,"0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`)
    })

    /* Server startup errors */
    server.on("error", (err) => {
      console.error("Server failed to start")

      if (err.code === "EADDRINUSE") {
        console.error(`Port ${PORT} is already in use`)
      } else {
        console.error(err)
      }

      process.exit(1)
    })

  } catch (error) {
    console.error("Server failed to start:", error)
    process.exit(1)
  }
}

startServer()

/* Uncaught Exception */
process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION:", err.message)
  process.exit(1)
})

/* Unhandled Promise Rejection */
process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED REJECTION:", err.message)

  if (server) {
    server.close(() => {
      process.exit(1)
    })
  } else {
    process.exit(1)
  }
})