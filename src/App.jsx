import './App.css';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import { AppBar, Toolbar } from '@mui/material';
import Interface from './prototypes/Interface';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { lightPalette, darkPalette } from './components/themes';
import { useMediaQuery } from '@mui/material';
import { parseCsvFromPublic } from './components/utils';


const lightTheme = createTheme({
  ...lightPalette,
  typography: {
    prevRead: {
      fontWeight: 'normal',
      color: "lightgrey",
      lineHeight: 2.0,
    },
    weaknessDescription: {
      fontWeight: 'normal',
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
    weaknessDescription: {
      fontWeight: 'normal',
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
  const [payloads, setPayloads] = useState([]);
  const [payload_index, setPayloadIndex] = useState(0);
  const [isPreview, setIsPreview] = useState(false);

  useEffect(() => {
    // console.log("is_preview", is_preview);
    if (isPreview) {
      const fetchPayload = async () => {
        try {
          const response = await parseCsvFromPublic("dev-data.csv");
          setPayloads(response);
        }
        catch (error) {
          console.error(error);
        }
      };
      fetchPayload();
    } else {
      //using the content from an div element with id="payload-read"
      setPayloads(
        [JSON.parse(document.getElementById("payload-read").textContent)]
      );
    }
  }, [isPreview]);

  // const fetchPayload = async () => {
  //   try {
  //     parseCsvFromPublic("dev-data-with-cluster-and-span.csv").then((response) => {
  //       setPayloads(response);
  //       // console.log('payloads', payloads);
  //     });
  //   }
  //   catch (error) {
  //     console.error(error);
  //   }
  // }
  // fetchPayload();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {payloads.length > 0 && <Box sx={{
        justifyItems: "center"
      }}>
        {isPreview &&
          <Box sx={{
            padding: "30px",
          }}>
            <Stack alignItems="center" spacing={2}>
            <Pagination count={payloads.length} page={payload_index + 1} onChange={(event, value) => setPayloadIndex(value - 1)} size="large" />
            </Stack>
          </Box>
        }
        <Interface payload={payloads[payload_index]} theme={theme} />
      </Box>}
    </ThemeProvider>
  );
}

export default App;