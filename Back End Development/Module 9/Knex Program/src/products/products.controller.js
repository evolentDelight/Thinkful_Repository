const productsService = require("./products.service");

//validation middleware
function productExists(req, res, next) {
  productsService.read(req.params.productId).then((product) => {
    if (product) {
      res.locals.product = product;
      return next();
    }
    next({ status: 400, message: `Product cannot be found.` });
  });
}

function read(req, res, next) {
  const { product: data } = res.locals;
  res.json({ data });
}

function list(req, res, next) {
  productsService
    .list()
    .then((data) => res.json({ data }))
    .catch(next);
}

module.exports = {
  read: [productExists, read],
  list: [list],
};
