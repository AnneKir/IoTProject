// https://github.com/lisajamhoury/simple-peer-wrapper

const SimplePeerWrapper = require('simple-peer-wrapper');
// in your client code - create a wrapper and connect to your server
const options = {
    serverUrl: 'http://localhost:8081',
  };
  
  const spw = new SimplePeerWrapper(options);
  spw.connect();
  
  spw.on('data', (data) => {
    const partnerData = data.data;
  });// make sure you close the connection before you close the window
  
  window.onbeforeunload = () => {
    spw.close();
  };

  // a global variable to hold data
let partnerMouse;

// when we receive data, call the gotData function
spw.on('data', gotData);

// this runs each time data is received
// the incoming data is passed into the function
function gotData(data) {
  // put the incoming data somewhere to use later
  partnerMouse = data.data;
}