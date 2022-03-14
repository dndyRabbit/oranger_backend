const router = require("express").Router();
const auth = require("../middleware/auth");
const ruteCtrl = require("../controllers/ruteCtrl");

router.post("/addRute", auth, ruteCtrl.postRute);
router.get("/getRute/:id", auth, ruteCtrl.getRute);
router.get("/getUserIsNotAdded", auth, ruteCtrl.getUserIsNotAdded);

router.delete("/deleteRute/:id", auth, ruteCtrl.deleteRute);

module.exports = router;
