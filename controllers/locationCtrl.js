const Location = require("../models/locationModel");

const locationCtrl = {
  getLocationUser: async (req, res) => {
    try {
      const locationData = await Location.find({}).populate([
        { path: "userId", select: "fullName avatar gender position" },
      ]);

      res.json({ msg: "Berhasil Mengambil data", locationData });
    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
  },

  postLocationUser: async (req, res) => {
    try {
      const body = req.body;

      const locationUser = new Location({
        userId: body.userId,
        latLngs: body.latLngs,
      });

      const locationData = await Location.findOne({ userId: body.userId });

      if (locationData) {
        await locationData.updateOne({ latLngs: body.latLngs });
      } else {
        await locationUser.save();
      }

      res.json({ msg: "Berhasil Mengubah/Membuat Location User" });
    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
  },
};

module.exports = locationCtrl;
