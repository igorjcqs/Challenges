const User = require("../models/User");
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

module.exports.signupPost = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const { error } = signupValidationSchema.validate(req.body);
  if (error) {
    const errorMessage = error.details[0].message.replace(/[^\w\s]/gi, "");
    return res.status(400).json({ error: errorMessage });
  }

  const emailVerify = await User.findOne({ email: req.body.email });
  if (emailVerify)
    return res.status(400).json({ error: "That email is already registered." });

  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ error });
  }
};

module.exports.loginGet = (req, res) => {
  res.render("login");
};

module.exports.loginPost = (req, res) => {
  res.send("Login a user");
};
