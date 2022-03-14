require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
// const SocketServer = require("./socketServer");
// const { ExpressPeerServer } = require('peer')
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

//Routes
app.use("/api", require("./routes/authRouter"));
app.use("/api", require("./routes/petugasRouter"));
app.use("/api", require("./routes/adminRouter"));
app.use("/api", require("./routes/absenRouter"));
app.use("/api", require("./routes/wilayahRouter"));
app.use("/api", require("./routes/ruteRouter"));

const URI = process.env.MONGODB_URL;
mongoose.connect(
  URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("Connected to mongodb");
  }
);

const port = process.env.PORT || 2500;
app.listen(port, () => {
  console.log("Server is running on port", port);
});
