import axios from "axios";

import urls from "../config/urlconfig.json";

class TweetService {
  getAllTweets() {
    return axios.get(urls.GET_ALL_USERS_TWEET_API_URL);
  }

  postTweet(tweet) {
    return axios.post(
      urls.BASE_URL + localStorage.getItem("email") + "/add",
      tweet
    );
  }

  deleteTweet(id) {
    return axios.delete(
      urls.BASE_URL + localStorage.getItem("email") + "/delete/" + id
    );
  }
  deleteReply(id, tweetId) {
    return axios.put(
      urls.BASE_URL +
        localStorage.getItem("email") +
        "/deleteReply" +
        "/" +
        id +
        "/" +
        tweetId
    );
  }

  updateTweet(id, tweet) {
    return axios.put(
      urls.BASE_URL + localStorage.getItem("email") + "/update/" + id,
      tweet
    );
  }

  likeTweet(id) {
    return axios.put(
      urls.BASE_URL + localStorage.getItem("email") + "/like/" + id
    );
  }
  likeToReply(id, tweetId) {
    return axios.put(
      urls.BASE_URL +
        localStorage.getItem("email") +
        "/likeToReply" +
        "/" +
        id +
        "/" +
        tweetId
    );
  }

  replyTweet(id, tweet) {
    return axios.post(
      urls.BASE_URL + localStorage.getItem("email") + "/reply/" + id,
      tweet
    );
  }

  searchUserTweets(userName) {
    return axios.get(urls.BASE_URL + userName);
  }
  searchUser(userName) {
    return axios.get(urls.BASE_URL + "user/search/" + userName);
  }
}

export default new TweetService();
