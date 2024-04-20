const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Blog = require("../models/BlogModel");
const { cloudinary } = require("../cloudinary");
const client = require("../redis");
const generateTags = require("../utils");

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
      status: "success",
      token,
      data: newUser,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
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
        status: "fail",
        message: "incorrect password",
      });
    }

    const token = jwt_sign(user._id);

    res.status(200).json({
      status: "success",
      message: "successfully logged in",
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "fail",
      messege: err,
    });
  }
};

exports.createBlog = async (req, res) => {
  try {
    const decoded = jwt.verify(req.headers.data, process.env.SECRET);

    const usrId = decoded.id;

    const user = await User.find({ _id: usrId });
    let photoUrl = {
      url: "https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
    };
    if (req.body.previewSource) {
      photoUrl = await cloudinary.uploader.upload(req.body.previewSource);
    }

    const tags = await generateTags(req.body.title + req.body.descrip);

    const newBlog = await Blog.create({
      userId: decoded.id,
      username: user[0].username,
      title: req.body.title,
      description: req.body.descrip,
      code: req.body.code ? req.body.code : "",
      language: req.body.language ? req.body.language : "",
      tags,
      image: photoUrl.url,
    });

    const allBlog = await Blog.find();
    const userBlog = await Blog.find({ userId: usrId });

    client.set("blogs", JSON.stringify(allBlog), { EX: 10 });
    client.set(usrId + "userblogs", JSON.stringify(userBlog));

    res.status(200).json({
      status: "success",
      newBlog,
      data: userBlog,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "fail",
      messege: err,
    });
  }
};

exports.getuserblog = async (req, res) => {
  try {
    const decoded = jwt.verify(req.headers.data, process.env.SECRET);

    let usrId = decoded.id;

    const data = await Blog.find({ userId: usrId });

    client.set(usrId + "userblogs", JSON.stringify(data), { EX: 10 });

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

exports.getoneblog = async (req, res) => {
  try {
    const data = await Blog.findById({ _id: req.headers.params });

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

exports.getallblogs = async (req, res) => {
  try {
    const data = await Blog.find();

    client.set("blogs", JSON.stringify(data), { EX: 10 });

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.editblogs = async (req, res) => {
  try {
    const decoded = jwt.verify(req.headers.token, process.env.SECRET);

    const data = await Blog.find({ _id: req.headers.params });

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      messege: err,
    });
  }
};

exports.updateblogs = async (req, res) => {
  try {
    const decoded = jwt.verify(req.headers.token, process.env.SECRET);

    let usrId = decoded.id;

    const blog = await Blog.find({ _id: req.headers.params });

    if (blog[0].userId !== usrId) {
      return res.status(401).json({
        status: "fail",
        message: "unauthourized access",
      });
    }

    const photoUrl = { url: blog.image };

    if (req.body.previewSource) {
      photoUrl = await cloudinary.uploader.upload(req.body.previewSource);
    }
    const tags = await generateTags(req.body.title + req.body.descrip);

    await Blog.findByIdAndUpdate(
      { _id: req.headers.params },
      {
        title: req.body.title,
        description: req.body.description,
        code: req.body.code ? req.body.code : "",
        language: req.body.language ? req.body.language : "",
        tags,
        image: photoUrl.url,
      }
    );

    const allBlog = await Blog.find();
    const userBlog = await Blog.find({ userId: usrId });

    client.set("blogs", JSON.stringify(allBlog), { EX: 10 });
    client.set(usrId + "userblogs", JSON.stringify(userBlog));

    res.status(200).json({
      status: "success",
      allBlog,
      data: userBlog,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "fail",
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
        status: "fail",
        messege: "unauthorized access",
      });
    }

    await Blog.findByIdAndDelete({ _id: req.headers.params });

    const allBlog = await Blog.find();
    const userBlog = await Blog.find({ userId: usrId });

    client.set("blogs", JSON.stringify(allBlog), { EX: 10 });
    client.set(usrId + "userblogs", JSON.stringify(userBlog));

    res.status(200).json({
      status: "success",
      allBlog,
      data: userBlog,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "fail",
      messege: err,
    });
  }
};

//COMMENTS

exports.createComment = async (req, res) => {
  try {
    const decoded = jwt.verify(req.headers.token, process.env.SECRET);

    const usrId = decoded.id;
    const user = await User.findById({ _id: usrId });

    let blog = await Blog.find({ _id: req.headers.params });

    if (!user || !blog || blog.length < 1) {
      res.status(404).json({
        status: "Fail",
        message: "Not Found",
      });
    }

    const newComments = [
      ...blog[0].comments,
      {
        text: req.body.text,
        username: user.username,
        userImage: user.profilePhoto,
      },
    ];

    await Blog.findByIdAndUpdate(
      { _id: req.headers.params },
      { comments: newComments }
    );

    blog = await Blog.find({ _id: req.headers.params });

    res.status(200).json({
      status: "success",
      blog,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "Fail",
      message: "Internal server error",
    });
  }
};
