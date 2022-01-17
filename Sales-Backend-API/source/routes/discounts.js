const router = require("express").Router();

const viewController = require("../controllers/discounts/views");
const methodController = require("../controllers/discounts/methods");

/* -------------------------- Views -------------------------- */

router.get("/create/:productId", viewController.create);

/* ----------------------------------------------------------- */

/* --------------------------- API --------------------------- */

router.get("/all", methodController.all);
router.post("/create/:productId", methodController.create);
router.delete("/delete/:discountId", methodController.delete);

/* ----------------------------------------------------------- */

module.exports = router;
