//import duck from '../../DUCKS';
import React, { Component } from 'react'
import { store } from './index'
import Message from './MessageHandler'


const Peer = require('peerjs')
const axios = require('axios')


class P2P {
    constructor() { // job name may go here later


        this.localPeer = null;

        this.listOfPeers = [];

        this.active = false;

        this.activeConnections = []

    }

    initialize(userName) {
        if (this.active === false && this.localPeer === null) {
            this.createPeer(userName);
        }
    }

    waitForLocalPeer(){
        if(this.localPeer !== undefined) {
            
            
            this.getPeers();
            this.listenForPeers();
            return
        }
        setTimeout(this.waitForLocalPeer, 250)
    }

    createPeer(userName) {
        this.localPeer = new Peer(userName, { host: 'localhost', port: 9000, path: '/peerjs' });
        this.localPeer.on('open', function (id) {
            console.log('My peer ID is: ' + id);
        });
        
        this.waitForLocalPeer()
    }

    listenForPeers() {
        this.localPeer.on('connection', (conn) => {
            let exists = this.activeConnections.indexOf(conn)
            if (exists === -1 && conn !== undefined) {
                this.activeConnections.push(conn)
                this.messageHandler(conn)
            }
        })
    }

    getPeers() {
        axios.get('/api/p2p/peers').then((response) => {
            this.active = true;
            console.log(response.data);
            this.listOfPeers = response.data;
            this.listOfPeers.forEach(peer => {
                if (peer !== this.localPeer.id) {
                    this.connectPeer(peer)
                }
            })
        })
    }

    connectPeer(peer) {
        let conn = this.localPeer.connect(peer)
        if (conn) {
            this.activeConnections.push(conn)
            this.messageHandler(conn)
            return
        }
        setTimeout(this.connectPeer, 50)
    }

    messageHandler(conn) {
        
        conn.on('open', () => {

            conn.on('data', (data) => {

                console.log('all data logs', data);

                Message.readMessage(data)

            })

            conn.send(Message.createChat('hi there'))
        })
    }

    sendMessage(message) {
        this.activeConnections.forEach(conn => {
            conn.send(message)
        })
    }







}

let p2p = new P2P()

export default p2p




