import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import duck from '../DUCKS'


class JobList extends Component {


    componentDidMount() {

    }

    render() {

        let jobList = duck.get('jobList') || [];
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

export default JobList;
