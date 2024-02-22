const express = require("express");
const controllers = require("../controllers/controllers");
const usercontrollers = require("../controllers/usercontrollers");
const middlewares = require("../middlewares");
const router = express.Router();

//AUTHENTICATION AND AUTHORIZATION

router.route("/signup").post(controllers.signup);
router.route("/login").post(controllers.login);

//CREATE ,EDIT AND DELETE BLOGS
router
  .route("/newBlogs")
  .post(middlewares.authenticator, controllers.createBlog);
router
  .route("/getBlogs")
  .get(
    middlewares.authenticator,
    middlewares.cacheUserBlogs,
    controllers.getuserblog
  );
router
  .route("/getallblogs")
  .get(middlewares.cacheBlogs, controllers.getallblogs);
router
  .route("/editblogs")
  .get(middlewares.authenticator, controllers.editblogs);
router
  .route("/updateblogs")
  .patch(middlewares.authenticator, controllers.updateblogs);
router
  .route("/deleteblogs")
  .delete(middlewares.authenticator, controllers.deleteblog);
router.route("/:id").get(controllers.getoneblog);

//COMMENTS
router
  .route("/post/comment")
  .post(middlewares.authenticator, controllers.createComment);
//CREATE EDIT AND DELETE USER
router
  .route("/user/getdata")
  .get(
    middlewares.authenticator,
    middlewares.cacheUserData,
    usercontrollers.getuserdata
  );
router
  .route("/user/update")
  .patch(middlewares.authenticator, usercontrollers.updateuserdata); //*
router
  .route("/user/delete")
  .delete(middlewares.authenticator, usercontrollers.deleteuser);
router
  .route("/user/logout")
  .get(middlewares.authenticator, usercontrollers.logoutUser);

module.exports = router;
