import './Interface.css';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import { AppBar, Toolbar } from '@mui/material';
import QuestionForm from './QuestionForm';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { lightPalette, darkPalette } from '../components/themes';
import { useMediaQuery } from '@mui/material';
import { parseCsvFromPublic } from '../components/utils';


function Interface(props) {

  const {
    theme,
    payload,
  } = props;

  const [ratings, setRatings] = useState(new Array(payload.meta.claims.length).fill(0));

  return (
        <Box>
            <Box sx={{
                padding: "30px",
                width: "100%",
            }}>
                <QuestionForm
                theme={theme}
                payload={payload} 
                ratings={ratings}
                setRatings={setRatings}
                />
            </Box>

            <Box sx={{
                display: "none"
            }}>
                <input type="hidden" name="ratings" value={JSON.stringify(ratings)} />
            </Box>
        </Box>
  );
}

export default Interface;