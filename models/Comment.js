const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const CommentSchema = new Schema({
    comment: String,
    user: String,
    id: String
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
