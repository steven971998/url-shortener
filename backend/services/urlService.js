const Url = require("../models/Url");
const { redisClient } = require("../config/redis");
const generateShortCode = require("../utils/generateShortCode");
const appConfig = require("../config/appConfig");
const validateUrl = require("../utils/validateUrl");

//To create the short url and store the originalUrl and shortcode in mongoDB.
exports.createShortUrl = async (originalUrl, alias, expiresInDays) => {
  //If the original url doesn't start with http or https then add https.
  if (
    !originalUrl.startsWith("http://") &&
    !originalUrl.startsWith("https://")
  ) {
    originalUrl = "https://" + originalUrl;
  }

  // validate url
  const isValid = validateUrl(originalUrl);
  if (!isValid) {
    throw new Error("Invalid URL");
  }

  let shortCode;

  //If alias is passed :
  if (alias) {
    // check if alias already exists in DB.
    const existing = await Url.findOne({ shortCode: alias });

    //If alias already exists then throw error.
    if (existing) {
      throw new Error("Alias already taken");
    }

    shortCode = alias;
  } 
  //Generate shortCode without alias.
  else {

  let isUnique = false;

  //shortCode collision handling:

  //If the shortCode is not unique then keep on generating the shortCode until it creates a unique one.
  while (!isUnique) {

    shortCode = generateShortCode();

    const existing = await Url.findOne({ shortCode }); //Check whether the shortCode already exist.

    //If the shortCode is unique then use the generated shortCode.
    if (!existing) {
      isUnique = true;
    }

  }

}

  // expiry calculation
  let expiresAt = null;

  //Logic for expiration in Days.
  if (expiresInDays) {
    expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + expiresInDays);
  }

  //Logic for expiration in seconds for testing purpose.

  //  if (expiresInDays) {
  //   expiresAt = new Date(Date.now() + expiresInDays * 1000);
  // }

  //Store the originalUrl, shortCode and expiresAt in mongoDB.
  const newUrl = await Url.create({
    originalUrl,
    shortCode,
    expiresAt,
  });

  return newUrl;
};

exports.getOriginalUrl = async (shortCode) => {
  // check redis cache
  const cachedData = await redisClient.get(shortCode); //Fetch the original url data from redis if available.

  //If original url exists in redis then return it without checking DB.
  if (cachedData) {
    const parsed = JSON.parse(cachedData);

    // check expiry even in cache
    if (parsed.expiresAt && new Date(parsed.expiresAt) < new Date()) {
      throw new Error("Link expired");
    }

    // increment clicks in DB
    await Url.updateOne({ shortCode }, { $inc: { clicks: 1 } });

    return parsed.originalUrl;
  }

  // fetch from DB if url doesn't exist in redis.
  const url = await Url.findOne({ shortCode });

  if (!url) return null;

  // check url's expiry.
  if (url.expiresAt && url.expiresAt < new Date()) {
    throw new Error("Link expired");
  }

 // increment clicks
  await Url.updateOne(
    { shortCode },
    { $inc: { clicks: 1 } }
  );


  // cache the url in redis which we obtained from DB.

  let ttl = appConfig.REDIS_CACHE_TTL; //Default expiry time in Redis when user has not mentioned the expiry time.

  if (url.expiresAt) {
    ttl = Math.floor((new Date(url.expiresAt) - new Date()) / 1000);
  }

  await redisClient.set(
    shortCode,
    JSON.stringify({
      originalUrl: url.originalUrl,
      expiresAt: url.expiresAt,
    }),
    { EX: ttl },
  );

  return url.originalUrl;
};
