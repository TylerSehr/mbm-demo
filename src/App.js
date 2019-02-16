import React from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import Header from './components/Header';
import LoginPage from './views/LoginPage/LoginPage';
import RegisterPage from './views/RegisterPage/RegisterPage';
import UserPage from './views/UserPage/UserPage';
import JobsPage from './views/JobsPage/JobsPage';
import ProjectPage from './views/ProjectPage/ProjectPage';
import NewProjectPage from './views/NewProjectPage/NewProjectPage'
import p2pTest from './views/p2p-practice(resurrected)/p2p-test'

import { USER_ACTIONS } from './redux/actions/userActions'
import p2p from './P2P'

import './styles/main.css';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  user: state.user,
});



class App extends React.Component {
  constructor(props) {
    super(props)

  }

  componentDidMount() {
    this.props.dispatch({ type: 'post', name: 'message', data: '' })
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.awaitUser()

  }

  awaitUser = () => {
    if (p2p.localPeer === null) {
      if (this.props.user.userName !== null) {
        console.log('we here');

        p2p.initialize(this.props.user.userName)
        return
      }
      setTimeout(this.awaitUser, 250);
    }
  }

  render() {
    return (
      <div>
        <Header title="Project Base" />
        <Router>
          <Switch>
            <Redirect exact from="/" to="/home" />
            <Route
              path="/home"
              component={LoginPage}
            />
            <Route
              path="/register"
              component={RegisterPage}
            />
            <Route
              path="/user"
              component={UserPage}
            />
            <Route
              path="/jobs"
              component={JobsPage}
            />
            <Route
              path="/project/:projectId"
              component={ProjectPage}
            />
            <Route
              path="/new-project"
              component={NewProjectPage}
            />
            <Route
              path="/p2p"
              component={p2pTest}
            />
            {/* OTHERWISE (no path!) */}
            <Route render={() => <h1>404</h1>} />

          </Switch>
        </Router>
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
