const express = require("express");
const app = express();

app.use(express.json());

const notes = require("./data/notes-data");

app.get("/notes/:noteId", (req, res, next) => {
  const noteId = Number(req.params.noteId);
  const foundNote = notes.find((note) => note.id === noteId);
  if (foundNote) {
    res.json({ data: foundNote });
  } else {
    next(`Note id not found: ${noteId}`);
  }
});

app.get("/notes", (req, res) => {
  res.json({ data: notes });
});

// TODO: Add ability to create a new note
let lastNoteId = notes.reduce((maxId, notes) => Math.max(maxId, notes.id), 0);

app.post("/notes", (req, res, next) => {
  if (req.body === undefined) {
    console.log(
      "🚀 ~ file: app.js ~ line 26 ~ app.post ~ req.body === undefined",
      req.body === undefined
    );
    res.sendStatus(400);
  } else {
    console.log("req.body is defined: ", req.body !== undefined);
  }

  const { data: { id, text } = {} } = req.body;

  if (text) {
    const newNote = {
      id: ++lastNoteId,
      text,
    };
    notes.push(newNote);

    res.status(201).json({ data: newNote });
  } else {
    res.sendStatus(400);
  }
});

// TODO: Add not-found handler
app.use((req, res, next) => {
  next(`Not found: ${req.originalUrl}`);
});

// TODO: Add error handler
app.use((err, req, res, next) => {
  //console.log("🚀 ~ file: app.js ~ line 46 ~ app.use ~ err", err);

  res.status(400).send(err);
});

module.exports = app;
