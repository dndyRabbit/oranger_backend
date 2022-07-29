const router = require("express").Router();
const auth = require("../middleware/auth");
const adminCtrl = require("../controllers/adminCtrl");

router.patch("/update_status_admin", auth, adminCtrl.updateStatusAdmin);
router.get("/get_admin", auth, adminCtrl.getAdmin);

module.exports = router;
