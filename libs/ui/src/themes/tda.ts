// TODO: update to actual TDA branding.

import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

import { Theme } from '../types';

const muiTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#e7131a',
      contrastText: '#fff',
    },
    secondary: {
      main: '#041022',
      contrastText: '#fff',
    },
    background: {
      paper: '#fff',
      default: '#f5f5f5',
    },
    // Define as needed.
    // Try to assign a key as close to the actual values defined here:
    // https://material-ui.com/customization/default-theme/
    // For example, since #bebebe is super close in value to the default grey.400 (#bdbdbd), Motown used grey.400 for #bebebe.
    grey: {
      // 100: '#f5f5f5',
      // 200: '#eaeaea',
      // 400: '#bebebe',
      500: '#999da3',
      // 600: '#808080',
      700: '#6c717a',
      // 900: '#333333',
      A100: '#d6d7da',
    },
    text: {
      primary: '#041022',
      secondary: '#fff',
    },
  },
});

const tdaTheme: Theme = {
  ...muiTheme,
  typography: {
    pxToRem: muiTheme.typography.pxToRem,
    fontFamily: 'Calibre, Arial, sans-serif',
    fontSize: 16,
    fontWeightBold: 700,
    fontWeightSemibold: 600,
    fontWeightMedium: 500,
    fontWeightRegular: 400,
    fontWeightLight: 300,
    h1: {
      fontFamily: 'RingsideCompressed, serif',
      fontSize: '36px',
      [muiTheme.breakpoints.only('md')]: {
        fontSize: '42px',
      },
      [muiTheme.breakpoints.up('lg')]: {
        fontSize: '62px',
      },
    },
    h2: {
      fontFamily: 'RingsideCompressed, serif',
      fontSize: '36px',
      [muiTheme.breakpoints.up('md')]: {
        fontSize: '42px',
      },
    },
    h3: {},
    h4: {},
    h5: {},
    h6: {},
    subtitle1: {},
    subtitle2: {},
    body1: {
      fontFamily: 'Calibre, Arial, sans-serif',
      fontSize: '16px',
      [muiTheme.breakpoints.only('md')]: {
        fontSize: '18px',
      },
      [muiTheme.breakpoints.up('lg')]: {
        fontSize: '20px',
      },
    },
    body2: {},
    button: {
      fontFamily: 'Calibre, Arial, sans-serif',
      fontSize: '16px',
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '1.75px',
    },
    caption: {
      fontFamily: 'Calibre, Arial, sans-serif',
      fontSize: '14px',
    },
    overline: {},
  },
};

export default tdaTheme;
