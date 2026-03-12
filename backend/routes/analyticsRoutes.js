const express = require("express");
const router = express.Router();

const analyticsController = require("../controllers/analyticsController");

router.get("/api/url/analytics/:code", analyticsController.getAnalytics);

module.exports = router;