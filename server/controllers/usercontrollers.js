const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
const {cloudinary}=require('../cloudinary')

exports.getuserdata = async (req, res) => {
  try {
    const decoded = jwt.verify(req.headers.token, process.env.SECRET);

    if (!decoded) {
      return res.status(401).json({
        status: 'fail',
        message: 'unauthorized access',
      });
    }

    const userId = decoded.id;

    const data = await User.find({ _id: userId });

    res.status(200).json({
      status: 'success',
      data,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 'fail',
      messege: err,
    });
  }
};

exports.updateuserdata = async (req, res) => {
  try {
    const decoded = jwt.verify(req.headers.token, process.env.SECRET);

    if (!decoded) {
      return res.status(401).json({
        status: 'fail',
        messege: 'unauthorized access',
      });
    }

    const userId = decoded.id;

    const photoUrl=await cloudinary.uploader.upload(req.body.previewSource);

    await User.findByIdAndUpdate(
      { _id: userId },
      {
        email: req.body.email,
        username: req.body.username,
        profilePhoto: photoUrl.url,
      }
    );

    res.status(200).json({
      status: 'success',
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 'fail',
      messege: err,
    });
  }
};

exports.deleteuser = async (req, res) => {
  try {
    const decoded = jwt.verify(req.headers.token, process.env.SECRET);
    if (!decoded) {
      return res.status(401).json({
        status: 'fail',
        messege: 'unauthorized access',
      });
    }

    const userId = decoded.id;

    await User.findByIdAndDelete({ _id: userId });

    res.status(200).json({
      status: 'success',
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 'fail',
      messege: err,
    });
  }
};
