const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: 'https://demo-share.onrender.com',
    methods: ['GET', 'POST']
  }
});

let PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));
server.listen(PORT, function() {
  console.log('Server is listening on port' + `${PORT}`);
});

let currentInstance = '';

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
