//https://github.com/lisajamhoury/simple-peer-server
// in terminal 
// npm install simple-peer-server

// Require the module in your server code.
const SimplePeerServer = require('simple-peer-server');

// Pass an http server into the signalling server. This will be used by the socket.io server.
const http = require('http');
const server = http.createServer();
const spServer = new SimplePeerServer(server);

server.listen(8081);

//# in your terminal
// node app.js