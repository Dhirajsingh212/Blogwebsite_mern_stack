const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Blog = require('../models/BlogModel');
const {cloudinary}=require('../cloudinary');


const jwt_sign = (id) => {
  return (token = jwt.sign({ id }, process.env.SECRET, {
    expiresIn: process.env.END,
  }));
};

exports.signup = async (req, res) => {
  try {
    const newUser = await User.create({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    const token = jwt_sign(newUser._id);

    res.status(200).json({
      status: 'success',
      token,
      data: newUser,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    const correct = await bcrypt.compare(password, user.password);

    if (!correct) {
      return res.status(401).json({
        status: 'fail',
        message: 'incorrect password',
      });
    }

    const token = jwt_sign(user._id);

    res.status(200).json({
      status: 'success',
      message: 'successfully logged in',
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 'fail',
      messege: err,
    });
  }
};

exports.createBlog = async (req, res) => {
  try {
    const decoded = jwt.verify(req.headers.data, process.env.SECRET);

    const usrId = decoded.id;

    const user = await User.find({ _id: usrId });

    const photoUrl=await cloudinary.uploader.upload(req.body.previewSource);


    const newBlog = await Blog.create({
      userId: decoded.id,
      username: user[0].username,
      title: req.body.title,
      description: req.body.descrip,
      image: photoUrl.url,
    });

    console.log(newBlog);

    res.status(200).json({
      status: 'success',
      data: newBlog,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 'fail',
      messege: err,
    });
  }
};

exports.getuserblog = async (req, res) => {
  try {
    const decoded = jwt.verify(req.headers.data, process.env.SECRET);
    var usrId = decoded.id;

    const data = await Blog.find({ userId: usrId });

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

exports.getoneblog = async (req, res) => {
  try {
    const data = await Blog.findById({ _id: req.headers.params });

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

exports.getallblogs = async (req, res) => {
  try {
    const data = await Blog.find();

    res.status(200).json({
      status: 'success',
      data,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.editblogs = async (req, res) => {
  try {
    const data = await Blog.find({ _id: req.headers.params });

    res.status(200).json({
      status: 'success',
      data,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      messege: err,
    });
  }
};

exports.updateblogs = async (req, res) => {
  try {
    const decoded = jwt.verify(req.headers.token, process.env.SECRET);

    var usrId = decoded.id;

    const blog = await Blog.find({ _id: req.headers.params });

    if (blog[0].userId !== usrId) {
      return res.status(401).json({
        status: 'fail',
        message: 'unauthourized access',
      });
    }
    
    const photoUrl=await cloudinary.uploader.upload(req.body.previewSource);

    await Blog.findByIdAndUpdate(
      { _id: req.headers.params },
      {
        title: req.body.title,
        description: req.body.description,
        image: photoUrl.url,
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

exports.deleteblog = async (req, res) => {
  try {
    const decoded = jwt.verify(req.headers.token, process.env.SECRET);
    const usrId = decoded.id;

    const blog = await Blog.find({ _id: req.headers.params });

    if (blog[0].userId !== usrId) {
      return res.status(401).json({
        status: 'fail',
        messege: 'unauthorized access',
      });
    }

    await Blog.findByIdAndDelete({ _id: req.headers.params });

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
