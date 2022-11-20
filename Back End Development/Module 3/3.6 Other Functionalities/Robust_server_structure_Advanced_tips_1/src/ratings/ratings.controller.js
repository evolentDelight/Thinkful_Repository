const ratings = require("../data/ratings-data");

function list(req, res, next) {
  res.json({ data: ratings });
}

module.exports = {
  list,
};
