import React, { Component } from "react";
import GameCard from "./GameCard";

class Profile extends Component {
   

  render() {
    return (
        <div className="App">
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
    );
  }
}
export default Profile;
