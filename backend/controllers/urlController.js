const urlService = require("../services/urlService");
const logger = require("../config/logger");

//To shorten the URL :
exports.createShortUrl = async (req, res) => {
  try {
    const { originalUrl, alias, expiresInDays } = req.body;

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
      return res
        .status(400)
        .json({
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
    logger.info(`Redirected to originalUrl : ${originalUrl}`)
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
