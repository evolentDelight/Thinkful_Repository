const pastes = require("../data/pastes-data");

function list(req, res) {
  res.json({ data: pastes });
}

let lastPasteId = pastes.reduce((maxId, paste) => Math.max(maxId, paste.id), 0);

function bodyDataHas(propertyName) {
  return function (req, res, next) {
    const { data = {} } = req.body;
    if (data[propertyName]) {
      return next();
    }
  };
}

function create(req, res) {
  const { data: { name, syntax, exposure, expiration, text, user_id } = {} } =
    req.body;

  const newPaste = {
    id: ++lastPasteId, // Increment last id then assign as the current ID
    name,
    syntax,
    exposure,
    expiration,
    text,
    user_id,
  };

  pastes.push(newPaste);

  res.status(201).json({ data: newPaste });
}

module.exports = {
  create: [
    bodyDataHas("name"),
    bodyDataHas("syntax"),
    bodyDataHas("exposure"),
    bodyDataHas("expiration"),
    bodyDataHas("text"),
    bodyDataHas("user_id"),
    create,
  ],

  list,
};
