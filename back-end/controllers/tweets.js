import Mongoose from "mongoose";
import Tweets from "../model/tweetDetails.js";
import userDetails from "../model/userDetails.js";

export const postTweet = async (req, res) => {
  const { username: email } = req.params;
  const { tweet, tag } = req.body;
  try {
    const findUser = await userDetails.findOne({ email });
    if (findUser && tweet.length <= 144 && tag.length <= 50) {
      await Tweets.create({
        tweet,
        tag: `#${tag}`,
        userId: findUser.userId,
        user: findUser,
      });
    } else if (tweet.length > 144) {
      res
        .status(400)
        .json({ message: "Tweet must be lessthan 144 characters..." });
    } else if (tag.length > 50) {
      res
        .status(400)
        .json({ message: "Tag must be lessthan 144 characters..." });
    } else {
      res.status(400).json({ message: "User not available.." });
    }
    res.status(200).json({ message: "Tweet Posted Successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong.." });
  }
};

export const getAllTweet = async (req, res) => {
  try {
    const getTweets = await Tweets.find();
    res.status(200).json(getTweets);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong.." });
  }
};

export const getUserTweet = async (req, res) => {
  try {
    const { username } = req.params;
    const getTweets = await Tweets.find({ userId: new RegExp(username, "i") });
    if (getTweets.length > 0) {
      res.status(200).json(getTweets);
    } else {
      res.status(404).json({ message: "Tweet Not Available" });
    }
    res.status(200).json(getTweets);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong.." });
  }
};

export const likeTweet = async (req, res) => {
  try {
    const { id } = req.params;
    const findTweet = await Tweets.findById(id);
    let likecount = findTweet.likes + 1;
    await Tweets.findByIdAndUpdate(
      id,
      {
        likes: likecount,
      },
      { new: true }
    );
    res.status(200).json({ message: "success" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong.." });
  }
};
export const likeToReply = async (req, res) => {
  try {
    const { id, tweetId } = req.params;
    const findTweet = await Tweets.findById(tweetId);
    let msg = "Reply Not Available";
    if (!findTweet) res.status(400).json({ message: "Tweet Not Available" });
    findTweet.replies.forEach((rply) => {
      if (rply.id === id) {
        rply.likes++;
        msg = "Like Reply";
      }
    });
    const a = await Tweets.findByIdAndUpdate(tweetId, findTweet, { new: true });
    res.status(200).json({ message: msg });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong.." });
  }
};

export const updateTweet = async (req, res) => {
  try {
    const { id } = req.params;
    const { description: newTweet } = req.body;
    await Tweets.findByIdAndUpdate(
      id,
      {
        tweet: newTweet,
      },
      { new: true }
    );
    res.status(200).json({ message: "success" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong.." });
  }
};

export const replyTweet = async (req, res) => {
  const { username: email, id } = req.params;
  const { tweet } = req.body;
  try {
    const findTweet = await Tweets.findById(id);
    const findUser = await userDetails.findOne({ email });
    if (findUser) {
      if (!Mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send("No Tweet with that id");
      const reply = {
        id: Math.random().toString(36).substr(2, 12),
        tweet: tweet,
        postedDate: new Date(),
        likes: 0,
        user: findUser,
      };
      if (findTweet) {
        findTweet.replies.push(reply);
        await Tweets.findByIdAndUpdate(id, findTweet, { new: true });
        res.status(200).json({ message: "Tweet Posted Successfully!" });
      } else {
        res.status(400).json({ message: "Tweet not availble..." });
      }
    } else {
      res.status(400).json({ message: "User not available..." });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong.." });
  }
};

export const deleteTweet = async (req, res) => {
  const { id } = req.params;

  if (!Mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No Tweet with this id available");

  await Tweets.findByIdAndRemove(id);
  res.json({ message: "Tweet deleted successfully" });
};

export const deleteReply = async (req, res) => {
  try {
    const { id, tweetId } = req.params;
    const findTweet = await Tweets.findById(tweetId);

    if (!findTweet) res.status(400).json({ message: "Tweet Not Available" });

    let filteredReply = findTweet.replies.filter((rply) => rply.id !== id);

    if (filteredReply.length === findTweet.replies.length)
      res.status(400).json({ message: "Reply Not Available" });

    findTweet.replies = filteredReply;
    await Tweets.findByIdAndUpdate(tweetId, findTweet, { new: true });

    res.status(200).json({ message: "Reply Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong.." });
  }
};
