import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Peer from 'peerjs'

import Nav from '../../components/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';

import duck from '../../DUCKS'
import P2P from './p2p'

const mapStateToProps = state => ({
    user: state.user,
});


let p2p = new P2P;



class p2pTest extends Component {

    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        this.awaitUser()
        
    }

    awaitUser = () => {
        if (this.props.user.userName !== null) {
            p2p.initialize(this.props.user.userName)
            return
        }
        setTimeout(this.awaitUser, 250);
    }



    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
            this.props.history.push('home');
        }
    }

    handleClick() {
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
                    <button onClick={this.handleClick}/>
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
