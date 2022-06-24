import React, { Component } from "react";
import userservice from "../services/userservice";
import HeaderComponent from "./HeaderComponent";
import { message } from "antd";

class AllUsersComponent extends Component {
  constructor(props) {
    super(props);

    this.state = { users: [] };
  }
  componentDidMount() {
    userservice
      .getAllUser()
      .then((res) => {
        this.setState({ users: res.data });
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
          <h2>Users</h2>
          {this.state.users.map((user) => (
            <div className="list-group" style={{ width: "20 px" }}>
              <a
                href="#/"
                className="list-group-item list-group-item-info"
                aria-current="true"
              >
                <div>
                  <h6 className="mb-1">User ID: {user.userId}</h6>
                  <h6 className="mb-1">Email: {user.email}</h6>
                  <h6 className="mb-1">First Name: {user.firstName}</h6>
                  <h6 className="mb-1">Last Name: {user.lastName}</h6>
                  <h6 className="mb-1">Contact Number: {user.contactNo}</h6>
                </div>
              </a>
              <br></br>
            </div>
          ))}
          <br></br>
        </div>
      </div>
    );
  }
}
export default AllUsersComponent;
