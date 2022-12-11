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
  const { data: { name, cost } = {} } = req.body;

  const newProduct = new Product({
    name: name,
    cost: cost,
  });

  await newProduct.save();

  res.status(201).json({ data: newProduct });
}

module.exports = {
  list,
  create: [bodyDataHas("name"), bodyDataHas("cost"), create],
};
