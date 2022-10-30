// https://github.com/lisajamhoury/simple-peer-wrapper

import wrtc from 'wrtc';

import SimplePeerWrapper from 'simple-peer-wrapper';
// in your client code - create a wrapper and connect to your server
const options = {
  serverUrl: 'http://localhost:8081',
  debugger: true,
  simplePeerOptions: {
    initiator: true,
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

let count = 0;
function gotConnect() {
  console.log('peer connection open');
  count++;
  spw.send("hej" + count.toString());
}

spw.on('error', err => console.log('error', err))
