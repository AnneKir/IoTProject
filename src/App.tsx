import { DialogContent, DialogActions, DialogTitle, DialogContentText, Dialog, Grid, Divider, Paper, Typography, IconButton, TextField, CardHeader, CardContent, Button } from '@mui/material';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined'; import './App.css';
import mqtt, { IClientOptions, MqttClient, IPublishPacket, OnMessageCallback } from 'mqtt';
import Popup from 'reactjs-popup';
import { useEffect, useState } from 'react';
import { configureAbly, useChannel } from "@ably-labs/react-hooks";

configureAbly({ key: "OvMNXQ.X7M2HQ:-X-x182cpzFhWvj5W2_i2jJOktbNhzrtoEaoP3rpdMs" });

const subscribedTopics: string[] = [];
const receivedImages: Uint8Array[] = [];

// Map<topic, listOfImages>
const allReceivedImages = new Map<string, string[]>();

const url = "ws://diotp2p.mooo.com:8083";
const options: IClientOptions = {
  port: 8083,
  host: "diotp2p.mooo.com",
  // clientId: "peer1",
  protocol: 'mqtts',
  username: "RainbowDash",
  password: "kw8x5vaTh2kcrSWN",
  rejectUnauthorized: false
}

const client = mqtt.connect(url, options)

// bliver kaldt først
function uploadImage(topic: string, files: FileList, client: MqttClient) {
  for (let i = 0; i < files.length; i++) {
    const file = files.item(i);
    if (file != null) {
      const byteArray = getByteArray(file);
      byteArray.then(value => {
        // console.log("Success: " + value); // Success!
        client.publish("RainbowDash/" + topic, value.toString());
        console.log("publishing file to topic: " + topic);
        // console.log("byte array to string: " + value.toString());
        return value.toString;
      })
    }
  }
}

async function getByteArray(file: File) {
  //Get file from your input element

  //Wait for the file to be converted to a byteArray
  const byteArray = await fileToByteArray(file);

  //Do something with the byteArray
  console.log(byteArray);
  return byteArray;
}

function fileToByteArray(file: any): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    try {
      let reader = new FileReader();
      let fileByteArray: any = [];
      reader.readAsArrayBuffer(file);
      reader.onloadend = (evt) => {
        if (evt.target != null) {
          if (evt.target.result != null) {
            if (evt.target.readyState === FileReader.DONE) {
              let arrayBuffer = evt.target.result,
                array = new Uint8Array(arrayBuffer as ArrayBuffer);
              for (let byte of array) {
                fileByteArray.push(byte);
              }
            }
          }
        }
        console.log("Promise fileByteToArray: " + fileByteArray.toString())
        resolve(fileByteArray);
      }
    }
    catch (e) {
      reject(e);
    }
  })
}

function convertBackToImage(byteArrayImg: string) {
  return "data:image/png;base64," + byteArrayImg;
}

function convertBackToImg2(byteArrayString: string) {
  let utf8Encode = new TextEncoder();
  return utf8Encode.encode(byteArrayString);
}

// main function (ish)
function App(): JSX.Element {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [enteredTopic, setEnteredTopic] = useState("");

  const [channel, ably] = useChannel("channel-name", (message) => {
    console.log(message);
  });

  // useEffect(() => {
  // if (client) {
  client.on('connect', function () {
    // client.subscribe("RainbowDash/#");
    console.log("Connected to mqtt broker")
  });

  client.on('message', (topic, message) => {
    console.log("message: " + message);
    console.log("topic: " + topic);
    receivedImages.push(message);
    // save received image somewhere, but only once please
    const imagesInTopic = allReceivedImages.get(topic)
    if (imagesInTopic === undefined) {
      // This is the first message from this topic
      // create topic and add an array with the image
      const array: string[] = [];
      array.push(message.toString())
      allReceivedImages.set(topic, array);
    } else {
      // We have previously gotten messages about this topic
      // Add new image to this topic
      imagesInTopic.push(message.toString());
    }
  })


  const handleClickToOpen = () => {
    setDialogVisible(true);
  };

  const handleToClose = () => {
    setDialogVisible(false);
  };

  function subscribe(client: MqttClient, topic: string) {
    client.subscribe("RainbowDash/" + topic);
    subscribedTopics.push(topic);
    console.log("Subscribed to: " + topic);
    console.log(subscribedTopics.toLocaleString());
  }

  return (
    <div className='App'>
      <Paper elevation={2} sx={{ width: "100%" }}>
        <CardHeader title={"Rainbow Dash"}></CardHeader>
        <CardContent>
          <>
            <Divider />
            <Grid container padding={1} alignItems='center'>
              <Grid item xs={11}>
                <Typography variant='body2'>Subscribed to:</Typography>
              </Grid>
              <Grid item xs={1}>
                <IconButton size='small' onClick={handleClickToOpen}>
                  <AddCircleOutlinedIcon />
                </IconButton>
              </Grid>
            </Grid>
            <Divider />
            <Grid container padding={1} alignItems='center' height={'50px'}>
              {subscribedTopics.map((topic) => {
                console.log("Opdated list of subscribed topics")
                return (
                  <>
                    <Grid item xs={10}>
                      <Typography variant='h5'>{topic}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <input type='file' onChange={(e) => e.target.files != null ? uploadImage(topic, e.target.files, client) : null} />
                    </Grid>
                    <Grid item xs={12}>
                      {receivedImages.map((array) => {
                        // const img = convertBackToImg2(array);
                        return <img src={convertBackToImage(array.toString())} alt='' />
                      }
                      )}
                    </Grid>
                    <Grid item xs={12}>
                      <Divider />
                    </Grid>
                  </>)
              })}
            </Grid>
          </>
        </CardContent>

        <Dialog open={dialogVisible} onClose={handleToClose}>
          <DialogTitle>{"What to you want to subscribe to?"}</DialogTitle>
          <DialogContent sx={{ padding: '1' }}>
            <TextField placeholder='Topic' size='small' onChange={(newTopic) => setEnteredTopic(newTopic.target.value)} />
            <Button variant='contained' onClick={() => subscribe(client, enteredTopic)}>
              Subscribe
            </Button>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleToClose}
              color="primary" autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>

      </Paper>
    </div>
  );
}

export default App;
