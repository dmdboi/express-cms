const express = require('express');
const router = express.Router();
const dashboard = require("../controllers/dashboard");
const blog = require("../controllers/posts");
const settings = require("../controllers/settings");
const gateway = require("../middleware/check-auth")

//------------------------------
//      AUTHENTICATED ROUTES
//------------------------------
router.use(gateway.checkAuthenticated)
router.get('/',  dashboard.index)

//------------------------------
//      POSTS ROUTES
//------------------------------
router.get('/posts', dashboard.getPosts)
router.get('/posts/public/:id', dashboard.updatePostPrivate)
router.get('/posts/private/:id', dashboard.updatePostPublic)

/* createPost page. */
router.get('/posts/new', gateway.checkAuthenticated, blog.getCreatePost);
router.post('/posts/new', gateway.checkAuthenticated, blog.postCreatePost)

/* editPost page. */
router.get('/posts/edit/:id', gateway.checkAuthenticated, blog.getEditPost);
router.post('/posts/edit/:id', gateway.checkAuthenticated, blog.postEditPost)

/* Delete Post. */
router.get('/posts/delete/:url', gateway.checkAuthenticated, blog.deletePost);

//------------------------------
//      IMAGES ROUTES
//------------------------------
router.get('/images', dashboard.getImages)
router.post("/images/upload", dashboard.uploadImage);
router.get("/images/delete/:id", dashboard.deleteImage);

//------------------------------
//      USERS ROUTES
//------------------------------
router.get('/users', dashboard.getUsers)

//------------------------------
//      SETTINGS ROUTES
//------------------------------

//Direct these to new Settings controller

router.get('/settings', settings.getSettings)
router.post("/settings/update", settings.postSettings);
router.post("/settings/profile-image", settings.postProfileImage);

module.exports = router;