import React, { Component } from "react";
import { withRouter } from "react-router";
import Backend from "../services/backend";

class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        login: "",
        password: "",
        firstName: "",
        lastName: "",
      },
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    // eslint-disable-next-line react/no-direct-mutation-state
    this.state.user[event.target.name] = event.target.value;
    this.setState(this.state);
  }

  handleSubmit(event) {
    Backend.post("user", this.state.user).then(response => {
      window.location = decodeURI("/user/profile/" + response.login);
    });
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <h1>Create User</h1>
        <div className="create-user-form">
          <form>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label for="login">Login</label>
                <input type="email" className="form-control" name="login" id="login" onChange={this.handleChange} />
              </div>
              <div className="form-group col-md-6">
                <label for="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  id="password"
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label for="firstName">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="firstName"
                  id="firstName"
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group col-md-6">
                <label for="lastName">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="lastName"
                  id="lastName"
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <button onClick={this.handleSubmit} className="btn btn-primary">
              Create
            </button>
          </form>
        </div>
      </div>
    );
  }

  componentDidMount() {}
}

export default withRouter(CreateUser);
