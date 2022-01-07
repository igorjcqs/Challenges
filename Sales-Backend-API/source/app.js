const path = require("path");
const express = require("express");
const engine = require("consolidate");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");

const app = express();
require("dotenv/config");
require("../source/database/index");

app.engine("html", engine.mustache);

app.set("views", __dirname + "/views");
app.set("view engine", "html");

app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(authRoutes);
app.get("/", (req, res) => res.render("home"));

app.listen(process.env.port, () => console.log("Server up successfully."));
