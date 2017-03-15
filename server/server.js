const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const users = new Users();

app.use(express.static(publicPath));

io.on('connection', function connection(socket) {
  console.log('New user connected.');



  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name are required');
    }

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    socket.emit('newMessage',
    generateMessage('Admin', 'Welcome to the chat!'));

    socket.broadcast.to(params.room).emit('newMessage',
    generateMessage('Admin', `${params.name} has joined ${params.room}`));
    callback();
  });

  socket.on('createMessage', function createMessage(message, callback) {
    const user = users.getUser(socket.id);
    if (user && isRealString(message.text)){
      io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
    }

    if (typeof callback === 'function') {
      callback();
    }
  });

  socket.on('createLocationMessage', (coords) => {
    const user = users.getUser(socket.id);
    if (user) {
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name,
      coords.latitude, coords.longitude));
    }

  });

  socket.on('disconnect', function disconnect() {
    const user = users.removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room))
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`))
    }

    console.log('Disconnected from client');
  });

});

server.listen(port, function listen() {
  console.log(`Server listening on port ${port}`);
});
