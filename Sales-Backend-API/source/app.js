const path = require("path");
const express = require("express");
const engine = require("consolidate");
const cookieParser = require("cookie-parser");

const morgan = require("morgan");

const authRoutes = require("./routes/auth");
const dashboardRoutes = require("./routes/dashboard");
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");

const { checkUser } = require("./middleware/authMiddleware");

const app = express();
require("dotenv/config");
require("../source/database/index");

app.use(morgan("dev"));

app.engine("html", engine.mustache);
app.set("views", __dirname + "/views");
app.set("view engine", "html");

app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));

app.get("*", checkUser);
app.get("/", (req, res) => res.render("home"));

app.use(authRoutes);
app.use("/dashboard/", dashboardRoutes);
app.use("/product/", productRoutes);
app.use("/cart/", cartRoutes);

app.listen(process.env.port, () => console.log("Server up successfully."));
