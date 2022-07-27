const mongoose = require('mongoose');

const create = new mongoose.Schema({
    author: {
        type: String,
        default: 'Anonymous'
    },
    title: String,
    description: String,
    content: String,
    date: {
        type: Date,
        default: Date.now
    }
});

const Post = mongoose.model('Post', create);

module.exports = Post;