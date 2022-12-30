const express = require("express");
const app = express();
const http = require("http").Server(app);
const bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const path = require("path");

const router = require("./routes");

dotenv.config();

app.set("hostname", process.env.HOST);
app.set("port", process.env.PORT);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(morgan("dev"));

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

router.init(app);

http.listen(app.get("port"), app.get("hostname"), () => {
  console.log(
    "Connected successfully to server " +
      app.get("hostname") +
      " on port : " +
      app.get("port")
  );
});
