const Rutes = require("../models/ruteModel");
const Users = require("../models/userModel");

const ruteCtrl = {
  getRute: async (req, res) => {
    try {
      const id = req.params.id;
      const rute = await Rutes.find({ isAdd: true, wilayahId: id });
      if (!rute) return res.status(400).json({ msg: "Tidak ada rute" });

      res.json({ rute });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getUserIsNotAdded: async (req, res) => {
    try {
      const user = await Users.find({ isAdd: false, isVerified: true });
      if (!user)
        return res
          .status(400)
          .json({ msg: "Tidak ada user yang belum ditambahkan!" });

      res.json({ user });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  postRute: async (req, res) => {
    try {
      const {
        alamatRute,
        wilayahId,
        latlng,
        namaWilayah,
        avatar,
        isAdd,
        namaLengkap,
        userId,
      } = req.body;

      const petugas = await Rutes.findOne({ namaLengkap });

      if (petugas)
        return res
          .status(400)
          .json({ msg: "Petugas ini sudah terdaftar di wilayah!" });

      const newRute = new Rutes({
        alamatRute,
        wilayahId,
        latlng,
        namaWilayah,
        avatar,
        isAdd,
        namaLengkap,
        userId,
      });

      await newRute.save();

      res.json({ msg: "Berhasil menambahkan petugas diwilayah ini!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  deleteRute: async (req, res) => {
    try {
      const id = req.params.id;

      await Rutes.findOneAndDelete({ _id: id });

      res.json({ msg: "Hapus petugas di wilayah ini berhasil!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = ruteCtrl;
