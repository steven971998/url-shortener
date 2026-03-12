const urlService = require("../services/urlService");

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
    console.log(`shortUrl : ${shortUrl}`);
    return res.json({ shortUrl: shortUrl });
  } catch (error) {
    console.log(`Error : ${error?.message}`);

    //If Alias already taken :
    if (error?.message == "Alias already taken") {
      return res.status(400).json({ error: error.message });
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
    return res.redirect(originalUrl);
  } catch (error) {
    console.log(`Error : ${error?.message}`);

    //If link is expired.
    if (error.message === "Link expired") {
      return res.status(410).json({ message: "This link has expired" });
    }

    return res.status(500).json({ error: "Internal Server Error" });
  }
};
