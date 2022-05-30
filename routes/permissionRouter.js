const router = require("express").Router();
const auth = require("../middleware/auth");
const permissionCtrl = require("../controllers/permissionCtrl");

router.post("/postPermission", auth, permissionCtrl.postPermission);
router.get("/getAllPermissions", auth, permissionCtrl.getAllPermissions);
router.get(
  "/getAllPermissionsIsApproved",
  auth,
  permissionCtrl.getAllPermissionsIsApproved
);

router.get(
  "/getUserPermissionIsApproved/:userId",
  auth,
  permissionCtrl.getUserPermissionIsApproved
);

router.get(
  "/getUserPermission/:userId",
  auth,
  permissionCtrl.getUserPermission
);

router.patch(
  "/patchUserPermission/:id",
  auth,
  permissionCtrl.patchUserPermission
);
router.patch(
  "/patchIsApprovedPermission/:id",
  auth,
  permissionCtrl.patchIsApprovedPermission
);

router.delete("/deletePermission/:id", auth, permissionCtrl.deletePermission);

module.exports = router;
