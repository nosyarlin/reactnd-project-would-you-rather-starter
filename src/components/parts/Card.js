import React from 'react';
import { connect } from 'react-redux';

function mapStateToProps({ users }) {
  return {
    users,
  };
}

class Card extends React.Component {
  render() {
    const { users, userId, cardBody } = this.props;
    return (
      <div className="card mx-2 mt-2">
        <div className="card-header">
          <img
            className="avatar"
            src={users[userId].avatarURL}
            alt={`avatar of ${userId}`}
          />
          {users[userId].name}
        </div>
        {cardBody}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
)(Card);
