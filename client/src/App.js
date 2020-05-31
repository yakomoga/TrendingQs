import React, { Component } from "react";
//import ReactDOM from "react-dom";
import GameCard from "./components/GameCard";
import InitModal from "./components/InitModal";
import SurveyNavBar from "./components/SurveyNavBar";
import "./App.css";

// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: "1",
      quiz_beginning: true,
      quiz_complete: undefined,
      rating: { value: 50.0, user_id: "1", q_id: "" },
      answer: { text: "", user_id: "1", q_id: "" },
      text: "This is a test question?",
      twurl: "",
      q_id: "",
      timestamp: "",
      q_name: "test_quiz",
      n: 20,
      count: 1,
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
        // console.log("******THIS IS questions*********");
        // console.log(this.state.questions);
        this.setState({
          text: this.state.questions[0].text,
          q_id: this.state.questions[0].id,
          twurl: this.state.questions[0].twurl,
          timestamp: this.state.questions[0].timestamp,
          // quiz_complete: false,
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
    // let { answer, rating, count, ratings, answers, questions } = this.state;
    // let { answer, rating, count, ratings, answers } = this.state;
    let count = this.state.count;
    // console.log(" THIS IS COUNT!!***** ", count);
    this.setState({
      text: this.state.questions[count].text,
      id: this.state.questions[count].id,
      twurl: this.state.questions[count].twurl,
      timestamp: this.state.questions[count].timestamp,
      count: count + 1,
    });
    if (this.state.count == this.state.n) {
      console.log("count == this.state.n: ", count == this.state.n);
      this.setState({ quiz_beginning: false,
                      quiz_complete: true});
    } else if (this.state.count == 1) {
      console.log("count == 1: ", count == 1);
      this.setState({ quiz_beginning: true, 
                      quiz_complete: false });
    } else {
      console.log("I am here in the else statement");
      this.setState({ quiz_beginning: false, 
                      quiz_complete: false });
      console.log(this.state.quiz_beginning, this.state.quiz_complete);
    }
    // console.log(" THIS IS COUNT!!***** ", count);

    // if (count === this.state.n-1) {
    //   console.log("this is count inside the if", count)

    //   this.saveAnswer();
    //   //not sure why we clear state here
    //   this.setState({
    //     answers: [],
    //     ratings: [],
    //     questions: [],
    //     count: 1,
    //   });
    //   return;
    // } else {
    //   count++;
    //   //mark end of the quiz
    //   if(count === this.state.n){this.setState({quiz_complete: true})}

    //   answer = { ...this.state.answer, q_id: this.state.id };
    //   rating = { ...this.state.rating, q_id: this.state.id };

    //   answers = [...this.state.answers, answer];
    //   ratings = [...this.state.ratings, rating];

    //   // console.log(this.state.questions);
    //   this.setState({
    //     answer,
    //     rating,
    //     answers,
    //     ratings,
    //     text: this.state.questions[count].text,
    //     id: this.state.questions[count].id,
    //     twurl: this.state.questions[count].twurl,
    //     timestamp: this.state.questions[count].timestamp,
    //     count,
    //   });
    // }
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
          <GameCard
            className="mx-auto"
            handleNext={this.handleNext}
            gotoTwitter={this.gotoTwitter}
            handleInput={this.handleInputChange}
            handleSubmitAnswer={this.handleSubmitAnswer}
            handleRatingChange={this.handleRatingChange}
            questions = {this.state.questions}
            rating={this.state.rating}
            answer={this.state.answer}
            text={this.state.text}
            count={this.state.count}
            twurl={this.state.twurl}
            quiz_complete={this.state.quiz_complete}
          ></GameCard>
        </div>
      </Router>
    );
  }
}

export default App;
