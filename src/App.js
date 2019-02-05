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

import './styles/main.css';

const App = () => (
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
        {/* OTHERWISE (no path!) */}
        <Route render={() => <h1>404</h1>} />

      </Switch>
    </Router>
  </div>
);

export default App;
