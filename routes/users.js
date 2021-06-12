const express = require("express");
const router = express.Router();
const {
  register,
  login,
  list,
  search,
  create,
  edit
} = require("../controllers/userControllers");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/register", register);

router.post("/register", create);

router.get("/login", login);

router.get("/list", list);

router.get("/search", search);

router.get("/edit/:idUser", edit);

router.put("/edit/:id", (req, res) => {
  res.send("Fui por put!");
});

router.delete("/delete/:idUser", (req, res) => {
  res.send("Fui por delete!");
});

module.exports = router;
