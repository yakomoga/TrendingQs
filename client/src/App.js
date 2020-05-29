import React, { Component } from "react";
//import ReactDOM from "react-dom";
import GameCard from "./components/GameCard";
import InitModal from "./components/InitModal";
import SurveyNavBar from "./components/SurveyNavBar";
import "./App.css";

// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { BrowserRouter as Router} from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: "1",
      complete: null,
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
 //fetch request for the questions in the quiz
  //need to debug the access to the nested objects and the way of increenting count
  getQuestions = () => {
    let { n } = this.state;
    let request = `/questions/?n=${n}`;
    fetch(request)
      .then((response) => response.json())
      .then((response) => {
        this.setState({ questions: response });
        console.log("******THIS IS questions*********");
        console.log(this.state.questions);
        this.setState({
          text: this.state.questions[0].text,
          id: this.state.questions[0].id,
          twurl: this.state.questions[0].twurl,
          timestamp: this.state.questions[0].timestamp,
          complete: false,
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

  saveAnswer = () => {
    let request = `/answers`;
    fetch(request, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        qid: this.state.qid,
        userid: this.state.userid,
        text: this.state.answer
      })
    })
      .then(res => res.json())
      .then(json => {
        this.setState({ answers:json });
      })
      .catch(error => {
        this.setState({ error: error });
      });
  };



  componentWillMount(){
    this.getQuestions()
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
    console.log("I AM HERE")
    this.saveAnswer();
  };
  //rating handler in the quiz
  handleRatingChange = (e) => {
    // let { value } = this.state.rating;
    this.setState({ value: e.target.value });
  };
 
  
  //handler to move onto the next question
  handleNext = () => {
    // let { answer, rating, count, ratings, answers, questions } = this.state;
    let { answer, rating, count, ratings, answers } = this.state;
    if (count === this.state.n - 1) {
      //I need to do something else in here
      this.postAnswers();
      this.setState({
        answers: [],
        ratings: [],
        questions: [],
        count: 0,
        complete: true,
      });
      console.log("End of Quiz!");
      return;
    } else {
      count++;
      answer = { ...this.state.answer, qid: this.state.id };
      rating = { ...this.state.rating, qid: this.state.id };
      console.log(
        `These are the values to be stored for question ${
          count + 1
        }: answer: ${answer}, rating: ${rating}`
      );
      answers = [...this.state.answers, answer];
      ratings = [...this.state.ratings, rating];
      console.log(
        `These are the values to be stored in the arrays for question ${
          count + 1
        }: answers: ${answers}, rating: ${ratings}`
      );

      // console.log(this.state.questions);
      this.setState({
        answer,
        rating,
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
  //send a fetch request to the server to post the results of the quiz
  postAnswers = () => {
    let { answers, ratings, questions, qname, userid } = this.state;
    let answer = { ...this.state.answer, qid: this.state.id };
    let rating = { ...this.state.rating, qid: this.state.id };
    answers = [...this.state.answers, answer];
    ratings = [...this.state.ratings, rating];

    let body = JSON.stringify({ answers, ratings, questions, qname, userid });
    // console.log("Here's the body: ", body);
    fetch(`/quizzes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    }).then((response) => response.json());
  };
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
          <GameCard
          className = "mx-auto"
            handleNext={this.handleNext}
            gotoTwitter={this.gotoTwitter}
            handleInput={this.handleInputChange}
            handleSubmitAnswer={this.handleSubmitAnswer}
            handleRatingChange={this.handleRatingChange}
            rating={this.state.rating}
            answer={this.state.answer}
            text={this.state.text}
            count={this.state.count}
          ></GameCard>
        </div>
      </Router>
    );
  }
}

export default App;
