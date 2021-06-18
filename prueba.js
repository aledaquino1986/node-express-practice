let fs = require("fs");
let bcrypt = require("bcrypt");

let contenido = fs.readFileSync("prueba.txt", { encoding: "utf-8" });

let password = "aleneme";

bcrypt.hash(password, 10, (err, hash) => {
  bcrypt.compare(password, hash, (err, isMatch) => {
    console.log(isMatch);
  });
});
