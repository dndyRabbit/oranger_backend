const Roles = require("../models/roleModel");
const Users = require("../models/userModel");

const roleCtrl = {
  getRoles: async (req, res) => {
    try {
      const role = await Roles.find();
      // if (!wilayah) return res.status(400).json({ msg: "Belum ada role petugas!" });

      res.json({ role });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getSpesificRole: async (req, res) => {
    try {
      const { role } = req.params;

      const roles = await Roles.find({ role: role }).populate({
        path: "userId",
        select: "fullName avatar",
      });

      res.json({ role: roles });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  postRole: async (req, res) => {
    try {
      const { userId, role } = req.body;

      const newRole = new Roles({
        userId,
        role,
      });

      await newRole.save();

      res.json({
        msg: "Successfully roled petugas!",
        user: { ...newRole._doc },
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  updateAllIsRuted: async (req, res) => {
    try {
      await Roles.updateMany({ isRuted: true }, { isRuted: false });

      res.json({ msg: "User Ruted" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  deleteRole: async (req, res) => {
    try {
      const id = req.params.id;

      await Roles.findOneAndDelete({ _id: id });

      res.json({ msg: "Deleted role Success!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteAllRole: async (req, res) => {
    try {
      await Roles.deleteMany({});

      res.json({ msg: "Deleted all role Success!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // ------isRuted---------
  updateIsRuted: async (req, res) => {
    try {
      const { userId } = req.params;

      const { isRuted } = req.body;

      await Roles.findOneAndUpdate(
        { userId: userId },
        {
          isRuted,
        }
      );

      res.json({ msg: "User Ruted" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  updateAllIsRuted: async (req, res) => {
    try {
      const { isRuted } = req.body;
      await Roles.updateMany({ isRuted: true }, { isRuted: isRuted });

      res.json({ msg: "User Ruted" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = roleCtrl;
