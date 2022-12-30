const HomeController = require("../controllers/home");
const BrentController = require("../controllers/brent");
const WtiController = require("../controllers/wti");

const init = (server) => {
  server.get("/", function (req, res) {
    res.redirect("/home");
  });

  server.use("/home", HomeController);
  server.use("/brent", BrentController);
  server.use("/wti", WtiController);
};

module.exports = {
  init: init,
};
