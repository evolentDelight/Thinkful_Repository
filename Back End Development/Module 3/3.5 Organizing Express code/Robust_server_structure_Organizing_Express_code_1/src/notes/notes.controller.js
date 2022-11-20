const notes = require("../data/notes-data");

//List Handler
function list(req, res) {
  res.json({ data: notes });
}

//Read Handler w/ Params
function noteExists(req, res, next) {
  const noteId = Number(req.params.noteId);
  const foundNote = notes.find((note) => note.id === noteId);
  if (foundNote) {
    return next();
  } else {
    return next({
      status: 404,
      message: `Note id not found: ${req.params.noteId}`,
    });
  }
}

function read(req, res, next) {
  const noteId = Number(req.params.noteId);
  const foundNote = notes.find((note) => note.id === noteId);
  res.json({ data: foundNote });
}

//Create Handler
function hasText(req, res, next) {
  const { data: { text } = {} } = req.body;
  if (text) {
    return next();
  }
  return next({ status: 400, message: "A 'text' property is required." });
}

function create(req, res, next) {
  const { data: { text } = {} } = req.body;

  const newNote = {
    id: notes.length + 1, // Assign the next ID
    text,
  };
  notes.push(newNote);
  res.status(201).json({ data: newNote });
}

//Update Handler
function update(req, res, next) {}

//Delete Handler
function destroy(req, res, next) {}

module.exports = {
  list,
  read: [noteExists, read],
  create: [hasText, create],
  update: [noteExists, update],
  delete: [noteExists, destroy],
};
