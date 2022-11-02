// import logo from './logo.svg';
import { Grid, Paper, Typography, Button, TextField } from '@mui/material';
import './App.css';
// import './first';
// import wrtc from 'wrtc';
import ReactDOM from 'react-dom/client';
import React from 'react';
import { SignalData } from 'simple-peer';
import { io, Socket } from 'socket.io-client';
import { ServerToClientEvents, ClientToServerEvents } from "./SocketTypes";
import {
  Setup,
  JoinRequest,
  ClientOffer,
  State,
  setModel,
  getId,
  setRoom,
  Peers,
  JoinRoomButton,
  PeerVideo
} from 'react-simple-peer';
// import { startClient, gotData } from './client';
// import { Box } from '@mui/system';


class User {
  username: string;

  constructor(username: string) {
    this.username = username;
  }

}



function handleOfferRequest(processOfferRequest: (JoinRequest: JoinRequest) => void, socket: Socket) {
  socket.on('offer-request', (request: JoinRequest) => processOfferRequest(request));
  console.log("Received offer-request")
  console.log(processOfferRequest)
  console.log(socket)
}

function emitOfferResponse(joinRequest: JoinRequest, signalData: SignalData, socket: Socket) {
  socket.emit('offer-response', joinRequest, signalData);
  console.log("Send offer-response")
}

function handleJoinResponse(processJoinResponse: (offer: SignalData, id: string, room: string , roomCreatorId: string) => void, socket: Socket) {
  socket.on('join-response', (offer: SignalData, id: string, roomCreatorId: string) => processJoinResponse(offer, id, 'AZE', roomCreatorId))
  console.log("Received join-response")
  console.log(processJoinResponse)
  console.log(socket)
}

function emitJoinResponse(signalData: SignalData, room: string, recievedId: string, id: string, socket: Socket) {
  socket.emit('join-ack', { offer: signalData, roomId: room, peerId: recievedId }, id);
  console.log("Join-ack send")
}

function handleClientOffer(processClientOffer: (offer: ClientOffer, id: string, isRoomCreator: boolean, emitterId: string) => void, socket: Socket) {
  socket.on('client-offer', (data: ClientOffer, peerId: string, sessionInitiator: boolean, emitterPeerId: string) => processClientOffer(data, peerId, sessionInitiator, emitterPeerId));
  console.log("Received client-offer")
  console.log(processClientOffer)
  console.log(socket)
}

function emitInitiatorOffers(offers: any, id: string, room: string, socket: Socket) {
  socket.emit('initiator-offers', offers, id, room);
  console.log("Sends initiator-offer :)")
  console.log(offers)
  console.log(id)
  console.log(room)
  console.log(socket)
}

function handleLeaving(processLeaving: (id: string) => void, socket: Socket) {
  socket.on('leaving', (id: string) => processLeaving(id));
  console.log("I'm leaving")
  console.log(processLeaving)
  console.log(socket)
}


function App(): JSX.Element {

  const ws = io('localhost:3000');

  return (
    <>
      <Setup
        // Wrapper around OfferRequest event listener that provides processing callback for that request.
        onOfferRequest={(processOfferRequest: (JoinRequest: JoinRequest) => void) => handleOfferRequest(processOfferRequest, ws)}

        // Wrapper around OfferRequest event emitter that provides both JoinRequest and SignalingData objects.
        emitOfferResponse={(joinRequest: JoinRequest, signalData: SignalData) => emitOfferResponse(joinRequest, signalData, ws)}

        // Wrapper around JoinResponse event listener that provides processing callback for that response.
        onJoinResponse={(processJoinResponse: (offer: SignalData, id: string, room: string , roomCreatorId: string) => void) => handleJoinResponse(processJoinResponse, ws)}

        // Wrapper around JoinAck event emitter that provides SignalingData as well as room id, received peer id and self peer id.
        emitJoinAck={(signalData: SignalData, room, recievedId, id) => emitJoinResponse(signalData, room, recievedId, id, ws)}

        // Wrapper around clientOffer event listener that provides processing callback for that offer.
        onClientOffer={(processClientOffer: (offer: ClientOffer, id: string, isRoomCreator: boolean, emitterId: string) => void) => handleClientOffer(processClientOffer, ws)}

        // Wrapper around InitiatorOffers event emitter that provides list of offers, self id and room id.
        emitInitiatorOffers={(offers, id, room) => emitInitiatorOffers(offers, id, room, ws)}

        // Wrapper around leaving event listener that provides processing callback for that leaving peer.
        onLeaving={(processLeaving: (id: string) => void) => handleLeaving(processLeaving, ws)}
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
              console.log("room id: " + roomId);
              console.log("initiater peer id: " + getId());
              ws.emit('create', room);
              console.log("peer " + getId() + " tried to create room " + roomId)
            }}>Create a room
            </button>

            <button onClick={() => {
              setRoom('myroom');
              ws.emit('join-request', { roomId: 'myroom', peerId: getId() });  // room id should not be 'AZE'
              console.log("peerID: " + getId())
              console.log("you tried to join a room")
            }}>Join a room
            </button>

            <button onClick={() => {
              setRoom('myroom');
              ws.emit('initiator-offers', { roomId: 'AZE', peerId: getId() });
              console.log("peerID: " + getId())
              console.log("you tried to join a room")
            }}>Initiate a room
            </button>

            <JoinRoomButton room='42' join={() => 42} className="Henry">
              <Typography>Hello</Typography>
            </JoinRoomButton>

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
