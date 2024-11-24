import './App.css';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import QuestionForm from './prototypes/QuestionForm';
import Typography from '@mui/material/Typography';
import { AppBar, Toolbar } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { lightPalette, darkPalette } from './components/themes';
import Instructions from './prototypes/Instructions';
import { useMediaQuery } from '@mui/material';


const lightTheme = createTheme({
  ...lightPalette,
  typography: {
    prevRead: {
      fontWeight: 'normal',
      color: "lightgrey",
      lineHeight: 2.0,
    },
    reading: {
      fontWeight: 'bold',
      color: lightPalette.palette.black.main,
      lineHeight: 2.0,
    },
    prompt: {
      color: lightPalette.palette.black.main,
      lineHeight: 2.0,
    },
    italicPrompt: {
      color: lightPalette.palette.black.main,
      lineHeight: 2.0,
      fontStyle: 'italic',
      textDecoration: 'underline',
    },
    highlightPrompt: {
      color: lightPalette.palette.black.main,
      lineHeight: 2.0,
      fontWeight: 'bold',
    },
    question: {
      fontWeight: 'bold',
      color: lightPalette.palette.black.main,
      lineHeight: 2.0,
    },
    answer: {
      fontWeight: 'bold',
      color: lightPalette.palette.black.main,
      lineHeight: 2.0,
    },
    progress: {
      fontSize: 12,
    },
    buttonText: {
      color: lightPalette.palette.white.main,
    }
  }
});


const darkTheme = createTheme({
  ...darkPalette,
  typography: {
    prevRead: {
      fontWeight: 'normal',
      color: "lightgrey",
      lineHeight: 2.0,
    },
    reading: {
      fontWeight: 'bold',
      color: darkPalette.palette.black.main,
      lineHeight: 2.0,
    },
    prompt: {
      color: darkPalette.palette.black.main,
      lineHeight: 2.0,
    },
    italicPrompt: {
      color: darkPalette.palette.black.main,
      lineHeight: 2.0,
      fontStyle: 'italic',
      textDecoration: 'underline',
    },
    highlightPrompt: {
      color: darkPalette.palette.black.main,
      lineHeight: 2.0,
      fontWeight: 'bold',
    },
    question: {
      fontWeight: 'bold',
      color: darkPalette.palette.black.main,
      lineHeight: 2.0,
    },
    answer: {
      fontWeight: 'bold',
      color: darkPalette.palette.black.main,
      lineHeight: 2.0,
    },
    progress: {
      fontSize: 12,
    },
    buttonText: {
      color: darkPalette.palette.white.main,
    }
  }
});


function allyProps(index) {
  return {
    id: `single-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}


function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = prefersDarkMode ? darkTheme : lightTheme;
  // const theme = lightTheme;
  // uncomment this for debugging

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;