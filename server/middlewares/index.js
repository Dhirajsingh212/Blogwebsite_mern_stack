const client = require("../redis");
const jwt = require("jsonwebtoken");

const getCachedData = (key) => {
  const data = client.get(key, function (err, reply) {
    if (err) {
      throw err;
    }
  });
  return data;
};

exports.cacheBlogs = async (req, res, next) => {
  try {
    const key = "blogs";
    const data = await getCachedData(key);
    if (data != null) {
      res.status(200).json({
        message: "Success",
        data: JSON.parse(data),
      });
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

exports.cacheUserBlogs = async (req, res, next) => {
  try {
    const decoded = jwt.verify(req.headers.data, process.env.SECRET);
    const key = decoded.id + "userblogs";
    const data = await getCachedData(key);
    if (data != null) {
      res.status(200).json({
        message: "Success",
        data: JSON.parse(data),
      });
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

exports.cacheUserData = async (req, res, next) => {
  try {
    if (req.headers.token === null) {
      res.status(401).json({
        msg: "unauthorized",
      });
      return;
    }
    const decoded = jwt.verify(req.headers.token, process.env.SECRET);
    const key = decoded.id;
    const data = await getCachedData(key);
    if (data != null) {
      res.status(200).json({
        message: "Success",
        data: JSON.parse(data),
      });
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
