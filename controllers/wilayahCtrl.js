const Wilayahs = require("../models/wilayahModel");

const wilayahCtrl = {
  getWilayah: async (req, res) => {
    try {
      const wilayah = await Wilayahs.find();
      // if (!wilayah) return res.status(400).json({ msg: "Belum ada Wialyah!" });

      res.json({ wilayah });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  postWilayah: async (req, res) => {
    try {
      const { wilayah, marker } = req.body;

      const newWilayah = new Wilayahs({
        wilayah,
        marker,
      });

      await newWilayah.save();

      res.json({ msg: "Successfully add wilayah!", ...newWilayah._doc });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  updateWilayah: async (req, res) => {
    try {
      const id = req.params.id;
      const { wilayah, marker } = req.body;

      console.log(wilayah, marker);

      const wilayahs = await Wilayahs.findOne({ _id: id });

      await Wilayahs.findOneAndUpdate(
        { _id: id },
        {
          wilayah: wilayahs.wilayah.concat(wilayah),
          marker: wilayahs.marker.concat(marker),
        }
      );

      res.json({
        msg: "Update wilayah Success!",
        wilayah: wilayah,
        marker: marker,
      });
      console.log(wilayahs);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  deleteWilayah: async (req, res) => {
    try {
      const id = req.params.id;

      await Wilayahs.findOneAndDelete({ _id: id });

      res.json({ msg: "Deleted wilayah Success!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = wilayahCtrl;
