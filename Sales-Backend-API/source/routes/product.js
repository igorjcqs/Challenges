const router = require("express").Router();

const viewController = require("../controllers/product/views");
const methodController = require("../controllers/product/methods");

/* -------------------------- Views -------------------------- */

router.get("/find/:productId", viewController.product);
router.get("/edit/:productId", viewController.editProduct);
router.get("/images/:productId", viewController.productImage);
router.get("/create/:productId", viewController.productImage);

/* ----------------------------------------------------------- */

/* --------------------------- API --------------------------- */

router.get("/search", methodController.search);
router.get("/all", methodController.allProducts);
router.put("/edit/:productId", methodController.edit);
router.post("/images/:productId", methodController.upload);
router.delete("/delete/:productId", methodController.delete);

/* ----------------------------------------------------------- */

module.exports = router;
