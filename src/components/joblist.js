import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
//import duck from '../DUCKS'
import { waitFor } from '../util'

const mapStateToProps = state => ({
    jobList: state.duck.jobList
});

class JobList extends Component {
    constructor(props){
        super(props)

        this.state = {
            jobList: []
        }
    }


    componentWillUpdate(nextProps) {   
        if (nextProps.jobList !== this.props.jobList && nextProps.jobList !== '') {
            this.setState({
                jobList: nextProps.jobList
            })
        }
    }

    render() {

        let jobList = this.state.jobList;
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
