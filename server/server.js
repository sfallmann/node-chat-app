const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');


const publicPath = path.join(__dirname, '../public');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', function connection(socket) {
  console.log('New user connected.');

  socket.emit('newMessage',
  generateMessage('Admin', 'Welcome to the chat!'));

  socket.broadcast.emit('newMessage',
  generateMessage('Admin', 'New user has joined'));

  socket.on('createMessage', function createEmail(message, callback) {
    console.log('Create message', message);
    io.emit('newMessage', generateMessage(message.from, message.text));

    if (typeof callback === 'function'){
      callback('This is from the server');
    }
  });


  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin',
    coords.latitude, coords.longitude));
  });

  socket.on('disconnect', function disconnect() {
    console.log('Disconnected from client');
  });

});

server.listen(port, function listen() {
  console.log(`Server listening on port ${port}`);
});
