const path = require("path");
const express = require("express");
const engine = require("consolidate");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth");
const { authMiddleware } = require("./middleware/authMiddleware");

const app = express();
require("dotenv/config");
require("../source/database/index");

app.engine("html", engine.mustache);

app.set("views", __dirname + "/views");
app.set("view engine", "html");

app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));

app.use(authRoutes);
app.get("/", (req, res) => res.render("home"));
app.get("/dashboard", authMiddleware, (req, res) => res.render("dashboard"));

app.listen(process.env.port, () => console.log("Server up successfully."));
