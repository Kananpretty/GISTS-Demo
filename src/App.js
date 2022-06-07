import { AppBar, Container, Divider, Typography } from '@mui/material';
import './App.css';
import SearchBar from './components/SearchBar';

function App() {
  return (
    <>
      <Container >
        <Typography variant='h3' align='center'>
          GISTS Viewer
        </Typography>
      </Container>
      <Divider></Divider>
      <Container>
        <SearchBar></SearchBar>
      </Container>
    </>
  );
}

export default App;
