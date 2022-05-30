const router = require("express").Router();
const auth = require("../middleware/auth");
const ruteCtrl = require("../controllers/ruteCtrl");

router.post("/postRute", auth, ruteCtrl.postRutes);
router.get("/getUserRuteByUserId/:userId", auth, ruteCtrl.getUserRuteByUserId);
router.get(
  "/getUserRuteAccordingWilayah/:wilayahId",
  auth,
  ruteCtrl.getUserRuteAccordingWilayah
);

router.delete("/deleteUserRute/:ruteId", auth, ruteCtrl.deleteUserRute);
router.delete("/deleteAllUserRute", auth, ruteCtrl.deleteAllUserRute);

module.exports = router;
