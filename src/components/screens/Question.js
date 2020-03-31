import React from 'react';
import { connect } from 'react-redux';
import Navbar from '../parts/Navbar';
import LoginRedirect from '../parts/LoginRedirect';
import { withRouter, Redirect } from 'react-router-dom';
import { handleAnswerQuestion } from '../../actions/shared';
import QuestionCard from '../parts/QuestionCard';

function mapStateToProps({ authedUser, users, questions }) {
  return {
    authedUser,
    users,
    questions,
  };
}

export class Question extends React.Component {
  onVote = (answer) => {
    const { dispatch, match } = this.props;
    const { qid } = match.params;
    dispatch(handleAnswerQuestion(qid, answer));
  }

  render() {
    const { authedUser, users, questions, match, location } = this.props;
    const { qid } = match.params;

    if (authedUser === null) {
      return <LoginRedirect fromLocation={location.pathname}/>;
    }
    if (!(qid in questions)) {
      return (
        <Redirect
          to={{
            pathname: "/404",
          }}/>
      );
    }

    const question = questions[qid];
    const answer = qid in users[authedUser].answers 
      ? users[authedUser].answers[qid]
      : null;
    return (
      <div>
        <Navbar/>
        <h1>Would You Rather!</h1>
        <QuestionCard
          userId={question.author}
          hasAnswered={answer !== null}
          answer={answer}
          optionOneText={question.optionOne.text}
          optionTwoText={question.optionTwo.text}
          numOptionOneVotes={question.optionOne.votes.length}
          numOptionTwoVotes={question.optionTwo.votes.length}
          onVote={this.onVote}
        />
      </div>
    );
  }
}

export default withRouter(connect(
  mapStateToProps,
)(Question))
