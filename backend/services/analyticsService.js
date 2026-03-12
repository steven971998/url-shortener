const Url = require("../models/Url");

exports.getAnalytics = async (shortCode) => {

  const url = await Url.findOne({ shortCode });

  if (!url) {
    return null;
  }

  return {
    originalUrl: url.originalUrl,
    shortCode: url.shortCode,
    clicks: url.clicks,
    createdAt: url.createdAt,
    expiresAt: url.expiresAt
  };
};