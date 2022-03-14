const mongoose = require("mongoose");

const ruteSchema = new mongoose.Schema(
  {
    namaLengkap: {
      type: String,
      required: true,
      trim: true,
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/rabbitdev/image/upload/v1629793810/e5bfbb6aa6914403c97a036bd2dfe0c2_lz6le2.jpg",
    },
    namaWilayah: {
      type: String,
      required: true,
    },
    latlng: {
      type: Object,
      required: true,
    },
    wilayahId: {
      type: String,
      required: true,
    },
    alamatRute: {
      type: String,
      required: true,
    },
    isAdd: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("rute", ruteSchema);
