import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import Navbar from '../parts/Navbar';
import LoginRedirect from '../parts/LoginRedirect';
import { handleAddQuestion } from '../../actions/shared';

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    users,
  };
}

export class NewQuestion extends React.Component {
  state = {
    optionOneText: '',
    optionTwoText: '',
  }

  onChange = (e) => {
    const { id, value } = e.target;
    this.setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { dispatch } = this.props;
    const { optionOneText, optionTwoText } = this.state;
    dispatch(handleAddQuestion(optionOneText, optionTwoText));
    this.setState({
      optionOneText: '',
      optionTwoText: '',
    });
    this.props.history.push('/home');
  }

  render() {
    const { optionOneText, optionTwoText } = this.state;
    return (
      <div>
        <LoginRedirect fromLocation='/add'/>
        <Navbar/>
        <div className="card">
          <div className="card-header">
            Would you rather...
          </div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="optionOneText">Option 1</label>
                <input 
                  type="text"
                  className="form-control"
                  id="optionOneText"
                  placeholder="Enter first option"
                  value={optionOneText}
                  onChange={this.onChange}/>
              </div>
              <div className="form-group">
                <label htmlFor="optionTwoText">Option 2</label>
                <input 
                  type="text"
                  className="form-control"
                  id="optionTwoText"
                  placeholder="Enter second option"
                  value={optionTwoText}
                  onChange={this.onChange}/>
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={optionOneText === '' && optionTwoText === ''}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(
  mapStateToProps,
)(NewQuestion))
