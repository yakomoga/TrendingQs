import React, { Component } from "react";
import { Route , withRouter} from 'react-router-dom';
import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  handleInputChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    this.setState({
      [name]: value,
    });
  };

  handleLogin = () => {
    const { email, password } = this.state;
    axios("/users/login", {
      method: "POST",
      data: {
        email,
        password
      },
    })
    .then(response => {
        localStorage.setItem("token", response.data.token);
        this.props.history.push('/users/gamecard');
        console.log(response.data)
    })
    .catch(error => {console.log(error)})
  };

  requestData = () => {
    axios("/users/profile", {
        headers: {"x-access-token": localStorage.getItem("token")}
    })
      .then(response => {
       console.log(response)
      })
      .catch(error => {console.log(error)})
    };

  render() {
    const { email, password } = this.state;
    return (
      <div>
        <h3>Log In</h3>
        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={this.handleInputChange}
            className="form-control"
            placeholder="Enter email"
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={this.handleInputChange}
            className="form-control"
            placeholder="Enter password"
          />
        </div>

        <div className="form-group">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>

        <button
        //   type="submit"
          onClick={this.handleLogin}
          className="btn btn-primary btn-block"
        >
          Login
        </button>
        <p className="forgot-password text-right">
          Forgot <a href="#">password?</a>
        </p>
      </div>
    );
  }
}
export default withRouter(Login);
