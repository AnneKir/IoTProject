import logo from './logo.svg';
import { Grid, Paper, Typography, Button, TextField } from '@mui/material';
import './App.css';
// import './first';
import wrtc from 'wrtc';
import { startServer } from './first';
import SimplePeerWrapper from 'simple-peer-wrapper';
import { startClient } from './client';
import { Box } from '@mui/system';
// import SimplePeerWrapper from 'simple-peer-wrapper';
// import wrtc from 'wrtc';

const options = {
  serverUrl: 'http://localhost:8081',
  debugger: false,
  simplePeerOptions: {
    initiator: false,
    trickle: false,
    wrtc: wrtc
  }
};

const options2 = {
  serverUrl: 'http://localhost:8081',
  debugger: false,
  simplePeerOptions: {
    initiator: true,
    trickle: false,
    wrtc: wrtc
  }
};

type data = {
  id: string;
  data: object;
}

function rree() {
  const spw = new SimplePeerWrapper(options);
  console.log("ehek")
  spw.connect();
  spw.on('connect', ()=>{
    console.log("conection");
    spw.send("hej");
  });
  spw.on('data', (data: data) => {
    console.log(data.data.toString());
  });

}

function first() {
  const spw = new SimplePeerWrapper(options2);
  console.log("eheooo")
  spw.connect();
  spw.on('connect', ()=>{
    console.log("conection");
    spw.send("heiij");
  });
  spw.on('data', (data: data) => {
    console.log(data.data.toString());
  });
  spw.on('error', (err: Error) => console.log('error', err))

}


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

function App(): JSX.Element {
  return (
    <div className="App">
      <Box padding={4}>
        <Paper elevation={2}>
          <Grid container alignItems={"center"} justifyContent={"center"} padding={2}>
            <Grid item xs={6}>
              <Typography>This is a website</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>Where u can upload picutes</Typography>
            </Grid>
            <Grid item marginTop={4} xs={10}>
              This could be a thing
            </Grid>
            <Grid item marginTop={4} xs={"auto"}>
              <Button onClick={()=> startClient()}> connect </Button>
            </Grid>
            <Grid item marginTop={4} xs={"auto"}>
              <Button onClick={()=> startServer()}> start </Button>
            </Grid>
            <Grid item xs={12}>
            <TextField id="standard-basic" label="Standard" variant="standard" />
            </Grid>
          </Grid>
        </Paper>
      </Box>
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
    </div>
  );
}

export default App;
