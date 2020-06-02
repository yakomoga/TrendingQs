import React, { Component } from "react";
//import ReactDOM from "react-dom";

import InitModal from "./components/InitModal";
import SurveyNavBar from "./components/SurveyNavBar";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "./components/Login";
import SignUp from "./components/SignUp";

// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: "1",
      rating: { value: 50.0, user_id: "1", q_id: "" },
      answer: { text: "", user_id: "1", q_id: "" },
      question: {},
      quiz_name: "test_quiz",
      n: 20,
      q_num: null,
      show: false,
      questions: [],
      answers: [],
      ratings: [],
    };
  }
  //fetch request for the questions in the quiz
  //need to debug the access to the nested objects and the way of increenting q_num
  getQuestions = () => {
    let { n } = this.state;
    let request = `/questions/?n=${n}`;
    fetch(request)
      .then((response) => response.json())
      .then((response) => {
        this.setState({ questions: response });
        // console.log("******THIS IS questions*********");
        // console.log(this.state.questions);
        this.setState({
          question: this.state.questions[0],
          q_num: 0,
          // quiz_end: false,
        });
      });
    this.handleClose();
  };
  //find out why this doesn't work well (the else if)
  // setQuizStartEnd = () => {
  //   console.log("this is q_num: ", this.state.q_num);
  //   if (this.state.q_num + 1 == this.state.n - 1) {
  //     this.setState({ quiz_start: false, quiz_end: true });
  //   } else if (this.state.q_num-1  === 0) {
  //     console.log("this.state.q_num: ", this.state.q_num);
  //     this.setState({ quiz_start: true, quiz_end: false });
  //   } else {
  //     this.setState({ quiz_start: false, quiz_end: false });
  //   }
  //   console.log(
  //     `this are states quiz_start: ${this.state.quiz_start}, quiz_end: ${this.state.quiz_end} `
  //   );
  // };

  saveAnswer = () => {
    let request = `/answers`;
    fetch(request, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        q_id: this.state.q_id,
        user_id: this.state.user_id,
        text: this.state.answer,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        this.setState({ answers: json });
      })
      .catch((error) => {
        this.setState({ error: error });
      });
  };

  componentDidMount() {
    this.getQuestions();
  }

  handleshow = () => {
    this.setState({ show: true });
  };
  handleClose = () => {
    this.setState({ show: false });
  };
  //Generic input handler
  handleInputChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    this.setState({
      [name]: value,
    });
  };

  //answer handler in the quiz
  handleSubmitAnswer = () => {
    this.saveAnswer();
  };
  //rating handler in the quiz
  handleRatingChange = (e) => {
    // let { value } = this.state.rating;
    this.setState({ value: e.target.value });
  };

  //handler to move onto the next question
  handleNext = () => {
    // let { answer, rating, q_num, ratings, answers, questions } = this.state;
    // let { answer, rating, q_num, ratings, answers } = this.state;
    let q_num = this.state.q_num;
    // console.log(" THIS IS q_num!!***** ", q_num);
    this.setState({
      question: this.state.questions[q_num + 1],
      q_num: q_num + 1,
    });
    this.setQuizStartEnd();
  };

  login = () => {};

  handlePrev = () => {
    // let { answer, rating, q_num, ratings, answers, questions } = this.state;
    // let { answer, rating, q_num, ratings, answers } = this.state;
    let q_num = this.state.q_num;
    // console.log(" THIS IS q_num!!***** ", q_num);
    this.setState({
      question: this.state.questions[q_num - 1],
      q_num: q_num - 1,
    });
    this.setQuizStartEnd();
  };
  //send a fetch request to the server to post the results of the quiz
  //open new browsing tab to twurl
  gotoTwitter = () => {};

  render() {
    return (
      <Router>
        <div className="App">
          <SurveyNavBar handleshow={this.handleshow}></SurveyNavBar>
          <InitModal
            show={this.state.show}
            handleClose={this.handleClose}
            handleInput={this.handleInputChange}
            getQuestions={this.getQuestions}
          ></InitModal>
          {/* <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            <div className="container">
              <Link className="navbar-brand" to={"/login"}>positronX.io</Link>
              <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to={"/login"}>Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav> */}

          <div className="auth-wrapper">
            <div className="auth-inner">
              <Switch>
                <Route exact path="/" component={Login} />
                <Route
                  path="/login"
                  render={(props) => (
                    <Login
                      {...props}
                      login={this.login}
                      handleInput={this.handleInputChange}
                    />
                  )}
                />

                <Route path="/sign-up" component={SignUp} />
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
