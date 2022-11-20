function methodNotAllowed(req, res, next) {
  next({
    status: 405,
    message: `${req.method} is not allowed ${req.originalUrl}`,
  });
}

module.exports = methodNotAllowed;
