import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';
import Login from './screens/Login';
import Home from './screens/Home';
import Question from './screens/Question';
import Page404 from './screens/Page404';
import LeaderBoard from './screens/LeaderBoard';
import NewQuestion from './screens/NewQuestion';
import LoadingBar from 'react-redux-loading';

function mapStateToProps({ users }) {
  return {
    loading: Object.entries(users).length === 0,
  };
}

export class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    return (
      <Router>
        <link 
          rel="stylesheet" 
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
          integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
          crossOrigin="anonymous"
        />
        <Fragment>
          <LoadingBar/>
          <div className='container'>
            {this.props.loading
              ? null
              : (
                <div>
                  <Switch>
                    <Route path="/" exact component={Login}/>
                    <Route path="/home" component={Home}/>
                    <Route path="/questions/:qid" component={Question}/>
                    <Route path="/leaderboard" component={LeaderBoard}/>
                    <Route path="/add" component={NewQuestion}/>
                    <Route path="*" component={Page404}/>
                  </Switch>
                </div>
              )
            }
          </div>
        </Fragment>
      </Router>
    );
  }
}

export default connect(
  mapStateToProps,
)(App)
