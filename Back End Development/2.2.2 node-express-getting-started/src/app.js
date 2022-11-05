const express = require("express");
const morgan = require("morgan");

const app = express();

const sayHello = (req, res, next) => {
  res.send("Hello!");
};

app.use(morgan("dev"));
app.use(sayHello);

module.exports = app;
