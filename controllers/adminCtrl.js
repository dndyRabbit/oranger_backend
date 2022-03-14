const Users = require("../models/userModel");

const adminCtrl = {
  updateAdmin: async (req, res) => {
    try {
      const {
        avatar,
        namaLengkap,
        noKTP,
        jenisKelamin,
        alamatLengkap,
        tanggalLahir,
        noHandphone,
      } = req.body;
      // if(!fullname) return res.status(400).json({msg: "Please add your full name."})

      await Users.findOneAndUpdate(
        { _id: req.user._id },
        {
          avatar,
          namaLengkap,
          noKTP,
          jenisKelamin,
          alamatLengkap,
          tanggalLahir,
          noHandphone,
        }
      );

      res.json({ msg: "Update Success!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = adminCtrl;
