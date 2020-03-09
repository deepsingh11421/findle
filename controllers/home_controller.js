const Post = require("../models/post");
const User = require("../models/user");

module.exports.home = async function(req,res){
    try{
        let posts = await Post.find({}).sort('-createdAt').populate('user');
        console.log(posts);
        return res.render('home', {
           posts: posts 
        });
    }catch(err){
        console.log("Error:",err);
    }
}