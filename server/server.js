const express = require('express');
const { createServer } = require('http'); // native http server
const { Server } = require('socket.io'); // socket.io server

const app = express(); // express app
const httpServer = createServer(app); // create http server

// allow socket connections from frontend origin in dev
const io = new Server(httpServer, { // socket.io server
  cors: { // CORS settings
    origin: 'http://localhost:5173', // React dev server
    methods: ['GET', 'POST'] // allowed methods
  }
});

// when client connects
io.on('connection', (socket) => { // socket is the client connection
  console.log('a user connected:', socket.id); // log the connection

    // listen for chat messages from this client
    socket.on('chat message', (msg) => { // msg is the message sent from client
        console.log('message from', socket.id, ':', msg); // log the message
        io.emit('chat message', msg); // broadcast to all clients including sender
    });

    socket.on('disconnect', () => {
        console.log('user disconnected:', socket.id); // when client disconnects
    });
});

// start server
const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});