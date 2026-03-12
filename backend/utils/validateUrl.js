function validateUrl(url) {
  try {
    const parsed = new URL(url);

    // allow only http or https
    if (!["http:", "https:"].includes(parsed.protocol)) {
      return false;
    }

    const hostname = parsed.hostname;

    // must contain a dot (example: google.com)
    if (!hostname.includes(".")) {
      return false;
    }

    return true;

  } catch (error) {
    return false;
  }
}

module.exports = validateUrl;