import newDuck from './DUCKS'


const chat = (state = null, action) => {
    switch (action.type) {
        case 'chat':
            return action.payload
        case 'get-chat':
            //get chat history from someone
            return state;
        
        default:
            return state;
    }
};

// // case 'vote':
        // //     newDuck.post(action.name, action.data)
        // //     return newDuck.state;
        // // case 'change':
        // //     newDuck.update(action.name, action.data)
        // //     return newDuck.state;
        // // case 'event':
        // //     newDuck.delete(action.name, action.data)
        // //     return newDuck.state;

//break out into their own reducers



export default chat