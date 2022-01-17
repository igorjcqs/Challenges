const User = require("../../models/User");

const validation = require("./validation");
const { newError, createToken, maxAge } = require("../../utils/index");

module.exports.signup = async (req, res) => {
  validation(res, req.body);

  const verify = await User.findOne({ email: req.body.email });
  if (verify) return newError(res, "That email is already registered.");

  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    const user = await newUser.save();
    const token = createToken(JSON.stringify(user._id));
    res.cookie("jwt", token, { HttpOnly: true, maxAge: maxAge * 1000 });
    return res.status(201).json({ user: JSON.stringify(user._id) });
  } catch (err) {
    newError(res, err.message);
  }
};

module.exports.login = async (req, res) => {
  try {
    const user = await User.login(req.body.email, req.body.password);
    const token = createToken(JSON.stringify(user._id));
    res.cookie("jwt", token, { HttpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  } catch (err) {
    newError(res, err.message);
  }
};

module.exports.logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 1 });
    res.status(200).json({ message: "User logged out." });
  } catch (err) {
    newError(res, err.message);
  }
};
