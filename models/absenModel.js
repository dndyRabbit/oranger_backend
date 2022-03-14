const mongoose = require("mongoose");

const absenSchema = new mongoose.Schema(
  {
    petugasAbsensi: [Object],
    tanggal: { type: Date, default: Date.now },
    isUpload: false,
    isAllAbsen: false,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("absen", absenSchema);
