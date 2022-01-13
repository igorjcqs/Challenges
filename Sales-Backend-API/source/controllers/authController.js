const jwt = require("jsonwebtoken");
const joi = require("joi");

const User = require("../models/User");
const Product = require("../models/Product");

module.exports.signupView = (req, res) => {
  res.render("signup");
};

module.exports.loginView = (req, res) => {
  res.render("login");
};

const signupValidationSchema = joi.object({
  firstName: joi
    .string()
    .required()
    .min(2)
    .max(255)
    .pattern(/^([^0-9]*)$/)
    .messages({
      "string.pattern.base": "Your first name cannot contain numbers.",
    }),
  lastName: joi
    .string()
    .required()
    .min(2)
    .max(255)
    .pattern(/^([^0-9]*)$/)
    .messages({
      "string.pattern.base": "Your last name cannot contain numbers.",
    }),
  email: joi.string().required().email().max(255),
  password: joi.string().required().min(8).max(255),
});

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "Martins Websites", {
    expiresIn: maxAge,
  });
};

module.exports.signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const { error } = signupValidationSchema.validate(req.body);
  if (error) {
    const errorMessage = error.details[0].message
      .replace(/[^\w\s]/gi, "")
      .replace("firstName", "First name")
      .replace("lastName", "Last name")
      .replace("email", "Email")
      .replace("password", "Password");
    return res.status(400).json({ error: errorMessage });
  }

  const emailVerify = await User.findOne({ email: req.body.email });
  if (emailVerify)
    return res.status(400).json({ error: "That email is already registered." });

  const newUser = new User({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
  });

  try {
    const user = await newUser.save();
    const token = createToken(JSON.stringify(user._id));
    res.cookie("jwt", token, { HttpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: JSON.stringify(user._id) });
  } catch (err) {
    res.status(400).json({ error });
  }
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(JSON.stringify(user._id));
    res.cookie("jwt", token, { HttpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports.logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.status(200).json({ message: "User logged out." });
};

module.exports.deleteAccount = (req, res) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, "Martins Websites", async (err, decodedToken) => {
      if (err) {
        res.redirect("/login");
      } else {
        await User.deleteOne({ _id: JSON.parse(decodedToken.id) });
        res.cookie("jwt", "", { maxAge: 1 });
        res.status(200).json({ message: "User deleted." });
      }
    });
  } else {
    res.redirect("/login");
  }
};

module.exports.addFavorite = (req, res) => {
  const token = req.cookies.jwt;
  const productId = req.params.productId;
  if (token) {
    jwt.verify(token, "Martins Websites", async (err, decodedToken) => {
      if (err) {
        res.redirect("/login");
      } else {
        try {
          await Product.findById(productId, async function (err) {
            if (!err) {
              const user = await User.findById(JSON.parse(decodedToken.id));
              if (!Object.values(user.favorites).includes(productId)) {
                await User.findByIdAndUpdate(JSON.parse(decodedToken.id), {
                  $push: {
                    favorites: productId,
                  },
                });
              } else {
                res.status(400).json({
                  message: "The user already has this product in favorites.",
                });
              }
            } else {
              res.status(400).json({
                message: err.message,
              });
            }
          }).clone();
        } catch (err) {
          console.log(err);
          res.status(400).json({
            message: err.message,
          });
        }
      }
    });
  } else {
    res.redirect("/login");
  }
};

module.exports.removeFavorite = (req, res) => {
  const token = req.cookies.jwt;
  const productId = req.params.productId;
  if (token) {
    jwt.verify(token, "Martins Websites", async (err, decodedToken) => {
      if (err) {
        res.redirect("/login");
      } else {
        try {
          await Product.findById(productId, async function (err) {
            if (!err) {
              const user = await User.findById(JSON.parse(decodedToken.id));
              if (Object.values(user.favorites).includes(productId)) {
                await User.findByIdAndUpdate(JSON.parse(decodedToken.id), {
                  $pull: {
                    favorites: productId,
                  },
                });
              } else {
                res.status(400).json({
                  message:
                    "The user dont have his product in your favorites list.",
                });
              }
            } else {
              res.status(400).json({
                message: err.message,
              });
            }
          }).clone();
        } catch (err) {
          console.log(err);
          res.status(400).json({
            message: err.message,
          });
        }
      }
    });
  } else {
    res.redirect("/login");
  }
};
