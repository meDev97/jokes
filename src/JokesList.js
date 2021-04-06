import React, { Component } from "react";
import axios from "axios";
import "./jokesList.css";
import { v4 as uuid } from "uuid";
import Joke from "./Joke";

class JokesList extends Component {
  static defaultProps = {
    numJokesToGet: 10,
  };

  state = { jokes: JSON.parse(window.localStorage.getItem("jokes")) || [] };

  componentDidMount() {
    if (this.state.jokes.length == 0) this.getJokes();
  }
  async getJokes() {
    let jokes = [];
    while (jokes.length < this.props.numJokesToGet) {
      let response = await axios.get("https://icanhazdadjoke.com/", {
        headers: {
          accept: "application/json",
        },
      });
      jokes.push({ id: uuid(), text: response.data.joke, vote: 0 });
    }
    this.setState(
      (st) => ({
        jokes: [...st.jokes, ...jokes],
      }),
      () =>
        window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
    );
  }
  handleVote(id, delta) {
    this.setState(
      (st) => ({
        jokes: st.jokes.map((j) =>
          j.id === id ? { ...j, vote: j.vote + delta } : j
        ),
      }),
      () =>
        window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
    );
  }
  handleclick = () => {
    this.getJokes();
  };
  render() {
    return (
      <div className="jokesList">
        <div className="jokesList-sidebar">
          <h1 className="jokesList-title">dad jokes</h1>
          <button className="jokesList-more" onClick={this.handleclick}>
            new jokes
          </button>
          <i className="fas fa-star"></i>
        </div>
        <div className="jokesList-jokes">
          {this.state.jokes.map((joke) => {
            return (
              <Joke
                votes={joke.vote}
                text={joke.text}
                key={joke.id}
                upvote={() => {
                  this.handleVote(joke.id, 1);
                }}
                downvote={() => {
                  this.handleVote(joke.id, -1);
                }}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default JokesList;
