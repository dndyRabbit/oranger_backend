const router = require("express").Router();
const auth = require("../middleware/auth");
const absenCtrl = require("../controllers/absenCtrl");

router.post("/petugas/absen", auth, absenCtrl.absen);
router.get("/petugas/absen/:id", auth, absenCtrl.getAbsenByDate);
router.patch("/petugas/updateAbsen/:id", auth, absenCtrl.patchAbsen);

module.exports = router;
