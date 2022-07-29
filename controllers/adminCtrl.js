const Users = require("../models/userModel");

const adminCtrl = {
  updateStatusAdmin: async (req, res) => {
    try {
      const { isAdmin, id, root } = req.body;
      // if(!fullname) return res.status(400).json({msg: "Please add your full name."})

      await Users.findOneAndUpdate(
        { _id: id },
        {
          isAdmin,
          root,
        }
      );

      res.json({ msg: "Update status Admin Success!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getAdmin: async (req, res) => {
    try {
      const data = await Users.find({ position: "admin" });

      res.json({
        data: {
          head: ["no", "nama lengkap", "email", "Admin", "root"],
          body: data,
        },
        msg: "Data admin berhasil diambil.",
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = adminCtrl;
