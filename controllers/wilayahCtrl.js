const Wilayahs = require("../models/wilayahModel");
const Roles = require("../models/roleModel");
const Rutes = require("../models/ruteModel");
const Users = require("../models/userModel");

const wilayahCtrl = {
  getWilayah: async (req, res) => {
    try {
      const wilayah = await Wilayahs.find();
      // if (!wilayah) return res.status(400).json({ msg: "Belum ada Wialyah!" });

      res.json({ wilayah });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getUsersAndRoles: async (req, res) => {
    try {
      const users = await Roles.find({ isRuted: false }).populate({
        path: "userId",
        select: "fullName avatar",
      });

      res.json({ users });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getUsersAndRolesAbsensi: async (req, res) => {
    try {
      const users = await Roles.find({}).populate({
        path: "userId",
        select: "fullName avatar",
      });

      res.json({ users });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  postWilayah: async (req, res) => {
    try {
      const { wilayahAwal, wilayahAkhir, alamat, latitude, longitude } =
        req.body;

      const isWilayahAlreadyExist = await Wilayahs.findOne({
        wilayahAwal,
        wilayahAkhir,
      });

      if (isWilayahAlreadyExist)
        return res
          .status(400)
          .json({ msg: "Wilayah dengan nama ini sudah ada" });

      const newWilayah = new Wilayahs({
        wilayahAwal,
        wilayahAkhir,
        alamat,
        latitude,
        longitude,
      });

      await newWilayah.save();

      const wilayah = await Wilayahs.find();

      res.json({
        msg: "Successfully post wilayah!",
        wilayah,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  deleteAllWilayah: async (req, res) => {
    try {
      await Wilayahs.deleteMany({});

      res.json({ msg: "Deleted semua wilayah Success!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // Get User According to their Wilayah
  getUsers: async (req, res) => {
    try {
      const wilayah = await Wilayahs.find();
      // if (!wilayah) return res.status(400).json({ msg: "Belum ada Wialyah!" });

      res.json({ wilayah });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = wilayahCtrl;
