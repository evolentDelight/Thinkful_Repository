const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(morgan("dev"));

const checkForAbbreviationLength = (req, res, next) => {
  const abbreviation = req.params.abbreviation;
  if (abbreviation.length !== 2) {
    next(`State abbreviation "${abbreviation}" is invalid`);
  } else {
    next();
  }
};

app.get(
  "/states/:abbreviation",
  checkForAbbreviationLength, //The next in the router-level middleware calls the next callback listener
  (req, res, next) => {
    res.send(`${req.params.abbreviation} is a nice state.`);
  }
);

app.get(
  "/travel/:abbreviation",
  checkForAbbreviationLength,
  (req, res, next) => {
    res.send(`Have fun at ${req.params.abbreviation}!`);
  }
);

const sayHello = (req, res, next) => {
  console.log(req.query);

  const name = req.query.name;

  const content = name ? `Hello, ${name}!` : "Hello!";
  res.send(content);
};

const saySomething = (req, res) => {
  const greeting = req.params.greeting;
  const name = req.query.name;
  const content = greeting && name ? `${greeting}, ${name}!` : `${greeting}`;
  res.send(content);
};

app.get("/hello", sayHello);
app.get("/say/:greeting", saySomething);

app.get("/songs", (req, res) => {
  const title = req.query.title;
  res.send(title);
});

app.use((req, res, next) => {
  //Error handling by placing this function last
  res.send(`The route ${req.path} does not exist!`);
});

app.use((err, req, res, next) => {
  //Express middleware error handling by having FOUR parameters. must be four
  //Other than triggered by order, it can also be called using next() but there must be parameters in next().
  console.error(err);
  res.send(err);
});

module.exports = app;
