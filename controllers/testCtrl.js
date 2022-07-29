const Location = require("../models/locationModel");

const testCtrl = {
  getTest: async (req, res) => {
    try {
      const data = await Location.find({});

      res.json({ msg: "Berhasil Mengambil data", data });
    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
  },
  postTest: async (req, res) => {
    try {
      const { testData } = req.body;

      const testingData = new Location({
        testData: testData,
      });

      await testingData.save();

      res.json({
        msg: "Berhasil Absen!",

        ...testingData._doc,
      });
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  },
  updateTest: async (req, res) => {
    try {
      const { test } = req.body;

      const id = req.params.id;

      await Location.findOneAndUpdate(
        { _id: id },
        {
          testData: test,
        }
      );

      res.json({ msg: "Update Success!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = testCtrl;
