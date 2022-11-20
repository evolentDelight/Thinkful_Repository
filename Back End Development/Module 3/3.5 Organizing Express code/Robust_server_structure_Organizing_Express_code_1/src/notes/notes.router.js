const router = require("express").Router();
const controller = require("notes.controller.js");

router.get(controller.list).read(controller.read);

module.exports = router;
