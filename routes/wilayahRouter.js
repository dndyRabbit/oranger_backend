const router = require("express").Router();
const auth = require("../middleware/auth");
const wilayahCtrl = require("../controllers/wilayahCtrl");

router.post("/postWilayah", auth, wilayahCtrl.postWilayah);
router.get("/getWilayah", auth, wilayahCtrl.getWilayah);

router.get("/getUsersAndRoles", auth, wilayahCtrl.getUsersAndRoles);
router.get(
  "/getUsersAndRolesAbsensi",
  auth,
  wilayahCtrl.getUsersAndRolesAbsensi
);
router.delete("/deleteAllWilayah", auth, wilayahCtrl.deleteAllWilayah);

module.exports = router;
