exports.validateDomains = (req, res, next) => {
  let whiteListDomain = process.env.ENABLED_DOMAINS.split(",");
  try {
    console.log("referer -> ", req.headers.referrer || req.headers.referer);
    if (!req.headers.referer) {
      res.status(403);
      throw new Error("Not authorized");
    }

    if (
      !whiteListDomain.some(
        (domain) => req.headers.referer.indexOf(domain) !== -1
      )
    ) {
      res.status(403);
      throw new Error("Not authorized");
    }

    next();
  } catch (error) {
    next(error);
  }
};