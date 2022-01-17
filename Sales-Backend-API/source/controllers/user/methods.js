const jwt = require("jsonwebtoken");

const { upload, firstUpper, newError } = require("../../utils/index");

const User = require("../../models/User");
const Product = require("../../models/Product");

module.exports.upload = async (req, res) => {
  const userId = JSON.stringify(req.params.userId);

  upload(req, res, async function (err) {
    if (!err) {
      if (req.file) {
        await User.findByIdAndUpdate(JSON.parse(userId).replaceAll('"', ""), {
          avatar: req.file.location,
        });
        return res.redirect("/dashboard/user");
      }
    } else {
      try {
        const user = await User.findById(
          JSON.parse(userId).replaceAll('"', "")
        );
        return res.render("dashboard/manageProfille", {
          user: user,
          userFirstName: firstUpper(user.firstName),
          userLastName: firstUpper(user.lastName),
        });
      } catch (err) {
        return newError(res, "Error on upload image: " + err);
      }
    }
  });
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
              }
            }
          }).clone();
        } catch (err) {
          newError(res, err.message);
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
              newError(res, err.message);
            }
          }).clone();
        } catch (err) {
          newError(res, err.message);
        }
      }
    });
  } else {
    res.redirect("/login");
  }
};

module.exports.delete = (req, res) => {
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
