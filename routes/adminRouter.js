const router = require("express").Router();
const auth = require("../middleware/auth");
const adminCtrl = require("../controllers/adminCtrl");

router.patch("/admin", auth, adminCtrl.updateAdmin);

module.exports = router;
