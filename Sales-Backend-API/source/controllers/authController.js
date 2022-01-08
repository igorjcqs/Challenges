const User = require("../models/User");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

module.exports.signupGet = (req, res) => {
  res.render("signup");
};

const signupValidationSchema = Joi.object({
  firstName: Joi.string()
    .required()
    .min(2)
    .max(255)
    .pattern(/^([^0-9]*)$/)
    .messages({
      "string.pattern.base": "Your first name cannot contain numbers.",
    }),
  lastName: Joi.string()
    .required()
    .min(2)
    .max(255)
    .pattern(/^([^0-9]*)$/)
    .messages({
      "string.pattern.base": "Your last name cannot contain numbers.",
    }),
  email: Joi.string().required().email().max(255),
  password: Joi.string().required().min(8).max(255),
});

const handleErrors = (err) => {
  console.log(err.message);
};

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "Martins Websites", {
    expiresIn: maxAge,
  });
};

module.exports.signupPost = async (req, res) => {
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

module.exports.loginGet = (req, res) => {
  res.render("login");
};

module.exports.loginPost = async (req, res) => {
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

module.exports.logoutGet = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
