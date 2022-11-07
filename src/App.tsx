// import logo from './logo.svg';
import { Grid, Paper, Typography, Button, TextField } from '@mui/material';
import './App.css';
// // import './first';
// // import wrtc from 'wrtc';
// import ReactDOM from 'react-dom/client';
// import React, { useState } from 'react';
// // import HookMqtt from 'MQTT_Hook';
// // import paho from 'Paho'';
// import { HookMqtt } from './components/Hook/index'
// import { Connection } from './components/Hook/Connection';
// import { Publisher } from './components/Hook/Publisher';
// import SimplePeer, { SignalData, Instance } from 'simple-peer';
// import { io, Socket } from 'socket.io-client';
// import { ServerToClientEvents, ClientToServerEvents } from "./SocketTypes";
// import {
//   Setup,
//   JoinRequest,
//   ClientOffer,
//   State,
//   setModel,
//   getId,
//   setRoom,
//   Peers,
//   JoinRoomButton,
//   PeerVideo,
//   ReactSimplePeerModel
// } from 'react-simple-peer';
// import { urlToHttpOptions } from 'url';
import mqtt, { IClientOptions } from 'mqtt';


function App(): JSX.Element {

  // const [connectStatus, setConnectStatus] = useState("");
  // const [client, setClient] = useState<MqttClient>(() => MqttClient);
  // const mqttConnect = (host: string, mqttOption?: mqtt.IClientOptions) => {
  //   setConnectStatus('Connecting');
  //   const client: MqttClient = mqtt.connect(host, mqttOption);
  //   setClient(() => client);
  // }

  const url = "ws://diotp2p.mooo.com:8083"
  const options: IClientOptions = {
    port: 8083,
    host: "diotp2p.mooo.com",
    // clientId: "peer1",
    protocol: 'mqtts',
    username: "RainbowDash",
    password: "kw8x5vaTh2kcrSWN",
    rejectUnauthorized: false
  }

  // const clientConnectionOptions = {
  //   keepalive: 100,
  //   protocolId: 'MQTT',
  //   protocolVersion: 4,
  //   clean: true,
  //   reconnectPeriod: 1000,
  //   connectTimeout: 30 * 3000,
  //   will: {
  //     topic: 'WillMsg',
  //     payload: 'Connection Closed abnormally..!',
  //     qos: 0,
  //     retain: false
  //   },
  //   rejectUnauthorized: false
  // };

  const client = mqtt.connect(url, options)

  client.on('connect', function () {
    console.log("Im funckign connetced !!!!!!!!!!!!!!!!")
  });




  return (
    <div className='App'>
      {/* <HookMqtt /> */}
      <Grid container alignItems={"center"} justifyContent="center">
        <Grid item>
          <Typography>Hello fuckers</Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
