import React, { Component } from "react";
// import styled, { keyframes } from "styled-components";
// import styled from "styled-components";
// import { ReactComponent as EmojiSmile } from "../emoji-smile.svg";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

class GameCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: props.rating,
      question: props.question,
      q_num: props.q_num,
      // answer: this.props.answer,
      answer: "",
    };
  }

  // static getDerivedStateFromProps(props, state){
  
  //   if (props.questions !== state.questions) {
  //     return {
  //       questions: props.questions,
  //     };
  //   }
  //   return null;
  // }


// componentWillMount(){
//   this.setState({
//     questions: this.props.questions
//   })
// }


  render() {
    return (
      <div id="game-card" className="App container text-center">
        <Card style={{ maxWidth: "30rem", margin: "auto" }}>
          <Card.Img
            variant="top"
            src="https://cdn-a.william-reed.com/var/wrbm_gb_food_pharma/storage/images/publications/food-beverage-nutrition/foodnavigator.com/news/market-trends/jellyfish-a-new-sustainable-nutritious-and-oyster-like-food-for-the-western-world/9974704-1-eng-GB/Jellyfish-A-new-sustainable-nutritious-and-oyster-like-food-for-the-Western-world_wrbm_large.jpg"
            alt="jellyfish"
          />
          <Card.Body>
            <Card.Title>Question #{this.props.q_num}</Card.Title>
            <Card.Text style={{ minHeight: "4rem", verticalAlign: "middle" }}>
              {this.props.question.text}
            </Card.Text>
            {/* <Card.Link href={this.props.questions}>Open in Twitter</Card.Link> */}

            <InputGroup className="mb-3">
              <FormControl
                id="answer"
                name="answer"
                placeholder="Enter your answer"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                onChange={this.props.handleInput}
              />
              <InputGroup.Append>
                <Button
                  variant="outline-secondary"
                  onClick={this.props.handleSubmitAnswer}
                >
                  Submit
                </Button>
              </InputGroup.Append>
            </InputGroup>
            <Button
              className="mr-2"
              as="input"
              type="button"
              value="Previous question"
              onClick={this.props.handlePrev}
              disabled={this.props.q_num===1}
            />
            <Button
              className="mr-2"
              as="input"
              type="button"
              value="Next question"
              onClick={this.props.handleNext}
              disabled={this.props.q_num===this.props.last_question}
            />
          </Card.Body>
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
        </Card>
      </div>
    );
  }
}
export default GameCard;
