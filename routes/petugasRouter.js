const router = require("express").Router();
const auth = require("../middleware/auth");
const petugasCtrl = require("../controllers/petugasCtrl");

router.get(
  "/allPetugasIsNotVerified",
  auth,
  petugasCtrl.allPetugasIsNotVerified
);
router.get("/allPetugas", auth, petugasCtrl.allPetugas);
router.get("/getPetugas", auth, petugasCtrl.getProfilePetugas);
router.patch("/updatePetugas/:id", auth, petugasCtrl.updatePetugas);
router.delete("/deletePetugas/:id", auth, petugasCtrl.deletePetugas);
router.patch(
  "/updateVerifikasiPetugas/:id",
  auth,
  petugasCtrl.updateVerifikasiPetugas
);

//--------ROLED---------------------
router.patch("/updateIsRoled/:id", auth, petugasCtrl.updateIsRoled);
router.get("/getAllIsNotRoled", auth, petugasCtrl.getAllIsNotRoled);
router.patch("/updateAllIsRoled", auth, petugasCtrl.updateAllIsRoled);

module.exports = router;
