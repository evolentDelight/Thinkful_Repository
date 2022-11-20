function methodNotAllowed(req, res, next) {
  next({
    status: 405,
    message: `${req.method} Method not allowed on ${req.originalURL}`,
  });
}

module.exports = methodNotAllowed;
