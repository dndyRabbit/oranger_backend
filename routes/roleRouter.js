const router = require("express").Router();
const auth = require("../middleware/auth");
const roleCtrl = require("../controllers/roleCtrl");

router.get("/getSpesificRole/:role", auth, roleCtrl.getSpesificRole);
router.post("/postRole", auth, roleCtrl.postRole);
router.delete("/deleteRole/:id", auth, roleCtrl.deleteRole);
router.delete("/deleteAllRole", auth, roleCtrl.deleteAllRole);

//-------patch--Ruted true-------------
router.patch("/updateIsRuted/:userId", auth, roleCtrl.updateIsRuted);
router.patch("/updateAllIsRuted", auth, roleCtrl.updateAllIsRuted);

module.exports = router;
