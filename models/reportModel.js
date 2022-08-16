const mongoose = require("mongoose");
const { Schema } = mongoose;

const reportSchema = new mongoose.Schema(
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
    before: {
      type: String,
    },
    progress: {
      type: String,
    },
    after: {
      type: String,
    },
    description: {
      type: String,
    },
    rtrw: {
      type: String,
    },
    alamat: {
      type: String,
    },
    date: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("report", reportSchema);
