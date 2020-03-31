import React from 'react';
import { connect } from 'react-redux';
import Navbar from '../parts/Navbar';
import LoginRedirect from '../parts/LoginRedirect';
import ScoreCard from '../parts/ScoreCard';

function mapStateToProps({ authedUser, users }) {
  const processedUsers = Object.keys(users).map((userId) => {
    const userInfo = users[userId];
    const numAnswered = Object.keys(userInfo.answers).length;
    const numAsked = userInfo.questions.length;
    return {
      ...userInfo,
      numAnswered,
      numAsked,
      score: numAsked + numAnswered,
    }
  });
  const rankedUsers = processedUsers.sort((a, b) => b.score - a.score);
  return {
    rankedUsers,
  };
}


export class LeaderBoard extends React.Component {
  render() {
    const { rankedUsers } = this.props;
    return (
      <div>
        <LoginRedirect fromLocation='/leaderboard'/>
        <Navbar/>
        <div className="card">
          <div className="card-header">
            LeaderBoard
          </div>
          {rankedUsers.map((user) => (
            <ScoreCard 
              key={user.id}
              userId={user.id} 
              numAnswered={user.numAnswered} 
              numAsked={user.numAsked} 
              score={user.score}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
// Implement map dispatch to props
)(LeaderBoard)
