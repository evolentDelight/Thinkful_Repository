const uses = require("../data/uses-data");

function useExists(req, res, next) {
  const { useId } = req.params;

  const foundUse = uses.find((use) => use.id === Number(useId));

  if (foundUse) {
    res.locals.use = foundUse;
    return next();
  }
  next({
    status: 404,
    message: `User id not found: ${useId}`,
  });
}

function list(req, res, next) {
  const urlId = req.params.urlId;

  const foundURLs = uses.filter(
    urlId ? (use) => use.urlId === Number(urlId) : () => true
  );

  res.json({ data: foundURLs });
}

function read(req, res, next) {
  res.json({ data: res.locals.use });
}

function destroy(req, res, next) {
  const { useId } = req.params;

  const index = uses.findIndex((use) => use.id === Number(useId));

  const deletedUses = uses.splice(index, 1);

  res.sendStatus(204);
}

module.exports = {
  list,
  read: [useExists, read],
  delete: [useExists, destroy],
};
