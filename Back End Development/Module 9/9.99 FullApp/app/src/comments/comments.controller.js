const service = require("./comments.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function commentExists(req, res, next) {
  const { commentId } = req.params;
  const comment = await service.read(commentId);
  if (comment) {
    res.locals.comment = comment;
    return next();
  }
  return next({ status: 404, message: `Comment cannot be found.` });
}

async function list(req, res, next) {
  res.json({ data: await service.list() });
}

async function listCommenterCount(req, res, next) {
  const response = await service.listCommenterCount();

  const data = [];

  for (let i = 0; i < response.length; i++) {
    data[i] = {
      commenter_email: response[i].commenter_email,
      count: Number(response[i].count),
    };
  }

  res.json({ data });
}

async function read(req, res, next) {
  const knexInstance = req.app.get("db");
  const { comment } = res.locals;
  res.json({ data: comment });
}

module.exports = {
  list: asyncErrorBoundary(list),
  listCommenterCount: asyncErrorBoundary(listCommenterCount),
  read: [asyncErrorBoundary(commentExists), read],
};
