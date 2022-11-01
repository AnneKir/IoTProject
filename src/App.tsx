// import logo from './logo.svg';
import { Grid, Paper, Typography, Button, TextField } from '@mui/material';
import './App.css';
// import './first';
// import wrtc from 'wrtc';
import ReactDOM from 'react-dom/client';
import React from 'react';
import { SignalData } from 'simple-peer';
import io from 'socket.io-client';
import {
  Setup,
  JoinRequest,
  ClientOffer,
  State,
  setModel,
  getId,
  setRoom,
  Peers
} from 'react-simple-peer';
// import { startServer } from './first';
// import SimplePeerWrapper from 'simple-peer-wrapper';
import { startClient, gotData } from './client';
import { Box } from '@mui/system';


// import SimplePeerWrapper from 'simple-peer-wrapper';
// import wrtc from 'wrtc';

// const options = {
//   serverUrl: 'http://localhost:8081',
//   debugger: false,
//   simplePeerOptions: {
//     initiator: false,
//     trickle: false,
//     wrtc: wrtc
//   }
// };

// const options2 = {
//   serverUrl: 'http://localhost:8081',
//   debugger: false,
//   simplePeerOptions: {
//     initiator: true,
//     trickle: false,
//     wrtc: wrtc
//   }
// };

// type data = {
//   id: string;
//   data: object;
// }

// function rree() {
//   const spw = new SimplePeerWrapper(options);
//   console.log("ehek")
//   spw.connect();
//   spw.on('connect', () => {
//     console.log("conection");
//     spw.send("hej");
//   });
//   spw.on('data', (data: data) => {
//     console.log(data.data.toString());
//   });

// }

// function first() {
//   const spw = new SimplePeerWrapper(options2);
//   console.log("eheooo")
//   spw.connect();
//   spw.on('connect', () => {
//     console.log("conection");
//     spw.send("heiij");
//   });
//   spw.on('data', (data: data) => {
//     console.log(data.data.toString());
//   });
//   spw.on('error', (err: Error) => console.log('error', err))

// }


// function gotData(data: Object) {
//   // put the incoming data somewhere to use later
//   let partnerMouse = data.data;
//   console.log("got data: " + partnerMouse.toString())
// }

// let count = 0;
// function gotConnect(spw: SimplePeerWrapper) {
//   console.log('peer connection open');
//   count++;
//   spw.send("hej" + count.toString());
// }


class User {
  username: string;

  constructor(username: string) {
    this.username = username;
  }

}


function App(): JSX.Element {

  const ws = io('127.0.0.1:8000');

  return (
    <>
      <Setup
        onOfferRequest={processOfferRequest => {
          ws.on('offer-request', (request: JoinRequest) => processOfferRequest(request));
        }}

        emitOfferResponse={(joinRequest: JoinRequest, signalData: SignalData) => {
          ws.emit('offer-response', joinRequest, signalData);
        }}

        onJoinResponse={processJoinResponse => {
          ws.on('join-response', (offer: SignalData, id: string, roomCreatorId: string) => processJoinResponse(offer, id, 'AZE', roomCreatorId))
        }}

        emitJoinAck={(signalData, room, recievedId, id) => {
          ws.emit('join-ack', { offer: signalData, roomId: room, peerId: recievedId }, id);
        }}

        onClientOffer={processClientOffer => {
          ws.on('client-offer', (data: ClientOffer, peerId: string, sessionInitiator: boolean, emitterPeerId: string) => processClientOffer(data, peerId, sessionInitiator, emitterPeerId));
        }}

        emitInitiatorOffers={(offers, id, room) => {
          ws.emit('initiator-offers', offers, id, room);
        }}

        onLeaving={(processLeaving: (id: string) => void) => {
          ws.on('leaving', (id: string) => processLeaving(id));
        }}
      >
        <div className="App">
          <header className="App-header">

            <input type="text" onChange={event => setModel(new User(event.target.value))} />

            <p>
              State : <State />
            </p>

            <button onClick={() => {
              const roomId = 'myroom';
              const room = { initiatorPeerId: getId(), roomId: roomId };
              setRoom(roomId);
              ws.emit('create', room);
            }}>Create a room
            </button>

            <button onClick={() => {
              setRoom('myroom');
              ws.emit('join-request', { roomId: 'AZE', peerId: getId() });
            }}>Join a room
            </button>

            <Peers>
              {
                peers => {
                  return <ul>
                    {Array.from<any>(peers).map((set: [string, User]) => <li
                      key={set[1].username}>{set[1].username}</li>)}
                  </ul>
                }
              }
            </Peers>
          </header>
        </div>
      </Setup>
      {/* <div className="App">
      <Box padding={4}>
        <Paper elevation={2}>
          <Grid container alignItems={"center"} justifyContent={"center"} padding={2}>
            <Grid item xs={6}>
              <Typography>This is a fuckign website</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>Where u can upload fuckign picutes</Typography>
            </Grid>
            <Grid item marginTop={4} xs={10}>
              This could be a thing
            </Grid>
            <Grid item marginTop={4} xs={"auto"}>
              <Button onClick={() => startClient()}> connect </Button>
            </Grid>
            {/* <Grid item marginTop={4} xs={"auto"}>
              <Button onClick={()=> startServer()}> start </Button>
            </Grid> */}
      {/* <Grid>
              <Typography>{showReceivedData()}</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField id="standard-basic" label="Standard" variant="standard" />
            </Grid>
          </Grid>
        </Paper>
      </Box> */}
      {/* <header className="App-header"> */}
      {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      {/* <Typography>Welcome</Typography> */}
      {/* </header> */}
      {/* </div> */}
    </>
  );
}

export default App;
