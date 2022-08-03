const Rutes = require("../models/ruteModel");

const ruteCtrl = {
  postRutes: async (req, res) => {
    try {
      const { role, userId, wilayahId, roleId } = req.body;

      const isRuteExist = await Rutes.findOne({
        userId,
      });

      if (isRuteExist)
        return res
          .status(400)
          .json({ msg: "Petugas sudah terdaftar diwilayah!" });

      const newRutes = new Rutes({
        role,
        userId,
        wilayahId,
        roleId,
      });

      await newRutes.save();

      res.json({
        msg: "Successfully post wilayah!",
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getUserRuteByUserId: async (req, res) => {
    try {
      const userId = req.params.userId;

      const userLocation = await Rutes.findOne({ userId })
        .populate([{ path: "userId", select: "fullName avatar" }])
        .populate({ path: "wilayahId" });

      if (!userLocation)
        return res.status(400).json({ msg: "Wilayah ini tidak ada!" });

      res.json({
        msg: "Get data berhasil.",
        data: userLocation,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getUserRuteAccordingWilayah: async (req, res) => {
    try {
      const wilayahId = req.params.wilayahId;

      const user = await Rutes.find({ wilayahId })
        .populate([{ path: "userId", select: "fullName avatar" }])
        .populate({ path: "wilayahId" });

      if (!user) return res.status(400).json({ msg: "Wilayah ini tidak ada!" });

      res.json({
        user,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  deleteUserRute: async (req, res) => {
    try {
      const ruteId = req.params.ruteId;

      const user = await Rutes.deleteOne({
        _id: ruteId,
      });

      if (!user) return res.status(400).json({ msg: "Rute User tidak ada!" });

      res.json({
        msg: "Delete Rute Petugas berhasil!",
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteAllUserRute: async (req, res) => {
    try {
      await Rutes.deleteMany({});

      res.json({
        msg: "Delete semua rute petugas berhasil!",
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = ruteCtrl;
