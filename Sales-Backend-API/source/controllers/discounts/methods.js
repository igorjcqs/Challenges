const jwt = require("jsonwebtoken");

const User = require("../../models/User");
const Product = require("../../models/Product");
const Discount = require("../../models/Discounts");

const { newError } = require("../../utils/index");

module.exports.create = async (req, res) => {
  const token = req.cookies.jwt;
  const { productId, discountPrice } = req.body;

  const verify = await Discount.findOne({
    product: JSON.parse(JSON.stringify(productId)),
  });
  if (verify)
    return newError(res, "Already exists a discount to that product.");

  jwt.verify(token, "Martins Websites", async (err, decodedToken) => {
    const user = await User.findById(JSON.parse(decodedToken.id));
    const product = await Product.findById(
      JSON.parse(JSON.stringify(productId))
    );

    const newDiscount = new Discount({
      productId: JSON.parse(JSON.stringify(productId)),
      productName: product.name,
      newPrice: discountPrice,
      oldPrice: product.price,
      createdBy: user.firstName + " " + user.lastName,
    });

    try {
      const discount = await newDiscount.save();
      res.status(201).json({ message: "Discount created", discount: discount });
    } catch (err) {
      newError(res, err.message);
    }
  });
};

module.exports.all = async (req, res) => {
  Discount.find({}, function (err, products) {
    if (!err) {
      Discount.countDocuments((err, count) => {
        if (!err) {
          return res.status(200).json({ count: count, products: products });
        } else {
          newError(res, err.message);
        }
      });
    } else {
      newError(res, err.message);
    }
  });
};

module.exports.delete = async (req, res) => {
  const discountId = JSON.stringify(req.params.discountId);

  try {
    await Discount.findByIdAndDelete(JSON.parse(discountId));
    res.status(200).json({ message: "Discount deleted" });
  } catch (error) {
    console.log(error);
  }
};
