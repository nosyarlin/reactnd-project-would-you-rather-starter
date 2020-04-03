import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { unsetAuthedUser } from '../../actions/authedUser';

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    users,
  };
}

class Navbar extends React.Component {
  onLogout = (e) => {
    this.props.dispatch(unsetAuthedUser());
  }

  render() {
    const { authedUser, users } = this.props;
    let name = '';
    if (authedUser !== null) {
      name = users[authedUser].name;
    }
    return (
      <nav className="navbar navbar-expand-md nav-pills">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink className="nav-link" to='/home'>
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to='/leaderboard'>
              Leaderboard
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to='/add'>
              New Question
            </NavLink>
          </li> 
        </ul>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <div className="nav-link">
              {name}
            </div>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/" onClick={this.onLogout}>
              Logout
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}

export default withRouter(connect(
  mapStateToProps,
)(Navbar));
