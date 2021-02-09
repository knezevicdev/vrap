import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

const colors = {
  text: {
    main: '#212121',
    secondary: '#757575',
    contrast: '#FFF',
  },
  background: { main: '#F3F4F6', content: '#FFFFFF', selected: '#E4EBF5' },
  primary: '#0D47A1',
  tableLines: '#D0D5DD',
};

const theme = createMuiTheme({
  palette: {
    primary: {
      main: colors.primary,
      contrastText: colors.text.contrast,
    },
    background: {
      default: colors.background.main,
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
      A100: colors.tableLines,
    },
    text: {
      primary: colors.text.main,
    },
  },
  overrides: {
    MuiTab: {
      root: {
        fontSize: 14,
        fontWeight: 600,
        textTransform: 'none',
        backgroundColor: colors.background.content,
        '&$selected': {
          backgroundColor: colors.background.selected,
        },
      },
    },
    MuiButton: {
      label: {
        fontSize: 14,
        fontWeight: 600,
        textTransform: 'none',
      },
    },
    MuiTableCell: {
      head: {
        fontSize: 13,
        fontWeight: 600,
      },
    },
  },
  typography: {
    fontFamily: "'Nunito Sans', sans-serif",
    fontSize: 14,
    fontWeightRegular: 400,
    h1: {
      fontSize: 18,
      fontWeight: 600,
      display: 'inline-block',
    },
    h2: {},
    h3: {},
    h4: {},
    h5: {},
    h6: {},
    subtitle1: {},
    subtitle2: {},
    body1: {},
    body2: {},
    button: {},
    caption: {},
    overline: {},
  },
});

export default theme;
