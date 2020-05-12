const slugify = require("slugify");
const moment = require("moment")
const Post = require("../models/post") 
const showdown = require("showdown");

const findOne = require("../services/findOne")
const findAll = require("../services/findAll")
const findOneAndDelete = require("../services/findOneAndDelete")

converter = new showdown.Converter();

//------------------------------
//         POST ROUTE
//------------------------------
exports.getPost = (req, res) => {

    const query = Post.where({slug: req.params.url})
    const getPostPromise = findOne.get(query)

    Promise.resolve(getPostPromise)
    .then(post => {
        res.render("post", { title: post.title, lead: post.created_At, post: post, content: converter.makeHtml(post.markdown)});
    })
    .catch(err => {
      console.log(err)
      res.redirect('/error');
    });
}

//write category logic here

//move this to dashboard controller

//------------------------------
//          CREATE ROUTES
//------------------------------
exports.getCreatePost = (req, res) => {
    res.render('dashboard/createPost');
}

exports.postCreatePost = (req, res) => {
    var title = req.body.title;
    var url = slugify(title.toLowerCase());
    const post = new Post({
      title: req.body.title,
      category: req.body.category,
      created_At: moment().format("DD-MM-YYYY"),
      markdown: req.body.markdown,
      slug: url,
      image: req.body.image
    });
    post.save((err, result) => {
      if (err) {
        console.log(err);
        res.redirect("/dsahboard/post/new");
      } else {
        console.log("Post saved to database");
        req.flash('success', 'Post created!');
        res.redirect("/post/" + url);
      }
    });
}

//------------------------------
//          DELETE ROUTE
//------------------------------
exports.deletePost = (req, res) => {
    const errors = req.flash().error || ['Post Deleted'];
    Post.findOneAndDelete({ slug: req.params.url }, function (err, result) {
      if (err) {
        console.log(err)
        res.redirect("/dashboard/posts", errors);
      } else {
        req.flash('error', 'Post deleted!');
        res.redirect("/dashboard/posts");
      }
    })
}

//------------------------------
//          EDIT ROUTES
//------------------------------
exports.getEditPost = async (req, res) => {
  Post.findOne({ _id: req.params.id }).then(post => {
    res.render("dashboard/editPost", { title: "Edit Post", post: post})
  });
};

exports.postEditPost = async (req, res) => {
  var title = req.body.title;
  var url = slugify(title.toLowerCase());
  console.log(req.body)
  Post.findOneAndUpdate({ _id: req.params.id }, {
    $set: {
      title: req.body.title,
      category: req.body.category,
      created_At: moment().format("DD-MM-YYYY"),
      markdown: req.body.markdown,
      slug: url,
      image: req.body.image
    }
  }, { new: true }, (err, doc) => {
    if (err) {
      console.log("Something wrong when updating data!");
    }
    res.redirect("/post/" + url)
  })
}