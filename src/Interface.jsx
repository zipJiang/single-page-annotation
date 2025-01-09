import './Interface.css';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import { AppBar, Toolbar } from '@mui/material';
import QuestionForm from './prototypes/QuestionForm';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { lightPalette, darkPalette } from './components/themes';
import { useMediaQuery } from '@mui/material';
import { parseCsvFromPublic } from './components/utils';


function Interface(props) {

  const {
    theme,
    payload,
  } = props;

  return (<></>);

}

export default Interface;