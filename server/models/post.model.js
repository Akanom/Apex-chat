import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  text: {
    type: String,
    required: "Input text!",
  },
  photo: {
    data: Buffer,
    contentType: String,
  },
  //creating a post should require users to be first signed in
  postedBy: { type: mongoose.Schema.ObjectId, ref: "User" },
  created: { type: Date, default: Date.now },
  likes: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
  comments: [
    {
      text: String,
      created: { type: Date, default: Date.now },
      postedBy: { type: mongoose.Schema.ObjectId, ref: "User" },
    },
  ],
});

export default mongoose.model("Post", PostSchema);
