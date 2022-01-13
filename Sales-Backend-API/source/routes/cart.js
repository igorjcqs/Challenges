const router = require("express").Router();
const cartController = require("../controllers/cartController");

router.get("/", cartController.showCart);

module.exports = router;
