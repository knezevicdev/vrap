import createMuiTheme, {
  Theme as MuiTheme,
} from '@material-ui/core/styles/createMuiTheme';
import { Typography as MuiTypography } from '@material-ui/core/styles/createTypography';

const muiTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#008473',
      contrastText: '#fff',
    },
    secondary: {
      main: '#333333',
      contrastText: '#fff',
    },
    warning: {
      main: '#eda304',
      contrastText: '#333',
    },
    error: {
      main: '#9d2335',
    },
    background: {
      paper: '#fff',
      default: '#f0f0f0',
    },
    grey: {
      100: '#f5f5f5',
      200: '#eaeaea',
      400: '#bebebe',
      600: '#808080',
      700: '#6c717a',
      900: '#333333',
      A100: '#d6d7da',
    },
    text: {
      primary: '#0a0b09',
      secondary: '#f7f7f7',
    },
  },
});

type Typography = MuiTypography;
// Replace with the following to add custom variants:
// interface Typography extends MuiTypography {
//   title: TypographyStyle;
// }

export interface Theme extends MuiTheme {
  typography: Typography;
}

const theme: Theme = {
  ...muiTheme,
  typography: {
    pxToRem: muiTheme.typography.pxToRem,
    fontFamily: 'RocketSans, Arial, sans-serif',
    fontSize: 14,
    fontWeightBold: 700,
    fontWeightMedium: 500,
    fontWeightRegular: 400,
    fontWeightLight: 300,
    h1: {
      fontFamily: 'RocketSans, Arial, sans-serif',
      fontSize: '48px',
      [muiTheme.breakpoints.down('md')]: {
        fontSize: '36px',
      },
    },
    h2: {
      fontFamily: 'RocketSans, Arial, sans-serif',
      fontSize: '24px',
      [muiTheme.breakpoints.down('md')]: {
        fontSize: '22px',
      },
    },
    h3: {
      fontFamily: 'RocketSans, Arial, sans-serif',
      fontSize: '14px',
    },
    h4: {},
    h5: {},
    h6: {},
    subtitle1: {},
    subtitle2: {},
    body1: {
      fontFamily: 'RocketSans, Arial, sans-serif',
      fontSize: '16px',
      [muiTheme.breakpoints.down('md')]: {
        fontSize: '14px',
      },
    },
    body2: {},
    button: {
      fontFamily: 'RocketSans, Arial, sans-serif',
      fontSize: '16px',
    },
    caption: {},
    overline: {
      fontFamily: 'RocketSans, Arial, sans-serif',
      fontSize: '13px',
    },
  },
};

export default theme;
