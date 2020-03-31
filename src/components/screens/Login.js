import React from 'react';
import { connect } from 'react-redux';
import { setAuthedUser } from '../../actions/authedUser';
import { Redirect, withRouter } from 'react-router-dom';

function mapStateToProps({ users }) {
  return { users };
}

export class Login extends React.Component {
  constructor(props) {
    super(props);
    const fromLocation = this.props.location.state
      ? this.props.location.state.from
      : null;
    this.state = {
      selected: null,
      loggedIn: false,
      from: fromLocation || { pathname: '/home' },
    }
  }

  onSelect = (e) => {
    const selected = e.target.value;
    this.setState(() => ({
      selected,
    }));
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.dispatch(setAuthedUser(
      this.state.selected
    ));
    this.setState(() => ({
      loggedIn: true,
    }));
  }

  render() {
    const { users } = this.props;
    const { selected, from, loggedIn } = this.state;
    if (loggedIn) {
      return <Redirect to={from}/>
    }
    return (
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card my-5 p-2">
            <h1 className="text-center mb-2">Would You Rather!</h1>
            <div>
              <h2 className="text-center">Login</h2>
              <form onSubmit={this.handleSubmit}>
                <select className="form-control mb-1" onChange={this.onSelect}>
                  <option value={null}>
                    Choose your user
                  </option>
                  {Object.keys(users).map((userID) => (
                    <option value={userID} key={userID}>
                      {users[userID].name}
                    </option>
                  ))}
                </select>
                <button
                  className="btn btn-primary btn-block"
                  type="submit"
                  disabled={selected === null}>
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(
  mapStateToProps,
)(Login))
