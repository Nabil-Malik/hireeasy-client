import io from 'socket.io-client'

//Connect to the server, get the connection object with the server
const socket = io('ws://localhost:4000')
// Bind the monitor, receive the message sent by the server
socket.on('receiveMsg', function (data) {
  console.log('The client receives the message sent by the server', data)
})

//Send message
socket.emit('sendMsg', {name: 'abc'})
console.log('The client sends a message to the server', {name: 'abc'})
