exports.response = (res, data, message, statusCode = null) => {
  const status = statusCode ? statusCode : res.statusCode;
  res.status(status).json({
    status,
    message,
    data,
  });
};
