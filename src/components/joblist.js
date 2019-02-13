import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
//import duck from '../DUCKS'

const mapStateToProps = state => ({
    duck: state.duck
});

class JobList extends Component {


    componentDidMount() {

    }

    render() {

        let jobList = this.props.duck.jobList || [];
        let content;

        content = jobList.map((job, index) => {
            return (
                <li key={index}>
                    <Link to={`/project/${job.projectName}`}>{job.projectName}</Link>
                </li>
            )
        })



        return (
            <div>
                <ul>
                    {content}
                </ul>
            </div>
        );
    }
}

export default connect(mapStateToProps)(JobList);
