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
  }
};

module.exports = userControllers;
