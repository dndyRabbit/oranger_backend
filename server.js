require("dotenv").config();
const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const cookieParser = require("cookie-parser");
// const { ExpressPeerServer } = require('peer')
const path = require("path");

const app = express();
app.use(express.json());

app.set("trust proxy", 1);

app.use(
  session({
    secret:
      process.env.REFRESH_TOKEN_SECRET || "yourrefxzCzczvdvdvreshtokensecret",
    saveUninitialized: false,
    resave: false,
  })
);

// app.use(
//   cors({
//     credentials: true,
//     origin: ["https://orangeradministration.netlify.app"],
//   })
// );
app.use(cors());

//Routes
app.use("/api", require("./routes/authRouter"));
app.use("/api", require("./routes/petugasRouter"));
app.use("/api", require("./routes/adminRouter"));
app.use("/api", require("./routes/absenRouter"));
app.use("/api", require("./routes/wilayahRouter"));
app.use("/api", require("./routes/roleRouter"));
app.use("/api", require("./routes/ruteRouter"));
app.use("/api", require("./routes/reportRouter"));
app.use("/api", require("./routes/permissionRouter"));
app.use("/api", require("./routes/locationRouter"));

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
