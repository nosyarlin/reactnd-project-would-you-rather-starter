import React from 'react';
import { connect } from 'react-redux';
import Navbar from '../parts/Navbar';
import LoginRedirect from '../parts/LoginRedirect';
import QuestionSummaryCard from '../parts/QuestionSummaryCard';

function mapStateToProps({ authedUser, users, questions }) {
  const answeredQuestionIds = Object.keys(questions).filter((id) => (
    id in users[authedUser].answers
  ));
  const unansweredQuestionIds = Object.keys(questions).filter((id) => (
    !(id in users[authedUser].answers)
  ));
  return {
    users,
    answeredQuestionIds,
    unansweredQuestionIds,
    questions,
  };
}

export class Home extends React.Component {
  state = {
    showAnswered: false,
  }

  render() {
    const { showAnswered } = this.state;
    const { answeredQuestionIds, unansweredQuestionIds, questions } = this.props;
    const idsToShow = showAnswered ? answeredQuestionIds : unansweredQuestionIds;

    return (
      <div>
        <LoginRedirect fromLocation='/home'/>
        <Navbar/>
        <div className="card">
          <div className="card-header">
            <ul className="nav nav-tabs card-header-tabs">
              <li className="nav-item">
                <a
                  className={showAnswered ? "nav-link active" : "nav-link"}
                  onClick={() => this.setState({ showAnswered: true})}>
                  Answered
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={showAnswered ? "nav-link" : "nav-link active"}
                  onClick={() => this.setState({ showAnswered: false})}>
                  Unanswered
                </a>
              </li>
            </ul>
          </div>
          {idsToShow.map((qid) => {
            const questionSummary = questions[qid].optionOne.text
              .split(' ')
              .slice(0, 3)
              .concat('...')
              .join(' ');
            return (
              <QuestionSummaryCard
                key={qid}
                qid={qid}
                userId={questions[qid].author}
                questionSummary={questionSummary}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
)(Home);
