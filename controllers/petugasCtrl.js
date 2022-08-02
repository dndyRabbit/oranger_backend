const Users = require("../models/userModel");

const petugasCtrl = {
  allPetugas: async (req, res) => {
    try {
      const user = await Users.find({ isVerified: true, position: "petugas" });
      if (!user) return res.status(400).json({ msg: "User does not exist." });

      res.json({ user });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  allPetugasIsNotVerified: async (req, res) => {
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
      const id = req.params.id;

      const { fullName, ktp, handphone, address, birthday, avatar } = req.body;

      await Users.findByIdAndUpdate(
        { _id: id },
        {
          fullName,
          ktp,
          handphone,
          address,
          birthday,
          avatar,
        }
      );

      res.json({ msg: "Update Profile Success!" });
    } catch (err) {
      console.log(err);
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

  // -----------------------------------------------------------

  updateIsRoled: async (req, res) => {
    try {
      const id = req.params.id;

      const { isRoled } = req.body;

      await Users.findOneAndUpdate(
        { _id: id },
        {
          isRoled,
        }
      );

      res.json({ msg: "User Roled" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getAllIsNotRoled: async (req, res) => {
    try {
      const user = await Users.find({
        isVerified: true,
        position: "petugas",
        isRoled: false,
      }).select("fullName avatar isRoled");
      if (!user) return res.status(400).json({ msg: "User does not exist." });

      res.json({ user });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  updateAllIsRoled: async (req, res) => {
    try {
      const { isRoled } = req.body;

      await Users.updateMany(
        { isRoled: true },
        {
          isRoled: isRoled,
        }
      );
      res.json({ msg: "Success isRoled all false" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = petugasCtrl;
