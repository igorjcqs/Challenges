const mongoose = require("../database/index");

const discountSchema = mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  newPrice: {
    type: Number,
    required: true,
  },
  oldPrice: {
    type: Number,
    required: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
});

const Discounts = mongoose.model("discounts", discountSchema);

module.exports = Discounts;
