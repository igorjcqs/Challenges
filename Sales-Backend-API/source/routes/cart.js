const router = require("express").Router();

const viewController = require("../controllers/cart/views");

/* -------------------------- Views -------------------------- */

router.get("/", viewController.showCart);

/* ----------------------------------------------------------- */

/* --------------------------- API --------------------------- */

/* ----------------------------------------------------------- */

module.exports = router;
