const Location = require("../models/locationModel");
const Rutes = require("../models/ruteModel");

const locationCtrl = {
  getLocationUser: async (req, res) => {
    try {
      const param = req.params;
      console.log(param.id);

      const UserRute = await Rutes.findOne({ userId: param.id })
        .populate([{ path: "userId", select: "fullName  gender position" }])
        .populate([{ path: "wilayahId" }]);

      res.json({ msg: "Berhasil Mengambil data", data: UserRute });
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
      console.log(body);

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
