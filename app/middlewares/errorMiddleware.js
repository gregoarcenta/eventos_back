exports.notFound = (req, res, next) => {
  const error = new Error(
    `No se pudo encontrar la ruta especificada: ${req.originalUrl}`
  );
  res.status(404);
  next(error);
};
exports.errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  const objError = {
    status: statusCode,
    message: error.message,
    stack: process.env.NODE_ENV === "production" ? ":'(" : error.stack
  };

  if (error.emailGoogle) objError.emailGoogle = error.emailGoogle;

  res.status(statusCode).json(objError);
};
