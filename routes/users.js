const express = require("express");
const router = express.Router();
const {
  register,
  login,
  list,
  search,
  create,
  edit,
  processLogin
} = require("../controllers/userControllers");
let path = require("path");

const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "tmp/my-uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});

var upload = multer({ storage: storage });

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/register", register);

router.post("/register", upload.any(), create);

router.get("/login", login);
router.post("/login", processLogin);

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
