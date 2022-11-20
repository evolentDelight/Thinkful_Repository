const ratings = require("../data/ratings-data");

function list(req, res, next) {
  const { noteId } = req.params;
  res.json({
    data: ratings.filter(
      noteId ? (rating) => rating.noteId == noteId : () => true
    ),
  });
}

function ratingExists(req, res, next) {
  const { ratingId } = req.params;
  console.log("ratingId: ", ratingId, "req.params: ", req.params);
  const foundRating = ratings.find((rating) => rating.id === Number(ratingId));
  if (foundRating) {
    res.locals.rating = foundRating;
    return next();
  }
  next({
    status: 404,
    message: `Rating not found: ${ratingId}`,
  });
}

function read(req, res, next) {
  res.json({ data: res.locals.rating });
}

module.exports = {
  list,
  read: [ratingExists, read],
  ratingExists,
};
