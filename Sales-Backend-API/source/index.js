const express = require("express");
const path = require("path");
const engine = require("consolidate");
const bodyParser = require("body-parser");

const app = express();
require("dotenv/config");

app.set("views", __dirname + "/views");
app.engine("html", engine.mustache);
app.set("view engine", "html");

app.use(express.static(path.join(__dirname, "/public")));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => res.render("register"));

app.listen(process.env.port, () => console.log("Server up successfully."));
