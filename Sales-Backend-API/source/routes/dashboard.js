const router = require("express").Router();
const path = require("path");
/* const multerConfig = require("../config/multer"); */

const dashboardController = require("../controllers/dashboardController");
const { authMiddleware } = require("../middleware/authMiddleware");

router.get(
  "/user",
  authMiddleware,
  dashboardController.dashboardUserProfileView
);

router.get(
  "/createproduct",
  authMiddleware,
  dashboardController.dashboardCreateProductView
);

router.get(
  "/editproduct",
  authMiddleware,
  dashboardController.dashboardEditProductView
);

router.get(
  "/showproducts",
  authMiddleware,
  dashboardController.dashboardShowAllProduct
);

router.post(
  "/createproduct",
  authMiddleware,
  dashboardController.dashboardCreateProduct
);

module.exports = router;
