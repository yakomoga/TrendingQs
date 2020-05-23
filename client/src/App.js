import React, { Component } from "react";
import ReactDOM from "react-dom";
import styled, { keyframes } from "styled-components";
import "./App.css";
import { ReactComponent as EmojiSmile } from "./emoji-smile.svg";

const StyledSVG = styled(EmojiSmile)`
  display: block;
  margin: auto;
  width: 25em;
  height: 25em;
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "This is a test question?",
      twurl: "",
      id: "",
      timestamp: "",
      n: 20,
      questions: [],
    };
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
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
              <li className="nav-item active">
                <a className="nav-link" href="#">
                  Home <span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Features
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  About
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Sign In
                </a>
              </li>
              <li className="nav-item">
                <button className="btn btn-primary">New Game</button>
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
        <br></br>
        <br></br>

        <div className="container text-center">
          <div className="card w-50">
            <img
              src="https://cdn-a.william-reed.com/var/wrbm_gb_food_pharma/storage/images/publications/food-beverage-nutrition/foodnavigator.com/news/market-trends/jellyfish-a-new-sustainable-nutritious-and-oyster-like-food-for-the-western-world/9974704-1-eng-GB/Jellyfish-A-new-sustainable-nutritious-and-oyster-like-food-for-the-Western-world_wrbm_large.jpg"
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">Question {this.state.id}</h5>
              <p className="card-text">{this.state.text}</p>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text">Your answer</span>
                  </div>
                  <textarea
                    class="form-control"
                    aria-label="With textarea"
                  ></textarea>
                </div>
              </li>
              <li className="list-group-item">
                <div class="form-group">
                  <label for="formControlRange">
                    How do you rate this question?
                  </label>
                  <input
                    type="range"
                    class="form-control-range"
                    id="formControlRange"
                  />
                </div>
              </li>
            </ul>
            <div className="card-body">
              <StyledSVG />
              <i className="lni lni-emoji-smile"></i>
              <button className="btn btn-outline">View on Twitter</button>
              <button className="btn btn-primary">Next</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
