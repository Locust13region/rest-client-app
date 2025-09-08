'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',

    primary: {
      main: '#b6d3ebff',
    },
    secondary: {
      main: '#dda836ff',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial"',
    fontWeightBold: 700,
    fontSize: 14,
  },
  cssVariables: true,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: '"Roboto", "Helvetica", "Arial"',
          fontWeight: 700,
          fontSize: '1rem',
          letterSpacing: '0.2rem',
          textTransform: 'none',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontFamily: '"Roboto", "Helvetica", "Arial"',
          fontWeight: 700,
          fontSize: '1rem',
          letterSpacing: '0.3rem',
          textAlign: 'center',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: '"Roboto", "Helvetica", "Arial"',
          fontWeight: 700,
          fontSize: '1rem',
          letterSpacing: '0.3rem',
        },
      },
    },
  },
});

export default theme;
