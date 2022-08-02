const Absens = require("../models/absenModel");

const absenCtrl = {
  //Post absen
  absen: async (req, res) => {
    try {
      const { newData, date } = req.body;

      const isDataExist = await Absens.findOne({ date: date });

      if (isDataExist) return res.status(400).json({ msg: "Data sudah ada" });

      const petugasAbsen = new Absens({
        date,
        petugasAbsensi: newData,
      });

      await petugasAbsen.save();

      res.json({
        msg: "Berhasil Absen!",
        absensiPetugas: {
          ...petugasAbsen._doc,
        },
      });
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  },

  patchAbsen: async (req, res) => {
    try {
      const { absenIn, absenOut, photo, statusAbsen, photo2 } = req.body;
      const { date, userId } = req.params;

      const user = await Absens.findOneAndUpdate(
        { date },
        {
          $set: {
            "petugasAbsensi.$[elem].photo": photo,
            "petugasAbsensi.$[elem].photo2": photo2,
            "petugasAbsensi.$[elem].absenIn": absenIn,
            "petugasAbsensi.$[elem].absenOut": absenOut,
            "petugasAbsensi.$[elem].statusAbsen": statusAbsen,
          },
        },
        {
          arrayFilters: [
            {
              "elem.userId": userId,
            },
          ],
        }
      );

      if (!user)
        return res
          .status(400)
          .json({ msg: "Admin belum membuat daftar absensi" });

      res.json({ msg: "Update absen berhasil" });
    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
  },

  // get status absen di tanggal tertentu, jika semua pasukan oranye telah melakukan absensi

  getAbsenByDate: async (req, res) => {
    try {
      const date = req.params.id;
      const user = await Absens.find({ date }).populate({
        path: "petugasAbsensi.userId",
        select: "fullName avatar",
      });

      if (!user)
        return res
          .status(400)
          .json({ msg: "Petugas belum melakukan absen pada tanggal ini!" });

      res.json({ user });
    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
  },
};

module.exports = absenCtrl;
