const mongoose = require("mongoose");
const { Schema } = mongoose;

const wilayahSchema = new mongoose.Schema(
  {
    wilayahAwal: {
      type: String,
      required: true,
    },
    wilayahAkhir: {
      type: String,
    },
    alamat: {
      type: String,
      required: true,
    },
    latitude: {
      type: String,
      default: "none",
    },
    longitude: {
      type: String,
      default: "none",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("wilayah", wilayahSchema);
