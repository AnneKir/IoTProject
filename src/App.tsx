import logo from './logo.svg';
import { Grid, Paper, Typography } from '@mui/material';
import './App.css';
import { Box } from '@mui/system';
// import SimplePeerWrapper from 'simple-peer-wrapper';
// import wrtc from 'wrtc';

// const options = {
//   serverUrl: 'http://localhost:8081',
//   debugger: true,
//   simplePeerOptions: {
//     initiator: false,
//     trickle: false,
//     wrtc: wrtc
//   }
// };

function App(): JSX.Element {
  return (
    <div className="App">
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
            <Grid item marginTop={4} xs={2}>
              a button ?
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
