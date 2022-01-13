const jwt = require("jsonwebtoken");
const joi = require("joi");

const User = require("../models/User");
const Product = require("../models/Product");

const productValidationSchema = joi.object({
  productName: joi.string().required().min(3),
  productDesc: joi.string().required(),
  productPrice: joi.number().required(),
  productSize: joi.string().required().min(2),
  productColor: joi.string().required().min(3),
  productMaterial: joi.string().required().min(3),
  productSection: joi.string().required().min(3),
  productStock: joi.number().required(),
});

module.exports.dashboardUserProfileView = (req, res) => {
  res.render("dashboardUser");
};

module.exports.dashboardCreateProductView = (req, res) => {
  res.render("dashboardCreateProduct");
};

module.exports.dashboardEditProductView = (req, res) => {
  res.render("dashboardEditProduct");
};

module.exports.dashboardShowAllProduct = (req, res) => {
  Product.find({}, function (err, products) {
    if (!err) {
      Product.countDocuments((err, count) => {
        if (!err) {
          return res.status(200).json({ count: count, products: products });
        } else {
          return res.status(400).json({ error: err.message });
        }
      });
    } else {
      return res.status(400).json({ error: err.message });
    }
  });
};

module.exports.dashboardCreateProduct = async (req, res) => {
  const token = req.cookies.jwt;
  const {
    productName,
    productDesc,
    productPrice,
    productSize,
    productColor,
    productMaterial,
    productSection,
    productStock,
  } = req.body;

  const { error } = productValidationSchema.validate(req.body);
  if (error) {
    const errorMessage = error.details[0].message
      .replace(/[^\w\s]/gi, "")
      .replace("productName", "Name")
      .replace("productDesc", "Description")
      .replace("productPrice", "Price")
      .replace("productSize", "Size")
      .replace("productColor", "Color")
      .replace("productMaterial", "Material")
      .replace("productSection", "Section")
      .replace("productStock", "Stock");
    return res.status(400).json({ error: errorMessage });
  }

  const productVerify = await Product.findOne({ name: productName });
  if (productVerify)
    return res
      .status(400)
      .json({ error: "Already exists a product with that name." });

  if (token) {
    jwt.verify(token, "Martins Websites", async (err, decodedToken) => {
      if (err) {
        res.redirect("/login");
      } else {
        const user = await User.findById(JSON.parse(decodedToken.id));

        const newProduct = new Product({
          name: productName,
          description: productDesc,
          price: productPrice,
          size: productSize,
          color: productColor,
          material: productMaterial,
          section: productSection,
          stock: productStock,
          createdBy: user.firstName + " " + user.lastName,
        });

        try {
          const product = await newProduct.save();
          res
            .status(201)
            .json({ message: "Product created", product: product });
        } catch (err) {
          res.status(400).json({ error });
        }
      }
    });
  } else {
    res.redirect("/login");
  }
};
