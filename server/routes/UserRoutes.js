const express = require("express");
const controllers = require("../controllers/controllers");
const usercontrollers = require("../controllers/usercontrollers");
const middlewares = require("../middlewares");
const router = express.Router();

//AUTHENTICATION AND AUTHORIZATION
router.route("/signup").post(controllers.signup);
router.route("/login").post(controllers.login);

//CREATE ,EDIT AND DELETE BLOGS
router.route("/newBlogs").post(controllers.createBlog);
router
  .route("/getBlogs")
  .get(middlewares.cacheUserBlogs, controllers.getuserblog);
router
  .route("/getallblogs")
  .get(middlewares.cacheBlogs, controllers.getallblogs);
router.route("/editblogs").get(controllers.editblogs);
router.route("/updateblogs").patch(controllers.updateblogs);
router.route("/deleteblogs").delete(controllers.deleteblog);
router.route("/:id").get(controllers.getoneblog);

//COMMENTS
router.route("/post/comment").post(controllers.createComment);
//CREATE EDIT AND DELETE USER
router
  .route("/user/getdata")
  .get(middlewares.cacheUserData, usercontrollers.getuserdata);
router.route("/user/update").patch(usercontrollers.updateuserdata); //*
router.route("/user/delete").delete(usercontrollers.deleteuser);
router.route("/user/logout").get(usercontrollers.logoutUser);

module.exports = router;
