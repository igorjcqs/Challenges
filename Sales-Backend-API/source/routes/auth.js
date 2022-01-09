const router = require("express").Router();
const authController = require("../controllers/authController");

router.get("/signup", authController.signupView);
router.post("/signup", authController.signup);
router.get("/login", authController.loginView);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.delete("/deleteaccount", authController.deleteAccount);

module.exports = router;
