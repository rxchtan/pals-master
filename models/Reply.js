const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const ReplySchema = new Schema({
    reply: String,
    user: String,
    id: String
});

const Reply = mongoose.model('Reply', ReplySchema);

module.exports = Reply;