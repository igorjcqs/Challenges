const validation = require("./validation");
const { upload } = require("../../utils/index");

const Product = require("../../models/Product");

module.exports.search = async (req, res) => {
  const searchedName = req.query.name;
  const searchedSection = req.query.section;

  try {
    if (searchedName) {
      Product.find({
        name: { $regex: searchedName, $options: "$i" },
      }).then((data) => {
        res.status(200).json({ data: data });
      });
    } else if (searchedSection) {
      Product.find({
        section: { $regex: searchedSection, $options: "$i" },
      }).then((data) => {
        res.status(200).json({ data: data });
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports.allProducts = (req, res) => {
  Product.find({}, function (err, products) {
    if (!err) {
      Product.countDocuments((err, count) => {
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

module.exports.createProduct = async (req, res) => {
  const token = req.cookies.jwt;
  const product = req.body;

  validation(res, product);

  const verify = await Product.findOne({ name: product.productName });
  if (verify) return newError(res, "Already exists a product with that name.");

  jwt.verify(token, "Martins Websites", async (err, decodedToken) => {
    const user = await User.findById(JSON.parse(decodedToken.id));

    const newProduct = new Product({
      name: product.productName,
      description: product.productDesc,
      price: product.productPrice,
      size: product.productSize,
      color: product.productColor,
      material: product.productMaterial,
      section: product.productSection,
      stock: product.productStock,
      createdBy: user.firstName + " " + user.lastName,
    });

    try {
      const product = await newProduct.save();
      res.status(201).json({ message: "Product created", product: product });
    } catch (err) {
      newError(res, err.message);
    }
  });
};

module.exports.upload = async (req, res) => {
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
          productImage: product.image,
          error: err.message,
        });
      } catch (error) {
        res.status(404).json({ message: "Product not found" });
      }
    } else {
      if (req.file) {
        await Product.findByIdAndUpdate(
          JSON.parse(productId).replaceAll('"', ""),
          {
            image: req.file.location,
          }
        );
        return res.redirect("/product/find/" + productId.replaceAll('"', ""));
      }
    }
  });
};

module.exports.edit = async (req, res) => {
  const productId = JSON.stringify(req.params.productId);

  try {
    const product = await Product.findByIdAndUpdate(
      JSON.parse(productId),
      {
        name: req.body.productName,
        description: req.body.productDesc,
        price: req.body.productPrice,
        size: req.body.productSize,
        color: req.body.productColor,
        material: req.body.productMaterial,
        section: req.body.productSection,
        stock: req.body.productStock,
      },
      { new: true }
    );

    res.status(200).send({ message: "Product updated" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports.delete = async (req, res) => {
  const productId = JSON.stringify(req.params.productId);

  try {
    await Product.findByIdAndDelete(JSON.parse(productId));
    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    res.status(404).json({ message: "Product not found" });
  }
};
