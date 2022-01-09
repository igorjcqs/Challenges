const router = require("express").Router();
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

router.post(
  "/createproduct",
  authMiddleware,
  dashboardController.dashboardCreateProduct
);

module.exports = router;
