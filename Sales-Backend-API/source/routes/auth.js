const router = require("express").Router();

const viewController = require("../controllers/auth/views");
const methodController = require("../controllers/auth/methods");

/* -------------------------- Views -------------------------- */

router.get("/signup", viewController.signup);
router.get("/login", viewController.login);

/* ----------------------------------------------------------- */

/* --------------------------- API --------------------------- */

router.post("/signup", methodController.signup);
router.post("/login", methodController.login);
router.post("/logout", methodController.logout);

/* ----------------------------------------------------------- */

module.exports = router;
