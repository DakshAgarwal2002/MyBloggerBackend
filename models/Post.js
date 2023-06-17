const mongoose = require('mongoose');
const { Schema } = mongoose;

const PostSchema = new Schema({
    user:{
        type: String,
        required:true,
    },
    board_name:{
        type: String,
        required: true
    },
    post_title:{
        type: String,
        required: true, 
    },
    description:{
        type: String,
        required: true, 
    },
    image_url:{
        type: String,
        default: "none",
    },
    likes:{
        type: Number,
        default: 0,
    },
    liked_users:{
        type: [String],
    },
    date:{
        type: Date,
        default: Date.now
    },
  });

  module.exports = mongoose.model('posts', PostSchema);