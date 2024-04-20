const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const UserRoutes = require("./routes/UserRoutes");
const client = require("./redis");

dotenv.config({ path: "./.env" });

const DB_PORT = process.env.DB_LOCAL;
mongoose.set("strictQuery", false);
mongoose
  .connect(DB_PORT)
  .then(() => {
    console.log("db connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });

client.connect();
client.on("connect", function () {
  console.log("redis-Connected!");
});

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(morgan("dev"));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use("/", UserRoutes);

module.exports = app;
