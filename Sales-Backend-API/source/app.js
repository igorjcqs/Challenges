const path = require("path");
const express = require("express");
const engine = require("consolidate");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const dashboardRoutes = require("./routes/Dashboard");
const productRoutes = require("./routes/product");
const discountsRoutes = require("./routes/discounts");
const cartRoutes = require("./routes/cart");

const { Auth } = require("./middleware/Auth");
const { getUser } = require("./middleware/User");

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

app.get("*", getUser);
app.get("/", (req, res) => res.render("home"));

app.use(authRoutes);
app.use("/user/", userRoutes);
app.use("/dashboard/", Auth, dashboardRoutes);
app.use("/product/", productRoutes);
app.use("/discounts/", discountsRoutes);
app.use("/cart/", cartRoutes);

app.listen(process.env.SERVER_PORT, () =>
  console.log("Server up successfully.")
);
