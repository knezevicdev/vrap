import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import React from 'react';

import HeaderAutocomplete from './HeaderAutocomplete';
import HeaderSearchDialog from './HeaderSearchDialog';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '500px',
    border: `1px solid ${theme.palette.grey.A100}`,
    padding: '1px',
  },
  paper: {
    margin: 0,
    borderRadius: 0,
  },
  listbox: {
    '& .MuiListSubheader-root': {
      color: theme.palette.grey[900],
      fontWeight: theme.typography.fontWeightMedium,
    },
    '& .MuiAutocomplete-groupUl': {
      color: theme.palette.text.primary,
      fontWeight: theme.typography.fontWeightLight,
    },
    '& > li:not(:last-child) > .MuiAutocomplete-groupUl': {
      paddingBottom: theme.spacing(2),
      borderBottom: `1px solid ${theme.palette.grey[200]}`,
      marginBottom: theme.spacing(1),
    },
  },
  inputRoot: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
  },
  input: {
    color: theme.palette.text.primary,
    fontWeight: 300,
    padding: `${theme.spacing(1, 6, 1, 1)} !important`,
    '&::placeholder, &::-webkit-input-placeholder': {
      color: theme.palette.grey[700],
      opacity: 1,
    },
  },
}));

const HeaderSearch: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const mdAndUp = useMediaQuery(theme.breakpoints.up('md'));
  if (mdAndUp) {
    return (
      <HeaderAutocomplete
        classes={{
          root: classes.root,
          paper: classes.paper,
          listbox: classes.listbox,
          inputRoot: classes.inputRoot,
          input: classes.input,
        }}
      />
    );
  }
  return <HeaderSearchDialog />;
};

export default HeaderSearch;
