import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}

class LoginRedirect extends React.Component {
  render() {
    const { authedUser, fromLocation } = this.props;
    if (authedUser === null) {
      return (
        <Redirect
          to={{
            pathname: "/",
            state: { from: fromLocation }
          }}/>
      );
    }
    return null;
  }
}

export default connect(
  mapStateToProps,
)(LoginRedirect);
