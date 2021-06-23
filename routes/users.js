const express = require("express");
const router = express.Router();
let { check, validationResult, body } = require("express-validator");
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
let fs = require("fs");
const multer = require("multer");
const logDBMiddleare = require("../middlewares/logDBMiddleware");

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

router.post(
  "/register",
  logDBMiddleare,
  upload.any(),
  [
    body("email")
      .custom(function (value) {
        let archivoUsuarios = fs.readFileSync("usuarios.json", {
          encoding: "utf-8"
        });
        let users = JSON.parse(archivoUsuarios);

        for (let i = 0; i < users.length; i++) {
          if (users[i].email == value) {
            return false;
          }
        }

        return true;
      })
      .withMessage("usuario en la base de datos"),
    check("name")
      .isLength({ min: 1 })
      .withMessage("Este campo debe estar completo"),
    check("edad")
      .isInt({ min: 1 })
      .withMessage("Al menos un año debe tener el usuario"),
    check("email").isEmail().withMessage("DEBE SER UN MAIL VALIDO"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("lA CONTRASEÑA DEBE TENER AL MENOS 6 CARACTERS")
  ],
  create
);

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
