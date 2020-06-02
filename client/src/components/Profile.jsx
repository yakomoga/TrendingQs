import React, { Component } from "react";
import GameCard from "./components/GameCard";

class Profile extends Component {
   

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
            handlePrev={this.handlePrev}
            gotoTwitter={this.gotoTwitter}
            handleInput={this.handleInputChange}
            handleSubmitAnswer={this.handleSubmitAnswer}
            handleRatingChange={this.handleRatingChange}
            question={this.state.question}
            rating={this.state.rating}
            q_num={this.state.q_num + 1}
            answer={this.state.answer}
            last_question={this.state.n}
          ></GameCard>
        </div>
      </Router>
    );
  }
}
export default Login;
