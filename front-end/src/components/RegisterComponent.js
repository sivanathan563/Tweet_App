import { message } from "antd";
import React, { Component } from "react";
import userservice from "../services/userservice";

class RegisterComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      userId: "",
      email: "",
      contact: "",
      password: "",
      confirmPassword: "",
    };
    this.register = this.register.bind(this);
  }
  handleEvent = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  register() {
    let user = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      userId: this.state.userId,
      contactNo: this.state.contact,
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
    };
    if (this.state.firstName === "") {
      message.error("First Name cannot be blank !");
    } else if (this.state.lastName === "") {
      message.error("Last Name cannot be blank !");
    } else if (this.state.contact.length !== 10) {
      message.error("Invalid Contact Number !");
    } else {
      userservice
        .register(user)
        .then((res) => {
          if (res.data) {
            localStorage.setItem("email", this.state.email);
            this.props.history.push("/allTweets");
          } else message.error("Username does not exist ! Please register");
        })
        .catch((err) => {
          message.error(err.response.data.message);
        });
    }
  }

  render() {
    return (
      <div>
        <h2>TweetApp Register</h2>
        <br></br>
        <div
          className="container"
          style={{
            width: "70%",
          }}
        >
          <form>
            <div className="form-outline mb-4">
              <input
                type="text"
                id="form2Example1"
                className="form-control"
                placeholder="First Name"
                name="firstName"
                onChange={this.handleEvent}
              />
            </div>

            <div className="form-outline mb-4">
              <input
                type="text"
                id="form2Example2"
                className="form-control"
                placeholder="Last Name"
                name="lastName"
                onChange={this.handleEvent}
              />
            </div>
            <div className="form-outline mb-4">
              <input
                type="text"
                id="form2Example2"
                className="form-control"
                placeholder="User Id"
                name="userId"
                onChange={this.handleEvent}
              />
            </div>

            <div className="form-outline mb-4">
              <input
                type="text"
                id="form2Example3"
                className="form-control"
                placeholder="Contact"
                name="contact"
                onChange={this.handleEvent}
              />
            </div>

            <div className="form-outline mb-4">
              <input
                type="email"
                id="form2Example4"
                className="form-control"
                placeholder="Email"
                name="email"
                onChange={this.handleEvent}
              />
            </div>

            <div className="form-outline mb-4">
              <input
                type="password"
                id="form2Example5"
                className="form-control"
                placeholder="Password"
                name="password"
                onChange={this.handleEvent}
              />
            </div>

            <div className="form-outline mb-4">
              <input
                type="password"
                id="form2Example6"
                className="form-control"
                placeholder="Confirm Password"
                name="confirmPassword"
                onChange={this.handleEvent}
              />
            </div>
            <div class="row mb-4">
              <div class="col">
                <a href="/login">{"<<"}Go to SignIn page</a>
              </div>
            </div>
            <button
              type="button"
              className="btn btn-primary btn-block mb-4"
              onClick={() => this.register()}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default RegisterComponent;
