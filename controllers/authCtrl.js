const Users = require("../models/userModel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authCtrl = {
  register: async (req, res) => {
    try {
      const {
        fullName,
        email,
        password,
        ktp,
        gender,
        address,
        birthday,
        handphone,
      } = req.body;

      const user_email = await Users.findOne({ email });
      if (user_email)
        return res.status(400).json({ msg: "This email already exists." });

      if (password.length < 6)
        return res
          .status(400)
          .json({ msg: "Password must be at least 6 characters." });

      const passwordHash = await bcryptjs.hash(password, 12);

      const newUser = new Users({
        fullName,
        email,
        password: passwordHash,
        ktp,
        gender,
        address,
        birthday,
        handphone,
        isRoled: false,
        isVerified: false,
        position: "petugas",
      });

      const access_token = createAccessToken({ id: newUser._id });

      await newUser.save();

      res.json({
        msg: "Register Success!",
        access_token,
        user: {
          ...newUser._doc,
          password: "",
        },
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  registerAdmin: async (req, res) => {
    try {
      const { fullName, email, password } = req.body;

      const user_email = await Users.findOne({ email });
      if (user_email)
        return res.status(400).json({ msg: "This email already exists." });

      if (password.length < 6)
        return res
          .status(400)
          .json({ msg: "Password must be at least 6 characters." });

      const passwordHash = await bcryptjs.hash(password, 12);

      const newUser = new Users({
        fullName,
        email,
        password: passwordHash,
        isAdmin: false,
        position: "admin",
        root: false,
      });

      await newUser.save();

      res.json({
        msg: "Register Success!",
        user: {
          ...newUser._doc,
          password: "",
        },
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await Users.findOne({ email, position: "petugas" });
      console.log(user);

      if (!user)
        return res
          .status(400)
          .json({ msg: "Email tersebut tidak ada, silahkan hubungi Admin." });

      const isMatch = await bcryptjs.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ msg: "Password tidak benar." });

      if (!user.isVerified)
        return res.status(400).json({
          title: "Akun belum terverifikasi",
          msg: "Mohon hubungi administrasi, untuk dilakukan verifikasi",
        });

      const access_token = createAccessToken({ id: user._id });
      const refresh_token = createRefreshToken({ id: user._id });

      res.json({
        msg: "Login Success!",
        access_token,
        refresh_token,
        user: {
          ...user._doc,
          password: "",
        },
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  loginAdmin: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await Users.findOne({
        email,
        position: "admin",
      });

      if (!user)
        return res
          .status(400)
          .json({ msg: "Email tersebut tidak ada, silahkan hubungi Admin." });

      if (user.isAdmin == false)
        return res.status(400).json({
          msg: "Akun tersebut belum ter-verified, silahkan hubungi Kepala admin.",
        });

      const isMatch = await bcryptjs.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ msg: "Password tidak benar." });

      const access_token = createAccessToken({ id: user._id });
      const refresh_token = createRefreshToken({ id: user._id });

      res.json({
        msg: "Login Success!",
        access_token,
        refresh_token,
        user: {
          ...user._doc,
          password: "",
        },
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: "/api/refresh_token" });
      return res.json({ msg: "Logged out!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  generateAccessToken: async (req, res) => {
    try {
      const { rf_token } = req.body;
      if (!rf_token) return res.status(433).json({ msg: "Please login now." });

      jwt.verify(
        rf_token,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, result) => {
          console.log(err);
          if (err) return res.status(420).json({ msg: "Please login now." });

          const user = await Users.findById(result.id);

          if (!user)
            return res.status(400).json({ msg: "This does not exist." });

          const access_token = createAccessToken({ id: result.id });

          res.json({
            access_token,
            user,
            idn: result.id,
          });
        }
      );
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  generateAccessTokenMobile: async (req, res) => {
    try {
      const { rf_token } = req.body;
      console.log(rf_token);
      if (!rf_token) return res.status(433).json({ msg: "Please login now." });

      jwt.verify(
        rf_token,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, result) => {
          console.log(err);
          if (err) return res.status(420).json({ msg: "Please login now." });

          const user = await Users.findById(result.id);

          if (!user)
            return res.status(400).json({ msg: "This does not exist." });

          const access_token = createAccessToken({ id: result.id });

          res.json({
            access_token,
            user,
            idn: result.id,
          });
        }
      );
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = authCtrl;
