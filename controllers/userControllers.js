const userControllers = {
  register: (req, res) => {
    res.render("register");
  },

  login: (req, res) => {
    res.render("login");
  },

  list: (req, res) => {
    let users = ["Dario", "Javier", "Mary", "Ale", "beto", "japeño"];

    res.render("list", {
      users: users
    });
  },

  search: (req, res) => {
    let loQueBuscoElUsuario = req.query.search.toLowerCase();
    let users = ["Dario", "Javier", "Mary", "Ale", "beto", "japeño"];

    let usersResults = [];

    const userResults = users.filter(user =>
      user.toLowerCase().includes(loQueBuscoElUsuario)
    );
    res.render("userResults", {
      users: userResults
    });
  },

  create: (req, res) => {
    let { name, edad, email } = req.body;

    let usuario = {
      name,
      edad,
      email
    };

    //Guardarla

    res.redirect("/users/list");
  },

  edit: (req, res) => {
    let idUser = req.params.idUser;
    let users = [
      { id: 1, name: "Dario" },
      { id: 2, name: "Beto" },
      { id: 3, name: "Japeño" },
      { id: 4, name: "Ale" },
      { id: 5, name: "Bernie" },
      { id: 6, name: "Luisa" }
    ];

    let userToEdit = users[idUser];
    res.render("userEdit", {
      userToEdit: userToEdit
    });
  }
};

module.exports = userControllers;
