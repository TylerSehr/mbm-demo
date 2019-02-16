import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Peer from 'peerjs'

import Nav from '../../components/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';

//import duck from '../../DUCKS'
import p2p from '../../P2P'

const mapStateToProps = state => ({
    user: state.user,
    duck: state.duck
});



class p2pTest extends Component {
    constructor(props) { // job name may go here later
        super(props)

        this.state = {
            message: '',
 
        }

        

    }

    componentDidMount() {
        this.props.dispatch({ type: 'post', name: 'message', data: '' })
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        // this.awaitUser()

    }

    // awaitUser = () => {
    //     if (p2p.localPeer === null) {
    //         if (this.props.user.userName !== null) {
    //             console.log('we here');
                
    //             p2p.initialize(this.props.user.userName)
    //             return
    //         }
    //         setTimeout(this.awaitUser, 250);
    //     }
    // }



    componentDidUpdate() {

        
        if (this.state.message !== this.props.duck.message) {
            this.setState({
                message: this.props.duck.message
            })
        }
        
        
        if (!this.props.user.isLoading && this.props.user.userName === null) {
            this.props.history.push('home');
        }
    }

    componentWillReceiveProps() {
        
        
        // if (this.state.message !== this.props.duck.message) {
        //     this.setState({
        //         message: this.props.duck.message
        //     })
        // }
    }


    handleClick = () => {
        
        p2p.sendMessage('butthead')
    }

    render() {
        let content = null;


        if (this.props.user.userName) {
            content = (
                <div>
                    <h2>
                        p2p Test
                    </h2>
                    <h3>
                        {this.state.message}
                    </h3>
                    <button onClick={this.handleClick} />
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
export default connect(mapStateToProps)(p2pTest);
