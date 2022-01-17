const jwt = require("jsonwebtoken");

const User = require("../../models/User");
const Product = require("../../models/Product");

module.exports.product = async (req, res) => {
  const productId = JSON.stringify(req.params.productId);
  const token = req.cookies.jwt;
  const currenctCart = req.cookies.cart;

  try {
    if (token) {
      jwt.verify(token, "Martins Websites", async (err, decodedToken) => {
        if (!err) {
          const product = await Product.findById(JSON.parse(productId));
          const user = await User.findById(JSON.parse(decodedToken.id));
          if (!Object.values(user.favorites).includes(JSON.parse(productId))) {
            if (currenctCart && currenctCart.includes(req.params.productId)) {
              res.render("productPage", {
                product: product,
                favoritesLabel: "Add to favorites",
                cartLabel: "Show cart",
              });
            } else {
              res.render("productPage", {
                product: product,
                favoritesLabel: "Add to favorites",
                cartLabel: "Add to cart",
              });
            }
          } else {
            if (currenctCart && currenctCart.includes(req.params.productId)) {
              res.render("productPage", {
                product: product,
                favoritesLabel: "Remove from favorites",
                cartLabel: "Show cart",
              });
            } else {
              res.render("productPage", {
                product: product,
                favoritesLabel: "Remove from favorites",
                cartLabel: "Add to cart",
              });
            }
          }
        }
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports.editProduct = async (req, res) => {
  const productId = JSON.stringify(req.params.productId);

  try {
    const product = await Product.findById(JSON.parse(productId));
    res.render("editProduct", {
      productId: product._id,
      productName: product.name,
      productDesc: product.description,
      productPrice: product.price,
      productSize: product.size,
      productColor: product.color,
      productMaterial: product.material,
      productSection: product.section,
      productStock: product.stock,
    });
  } catch (error) {
    res.status(404).json({ message: "Product not found" });
  }
};

module.exports.productImage = async (req, res) => {
  const productId = JSON.stringify(req.params.productId);

  try {
    const product = await Product.findById(
      JSON.parse(productId).replaceAll('"', "")
    );
    res.render("productImage", {
      productId: JSON.stringify(product._id).replaceAll('"', ""),
      productName: product.name,
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
