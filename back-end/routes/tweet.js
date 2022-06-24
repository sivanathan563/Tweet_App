import express from "express";
import {
  deleteReply,
  deleteTweet,
  getAllTweet,
  getUserTweet,
  likeToReply,
  likeTweet,
  postTweet,
  replyTweet,
  updateTweet,
} from "../controllers/tweets.js";
// import { register, login } from "../controllers/user.js";
import {
  register,
  login,
  logout,
  forgotPassword,
  getUser,
  getAllUser,
} from "../controllers/user.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/forgot", forgotPassword);
router.get("/all", getAllTweet);
router.get("/users/all", getAllUser);
router.get("/user/search/:username", getUser);
router.get("/:username", getUserTweet);
router.post("/:username/add", postTweet);
router.put("/:username/update/:id", updateTweet);
router.delete("/:username/delete/:id", deleteTweet);
router.put("/:username/deleteReply/:id/:tweetId", deleteReply);
router.put("/:username/like/:id", likeTweet);
router.put("/:username/likeToReply/:id/:tweetId", likeToReply);
router.post("/:username/reply/:id", replyTweet);

export default router;
