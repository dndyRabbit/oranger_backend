const Permissions = require("../models/permissionModel");

const permissionCtrl = {
  postPermission: async (req, res) => {
    try {
      const {
        role,
        userId,
        type,
        evidence,
        description,
        date,
        startDate,
        endDate,
      } = req.body;

      const permission = await Permissions.findOne({ userId, date: date });

      if (permission)
        return res
          .status(400)
          .json({ msg: `User sudah melakukan perizinan pada tanggal ${date}` });

      const newPermission = new Permissions({
        role,
        userId,
        type,
        evidence: evidence ? evidence : "",
        description,
        date,
        startDate,
        endDate,
      });

      await newPermission.save();
      console.log(...newPermission._doc);

      res.json({
        msg: "Successfully post wilayah!",
        permission: {
          ...newPermission._doc,
        },
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getAllPermissions: async (req, res) => {
    try {
      //   const { date } = req.params;
      const permission = await Permissions.find({ isApproved: false }).populate(
        [{ path: "userId", select: "fullName avatar" }]
      );

      res.json({
        permission,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getAllPermissionsIsApproved: async (req, res) => {
    try {
      //   const { date } = req.params;
      const permission = await Permissions.find({ isApproved: true }).populate([
        { path: "userId", select: "fullName avatar" },
      ]);

      res.json({
        permission,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getUserPermissionIsApproved: async (req, res) => {
    try {
      const { userId } = req.params;
      const permission = await Permissions.find({
        isApproved: true,
        userId,
      }).populate([{ path: "userId", select: "fullName avatar" }]);

      res.json({
        permission,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getUserPermission: async (req, res) => {
    try {
      const { userId } = req.params;
      const permission = await Permissions.find({
        userId,
        isApproved: false,
      }).populate([{ path: "userId", select: "fullName avatar" }]);

      res.json({
        permission,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  patchUserPermission: async (req, res) => {
    try {
      const id = req.params.id;

      const { evidence } = req.body;
      const permission = await Permissions.findOneAndUpdate(
        { _id: id },
        {
          evidence,
        }
      );

      res.json({
        msg: "Update Berhasil",
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  patchIsApprovedPermission: async (req, res) => {
    try {
      const id = req.params.id;

      const { isApproved, status } = req.body;
      const permission = await Permissions.findOneAndUpdate(
        { _id: id },
        {
          isApproved,
          status: status,
        }
      );

      res.json({
        msg: "Update Berhasil",
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  deletePermission: async (req, res) => {
    try {
      const { id } = req.params;

      await Permissions.findOneAndDelete({ id });

      res.json({
        msg: "Delete Berhasil",
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = permissionCtrl;
