import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios'
import JobList from '../../components/joblist'

import Nav from '../../components/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import ws from './ws.client'

import duck from '../../DUCKS'


const mapStateToProps = state => ({
    user: state.user,
});

class ProjectPage extends Component {

    componentDidMount() {
        //this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        //ws.onopen()
    }

    componentWillMount() {
    }

    componentDidUpdate() {

    }

    render() {
        let content = null;


        content = (
            <div>
                <h2>
                    testing
          </h2>

            </div>
        );

        return (
            <div>
                <Nav />
                {content}
            </div>
        );
    }
}

// this allows us to use <App /> in index.js
export default ProjectPage;
