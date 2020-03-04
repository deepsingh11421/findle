const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId
    }
},{
    timestamps: true
});

const Post = mongoose.model('Post',PostSchema);
module.exports = Post;