const express = require("express");
const app = express();

const users = require("./data/users-data");
const states = require("./data/states-data");

// TODO: return a single user by id from /users/:userId in form of { data: Object }
app.use("/users/:userId", (req, res, next) => {
  const USER_ID = req.params.userId;

  const foundID = users.find((user) => user.id === Number(USER_ID));

  if (foundID) {
    res.json({ data: foundID });
  } else {
    next(`User ID not found: ${USER_ID}`);
  }
});

// TODO: return an array of users from /users in form of { data: Array }
app.use("/users", (req, res) => {
  res.json({ data: users });
});

// TODO: Return a single state from /states/:stateCode in the form of { data: { stateCode: String, name: String } }
app.use("/states/:stateCode", (req, res, next) => {
  const STATE_CODE = req.params.stateCode;

  if (STATE_CODE in states) {
    res.json({
      data: { stateCode: String(STATE_CODE), name: String(states[STATE_CODE]) }, //Dot notation doesn't work but brackets does???
    });
  } else {
    next(`State code not found: ${STATE_CODE}`);
  }
});

// TODO: return all states from /states in the form of { data: Array }
app.use("/states", (req, res) => {
  res.json({ data: states });
});

// TODO: add not-found handler
app.use((req, res, next) => {
  next(`Not found: ${req.originalUrl}`);
});

// TODO: Add error handler
app.use((err, req, res, next) => {
  res.send(err);
});

module.exports = app;
