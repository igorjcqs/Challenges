const jwt = require("jsonwebtoken");
const User = require("../models/User");
const ObjectId = require("mongodb").ObjectId;

const authMiddleware = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, "Martins Websites", (err, decodedToken) => {
      if (err) {
        res.redirect("/login");
      } else {
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
};

const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "Martins Websites", async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        try {
          const user = await User.findById(JSON.parse(decodedToken.id));
          res.locals.user = user;
          res.locals.userFirstName = firstLetterToUpperCase(user.firstName);
          res.locals.userLastName = firstLetterToUpperCase(user.lastName);
          res.locals.userEmail = user.email;
        } catch (error) {
          console.log(error);
        }
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

function firstLetterToUpperCase(name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

module.exports = { authMiddleware, checkUser };
