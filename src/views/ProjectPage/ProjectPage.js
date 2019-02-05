import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios'
import JobList from '../../components/joblist'

import Nav from '../../components/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';

import duck from '../../DUCKS'


const mapStateToProps = state => ({
  user: state.user,
});

class ProjectPage extends Component {

  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  }

  componentWillMount(){
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div>
          <h2>
            Project Page
          </h2>
         
        </div>
      );
    }

    return (
      <div>
        <Nav />
        {content}
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(ProjectPage);
