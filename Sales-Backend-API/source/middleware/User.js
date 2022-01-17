const jwt = require("jsonwebtoken");

const User = require("../models/User");

const { firstUpper } = require("../utils/index");

const getUser = (req, res, next) => {
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
          res.locals.userFirstName = firstUpper(user.firstName);
          res.locals.userLastName = firstUpper(user.lastName);
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

module.exports = { getUser };
