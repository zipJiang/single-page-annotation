import { createTheme, ThemeProvider } from '@mui/material/styles';

const lightPalette = createTheme({
  palette: {
    mode: 'light',
    primary: {
        main: '#42a4f5',
    },
    secondary: {
        main: '#ff4081',
    },
    alerting: {
        main: '#ff0000',
    },
    white: {
        main: '#ffffff',
    },
    black: {
        main: '#000000',
    },
    background: {
        default: "#ffffff",
    },
    highlight: {
        main: "#ff4081",
    },
    "card-bg-emph": {
        main: "#b3e5fc",
    },
  }
});


const darkPalette = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#425778',
        },
        secondary: {
            main: '#802f46',
        },
        alerting: {
            main: '#822311',
        },
        white: {
            main: '#424242',
        },
        black: {
            main: '#ffffff',
        },
        background: {
            default: '#424242',
        },
        highlight: {
            main: "#802f46",
        },
        "card-bg-emph": {
            main: "#5d727d",
        }
    },
})

export { lightPalette, darkPalette };