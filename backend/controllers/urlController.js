const urlService = require("../services/urlService");
const logger = require("../config/logger")
const appConfig = require('../config/appConfig')

//To shorten the URL :
exports.createShortUrl = async (req, res) => {
  try {
    const { originalUrl, alias, expiresInDays } = req.body;

    //Url length validation.
    if (originalUrl.length > appConfig.MAX_URL_LENGTH_ALLOWED) {
      logger.info(`status : ${400}, message : URL too long. Maximum length is ${appConfig.MAX_URL_LENGTH_ALLOWED} characters`)
  return res.status(400).json({
    message: `URL too long. Maximum length is ${appConfig.MAX_URL_LENGTH_ALLOWED} characters`
  })
}

    const url = await urlService.createShortUrl(
      originalUrl,
      alias,
      expiresInDays,
    );

    const shortUrl = `${req.protocol}://${req.get("host")}/${url.shortCode}`;
    // console.log(`shortUrl : ${shortUrl}`);
    logger.info(`Short URL ${shortUrl} created for ${originalUrl}`);
    return res.json({ shortUrl: shortUrl });
  } catch (error) {
    // console.log(`Error : ${error?.message}`);
    logger.error(error?.message);

    //If Alias already taken :
    if (error?.message == "Alias already taken") {
      return res.status(400).json({ error: error.message });
    }
    //If input URL is invalid.
    else if (error?.message === "Invalid URL") {
      return res.status(400).json({ error: "Invalid URL format" });
    }
    //If Alias format is invalid.
    else if (error?.message === "Invalid alias format") {
      return res.status(400).json({
        message: "Invalid alias format",
        error:
          "Alias must be 3–20 characters and contain only letters, numbers, - or _",
      });
    }

    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//Redirect to the original url.
exports.redirectUrl = async (req, res) => {
  try {
    const { code } = req.params;
    const originalUrl = await urlService.getOriginalUrl(code);

    if (!originalUrl) {
      return res.status(404).json({ message: "URL not found" });
    }
    logger.info(`Redirected to originalUrl : ${originalUrl}`);
    return res.redirect(originalUrl);
  } catch (error) {
    // console.log(`Error : ${error?.message}`);
    logger.error(error?.message);
    //If link is expired.
    if (error.message === "Link expired") {
      return res.status(410).json({ message: "This link has expired" });
    }

    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//To Delete all the data from MongoDB and Redis.

exports.deleteAllUrls = async (req, res) => {
  try {

    //Can't delete any data in production.
    if (
      process.env.NODE_ENV.toLowerCase() == "prod" ||
      process.env.NODE_ENV.toLowerCase() == "production"
    ) {
      return res.status(403).json({ message: "Not allowed" });
    }

  let deletedCount = await urlService.deleteAllUrls();

    return res.status(200).json({message: 'All URLs deleted successfully', deleteCount : deletedCount})

  } catch (error) {
    logger.error(error?.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//To Delete a specific URL.

exports.deleteUrl = async (req, res) => {
  try {
    const { shortCode } = req.params;

        //Can't delete any data in production.
    if (
      process.env.NODE_ENV.toLowerCase() == "prod" ||
      process.env.NODE_ENV.toLowerCase() == "production"
    ) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await urlService.deleteUrl(shortCode); 
    return res
      .status(200)
      .json({ message: "URL deleted successfully", shortCode: shortCode });
  } catch (error) {
    logger.error(error?.message);

    if (error.message === "URL not found") {
      return res.status(error.status).json({ message: error.message });
    }

    return res.status(500).json({ message: "Internal Server Error" });
  }
};
