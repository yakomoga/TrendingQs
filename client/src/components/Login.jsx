import React, { Component } from "react";
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

  login = (event) => {
      event.preventDefault();
    const { email, password } = this.state;
    axios("/users/login", {
      method: "POST",
      data: {
        email,
        password
      },
    })
    .then(response => {
        console.log(response)
    })
    .catch(error => {console.log(error)})
  };

  render() {
    const { email, password } = this.state;
    const { login, handleInputChange } = this;

    return (
      <form>
        <h3>Log In</h3>

        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={handleInputChange}
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
            onChange={handleInputChange}
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
          onClick={login}
          className="btn btn-primary btn-block"
        >
          Login
        </button>
        <p className="forgot-password text-right">
          Forgot <a href="#">password?</a>
        </p>
      </form>
    );
  }
}
export default Login;
