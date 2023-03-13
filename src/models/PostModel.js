const mongoose = require('mongoose');
const PostModel = new mongoose.Schema({
    title: String,
    author: String,
    content:String,
    date: {type: Date, default: Date.now()},
    publish: Boolean
});
const Post = mongoose.model('PostModel', PostModel);