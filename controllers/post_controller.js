const Post = require('../models/post');

module.exports.create = function(req,res){
    Post.create({
        content: req.body.content,
        user: req.user._id
    },function(err,post){
        if(err){
            console.log("Error in creating post",err);
        }
        Post.findById(post._id, function(err,posts){
            if(req.xhr){
                return res.status(200).json({
                    data: {
                        post: posts
                    },
                    message: "Post Created!"
                });
            }
        });
    });
    
    // console.log("Post created");
    // return res.redirect('back');
}