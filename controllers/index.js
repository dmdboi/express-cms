const Post = require("../models/post") 
const findAll = require("../services/findAll")

//------------------------------
//         BLOG INDEX
//------------------------------
exports.getIndex = (req, res) => {

    const query = Post.where({public: true}).sort({created_At: -1})
    const getPostPromise = findAll.get(query)

    Promise.resolve(getPostPromise)
        .then(posts => {
          res.render('index', { title: "Blog", posts: posts })
        }).catch(err => {
          console.log(err)
          res.redirect('/error');
        });

}