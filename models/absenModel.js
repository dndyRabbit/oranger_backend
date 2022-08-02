const mongoose = require("mongoose");
const { Schema } = mongoose;

const absenSchema = new mongoose.Schema(
  {
    petugasAbsensi: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: "user",
          required: true,
        },

        role: {
          type: String,
          required: true,
        },

        statusAbsen: {
          type: String,
          required: true,
        },

        photo: {
          type: String,
        },
        photo2: {
          type: String,
        },

        absenIn: {
          type: String,
        },

        absenOut: {
          type: String,
        },
      },
    ],
    date: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("absen", absenSchema);
