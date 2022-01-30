const mongoose = require('mongoose');

const create = new mongoose.Schema({
    author: String,
    title: String,
    description: String,
    content: String
});

const Post = mongoose.model('Post', create);

module.exports = Post;