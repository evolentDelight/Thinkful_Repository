const router = require("express").Router();
const controller = require("./users.controller");
const methodNotAllowed = requre("../errors/methodNotAllowed.js");

router.route("/:userId").get(controller.read).all(methodNotAllowed);

router.route("/").get(controller.list).all(methodNotAllowed);

module.exports = router;
