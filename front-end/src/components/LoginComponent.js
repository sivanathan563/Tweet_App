import React, { Component } from "react";
import userservice from "../services/userservice";
import { message } from "antd";
import "antd/dist/antd.min.css";

class LoginComponent extends Component {
  constructor(props) {
    super(props);

    this.state = { email: "", password: "" };
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
  }

  register() {
    this.props.history.push("/register");
  }

  login() {
    let user = { email: this.state.email, password: this.state.password };
    userservice
      .login(user)
      .then((res) => {
        if (res.data) {
          localStorage.setItem("email", this.state.email);
          this.props.history.push("/allTweets");
        } else message.error("invalid username or password ! Please Retry.");
      })
      .catch((err) => {
        message.error(err.response.data.message);
      });
  }

  emailHandler = (event) => {
    this.setState({ email: event.target.value });
  };

  passwordHandler = (event) => {
    this.setState({ password: event.target.value });
  };

  render() {
    return (
      <div
        className="container"
        style={{
          width: "70%",
        }}
      >
        <h2>TweetApp Login</h2>

        <form>
          <div class="form-outline mb-4">
            <input
              type="email"
              id="form2Example1"
              class="form-control"
              onChange={this.emailHandler}
            />
            <label class="form-label" for="form2Example1">
              Email address
            </label>
          </div>
          <div class="form-outline mb-4">
            <input
              type="password"
              id="form2Example2"
              class="form-control"
              onChange={this.passwordHandler}
            />
            <label class="form-label" for="form2Example2">
              Password
            </label>
          </div>
          <div class="row mb-4">
            <div class="col">
              <a href="/forgotPassword">Forgot password?</a>
            </div>
          </div>
          <button
            type="button"
            class="btn btn-primary btn-block mb-4"
            onClick={this.login}
          >
            Sign in
          </button>
          &nbsp;&nbsp;&nbsp;
          <button
            type="button"
            class="btn btn-primary btn-block mb-4"
            onClick={this.register}
          >
            Register
          </button>
        </form>
      </div>
    );
  }
}

export default LoginComponent;
