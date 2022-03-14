const Absens = require("../models/absenModel");

const absenCtrl = {
  absen: async (req, res) => {
    try {
      const { newData, uploaded, tanggal } = req.body;

      let newTanggal = new Date(tanggal);

      const isDataExist = await Absens.findOne({ tanggal: newTanggal });

      if (isDataExist) return res.status(400).json({ msg: "Data sudah ada" });

      const petugasAbsen = new Absens({
        petugasAbsensi: newData,
        tanggal,
        isUpload: uploaded,
        isAllAbsen: false,
      });

      await petugasAbsen.save();

      res.json({
        msg: "Berhasil Absen!",
        absensiPetugas: {
          ...petugasAbsen._doc,
        },
      });
    } catch (err) {
      console.log({ err: err.message });
    }
  },

  patchAbsen: async (req, res) => {
    try {
      const { tanggal, userId, statusAbsen } = req.body;
      const id = req.params.id;

      await Absens.findOneAndUpdate(
        { _id: id, tanggal },
        {
          $set: { "petugasAbsensi.$[elem].statusAbsen": statusAbsen },
        },
        {
          arrayFilters: [
            {
              "elem._id": userId,
            },
          ],
        }
      );

      res.json({ msg: "Update absen berhasil", id });
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  },
  // get status absen di tanggal tertentu, jika semua pasukan oranye telah melakukan absensi

  getAbsenByDate: async (req, res) => {
    try {
      const date = req.params.id;
      console.log(date);
      const listOfPetugas = await Absens.find({ tanggal: date });

      if (!listOfPetugas)
        return res
          .status(400)
          .json({ msg: "Petugas belum melakukan absen pada tanggal ini!" });

      res.json({ listOfPetugas });
    } catch (err) {}
  },
};

module.exports = absenCtrl;
