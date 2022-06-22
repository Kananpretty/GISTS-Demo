import { Container, Typography } from '@mui/material';
import './App.css';
import SearchBar from './components/SearchBar';

function App() {
  return (
    <>
      <Container>
        <Typography variant='h3' align='center' color='#1f56b5' gutterBottom='true'>
          GISTS Search
        </Typography>
      </Container>
      <Container maxWidth="lg">
        <SearchBar></SearchBar>
      </Container>
    </>
  );
}

export default App;
