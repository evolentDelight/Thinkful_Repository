const knex = require("../db/connection");

//CRUD
function list() {
  return knex("products").select("*");
}

function read(productId) {
  return knex("products").select("*").where({ product_id: productId }).first();
}

//Others
function listOutOfStockCount() {
  return knex("products")
    .select("product_quantity_in_stock as out_of_stock")
    .count("product_id")
    .where({ product_quantity_in_stock: 0 })
    .groupBy("out_of_stock");
}

module.exports = {
  list,
  read,
  listOutOfStockCount,
};
