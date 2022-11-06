const express = require("express");

const app = express();

const validateZip = require("./middleware/validateZip");
const getZoos = require("./utils/getZoos");

app.get("/zoos/all", (req, res, next) => {
  if (req.query.admin === "true") {
    res.send(`All zoos: ${getZoos().join("; ")}`);
  } else {
    next("You do not have access to that route.");
  }
});

app.get("/check/:zip", validateZip, (req, res, next) => {
  const zip = req.params.zip;

  if (getZoos(zip)) {
    res.send(`${zip} exists in our records.`);
  } else {
    res.send(`${zip} does not exist in our records.`);
  }
});

app.get("/zoos/:zip", validateZip, (req, res, next) => {
  const zip = req.params.zip;
  const zoos = getZoos(zip);

  if (zoos.length) {
    res.send(`${zip} zoos: ${zoos.join("; ")}`);
  } else {
    res.send(`${zip} has no zoos.`);
  }
});

app.use((req, res, next) => {
  //Catch-all Error handler
  res.send("That route could not be found!");
});

app.use((err, req, res, next) => {
  res.send(err);
});

module.exports = app;
