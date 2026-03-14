const express = require("express")
const router = express.Router()
const { shortenRateLimiter } = require("../middleware/rateLimiter"); //For rate limiting.
const urlController = require("../controllers/urlController")

/**
 * @swagger
 * /api/url/shorten:
 *   post:
 *     summary: Create a shortened URL
 *     tags: [URL]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               originalUrl:
 *                 type: string
 *                 example: https://google.com
 *               alias:
 *                 type: string
 *                 example: mygoogle
 *               expiresInDays:
 *                 type: number
 *                 example: 5
 *     responses:
 *       200:
 *         description: Short URL created
 */
router.post("/api/url/shorten",shortenRateLimiter, urlController.createShortUrl) 


/**
 * @swagger
 * /{code}:
 *   get:
 *     summary: Redirect to original URL
 *     tags: [URL]
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         schema:
 *           type: string
 *         example: abc123
 *     responses:
 *       302:
 *         description: Redirects to original URL
 */
router.get("/:code", urlController.redirectUrl)

router.delete('/api/admin/deleteUrl/:code',urlController.deleteUrl) //Delete specific url.
router.delete('/api/admin/deleteAllUrls',urlController.deleteAllUrls)
module.exports = router