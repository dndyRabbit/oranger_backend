const mongoose = require("mongoose");

const wilayahSchema = new mongoose.Schema(
  {
    wilayah: [Object],
    marker: [Object],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("wilayah", wilayahSchema);
