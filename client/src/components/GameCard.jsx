import React, { Component } from "react";
import styled, { keyframes } from "styled-components";
import { ReactComponent as EmojiSmile } from "../emoji-smile.svg";

const StyledSVG = styled(EmojiSmile)`
  display: block;
  margin: auto;
  width: 2em;
  height: 2em;
`;

class GameCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: this.props.rating,
      answer: this.props.answer,
    };
  }

  render() {
    return (
      <div className="App container text-center">
        <div className="card w-50">
          <img
            src="https://cdn-a.william-reed.com/var/wrbm_gb_food_pharma/storage/images/publications/food-beverage-nutrition/foodnavigator.com/news/market-trends/jellyfish-a-new-sustainable-nutritious-and-oyster-like-food-for-the-western-world/9974704-1-eng-GB/Jellyfish-A-new-sustainable-nutritious-and-oyster-like-food-for-the-Western-world_wrbm_large.jpg"
            className="card-img-top"
            alt="jellyfish"
          />
          <div className="card-body">
            <h5 className="card-title">Question {this.props.count + 1}</h5>
            <p className="card-text">{this.props.text}</p>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">Your answer</span>
                </div>
                <textarea
                  name="answer"
                  className="form-control"
                  aria-label="With textarea"
                  onChange={this.props.handleAnswer}
                  value={this.props.answer.text}
                ></textarea>
              </div>
            </li>
            <li className="list-group-item">
              <div className="form-group">
                <label htmlFor="formControlRange">
                  How do you rate this question?
                </label>
                <input
                  name="rating"
                  type="range"
                  className="form-control-range"
                  id="formControlRange"
                  defaultValue={this.props.rating.value}
                  onChange={this.props.handleRating}
                />
              </div>
            </li>
          </ul>
          <div className="card-body">
            <StyledSVG />
            <button
              className="btn btn-outline"
              onClick={this.props.gotoTwitter}
            >
              View on Twitter
            </button>
            <button className="btn btn-primary" onClick={this.props.handleNext}>
              Next
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default GameCard;
