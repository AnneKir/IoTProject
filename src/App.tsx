import { DialogContent, DialogActions, DialogTitle, DialogContentText, Dialog, Grid, Divider, Paper, Typography, IconButton, TextField, CardHeader, CardContent, Button } from '@mui/material';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined'; import './App.css';
import mqtt, { IClientOptions, MqttClient } from 'mqtt';
import Popup from 'reactjs-popup';
import React from "react";

function subscribe(client: MqttClient, topic: string) {
  client.subscribe("RainbowDash/" + topic);
  console.log("Subscribed to: " + topic);
}

function subscribeToStorskrald(client: MqttClient) {
  subscribe(client, "Storskrald");
}

function uploadImage() {

}


function App(): JSX.Element {
  const [dialogVisible, setDialogVisible] = React.useState(false);

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

  const client = mqtt.connect(url, options)

  client.on('connect', function () {
    console.log("Im funckign connetced !!!!!!!!!!!!!!!!")
  });

  const handleClickToOpen = () => {
    setDialogVisible(true);
  };

  const handleToClose = () => {
    setDialogVisible(false);
  };


  return (
    <div className='App'>
      <Paper elevation={2} sx={{ width: "100%" }}>
        <CardHeader title={"Rainbow Dash"}></CardHeader>
        <CardContent>
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
          <Grid container padding={1} alignItems='center' justifyContent='center'>
            <Grid item xs={10}>
              <Typography variant='h5'>Storskrald</Typography>
            </Grid>
            <Grid item xs={2}>
              <Button size='small' variant="contained" onClick={() => console.log('picture uploaded')}>
                Upload
              </Button>
            </Grid>
          </Grid>
        </CardContent>
        <Dialog open={dialogVisible} onClose={handleToClose}>
          <DialogTitle>{"What to you want to subscribe to?"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              I am Good, Hope the same for you!
            </DialogContentText>
            <TextField placeholder='Topic' size='small' />
            <Button variant='contained' onClick={() => "should subsribe"}>
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
