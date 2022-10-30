// https://github.com/lisajamhoury/simple-peer-wrapper

import React from 'react';
// import Grid from '@material-ui/core/Grid';
// import ReactDOM from 'react-dom/client';

import SimplePeerWrapper from 'simple-peer-wrapper';
import wrtc  from 'wrtc';
const id = Math.floor(Math.random() * 100);
// in your client code - create a wrapper and connect to your server
const options = {
  serverUrl: 'http://localhost:8081',
  debugger: true,
  simplePeerOptions: {
    initiator: false,
    trickle: false,
    wrtc: wrtc
  }
};

const spw = new SimplePeerWrapper(options); // creates a socket connection to signaling server
spw.connect();  // initiates peer connection via socket connection

spw.on('connect', gotConnect);

// document.getElementById("incoming");

// make sure you close the connection before you close the window
// window.onbeforeunload = () => {
//   spw.close();
// };

// a global variable to hold data
let partnerMouse;

// when we receive data, call the gotData function
spw.on('data', gotData);

// this runs each time data is received
// the incoming data is passed into the function
function gotData(data) {
  // put the incoming data somewhere to use later
  partnerMouse = data.data;
  console.log("got data: " + partnerMouse.toString())
}
// document.querySelector()

function gotConnect() {
  console.log('peer connection open');
  console.log("sending: hej from " + id.toString());
  spw.send("hej from " + id.toString());
}

function sendMessage(msg) {
  console.log('Sending: ' + msg.toString())
  spw.send(msg);
}

// spw.on('close', () => {spw.close()})
// window.onbeforeunload = () => {
//   spw.close();
// };

spw.on('error', err => console.log('error', err))





