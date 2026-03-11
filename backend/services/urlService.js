const Url = require("../models/Url");
const {redisClient} = require("../config/redis");
const generateShortCode = require("../utils/generateShortCode");

exports.createShortUrl = async (originalUrl) => {

  //If the original url doesn't start with http or https then add https.
   if (!originalUrl.startsWith("http://") && !originalUrl.startsWith("https://")) {
    originalUrl = "https://" + originalUrl;
  }

  const shortCode = generateShortCode();

  const newUrl = await Url.create({
    originalUrl,
    shortCode
  });

  return newUrl;
};

exports.getOriginalUrl = async (shortCode) => {

  // check redis cache
  const cachedUrl = await redisClient.get(shortCode); //Fetch the original url from redis if available.

  //If original url exists in redis then return it without checking DB.
  if (cachedUrl) {
    return cachedUrl;
  }

  // fetch from DB if url doesn't exist in redis.
  const url = await Url.findOne({ shortCode });

  if (!url) return null;

  // cache the url in redis which we obtained from DB.
  await redisClient.set(shortCode, url.originalUrl, "EX", 3600);

  return url.originalUrl;
};