const Product = require("../models/Product");

module.exports.showProduct = async (req, res) => {
  const productId = JSON.stringify(req.params.productId);

  try {
    const product = await Product.findById(JSON.parse(productId));
    res.render("productPage", {
      productName: product.name,
      productDesc: product.description,
      productPrice: product.price,
      productSize: product.size,
      productColor: product.color,
      productMaterial: product.material,
    });
  } catch (error) {
    res.status(404).json({ message: "Product not found" });
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
    });
  } catch (error) {
    res.status(404).json({ message: "Product not found" });
  }
};

module.exports.editProduct = async (req, res) => {
  console.log(req.body);
  const productId = JSON.stringify(req.params.productId);
  const {
    productName,
    productDesc,
    productPrice,
    productSize,
    productColor,
    productMaterial,
    productSection,
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
    });
  } catch (error) {
    res.status(404).json({ message: "Product not found" });
  }
};
