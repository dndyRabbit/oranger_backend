const router = require("express").Router();
const auth = require("../middleware/auth");
const wilayahCtrl = require("../controllers/wilayahCtrl");

router.post("/addWilayah", auth, wilayahCtrl.postWilayah);
router.get("/getWilayah", auth, wilayahCtrl.getWilayah);
router.patch("/updateWilayah/:id", auth, wilayahCtrl.updateWilayah);
router.delete("/deleteWilayah/:id", auth, wilayahCtrl.deleteWilayah);

module.exports = router;
