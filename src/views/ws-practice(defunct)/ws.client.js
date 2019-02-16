

const Socket = new WebSocket('ws://localhost:8080');

Socket.onopen = () => {
  console.log('working');
  Socket.send('hello server!');
}

Socket.onmessage = (evt) =>{ 
  const received_msg = evt.data;
  console.log(received_msg);
  
};





export default Socket