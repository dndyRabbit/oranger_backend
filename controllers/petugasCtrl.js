const Users = require("../models/userModel");

const petugasCtrl = {
  allPetugas: async (req, res) => {
    try {
      const user = await Users.find({ role: "petugas", isVerified: true });
      if (!user) return res.status(400).json({ msg: "User does not exist." });

      res.json({ user });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getAllPetugasIsNotVerified: async (req, res) => {
    try {
      const user = await Users.find({ isVerified: false });
      if (!user) return res.status(400).json({ msg: "User does not exist." });

      res.json({ user });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getProfilePetugas: async (req, res) => {
    try {
      const user = await Users.findById({ _id: req.user._id });

      res.json({
        user,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  updatePetugas: async (req, res) => {
    try {
      const { namaLengkap, noKTP, noHandphone, alamatLengkap } = req.body;

      await Users.findOneAndUpdate(
        { _id: req.user._id },
        {
          namaLengkap,
          noKTP,
          noHandphone,
          alamatLengkap,
        }
      );

      res.json({ msg: "Update Success!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  deletePetugas: async (req, res) => {
    try {
      const id = req.params.id;

      await Users.findOneAndRemove({ _id: id });

      res.json({ msg: "Deleted petugas Success!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  updateVerifikasiPetugas: async (req, res) => {
    try {
      const id = req.params.id;

      const { isVerified } = req.body;
      console.log(id);
      await Users.findOneAndUpdate(
        { _id: id },
        {
          isVerified: isVerified,
        }
      );

      res.json({ msg: "Akun terverifikasi" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  // ----------------------------------------
  updateIsAddPetugas: async (req, res) => {
    try {
      const id = req.params.id;

      const { isAdd } = req.body;
      console.log(id);
      await Users.findOneAndUpdate(
        { _id: id },
        {
          isAdd: isAdd,
        }
      );

      res.json({ msg: "Petugas masuk ke wilayah!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getAllPetugasIsNotAddToRute: async (req, res) => {
    try {
      const user = await Users.find({ isAdd: false });
      // if (!user) return res.status(400).json({ msg: "User does not exist." });

      res.json({ user });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = petugasCtrl;
