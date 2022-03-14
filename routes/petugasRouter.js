const router = require("express").Router();
const auth = require("../middleware/auth");
const petugasCtrl = require("../controllers/petugasCtrl");

router.get("/allPetugas", auth, petugasCtrl.allPetugas);
router.get("/getPetugas", auth, petugasCtrl.getProfilePetugas);
router.patch("/updatePetugas", auth, petugasCtrl.updatePetugas);
router.delete("/deletePetugas/:id", auth, petugasCtrl.deletePetugas);
router.patch(
  "/updateVerifikasiPetugas/:id",
  auth,
  petugasCtrl.updateVerifikasiPetugas
);
router.get(
  "/getAllPetugasIsNotVerified",
  auth,
  petugasCtrl.getAllPetugasIsNotVerified
);

// this is for rute petugas
router.get(
  "/getAllPetugasIsNotAddToRute",
  auth,
  petugasCtrl.getAllPetugasIsNotAddToRute
);

router.patch("/updateAddRutePetugas/:id", auth, petugasCtrl.updateIsAddPetugas);

module.exports = router;
