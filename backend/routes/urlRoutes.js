const express = require("express")
const router = express.Router()
const { shortenRateLimiter } = require("../middleware/rateLimiter"); //For rate limiting.
const urlController = require("../controllers/urlController")

router.post("/api/url/shorten",shortenRateLimiter, urlController.createShortUrl) 

router.get("/:code", urlController.redirectUrl)

module.exports = router