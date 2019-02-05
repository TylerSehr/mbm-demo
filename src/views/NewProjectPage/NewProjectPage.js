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

class NewProjectPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            projectName: '',
            description: '',
            paymentAmount: 0,
            rewardPerRound: 0,
            startingFile: '',
            tags: '',
        }
    }

    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    }

    componentWillMount() {
    }

    getProjectDetails() {
        // axios.get('/api/jobs/get-all').then((response) => {
        //   duck.post('jobList', response.data)
        // })
    }

    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
            this.props.history.push('home');
        }
    }

    handleChangeFor = (event) => {
        console.log(event.target.value);
        console.log(event.target.name)
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    submitNewProject = () => {
        let r = this.state;
        if (r.projectName !== ''
            && r.description !== ''
            && r.paymentAmount !== 0
            && r.rewardPerRound !== 0
            && r.startingFile !== ''
            && r.tags !== ''
        ) {
            const data = {
                projectName: r.projectName,
                owner: this.props.user.userName,
                description: r.description,
                paymentAmount: r.paymentAmount,
                rewardPerRound: r.rewardPerRound,
                starterFile: r.starterFile,
                name: this.props.user.userName,
                tags: r.tags
            }
            axios.post('/api/jobs/new-job', data)
            .then((response)=>{
                console.log(response);
            })
            .catch((error)=>{
                console.log(error);
            })
        }

    }


    render() {
        let content = null;

        if (this.props.user.userName) {
            content = (
                <div>
                    <form>
                        <h4>create your project</h4>
                        <input type="text"
                            placeholder="project name"
                            name="projectName"
                            onChange={this.handleChangeFor}
                        />
                        <input type="text"
                            placeholder="description"
                            name="description"
                            onChange={this.handleChangeFor}
                        />
                        <input type="number"
                            placeholder="payment amount"
                            name="paymentAmount"
                            onChange={this.handleChangeFor}
                        />
                        <input type="number"
                            placeholder="reward per round"
                            name="rewardPerRound"
                            onChange={this.handleChangeFor}
                        />
                        <input type="text"
                            placeholder="starting file"
                            name="startingFile"
                            onChange={this.handleChangeFor}
                        />
                        <input type="text"
                            placeholder="tags (separate by commas)"
                            name="tags"
                            onChange={this.handleChangeFor}
                        />
                        <input type="button" value="Create" onClick={this.submitNewProject} />
                    </form>
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
export default connect(mapStateToProps)(NewProjectPage);
