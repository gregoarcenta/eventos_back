exports.validateDomains = (req, res, next) => {
  let domains = process.env.ENABLED_DOMAINS.split(",");
  try {
    console.log("referer -> ", req.headers.referer);
    console.log("referrer -> ", req.headers.referrer);

    const url = req.headers.referer || req.headers.referrer
    const authorized = domains.some((domain) => url === domain)
    
    if (!req.headers.referer || !authorized) {
      res.status(403);
      throw new Error("Not authorized");
    }

    next();
  } catch (error) {
    next(error);
  }
};
