const Reports = require("../models/reportModel");

const reportCtrl = {
  postReport: async (req, res) => {
    try {
      const {
        role,
        userId,
        before,
        progress,
        after,
        description,
        date,
        rtrw,
        alamat,
      } = req.body;
      const report = await Reports.findOne({ userId, date: date });

      if (report)
        return res
          .status(400)
          .json({ msg: `User sudah melapor pekerjaan pada tanggal ${date}` });

      const newReport = new Reports({
        role,
        userId,
        before,
        progress,
        after,
        description,
        date,
        rtrw,
        alamat,
      });

      await newReport.save();

      res.json({
        msg: "Successfully post wilayah!",
        report: {
          ...newReport._doc,
        },
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getAllReport: async (req, res) => {
    try {
      const { date } = req.params;
      const report = await Reports.find({ date }).populate([
        { path: "userId", select: "fullName avatar" },
      ]);

      res.json({
        report,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getReport: async (req, res) => {
    try {
      const { userId, date } = req.params;
      const report = await Reports.findOne({ date: date, userId });

      res.json({ report });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = reportCtrl;
