import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Peer from 'peerjs'

import Nav from '../../components/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';

//import duck from '../../DUCKS'
//import P2P from './p2p'

const mapStateToProps = state => ({
    user: state.user,
    duck: state.duck
});


//let p2p = new P2P;



class p2pTest extends Component {
    constructor(props) { // job name may go here later
        super(props)

        this.state = {
            message: ''
        }

        this.localPeer = null;

        this.listOfPeers = [];

    }

    initialize(userName) {
        this.createPeer(userName);
        this.getPeers();
    }

    createPeer(userName) {
        this.localPeer = new Peer(userName, { host: 'localhost', port: 9000, path: '/peerjs' });
        this.localPeer.on('open', function (id) {
            console.log('My peer ID is: ' + id);
        });
        this.listenForPeers()
    }

    listenForPeers() {
        this.localPeer.on('connection', (conn) => {
            this.messageHandler(conn)
        })
    }

    getPeers() {
        axios.get('/api/p2p/peers').then((response) => {
            console.log(response.data);
            this.listOfPeers = response.data;
            this.listOfPeers.forEach(peer => {
                if (peer !== this.localPeer.id) {
                    const conn = this.localPeer.connect(peer)
                    this.connectPeers(conn)
                }
            })
        })
    }

    connectPeers(conn) {
        if (conn !== undefined) {
            this.messageHandler(conn)
        }
        else{
            console.log('connection failed probably because you are already connected');
        }
    }


    messageHandler(conn) {
        conn.on('open', () => {

            conn.on('data', (data) => {
                console.log('received', data);
                //duck.post('message', data)
                this.props.dispatch({type: 'post', name: 'message', data})
                this.setState({
                    message: data
                })
            })

            conn.send('hi there')
        })
    }

    sendMessage(message){
        const connList = this.localPeer.connections
        for(const key in connList) {
            if (connList.hasOwnProperty(key)) {
                const conn = connList[key];
                conn[0].send(message)
            }
        }
    }

    componentDidMount() {
        this.props.dispatch({ type: 'post', name: 'message', data: ''})
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        this.awaitUser()
        
    }

    awaitUser = () => {
        if (this.props.user.userName !== null) {
            this.initialize(this.props.user.userName)
            return
        }
        setTimeout(this.awaitUser, 250);
    }



    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
            this.props.history.push('home');
        }
    }


    handleClick = () =>{
        
        this.sendMessage('butthead')
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
