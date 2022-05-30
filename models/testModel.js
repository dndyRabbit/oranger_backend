const mongoose = require("mongoose");
const { Schema } = mongoose;

const testSchema = new mongoose.Schema(
  {
    testData: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("test", testSchema);
