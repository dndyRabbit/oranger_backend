const Users = require("../models/userModel");

const locationCtrl = {
  updateUserLatLngs: async (req, res) => {
    try {
      const userId = req.params.userId;
      const { latLngs } = req.body;

      await Users.findOneAndUpdate(
        { _id: userId },
        {
          latLngs,
        }
      );

      res.json({ msg: "Update LatLngs Successfull!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = locationCtrl;
