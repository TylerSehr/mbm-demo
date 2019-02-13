import duck from '../../DUCKS';
import React, { Component} from 'react'
import { connect } from 'react-redux'

const Peer = require('peerjs')
const axios = require('axios')


class P2P{
    constructor() { // job name may go here later
 

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
                duck.post('message', data)
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






}



export default P2P




