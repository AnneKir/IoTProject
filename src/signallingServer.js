//https://github.com/lisajamhoury/simple-peer-server
// in terminal 
// npm install simple-peer-server

// Require the module in your server code.
// const SimplePeerServer = require('simple-peer-server');
import SimplePeerServer from 'simple-peer-server';

// Pass an http server into the signalling server. This will be used by the socket.io server.
// const http = require('http');
import http from 'http'; 

const server = http.createServer();
const spServer = new SimplePeerServer(server, true);

server.listen(8081);
console.log("server is listening")

//# in your terminal
// node app.js