const router = require("express").Router();

const productController = require("../controllers/productController");

router.get("/:productId", productController.showProduct);
router.get("/delete/:productId", productController.deleteProduct);
router.get("/edit/:productId", productController.editProductView);
router.put("/edit/:productId", productController.editProduct);

module.exports = router;
