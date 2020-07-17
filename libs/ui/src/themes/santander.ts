// TODO: update this to the actual Santander branding.

import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

import { Theme } from '../types';

const muiTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#EC0000',
      contrastText: '#fff',
    },
    secondary: {
      main: '#257FA4',
      contrastText: '#fff',
    },
    background: {
      paper: '#fff',
      default: '#f1f1f1',
    },
    // Define as needed.
    // Try to assign a key as close to the actual values defined here:
    // https://material-ui.com/customization/default-theme/
    // For example, since #bebebe is super close in value to the default grey.400 (#bdbdbd), Motown used grey.400 for #bebebe.
    // grey: {
    //   // 100: '#f5f5f5',
    //   // 200: '#eaeaea',
    //   // 400: '#bebebe',
    //   500: '#999da3',
    //   // 600: '#808080',
    //   700: '#6c717a',
    //   // 900: '#333333',
    //   A100: '#d6d7da',
    // },
    text: {
      primary: '#444444',
      secondary: '#fff',
    },
  },
});

const santanderTheme: Theme = {
  ...muiTheme,
  typography: {
    pxToRem: muiTheme.typography.pxToRem,
    fontFamily: 'SantanderText, Arial, sans-serif',
    fontSize: 14,
    fontWeightBold: 700,
    fontWeightSemibold: 600,
    fontWeightMedium: 500,
    fontWeightRegular: 400,
    fontWeightLight: 300,
    h1: {
      fontFamily: 'SantanderHeadline, Arial, sans-serif',
      fontSize: '36px',
      [muiTheme.breakpoints.only('md')]: {
        fontSize: '42px',
      },
      [muiTheme.breakpoints.up('lg')]: {
        fontSize: '62px',
      },
    },
    h2: {
      fontFamily: 'SantanderHeadline, Arial, sans-serif',
      fontSize: '22px',
      [muiTheme.breakpoints.up('md')]: {
        fontSize: '30px',
      },
    },
    h3: {},
    h4: {},
    h5: {},
    h6: {},
    subtitle1: {},
    subtitle2: {},
    body1: {
      fontFamily: 'SantanderText, Arial, sans-serif',
      fontSize: '14px',
      [muiTheme.breakpoints.up('md')]: {
        fontSize: '18px',
      },
    },
    body2: {},
    button: {
      fontFamily: 'SantanderText, Arial, sans-serif',
      fontSize: '14px',
      [muiTheme.breakpoints.up('md')]: {
        fontSize: '16px',
      },
    },
    caption: {},
    overline: {},
  },
};

export default santanderTheme;
