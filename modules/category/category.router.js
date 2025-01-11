var express = require("express");
var router = express.Router();
var CATEGORYCONTROLLER = require("./category.controller");
var ADMINSEQURE = require("../admin/admin.middleware");

router.post("/create", ADMINSEQURE.Sequre, CATEGORYCONTROLLER.categoryCreate);
router.get("/", CATEGORYCONTROLLER.categoryFind);
router.get("/count", ADMINSEQURE.Sequre, CATEGORYCONTROLLER.categoryCount);
router.delete("/:id", ADMINSEQURE.Sequre, CATEGORYCONTROLLER.categoryDelete);
router.patch("/:id", ADMINSEQURE.Sequre, CATEGORYCONTROLLER.categoryUpdate);

module.exports = router;
