/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const suppliers = require("../fixtures/suppliers");

exports.seed = function (knex) {
  return knex
    .raw("TRUNCATE TABLE suppliers RESTART IDENTITY CASCADE")
    .then(function () {
      return knex("suppliers").insert(suppliers);
    });
};

// exports.seed = async function(knex) {
//   // Deletes ALL existing entries
//   await knex('table_name').del()
//   await knex('table_name').insert([
//     {id: 1, colName: 'rowValue1'},
//     {id: 2, colName: 'rowValue2'},
//     {id: 3, colName: 'rowValue3'}
//   ]);
// };
