module.exports.profile = (req, res) => {
  res.render("Dashboard/manageProfille");
};

module.exports.createProduct = (req, res) => {
  res.render("Dashboard/createProduct");
};

module.exports.editProduct = (req, res) => {
  res.render("Dashboard/editProduct");
};

module.exports.discounts = async (req, res) => {
  res.render("Dashboard/manageDiscounts");
};
