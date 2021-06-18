let fs = require("fs");
let bcrypt = require("bcrypt");

let archivoUsuarios = fs.readFileSync("usuarios.json", {
  encoding: "utf-8"
});

const userControllers = {
  register: (req, res) => {
    res.render("register");
  },

  login: (req, res) => {
    res.render("login");
  },

  list: (req, res) => {
    let users = JSON.parse(archivoUsuarios);

    res.render("list", {
      users: users
    });
  },

  search: (req, res) => {
    let loQueBuscoElUsuario = req.query.search.toLowerCase();
    let users = JSON.parse(archivoUsuarios);
    let usersResults = [];

    const userResults = users.filter(user =>
      user.name.toLowerCase().includes(loQueBuscoElUsuario)
    );

    res.render("userResults", {
      users: userResults
    });
  },

  create: (req, res, next) => {
    let { name, edad, email, password } = req.body;
    let { filename } = req.files[0];
    console.log(filename);

    bcrypt.hash(password, 10, (err, hashedPassword) => {
      let usuario = {
        name,
        edad,
        email,
        hashedPassword,
        avatar: filename
      };

      //Guardarla

      //Leer que cosas ya había.

      let usuarios;

      if (archivoUsuarios === "") {
        usuarios = [];
      } else {
        usuarios = JSON.parse(archivoUsuarios);
      }

      usuarios.push(usuario);

      let usuariosJSON = JSON.stringify(usuarios);
      fs.writeFile("usuarios.json", usuariosJSON, err => {
        if (err) {
          console.log(err);
        } else {
          res.redirect("/users/list");
        }
      });
    });
  },

  edit: (req, res) => {
    let idUser = req.params.idUser;
    let users = JSON.parse(archivoUsuarios);

    let userToEdit = users[idUser];
    res.render("userEdit", {
      userToEdit: userToEdit
    });
  },

  processLogin: (req, res) => {
    const { email, password } = req.body;

    let usuarios = JSON.parse(archivoUsuarios);

    const usuario = usuarios.find(usuario => {
      if (usuario.email === email) {
        bcrypt.compare(password, usuario.hashedPassword, (err, isMatch) => {
          isMatch
            ? res.send("Estas logueado!")
            : res.send("Password y contraseña no coinciden");
        });
      } else {
        res.send("No esta registrado el mail");
      }
    });
  }
};

module.exports = userControllers;
