const productsService = require("./products.service");

//validation middleware
async function productExists(req, res, next) {
  const product = await productsService.read(req.params.productId);

  if (product) {
    res.locals.product = product;
    return next();
  }
  next({ status: 400, message: `Product cannot be found.` });
}

//CRUD
function read(req, res, next) {
  const { product: data } = res.locals;
  res.json({ data });
}

async function list(req, res, next) {
  const data = await productsService.list();
  res.json({ data });
}

module.exports = {
  read: [productExists, read],
  list: [list],
};
