import React, { Component } from "react";
import "./joke.css";
class Joke extends Component {
  getColor() {
    if (this.props.votes >= 15) {
      return "#12eb0b";
    } else if (this.props.votes >= 12) {
      return "#b4dd43";
    } else if (this.props.votes >= 9) {
      return "#fffb00";
    } else if (this.props.votes >= 6) {
      return "#ffc400";
    } else if (this.props.votes >= 3) {
      return "#ff9100";
    } else if (this.props.votes >= 0) {
      return "#ff0000";
    } else {
      return "#ff0000";
    }
  }
  render() {
    return (
      <div>
        <div className="joke">
          <div className="joke-btns">
            <i className="fas fa-arrow-up" onClick={this.props.upvote}></i>
            <span
              className="joke-vote"
              style={{ borderColor: this.getColor() }}
            >
              {this.props.votes}
            </span>
            <i className="fas fa-arrow-down" onClick={this.props.downvote}></i>
          </div>
          <div className="joke-text">{this.props.text}</div>
        </div>
      </div>
    );
  }
}

export default Joke;
