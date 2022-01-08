const router = require("express").Router();
const dashboardController = require("../controllers/dashboardController");
const { authMiddleware } = require("../middleware/authMiddleware");

router.get("/user", authMiddleware, dashboardController.dashboardUserProfile);
router.get("/createproduct", authMiddleware, dashboardController.dashboardCreateProduct);

module.exports = router;
