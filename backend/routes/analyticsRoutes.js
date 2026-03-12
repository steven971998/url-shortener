const express = require("express");
const router = express.Router();

const analyticsController = require("../controllers/analyticsController");


/**
 * @swagger
 * /api/url/analytics/{code}:
 *   get:
 *     summary: Get analytics for a shortened URL
 *     tags: [Analytics]
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         schema:
 *           type: string
 *         example: abc123
 *     responses:
 *       200:
 *         description: Analytics data
 */
router.get("/api/url/analytics/:code", analyticsController.getAnalytics);

module.exports = router;