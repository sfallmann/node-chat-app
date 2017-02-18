const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public' );

const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', function connection(socket){
  console.log('New user connected.');

  socket.on('disconnect', function disconnect(){
    console.log('Disconnected from client');
  });
});

server.listen(port, function listen(){
  console.log(`Server listening on port ${port}`);
});