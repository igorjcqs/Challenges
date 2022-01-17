const router = require("express").Router();

const methodController = require("../controllers/user/methods");

/* --------------------------- API --------------------------- */

router.post("/images/:userId", methodController.upload);
router.post("/updatefavorites/:productId", methodController.addFavorite);
router.delete("/updatefavorites/:productId", methodController.removeFavorite);
router.delete("/delete", methodController.delete);

/* ----------------------------------------------------------- */

module.exports = router;
