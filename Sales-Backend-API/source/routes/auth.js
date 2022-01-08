const router = require("express").Router();
const authController = require("../controllers/authController");

router.get("/signup", authController.signupGet);
router.post("/signup", authController.signupPost);
router.get("/login", authController.loginGet);
router.post("/login", authController.loginPost);
router.get("/logout", authController.logoutGet);
router.get("/deleteaccount", authController.deleteAccountGet);

module.exports = router;
