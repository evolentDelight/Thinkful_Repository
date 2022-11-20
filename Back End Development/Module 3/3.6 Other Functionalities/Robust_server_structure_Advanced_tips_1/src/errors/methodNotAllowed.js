function methodNotAllowed(req, res, next) {
  next({
    status: 405,
    message: `Method is not allowed ${req.originalUrl}`,
  });
}

module.exports = methodNotAllowed;
