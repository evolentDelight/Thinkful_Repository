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

//Update Handler

//Delete Handler

module.exports = { list, read: [noteExists, read] };
