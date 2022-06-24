import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Button } from "@material-ui/core";
import userservice from "../services/userservice";
import { message } from "antd";

class HeaderComponent extends Component {
  constructor(props) {
    super(props);

    this.state = { userName: "" };
    this.searchUser = this.searchUser.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  searchUserTweet() {
    localStorage.setItem("searchUserName", this.state.userName);
    if (this.state.userName) {
      this.props.history.push("/searchUserTweet");
      window.location.reload(false);
    }
  }
  searchUser() {
    localStorage.setItem("searchUser", this.state.userName);
    if (this.state.userName) {
      this.props.history.push("/searchUser");
      window.location.reload(false);
    }
  }

  searchUserHandler = (event) => {
    this.setState({ userName: event.target.value });
  };

  logOut() {
    let user = { email: localStorage.getItem("email") };
    userservice
      .logout(user)
      .then((res) => {
        if (res.data) {
          localStorage.setItem("email", "");
          this.props.history.push("/login");
        }
      })
      .catch((err) => {
        message.error(err.response.data.message);
      });
  }

  render() {
    return (
      <div>
        <header>
          <nav className="navbar navbar-expand-md navbar-dark bg-light">
            <div className="navbar-brand">
              <a href="/allTweets">Tweets</a>&nbsp;&nbsp;&nbsp;
              <Button
                size="small"
                component={Link}
                to="/searchAllUser"
                color="primary"
              >
                All Users
              </Button>
            </div>
            <div className="navbar">
              <input
                placeholder="Search By Username"
                name="userName"
                className="form-control"
                onChange={this.searchUserHandler}
              />
            </div>
            <div className="navbar-right">
              <Button
                size="small"
                color="primary"
                onClick={() => this.searchUserTweet()}
              >
                Get Tweet
              </Button>
              <Button
                size="small"
                color="primary"
                onClick={() => this.searchUser()}
              >
                Get User
              </Button>
            </div>
            &nbsp;&nbsp;&nbsp;
            <div className="navbar-nav mr-auto" style={{ marginLeft: "300px" }}>
              <h6 style={{ color: "blue" }}>{localStorage.getItem("email")}</h6>
            </div>
            <div className="navbar-nav mr-auto" style={{ marginLeft: "30px" }}>
              <Button
                size="small"
                color="secondary"
                variant="contained"
                disabled={localStorage.getItem("email") ? false : true}
                onClick={() => this.logOut()}
              >
                Logout
              </Button>
            </div>
          </nav>
        </header>
      </div>
    );
  }
}

export default withRouter(HeaderComponent);
