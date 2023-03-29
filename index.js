const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
  cors:{
    origin: "https://demo-textshare.netlify.app",
  },
});

let currentInstance = '';

app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket) {
  console.log('A user connected');

  // Send current instance to new user
  socket.emit('getInstance', currentInstance);

  // Receive instance from user and broadcast to others
  socket.on('sendInstance', function(instance) {
    currentInstance = instance;
    socket.broadcast.emit('getInstance', currentInstance);
  });

  socket.on('disconnect', function() {
    console.log('A user disconnected');
  });
});

http.listen(3000, function() {
  console.log('Server is listening on port 3000');
});
