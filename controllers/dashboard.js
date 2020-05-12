const User = require("../models/user")
const Post = require("../models/post")
const Image = require("../models/image")
const Newsletter = require("../models/newsletter")
const moment = require("moment")

//------------------------------
//          DASHBOARD ROUTES
//------------------------------
exports.index = (req, res) => {
    res.render("dashboard/index", {
        title: "Dashboard",
        layout: "dashboard"
    })
}

//------------------------------
//      POSTS ROUTES
//------------------------------
exports.getPosts = (req, res) => {
    Post.find({}).then(posts =>{
        res.render("dashboard/posts", { title: "Manage Posts", posts, layout: "dashboard"})
    })
}

exports.updatePostPrivate = (req, res) => {
    Post.findOneAndUpdate({ _id: req.params.id }, {
        $set: {
            public: false,
            archived: moment().format("DD-MM-YYYY")
        }
    }, { new: true }, (err, doc) => {
        if (err) {
            console.log("Something wrong when updating data!");
        } else {
            console.log(doc)
            res.redirect("/dashboard/posts")
        }
    })
}

exports.updatePostPublic = (req, res) => {
    Post.findOneAndUpdate({ _id: req.params.id }, {
        $set: {
            public: true,
            published: moment().format("DD-MM-YYYY")
        }
    }, { new: true }, (err, doc) => {
        if (err) {
            console.log("Something wrong when updating data!");
        } else {
            console.log(doc)
            res.redirect("/dashboard/posts")
        }
    })
}

//------------------------------
//      IMAGES ROUTES
//------------------------------
exports.getImages = (req, res) => {
    Image.find({}).then(images => {
        res.render("dashboard/images", { title: "Manage Images", images, layout: "dashboard" })
    })
}

exports.uploadImage = (req, res) => {
    console.log(req.files)
    const image = req.files.image;
    const path = "./public/images/" + image.name;
    image.mv(path, (error) => {
        if (error) {
            console.error(error)
        };
        var rel_path = "/images/" + image.name
        var markdown = "![](" + rel_path + ")"
        var imageDB = new Image({
            url: rel_path,
            name: image.name,
            markdown: markdown
        })
        imageDB.save()
    })
    Image.find({}).then(images => {
        res.json(images);
    });
}

exports.deleteImage = (req, res) => {
    Image.findOneAndDelete({ _id: req.params.id }, function(err, result) {
      if (err) {
        console.log(err);
        res.redirect("/dashboard/images", errors);
      } else {
        req.flash("error", "Image deleted!");
        res.redirect("/dashboard/images");
      }
    });
}

//------------------------------
//      USERS ROUTES
//------------------------------
exports.getUsers = (req, res) => {
    User.find({}).then(users => {
        res.render("dashboard/users", { title: "Manage Users", users, layout: "dashboard" })
    })
}
