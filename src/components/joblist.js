import React, { Component } from 'react';

import duck from '../DUCKS'


class JobList extends Component {


    componentDidMount() {

    }

    render() {
        let content;

        content = duck.get('jobList').map((job, index) => {
            return (
                <li key={index}>{job.projectName}</li>
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
