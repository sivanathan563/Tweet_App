import React, { Component } from "react";
import tweetservice from "../services/tweetservice";
import HeaderComponent from "./HeaderComponent";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import Comment from "@material-ui/icons/Comment";
import DeleteIcon from "@material-ui/icons/Delete";
import { Button } from "@material-ui/core";
import { message } from "antd";

class TweetsComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tweets: [],
      replies: [],
      tweetMessage: "",
      tagMessage: "",
      tweetReply: "",
      tweetUpdate: "",
    };
    this.postTweet = this.postTweet.bind(this);
    this.replyTweet = this.replyTweet.bind(this);
    this.deleteTweet = this.deleteTweet.bind(this);
    this.likeTweet = this.likeTweet.bind(this);
    this.updateTweet = this.updateTweet.bind(this);
  }

  postTweet() {
    let tweet = {
      tweet: this.state.tweetMessage,
      tag: this.state.tagMessage,
    };
    tweetservice
      .postTweet(tweet)
      .then((res) => {
        if (res.data) this.props.history.push("/allTweets");
        window.location.reload(false);
      })
      .catch((err) => {
        message.error(err.response.data.message);
      });
  }

  postTweetHandler = (event) => {
    this.setState({ tweetMessage: event.target.value });
  };
  postTagHandler = (event) => {
    this.setState({ tagMessage: event.target.value });
  };

  replyTweet(id) {
    let tweet = {
      tweet: this.state.tweetReply,
    };
    tweetservice
      .replyTweet(id, tweet)
      .then(() => {
        this.props.history.push("/allTweets");
        window.location.reload(false);
      })
      .catch((err) => {
        message.error(err.response.data.message);
      });
    window.location.reload(false);
  }

  replyTweetHandler = (event) => {
    this.setState({ tweetReply: event.target.value });
  };

  deleteTweet(id) {
    tweetservice
      .deleteTweet(id)
      .then(() => {
        this.props.history.push("/allTweets");
        window.location.reload(false);
      })
      .catch((err) => {
        message.error(err.response.data.message);
      });
    window.location.reload(false);
  }
  deleteReply(id, tweetId) {
    tweetservice
      .deleteReply(id, tweetId)
      .then(() => {
        this.props.history.push("/allTweets");
        window.location.reload(false);
      })
      .catch((err) => {
        message.error(err.response.data.message);
      });
    window.location.reload(false);
  }

  likeTweet(id) {
    tweetservice
      .likeTweet(id)
      .then(() => {
        this.props.history.push("/allTweets");
        window.location.reload(false);
      })
      .catch((err) => {
        message.error(err.response.data.message);
      });
    window.location.reload(false);
  }
  likeToReply(id, tweetId) {
    tweetservice
      .likeToReply(id, tweetId)
      .then(() => {
        this.props.history.push("/allTweets");
        window.location.reload(false);
      })
      .catch((err) => {
        message.error(err.response.data.message);
      });
    window.location.reload(false);
  }

  updateTweet(id) {
    let tweet = {
      description: this.state.tweetUpdate,
    };
    tweetservice
      .updateTweet(id, tweet)
      .then(() => {
        this.props.history.push("/allTweets");
        window.location.reload(false);
      })
      .catch((err) => {
        message.error(err.response.data.message);
      });
  }

  updateTweetHandler = (event) => {
    this.setState({ tweetUpdate: event.target.value });
  };

  componentDidMount() {
    tweetservice.getAllTweets().then((res) => {
      this.setState({ tweets: res.data });
    });
  }

  render() {
    return (
      <div>
        <HeaderComponent />
        <div className="container" style={{ width: "70%", float: "left" }}>
          <h2>ALL TWEETS</h2>
          {this.state.tweets.map((tweet) => (
            <div className="list-group" style={{ width: "20 px" }}>
              <a
                href="#/"
                className="list-group-item list-group-item-info"
                aria-current="true"
              >
                <div className="d-flex w-100 justify-content-between">
                  <big className="mb-1">{tweet.user.userId}</big>
                  <small>Posted On: {tweet.createdAt.substring(0, 10)}</small>
                </div>

                <div className="container">
                  <div style={{ width: "60%", float: "left" }}>
                    <h5>{tweet.tweet}</h5>
                    <small className="mb-1">{tweet.tag}</small>
                  </div>
                  <div style={{ width: "30%", float: "right" }}>
                    <textarea
                      rows="1"
                      cols="1"
                      placeholder="Type your tweet here ..."
                      name="tweetUpdate"
                      className="form-control"
                      onChange={this.updateTweetHandler}
                    />
                    <br></br>
                    <Button
                      size="small"
                      color="primary"
                      variant="contained"
                      disabled={
                        localStorage.getItem("email") === tweet.user.email
                          ? false
                          : true
                      }
                      onClick={() => this.updateTweet(tweet._id)}
                    >
                      Update
                    </Button>
                  </div>
                  <div style={{ width: "10%", float: "left" }}>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => this.likeTweet(tweet._id)}
                    >
                      <ThumbUpAltIcon fontSize="small" /> {tweet.likes}
                    </Button>
                  </div>
                  <div style={{ width: "10%", float: "left" }}>
                    <Button size="small" color="primary">
                      <Comment fontSize="small" /> {tweet.replies.length}
                    </Button>
                  </div>
                  <div style={{ width: "10%", float: "right" }}>
                    <Button
                      size="small"
                      color="secondary"
                      disabled={
                        localStorage.getItem("email") === tweet.user.email
                          ? false
                          : true
                      }
                      onClick={() => this.deleteTweet(tweet._id)}
                    >
                      <DeleteIcon fontSize="small" />
                    </Button>
                  </div>
                </div>
              </a>

              <div className="list-group-item">
                <div className="container">
                  <div style={{ width: "85%", float: "left" }}>
                    <textarea
                      rows="1"
                      cols="1"
                      placeholder="Type your tweet here ..."
                      name="tweetReply"
                      className="form-control"
                      onChange={this.replyTweetHandler}
                    />
                  </div>
                  <div style={{ width: "10%", float: "right" }}>
                    <Button
                      size="small"
                      color="primary"
                      variant="contained"
                      onClick={() => this.replyTweet(tweet._id)}
                    >
                      Reply
                    </Button>
                  </div>
                </div>
                <br></br>
                <br></br>
                {tweet.replies.length > 0 ? (
                  <div className="container">
                    <h6>Replies:</h6>
                    {tweet.replies.map((reply) => (
                      <div className="container">
                        <a
                          href="#/"
                          className="list-group-item list-group-item-action"
                        >
                          <div className="d-flex w-100 justify-content-between">
                            <small className="mb-1">{reply.user.userId}</small>
                            <small>
                              Posted On: {reply.postedDate.substring(0, 10)}
                            </small>
                          </div>
                          <div style={{ width: "80%", float: "left" }}>
                            <big>{reply.tweet}</big>
                          </div>

                          <div style={{ width: "10%", float: "left" }}>
                            <Button
                              size="small"
                              color="primary"
                              onClick={() =>
                                this.likeToReply(reply.id, tweet._id)
                              }
                            >
                              <ThumbUpAltIcon fontSize="small" /> {reply.likes}
                            </Button>
                          </div>
                          <div style={{ width: "10%", float: "left" }}>
                            <Button
                              size="small"
                              color="secondary"
                              disabled={
                                localStorage.getItem("email") ===
                                reply.user.email
                                  ? false
                                  : true
                              }
                              onClick={() =>
                                this.deleteReply(reply.id, tweet._id)
                              }
                            >
                              <DeleteIcon fontSize="small" />
                            </Button>
                          </div>

                          {<br />}
                        </a>
                        &nbsp;
                      </div>
                    ))}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          ))}
          <br></br>
        </div>
        <div className="container" style={{ width: "30%", float: "right" }}>
          <h2>Post tweet</h2>
          <form>
            <div className="form-group">
              <textarea
                rows="10"
                cols="20"
                placeholder="Type your tweet here ..."
                name="tweetMessage"
                className="form-control"
                onChange={this.postTweetHandler}
              />
              <textarea
                rows="1"
                cols="20"
                placeholder="Type your tag here ..."
                name="tagMessage"
                className="form-control"
                onChange={this.postTagHandler}
              />
            </div>
          </form>
          <br></br>
          <button className="btn btn-success" onClick={this.postTweet}>
            Post Tweet
          </button>
        </div>
      </div>
    );
  }
}

export default TweetsComponent;
