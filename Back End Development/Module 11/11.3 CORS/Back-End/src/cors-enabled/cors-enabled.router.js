const router = require("express").Router();
const controller = require("./cors-enabled.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router
  .route("/:corsId")
  .get(controller.read)
  .put(controller.update)
  .delete(controller.delete)
  .all(methodNotAllowed);

router
  .route("/")
  .get(controller.list)
  .post(controller.create)
  .all(methodNotAllowed);

module.exports = router;
