const express = require("express");
const router = express.Router();
const { register, login, list } = require("../controllers/userControllers");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/register", register);

router.get("/login", login);

router.get("/list", list);

module.exports = router;
