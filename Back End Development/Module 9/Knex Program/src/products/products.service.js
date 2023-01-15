const knex = require("../db/connection");

function list() {
  return knexInstance("products").select("*");
}

module.exports = {
  list,
};
