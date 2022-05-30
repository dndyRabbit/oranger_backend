const router = require("express").Router();
const auth = require("../middleware/auth");
const testCtrl = require("../controllers/testCtrl");

router.get("/getTest", auth, testCtrl.getTest);
router.post("/postTest", auth, testCtrl.postTest);
router.patch(`/updateTest/:id`, auth, testCtrl.updateTest);

module.exports = router;
