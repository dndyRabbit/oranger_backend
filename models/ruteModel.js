const mongoose = require("mongoose");
const { Schema } = mongoose;

const ruteSchema = new mongoose.Schema(
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
    wilayahId: {
      type: Schema.Types.ObjectId,
      ref: "wilayah",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("rute", ruteSchema);
