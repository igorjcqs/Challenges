const router = require("express").Router();
const authController = require("../controllers/authController");

router.get("/signup", authController.signupGet);
router.post("/signup", authController.signupPost);
router.get("/login", authController.loginGet);
router.post("/login", authController.loginPost);
router.post("/logout", authController.logoutGet);

module.exports = router;
