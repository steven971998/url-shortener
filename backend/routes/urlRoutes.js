const express = require("express")
const router = express.Router()

const urlController = require("../controllers/urlController")

router.post("/api/url/shorten", urlController.createShortUrl) 

router.get("/:code", urlController.redirectUrl)

module.exports = router