const router = require("express").Router();
const multer = require("multer");
const path = require("path");
/* const multerConfig = require("../config/multer"); */

const dashboardController = require("../controllers/dashboardController");
const { authMiddleware } = require("../middleware/authMiddleware");

const storage = multer.diskStorage({
  destination: "./Uploads",
  filename: function (req, file, callBack) {
    callBack(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// TODO : upload function
const upload = multer({
  storage: storage,
  limits: { fieldSize: 10 * 1024 * 1024 },
});

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
