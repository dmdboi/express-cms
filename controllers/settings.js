const User = require("../models/user")

exports.getSettings = (req, res) => {
    User.findOne({ email: req.user.email}).then(user => {
        res.render("dashboard/settings", { title: "Settings", user, layout: "dashboard" })
    })
}

exports.postSettings = (req, res) => {
  User.findOneAndUpdate({ email: req.user.email }, { $set: {
      username: req.body.username,
      email: req.body.email
  }}).then(user => {
    res.redirect("/dashboard/settings")
  });
};

exports.postProfileImage = (req, res) => {
    const image = req.files.image;
    const path = "./public/images/" + image.name;
    const rel_path = "/images/" + image.name;
    image.mv(path, error => {
      if (error) {
        console.error(error);
      }
      var markdown = "![](" + rel_path + ")";
      var imageDB = new Image({
        url: rel_path,
        name: image.name,
        markdown: markdown
      });
      imageDB.save();
    });
  User.findOneAndUpdate(
    { email: req.user.email },
    {
      $set: {
        image: rel_path
      }
    }
  ).then(user => {
    res.redirect("/dashboard/settings");
  });
}