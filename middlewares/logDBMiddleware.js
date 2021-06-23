const fs = require("fs")


function logDBMiddleare (req, res, next) {
fs.appendFileSync("logdb.txt", "Se creo un registro al ingresar en la página" + req.url + "\n")
next()
}

module.exports = logDBMiddleare