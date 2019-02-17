import { store } from './index'
// key pair stuff

export default class Message {
    constructor(type, data) {
        this.type = type;
        this.data = data;
        this.sig = 'fat'
    }

    static readMessage(message) {
        let newMessage = JSON.parse(message)    
        switch (newMessage.type) {
            case 'chat':
                store.dispatch({type: 'chat', payload: newMessage.data})
                break;
            // case 'chat-history':

            //     break;
            case 'vote':

                break;
            case 'change':

                break;
            case 'event':

                break;
            default:
                alert('something broke')
                break;
        }
    }

    static createChat(data) {
        return JSON.stringify(new Message('chat', data))
    }

    // static sendChatHistory(data) {
    //     return JSON.stringify(new Message('chat-history', data))
    // }

    static createVote(data) { //what is the data associated with a vote
        return JSON.stringify(new Message('vote', data))
    }

    static createChange(data) { // rendered demo, project file, creator (digital signature included) 
        return JSON.stringify(new Message('change', data))
    }

    static createEvent(data) {
        return JSON.stringify(new Message('event', data))
    }



    //everything in here is static method

    // sign

}