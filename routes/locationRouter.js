const router = require("express").Router();
const auth = require("../middleware/auth");
const locationCtrl = require("../controllers/locationCtrl");

router.get("/locationUser", auth, locationCtrl.getLocationUser);
router.post("/locationUser", auth, locationCtrl.postLocationUser);

module.exports = router;
