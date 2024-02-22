const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const Blog = require("../models/BlogModel");
const { cloudinary } = require("../cloudinary");
const client = require("../redis");

exports.getuserdata = async (req, res) => {
  try {
    const decoded = jwt.verify(req.headers.token, process.env.SECRET);

    const userId = decoded.id;

    const data = await User.find({ _id: userId });

    client.set(userId, JSON.stringify(data));

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "fail",
      messege: err,
    });
  }
};

exports.updateuserdata = async (req, res) => {
  try {
    const decoded = jwt.verify(req.headers.token, process.env.SECRET);

    const userId = decoded.id;

    const photoUrl = await cloudinary.uploader.upload(req.body.previewSource);

    const data = await User.findByIdAndUpdate(
      { _id: userId },
      {
        email: req.body.email,
        username: req.body.username,
        profilePhoto: photoUrl.url,
      }
    );

    client.set(userId, JSON.stringify(data));

    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "fail",
      messege: err,
    });
  }
};

exports.deleteuser = async (req, res) => {
  try {
    const decoded = jwt.verify(req.headers.token, process.env.SECRET);

    const userId = decoded.id;

    await Blog.findOneAndDelete({ userId });
    await User.findByIdAndDelete({ _id: userId });

    client.del(userId);
    client.del(userId + "userblogs");
    const data = await Blog.find();
    client.set("blogs", JSON.stringify(data), { EX: 10 });

    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "fail",
      messege: err,
    });
  }
};

exports.logoutUser = async (req, res) => {
  try {
    const decoded = jwt.verify(req.headers.token, process.env.SECRET);

    const userId = decoded.id;

    client.del(userId);
    client.del(userId + "userblogs");

    console.log("logged out user with id:" + userId);

    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
