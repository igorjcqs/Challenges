const Product = require("../../models/Product");

module.exports.create = async (req, res) => {
  const productId = JSON.stringify(req.params.productId);

  try {
    const product = await Product.findById(JSON.parse(productId));
    res.render("discounts/create", {
      product: product,
    });
  } catch (error) {
    res.status(404).json({ message: "Product not found" });
  }
};
