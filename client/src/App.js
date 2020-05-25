import React, { Component } from "react";
import ReactDOM from "react-dom";
import styled, { keyframes } from "styled-components";
import "./App.css";
import { ReactComponent as EmojiSmile } from "./emoji-smile.svg";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const StyledSVG = styled(EmojiSmile)`
  display: block;
  margin: auto;
  width: 2em;
  height: 2em;
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: { value: 50.0, userid: "1", qid: "" },
      answer: { text: "", userid: "1", qid: "" },
      text: "This is a test question?",
      twurl: "",
      id: "",
      timestamp: "",
      qname: "test_quiz",
      n: 20,
      count: 0,
      show: false,
      questions: [],
      answers: [],
      ratings: [],
    };
  }

  handleshow = () => {
    this.setState({ show: true });
  };

  handleClose = () => {
    this.setState({ show: false });
  };

  //fetch request for the questions in the quiz
  //need to debug the access to the nested objects and the way of increenting count
  getQuestions = () => {
    let { n, count } = this.state;
    let request = `/questions/?n=${n}`;
    count++;
    fetch(request)
      .then((response) => response.json())
      .then((response) => {
        this.setState({ questions: response });
        console.log(this.state.questions);
        this.setState({
          text: this.state.questions[0].text,
          id: this.state.questions[0].id,
          twurl: this.state.questions[0].twurl,
          timestamp: this.state.questions[0].timestamp,
          count,
        });
      });
    this.handleClose();
    //to try later
    /* var raw = "";

var requestOptions = {
  method: 'GET',
  body: raw,
  redirect: 'follow'
};

fetch("http://localhost:5000/questions/?n=5", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

  */
  };
  //answer handler in the quiz
  handleAnswer = (e) => {
    let answer = { ...this.state.answer, text: e.target.value };
    this.setState({ answer });
  };
  //rating handler in the quiz
  handleRating = (e) => {
    let { value } = this.state.rating;
    this.setState({ value: e.target.value });
  };
  //handler to move onto the next question
  handleNext = () => {
    let { answer, rating, count, ratings, answers } = this.state;
    if (count === this.state.n) {
      //I need to do something else in here
      return;
    } else {
      count++;
      answer = { ...this.state.answer, qid: this.state.id };
      this.setState({ answer });
      rating = { ...this.state.rating, qid: this.state.id };
      this.setState({ rating });
      this.setState({ count });
      answers = { ...this.state.answers, answer };
      //this.setState({ answers });
      ratings = { ...this.state.ratings, rating };
      //this.setState({ ratings });
      this.setState({
        answers,
        ratings,
        text: this.state.questions[count].text,
        id: this.state.questions[count].id,
        twurl: this.state.questions[count].twurl,
        timestamp: this.state.questions[count].timestamp,
        count,
      });
    }
  };
  //update the value of n from user input
  handleN = (e) => {
    let { n } = this.state;
    this.setState({ n: e.target.value });
  };

  //update the value of qName from user input
  handleQuizName = (e) => {
    let { qname } = this.state;
    this.setState({ qname: e.target.value });
  };

  //open new browsing tab to twurl
  gotoTwitter = () => {};

  render() {
    return (
      <Router>
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

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
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
                  <button className="btn btn-primary" onClick={this.handleshow}>
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

          <Modal
            show={this.state.show}
            onHide={this.handleClose}
            animation={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Create your Quiz:</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <label>Quiz Name:</label>
                    <input
                      className="form-control"
                      aria-label="With textarea"
                      placeholder="Enter a name for your quiz"
                      onChange={this.handleQuizName}
                      value={this.state.qname}
                    />
                  </li>
                  <li className="list-group-item">
                    <label>Number of Questions:</label>
                    <input
                      className="form-control"
                      aria-label="With textarea"
                      placeholder="20"
                      onChange={this.handleN}
                      value={this.state.n}
                    />
                  </li>
                </ul>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Quit
              </Button>
              <Button variant="primary" onClick={() => this.getQuestions()}>
                Start
              </Button>
            </Modal.Footer>
          </Modal>
          <br></br>
          <br></br>

          <div className="App container text-center">
            <div className="card w-50">
              <img
                src="https://cdn-a.william-reed.com/var/wrbm_gb_food_pharma/storage/images/publications/food-beverage-nutrition/foodnavigator.com/news/market-trends/jellyfish-a-new-sustainable-nutritious-and-oyster-like-food-for-the-western-world/9974704-1-eng-GB/Jellyfish-A-new-sustainable-nutritious-and-oyster-like-food-for-the-Western-world_wrbm_large.jpg"
                className="card-img-top"
                alt="jellyfish"
              />
              <div className="card-body">
                <h5 className="card-title">Question {this.state.count}</h5>
                <p className="card-text">{this.state.text}</p>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">Your answer</span>
                    </div>
                    <textarea
                      className="form-control"
                      aria-label="With textarea"
                      onChange={this.handleAnswer}
                      value={this.state.answer.text}
                    ></textarea>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="form-group">
                    <label htmlFor="formControlRange">
                      How do you rate this question?
                    </label>
                    <input
                      type="range"
                      className="form-control-range"
                      id="formControlRange"
                      defaultValue={this.state.rating.value}
                      onChange={this.handleRating}
                    />
                  </div>
                </li>
              </ul>
              <div className="card-body">
                <StyledSVG />
                <button className="btn btn-outline" onClick={this.gotoTwitter}>
                  View on Twitter
                </button>
                <button className="btn btn-primary" onClick={this.handleNext}>
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
