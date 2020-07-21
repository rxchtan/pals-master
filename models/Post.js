const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const PostSchema = new Schema({
    title: String,
    country: String,
    category: String,
    location: String,
    budget: String,
    review: String,
    type: String,
    likes: Number,
    date: { type: Date, default: Date.now }
});
const Post = mongoose.model('Post', PostSchema);

module.exports = Post;