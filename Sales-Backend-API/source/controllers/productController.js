const Product = require("../models/Product");

const multer = require("multer");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const storage = multer.diskStorage({
  destination: "./temp",
  filename: function (req, file, callBack) {
    var fileName = "a";
    crypto.randomBytes(8, (err, hash) => {
      if (err) cb(err);
      fileName =
        req.params.productId +
        "-" +
        hash.toString("hex") +
        "-" +
        file.originalname;
      callBack(null, fileName);
    });
  },
});

const upload = multer({
  storage: storage,
  limits: { fieldSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      "image/jpeg",
      "image/pjpeg",
      "image/png",
      "image/gif",
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid image."));
    }
  },
}).single("productImage");

module.exports.showProduct = async (req, res) => {
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
              console.log("Este produto já está no carrinho de compras.");
              res.render("productPage", {
                productName: product.name,
                productDesc: product.description,
                productPrice: product.price,
                productSize: product.size,
                productColor: product.color,
                productMaterial: product.material,
                productStock: product.stock,
                favoritesLabel: "Add to favorites",
                cartLabel: "Show cart",
              });
            } else {
              res.render("productPage", {
                productName: product.name,
                productDesc: product.description,
                productPrice: product.price,
                productSize: product.size,
                productColor: product.color,
                productMaterial: product.material,
                productStock: product.stock,
                favoritesLabel: "Add to favorites",
                cartLabel: "Add to cart",
              });
            }
          } else {
            res
              .status(400)
              .json({ error: "Não foi possível carregar a página." });
          }
        }
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports.deleteProduct = async (req, res) => {
  const productId = JSON.stringify(req.params.productId);

  try {
    await Product.findByIdAndDelete(JSON.parse(productId));
    res.redirect("/dashboard/editproduct");
  } catch (error) {
    res.status(404).json({ message: "Product not found" });
  }
};

module.exports.editProductView = async (req, res) => {
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

module.exports.showProductImage = async (req, res) => {
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

module.exports.uploadImage = async (req, res) => {
  const productId = JSON.stringify(req.params.productId);

  upload(req, res, async function (err) {
    if (err) {
      try {
        const product = await Product.findById(
          JSON.parse(productId).replaceAll('"', "")
        );
        return res.render("productImage", {
          productId: JSON.stringify(product._id).replaceAll('"', ""),
          productName: product.name,
          error: err.message,
        });
      } catch (error) {
        res.status(404).json({ message: "Product not found" });
      }
    } else {
      if (req.file) {
        return res.redirect("/product/images/" + productId);
      }
    }
  });
};

module.exports.editProduct = async (req, res) => {
  const productId = JSON.stringify(req.params.productId);
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

  try {
    const product = await Product.findByIdAndUpdate(
      JSON.parse(productId),
      {
        name: productName,
        description: productDesc,
        price: productPrice,
        size: productSize,
        color: productColor,
        material: productMaterial,
        section: productSection,
        stock: productStock,
      },
      { new: true }
    );

    res.render("editProduct", {
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
