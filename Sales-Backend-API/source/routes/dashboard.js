const router = require("express").Router();

const viewController = require("../controllers/dashboard/views");

/* -------------------------- Views -------------------------- */

router.get("/user", viewController.profile);
router.get("/createproduct", viewController.createProduct);
router.get("/editproduct", viewController.editProduct);
router.get("/discounts", viewController.discounts);

/* ----------------------------------------------------------- */

module.exports = router;
