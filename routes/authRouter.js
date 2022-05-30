const router = require("express").Router();
const authCtrl = require("../controllers/authCtrl");

router.post("/register", authCtrl.register);
router.post("/registerAdmin", authCtrl.registerAdmin);

router.post("/login", authCtrl.login);
router.post("/loginAdmin", authCtrl.loginAdmin);

router.post("/logout", authCtrl.logout);

router.post("/refresh_token", authCtrl.generateAccessToken);
router.post("/refresh_token_mobile", authCtrl.generateAccessTokenMobile);

module.exports = router;
