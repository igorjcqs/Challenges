const jwt = require("jsonwebtoken");
const joi = require("joi");

const User = require("../models/User");
const Product = require("../models/Product");

module.exports.dashboardUserProfileView = (req, res) => {
  res.render("dashboardUser");
};

module.exports.dashboardCreateProductView = (req, res) => {
  res.render("dashboardCreateProduct");
};

module.exports.dashboardEditProductView = (req, res) => {
  res.render("dashboardEditProduct");
};

const productValidationSchema = joi.object({
  productName: joi.string().required().min(3),
  productPrice: joi.string().required(),
  productSize: joi.string().required().min(2),
  productColor: joi.string().required().min(3),
  productMaterial: joi.string().required().min(3),
  productSection: joi.string().required().min(3),
});

module.exports.dashboardCreateProduct = async (req, res) => {
  const token = req.cookies.jwt;
  const {
    productName,
    productPrice,
    productSize,
    productColor,
    productMaterial,
    productSection,
  } = req.body;

  const { error } = productValidationSchema.validate(req.body);
  if (error) {
    const errorMessage = error.details[0].message
      .replace(/[^\w\s]/gi, "")
      .replace("productName", "Name")
      .replace("productPrice", "Price")
      .replace("productSize", "Size")
      .replace("productColor", "Color")
      .replace("productMaterial", "Material")
      .replace("productSection", "Section")
      .replace("productPrice", "Price");
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
          price: productPrice,
          size: productSize,
          color: productColor,
          material: productMaterial,
          section: productSection,
          createdBy: user._id,
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
