import React, { Component } from "react";
import tweetservice from "../services/tweetservice";
import HeaderComponent from "./HeaderComponent";
import { message } from "antd";

class UserTweetsComponent extends Component {
  constructor(props) {
    super(props);

    this.state = { tweets: [] };
  }

  componentDidMount() {
    tweetservice
      .searchUserTweets(localStorage.getItem("searchUserName"))
      .then((res) => {
        this.setState({ tweets: res.data });
      })
      .catch((err) => {
        message.error(err.response.data.message);
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
                  <h6 className="mb-1">{tweet.userId}</h6>
                  <small>Posted On: {tweet.createdAt.substring(0, 10)}</small>
                </div>
                <div className="container">
                  <div style={{ width: "50%", float: "left" }}>
                    <h5>{tweet.tweet}</h5>
                    <h7>Likes: {tweet.likes}</h7>
                    <br></br>
                    <h7>Replies: {tweet.replies.length}</h7>
                  </div>
                </div>
              </a>

              <div className="list-group-item">
                <h6>Replies:</h6>
                {tweet.replies.map((reply) => (
                  <div className="container">
                    <a
                      href="#/"
                      className="list-group-item list-group-item-action"
                    >
                      <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">{reply.userId}</h5>
                        <small>
                          Posted On: {reply.postedDate.substring(0, 10)}
                        </small>
                      </div>
                      <big>{reply.tweet}</big>
                      {<br />}
                      <small>Likes : {reply.likes}</small>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <br></br>
        </div>
      </div>
    );
  }
}

export default UserTweetsComponent;
