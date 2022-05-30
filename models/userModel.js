const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
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
    ktp: {
      type: String,
    },
    gender: {
      type: String,
    },
    address: {
      type: String,
    },
    birthday: {
      type: String,
    },
    handphone: {
      type: String,
    },
    isRoled: {
      type: Boolean,
    },
    isVerified: {
      type: Boolean,
    },
    isAdmin: {
      type: Boolean,
    },
    root: {
      type: Boolean,
    },
    position: {
      type: String,
    },
    latLngs: {
      type: Object,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", userSchema);
