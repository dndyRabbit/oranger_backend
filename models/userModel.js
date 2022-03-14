const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    namaLengkap: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/rabbitdev/image/upload/v1629793810/e5bfbb6aa6914403c97a036bd2dfe0c2_lz6le2.jpg",
    },
    role: { type: String, required: true },
    pekerjaan: {
      type: String,
      required: true,
    },
    noKTP: {
      type: String,
      required: true,
      maxlength: 16,
      minlength: 16,
    },
    jenisKelamin: {
      type: String,
      required: true,
    },
    alamatLengkap: {
      type: String,
      required: true,
    },
    tanggalLahir: {
      type: String,
      required: true,
    },
    noHandphone: {
      type: String,
      required: true,
    },
    kelurahan: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isAdd: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", userSchema);
