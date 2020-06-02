import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import Modal from "react-bootstrap/Modal";
// import Button from "react-bootstrap/Button";

class SurveyNavBar extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <nav id ="navbar" className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
          Trending Questions
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
          <li className="nav-item">
                    <Link className="nav-link" to={"/"}>Home</Link>
                  </li>
            <li className="nav-item">
                    <Link className="nav-link" to={"/features"}>Feature</Link>
                  </li>
            <li className="nav-item">
                    <Link className="nav-link" to={"/about"}>About</Link>
                  </li>
            <li className="nav-item">
                    <Link className="nav-link" to={"/login"}>Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
                  </li>
            <li className="nav-item">
              <button
                className="btn btn-primary"
                onClick={this.props.handleshow}
              >
                New Game
              </button>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              Search Games
            </button>
          </form>
        </div>
      </nav>
    );
  }
}
export default SurveyNavBar;
