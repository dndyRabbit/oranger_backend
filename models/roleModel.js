const mongoose = require("mongoose");
const { Schema } = mongoose;

const roleSchema = new mongoose.Schema(
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
    isRuted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("role", roleSchema);
