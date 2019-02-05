import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios'

import Nav from '../../components/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';

import duck from '../../DUCKS'
import JobList from '../../components/joblist';

const mapStateToProps = state => ({
  user: state.user,
});

class JobPage extends Component {

  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  }

  componentWillMount(){
    this.getJobs()
  }

  getJobs() {
    axios.get('/api/jobs/get-all').then((response) => {
      duck.post('jobList', response.data)
    })
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
    else {
      this.getJobs()
    }
  }

  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div>
          <h2>
            Jobs Page
          </h2>
            <JobList />
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
export default connect(mapStateToProps)(JobPage);
