const Product = require("./product.model");

async function list(req, res) {
  // TODO: Write your code here
  const products = await Product.find();
  res.send(products);
}

function bodyDataHas(propertyName) {
  return function (req, res, next) {
    const { data = {} } = req.body;
    if (data[propertyName]) {
      return next();
    }
    next({
      status: 400,
      message: `Must include a ${propertyName}`,
    });
  };
}

async function create(req, res) {
  //TODO: Write your code here
}

module.exports = {
  list,
  create: [bodyDataHas("name"), bodyDataHas("cost"), create],
};
