import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

class InitModal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Modal
        id="modal"
        show={this.props.show}
        onHide={this.props.handleClose}
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
                  name="qname"
                  className="form-control"
                  aria-label="With textarea"
                  placeholder="Enter a name for your quiz"
                  onChange={this.props.handleInput}
                  value={this.props.qname}
                />
              </li>
              <li className="list-group-item">
                <label>Number of Questions:</label>
                <input
                  name="n"
                  className="form-control"
                  aria-label="With textarea"
                  placeholder="20"
                  onChange={this.props.handleInput}
                  value={this.props.n}
                />
              </li>
            </ul>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.handleClose}>
            Quit
          </Button>
          <Button variant="primary" onClick={() => this.props.getQuestions()}>
            Start
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
export default InitModal;
