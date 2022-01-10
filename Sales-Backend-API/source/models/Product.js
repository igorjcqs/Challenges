const mongoose = require("../database/index");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  material: {
    type: String,
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
  sales: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
  },
  createdBy: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model("product", productSchema);

module.exports = Product;
