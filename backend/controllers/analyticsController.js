
const analyticsService = require('../services/analyticsService')
const logger = require('../config/logger')

//To get the analytics data of a shortened url.
exports.getAnalytics = async (req, res) => {
  try {

    const { code } = req.params;

    const analytics = await analyticsService.getAnalytics(code);

    if (!analytics) {
      return res.status(404).json({ message: "URL not found" });
    }
    
    return res.json(analytics);

  } catch (error) {

    logger.error(error?.message);
    return res.status(500).json({ error: "Internal Server Error" });

  }
};