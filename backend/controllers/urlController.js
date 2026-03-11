const urlService = require("../services/urlService");

//To shorten the URL :
exports.createShortUrl = async (req, res) => {
  try {
    const { originalUrl } = req.body;
    const url = await urlService.createShortUrl(originalUrl);
    const shortUrl = `${req.protocol}://${req.get("host")}/${url.shortCode}`;
    console.log(`shortUrl : ${shortUrl}`)
    return res.json({shortUrl: shortUrl});
  } catch (error) {
    console.log(`Error : ${error?.message}`)
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
    console.log(`Error : ${error?.message}`)
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
