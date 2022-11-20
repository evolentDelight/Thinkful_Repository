const router = require("express").Router();
const controller = require("./urls.controller");

const methodNotAllowed = require("../errors/methodNotAllowed");

router
  .route("/")
  .get(controller.list)
  .post(controller.create)
  .all(methodNotAllowed);

router.route("/:urlId").all(methodNotAllowed);

module.exports = router;
