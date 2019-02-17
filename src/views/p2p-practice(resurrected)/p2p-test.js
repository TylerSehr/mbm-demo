import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Peer from 'peerjs'
import Message from '../../MessageHandler'

import Nav from '../../components/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';

//import duck from '../../DUCKS'
import p2p from '../../P2P'

const mapStateToProps = state => ({
    user: state.user,
    duck: state.duck,
    chat: state.chat
});



class p2pTest extends Component {
    constructor(props) { // job name may go here later
        super(props)

        this.state = {
            message: '',
            lastMessage: null,
            chatPool: []
        }



    }

    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    }





    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
            this.props.history.push('home');
        }
        
    }

    componentWillUpdate(nextProps){
        if (nextProps.chat !== null && nextProps.chat !== this.state.lastMessage) {
            let trimmedChatPool = this.trimAndReturnChatPool()
            this.setState({
                chatPool: [...trimmedChatPool, nextProps.chat],
                lastMessage: nextProps.chat
            })
        }
    }

    trimAndReturnChatPool(){
        if (this.state.chatPool.length > 49) {
            return this.state.chatPool.slice(1, this.state.chatPool.length+1)
        }
        else{
            return this.state.chatPool
        }
    }


    handleChange = (event) => {
        event.preventDefault()
        this.setState({
            message: event.target.value
        })
        
    }

    handleClick = (event) => {
        event.preventDefault()
        p2p.sendMessage(Message.createChat(this.state.message))
        let trimmedChatPool = this.trimAndReturnChatPool()
        this.setState({
            chatPool: [...trimmedChatPool, this.state.message],
            message: ''
        })
    }

    render() {
        let content = null;


        if (this.props.user.userName) {
            content = (
                <div>
                    <h2>
                        chat Test
                    </h2>
                    <div>
                        {JSON.stringify(this.state.chatPool)}
                    </div>
                    <form>
                        <input type="text" placeholder="Send a message" onChange={this.handleChange} value={this.state.message} />
                        <input type="submit" value="Chat" onClick={this.handleClick}/>
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
export default connect(mapStateToProps)(p2pTest);
