import Mongoose from "mongoose";

const tweetSchema = Mongoose.Schema({
  tweet: {
    type: String,
  },
  tag: { type: String },
  userId: { type: String },
  likes: {
    type: Number,
    default: 0,
  },
  user: {
    type: Object,
  },
  replies: {
    type: [Object],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  id: { type: String },
});

const Tweets = Mongoose.model("Tweets", tweetSchema);

export default Tweets;
