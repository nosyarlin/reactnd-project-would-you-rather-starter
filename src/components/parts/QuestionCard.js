import React from 'react';
import Card from './Card';

export default class QuestionCard extends React.Component {
  state = {
    answer: this.props.answer,
  }

  onVote = (e) => {
    e.preventDefault();
    this.props.onVote(this.state.answer);
  }

  onCheck = (e) => {
    this.setState({ answer: e.target.value });
  }

  getVotesBar = (votes, totalVotes) => {
    const progress = Math.round(votes / totalVotes * 100);
    return (
      <div className="progress mb-3">
        <div 
          className="progress-bar"
          role="progressbar"
          style={{width: `${progress}%`}}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          {`${progress}%`}
        </div>
      </div>
    );
  }

  getRadioButton = (value, text, disabled) => {
    return (
      <div className="funkyradio-primary">
        <input 
          type="radio"
          name="questionOptions"
          id={value}
          value={value}
          onChange={this.onCheck}
          disabled={disabled}
        />
        <label
          htmlFor={value}
        >
          {text}
        </label>
      </div>
    );
  }

  getCardBody = () => {
    const { hasAnswered, optionOneText, optionTwoText,
            numOptionOneVotes, numOptionTwoVotes } = this.props;
    const totalVotes = numOptionOneVotes + numOptionTwoVotes;
    console.log(this.state);
    return (
      <div className="card-body">
        <div>
          <form onSubmit={this.onVote}>
            <div className="funkyradio">
              {this.getRadioButton(
                'optionOne',
                optionOneText,
                hasAnswered
              )}
              {hasAnswered && this.getVotesBar(
                numOptionOneVotes,
                totalVotes
              )}
              {this.getRadioButton(
                'optionTwo',
                optionTwoText,
                hasAnswered
              )}
              {hasAnswered && this.getVotesBar(
                numOptionTwoVotes,
                totalVotes
              )}
            </div>
            {!hasAnswered && (
              <button 
                type="submit"
                className="btn btn-primary"
                disabled={this.state.answer === null}
              >
                Vote
              </button>
            )}
          </form>
        </div>
      </div>
    );
  }

  render() {
    const { userId } = this.props;
    return (
      <Card 
        cardBody={this.getCardBody()}
        userId={userId}
      />
    );
  }
}
