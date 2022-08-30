const router = require("express").Router();
const auth = require("../middleware/auth");
const reportCtrl = require("../controllers/reportCtrl");

router.post("/postReport", auth, reportCtrl.postReport);
router.get("/getAllReport/:date", auth, reportCtrl.getAllReport);
router.get("/getReport/:date/:userId", auth, reportCtrl.getReport);

module.exports = router;
