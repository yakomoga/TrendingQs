import React, { Component } from "react";
import styled, { keyframes } from "styled-components";
import { ReactComponent as EmojiSmile } from "../emoji-smile.svg";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

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
      <div id="game-card" className="App container text-center">
        <Card style={{ 'max-width': "30rem", 'margin': "auto"}}>
          <Card.Img
            variant="top"
            src="https://cdn-a.william-reed.com/var/wrbm_gb_food_pharma/storage/images/publications/food-beverage-nutrition/foodnavigator.com/news/market-trends/jellyfish-a-new-sustainable-nutritious-and-oyster-like-food-for-the-western-world/9974704-1-eng-GB/Jellyfish-A-new-sustainable-nutritious-and-oyster-like-food-for-the-Western-world_wrbm_large.jpg"
            alt="jellyfish"
          />
          <Card.Body>
    <Card.Title>Question #{this.props.count}</Card.Title>
            <Card.Text style={{ 'min-height': '4rem', 'vertical-align': 'middle' }}>{this.props.text}</Card.Text>

            <InputGroup className="mb-3">
              <FormControl
                id="answer"
                placeholder="Enter your answer"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                onChange={this.props.handleAnswer}
                value={this.props.answer.text}
              />
              <InputGroup.Append>
                <Button variant="outline-secondary">Submit</Button>
              </InputGroup.Append>
            </InputGroup>
            {/* <Button className="mr-2" variant="primary" value = "next Q" onClick={this.props.handleNext}/>
            <Button className="mr-2" variant="primary" value = "prev q"/> */}
            <Button className="mr-2" as="input" type="button" value="Previous question" />
            <Button className="mr-2" as="input" type="button" value="Next question" onClick={this.props.handleNext} />
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
