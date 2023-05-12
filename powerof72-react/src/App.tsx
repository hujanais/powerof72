import './App.scss';

import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { MainComponent } from './Components/MainComponent/MainComponent';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className='app-container'>
        <MainComponent></MainComponent>
      </div>
    </ThemeProvider>
  );
}

export default App;
