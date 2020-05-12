const express = require('express');
const router = express.Router();

const index = require("../controllers/index");
const blog = require("../controllers/posts");

/* GET home page. */
router.get('/', index.getIndex);

router.get('/post/:url', blog.getPost);

module.exports = router;
